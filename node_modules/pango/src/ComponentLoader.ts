import * as path from "path";
import * as fs from "fs-extra";
import {ComponentOrString, ProjectOptions} from "./ProjectOptions";
import {InternalComponent} from "./InternalComponent";
import {InternalTarget} from "./InternalTarget";
import * as NestedError from "nested-error-stacks";

export class ComponentLoader {
    static async loadComponents(projectOptions: ProjectOptions) {
        const componentPaths = await this.getComponentPaths(projectOptions);
        for (let componentPath of componentPaths) {
            await ComponentLoader.loadComponent(projectOptions, componentPath);
        }
    }

    private static async getComponentPaths(projectOptions: ProjectOptions): Promise<ComponentOrString[]> {
        if (projectOptions.components) {
            return await ComponentLoader.findComponentPathsFromList(projectOptions, projectOptions.projectDir, projectOptions.components);
        }
        return await ComponentLoader.findComponentPaths(projectOptions.projectDir);
    }

    private static async findComponentPathsFromList(
        projectOptions: ProjectOptions,
        projectDir: string,
        components: ComponentOrString[]
    ): Promise<ComponentOrString[]> {
        const results = [];
        for (const component of components) {
            if (typeof component === 'string') {
                const componentName = <string>component;
                const searchPaths = [
                    componentName,
                    path.join(componentName, 'pango-component.js'),
                    path.join('node_modules', componentName),
                    path.join('node_modules', componentName, 'pango-component.js')
                ];
                let found = false;
                for (let searchPath of searchPaths) {
                    const fullPath = path.join(projectDir, searchPath);
                    if (await fs.pathExists(fullPath) && (await fs.stat(fullPath)).isFile()) {
                        await ComponentLoader.loadComponent(projectOptions, searchPath);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    let message = `Could not find component "${component}"\n`;
                    for (let searchPath of searchPaths) {
                        message += `  - ${searchPath}\n`;
                    }
                    throw new Error(message);
                }
            } else {
                results.push(component);
            }
        }
        return results;
    }

    private static async findComponentPaths(rootDir: string, relativePath?: string): Promise<string[]> {
        relativePath = relativePath || '.';
        const results = [];
        const dir = path.join(rootDir, relativePath);
        const pangoIgnoreFileName = path.join(dir, '.pangoignore');
        if (await fs.pathExists(pangoIgnoreFileName)) {
            return;
        }
        let dirEntries;
        try {
            dirEntries = await fs.readdir(dir);
        } catch (err) {
            if (err.code === 'ENOTDIR') {
                return results;
            }
            throw err;
        }
        for (let dirEntry of dirEntries) {
            if (dirEntry === 'pango-component.js') {
                results.push(path.join(relativePath, 'pango-component.js'));
                continue;
            }
            const p = path.join(dir, dirEntry);
            const stat = await fs.lstat(p);
            if (stat.isDirectory() || stat.isSymbolicLink()) {
                const r = await ComponentLoader.findComponentPaths(rootDir, path.join(relativePath, dirEntry));
                results.push(...r);
            }
        }
        return results;
    }

    private static async loadComponent(projectOptions: ProjectOptions, componentPath: ComponentOrString) {
        projectOptions.loadedComponents = projectOptions.loadedComponents || [];

        let component: InternalComponent;
        if (typeof componentPath === 'string') {
            projectOptions.logger.debug(`Loading component ${componentPath}`);
            const componentFullPath = path.join(projectOptions.projectDir, componentPath);
            try {
                component = require(componentFullPath);
            } catch (err) {
                throw new NestedError(`Failed to load "${componentFullPath}"`, err);
            }
            component.componentPath = componentPath;
        } else {
            component = <InternalComponent>componentPath;
            component.componentPath = 'instance';
        }

        if (component.targets) {
            let targets;
            if (typeof component.targets === 'function') {
                targets = await component.targets(projectOptions);
            } else {
                targets = component.targets;
            }
            for (let targetName of Object.keys(targets)) {
                const target: InternalTarget = targets[targetName];
                await projectOptions.addTarget(targetName, target, component);
            }
        }

        projectOptions.loadedComponents.push(component);
    }
}
