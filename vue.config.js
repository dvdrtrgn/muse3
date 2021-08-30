//in vue.config.js file
let out = 'vuebox/';
let dist = 'dist/'; // default: dist

module.exports = {
  /* only sets name of "distribution" folder */
  outputDir: `${dist}${out}`,
  /* only rewrites pathname in "production" mode */
  publicPath: process.env.NODE_ENV === 'production' ? `/${dist}` : `/${out}`,
  // Reduce minification
  chainWebpack: (config) => {
    config.optimization.minimize(false);
    config.plugin('html').tap((args) => {
      args[0].minify = false;
      return args;
    });
  },
};
