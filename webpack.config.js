'use strict';
const PackageBuilder = require('render-package-build');
const builder = new PackageBuilder();
module.exports = builder.getVueWebpackConfig({
  entry: {
    vue: 'src/page/home/index.vue'
  }
});