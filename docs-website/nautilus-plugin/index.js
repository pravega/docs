module.exports = function (context, options) {
  return {
    name: "nautilus-plugin",
    configureWebpack(config, isServer, utils) {
      // Configure Webpack to not resolve symbolic links.
      // This allows symbolic links from the docs directory to Markdown files in any location.
      // See https://github.com/facebook/docusaurus/issues/3272#issuecomment-688409489.
      return {
        resolve: {
          symlinks: false
        }
      };
    }
  };
};
