export class ArgumentParser {
    static getDashedArgs(args: string[]): string[] {
        return args.filter(arg => {
            return arg.startsWith('-');
        });
    }

    static getNonDashedArgs(args: string[]): string[] {
        return args.filter(arg => {
            return !arg.startsWith('-');
        });
    }
}