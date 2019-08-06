const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");
const path = require("path");
module.exports = withTypescript(withCSS(withImages({})));

// webpack(config) {
//   config.module.rules.push({
//     test: /\.svg$/,
//     use: ["@svgr/webpack"],
//   });
