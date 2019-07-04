const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");
const withImages = require('next-images');
const path = require('path');
module.exports = (nextConfig = {}) => { 
    return withTypescript(withCSS(withImages(Object.assign({}, nextConfig, {
        webpack: (config, options) => {
            // config.resolve.modules = config.resolve.modules.concat('/');
            // console.log(config.module.rules)
            // console.log(options)
            return config;
        },
    })
    )))
}