const path = require('path');
const { addLessLoader } = require('customize-cra');

module.exports = function(config, env) {
    config = addLessLoader({
        javascriptEnabled: true
    })(config, env);

    const oneOf = config.module.rules.find(conf => {
        return conf.oneOf
    }).oneOf;

    oneOf.filter(x => !!x.use).forEach(element => {
        element.use.forEach(useRule => {
            if (!useRule.loader || !useRule.loader.includes('css-loader')) {
                return;
            }

            if (!useRule.options) {
                useRule.options = {};
            }

            useRule.options.modules = 'global';
        });
    });

    config.resolve.alias = Object.assign({}, config.resolve.alias, {
        assets: path.resolve('src/assets/'),
        '@src': path.resolve('src/')
    });

    config.entry.unshift(
        'babel-polyfill'
    );
    // config = disableEsLint()(config, env);
        
    return config;
}
