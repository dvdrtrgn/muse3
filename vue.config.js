//in vue.config.js file
// let out = 'playtime';
let dist = 'dist'; // default: dist

module.exports = {
  /* only sets name of "distribution" folder */
  // outputDir: out,
  /* only rewrites pathname in "production" mode */
  publicPath: process.env.NODE_ENV === 'production' ? `/${dist}/` : '/',
  // Reduce minification
  chainWebpack: (config) => {
    config.optimization.minimize(false);
    config.plugin('html').tap((args) => {
      args[0].minify = false;
      return args;
    });
  },
};
