module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    return {

        'CallExpression': function(node) {

            var prefix = context.options[0];
            if(prefix === undefined) {
                return;
            }

            if (utils.isAngularDirectiveDeclaration(node)) {
                var name = node.arguments[0].value;

                if(name !== undefined && name.indexOf('ng') === 0){
                    context.report(node, 'The {{directive}} directive should not start with "ng". This is reserved for AngularJS directives', {
                        directive: name
                    });
                } else {
                    if(name !== undefined && !utils.isRegexp(prefix) && !(name.indexOf(prefix) === 0)){
                    context.report(node, 'The {{directive}} directive should be prefixed by {{prefix}}', {
                        directive: name,
                        prefix: prefix
                    });
                    } else if(utils.isRegexp(prefix) && !prefix.test(name)){
                        context.report(node, 'The {{directive}} directive should follow this pattern: {{prefix}}', {
                            directive: name,
                            prefix: prefix.toString()
                        });
                    }
                }

            }
        }
    };

};
