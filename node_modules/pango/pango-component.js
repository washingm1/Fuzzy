const pango = require('.');

module.exports = {
    targets: {
        initialize: {},
        help: new pango.HelpTarget(),
        clean: new pango.CleanTarget()
    }
};
