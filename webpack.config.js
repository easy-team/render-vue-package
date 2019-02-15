'use strict';
const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const pkg = require('./package.json');
const name = pkg.name;
const tag = md5(name).slice(0, 8);
const v = pkg.version.split('.');
v[v.length - 1] = Number(v[v.length - 1]) + 1;
const version = v.join('.');

const dist = path.join(__dirname, `dist/${version}`);
const server = path.join(dist, 'server');
const client = path.join(dist, 'client');

module.exports = {
  egg: 'true',
  framework: 'vue',
  entry: {
    home: 'src/page/home/index.vue'
  },
  output: {
    publicPath: `/public/${tag}/${version}`
  },
  plugins: {
    manifest: {
      assets: true,
      fileName: `dist/${version}/manifest.json`
    }
  },
  customize(webpackConfig) {
    const { target } = webpackConfig;
    if (target === 'node') {
      webpackConfig.output.path = server;
    } else {
      webpackConfig.output.path = client;
    }
    return webpackConfig;
  },
  done() {
    const pkgInfo = {
      name,
      version,
      tag,
      time: new Date()
    };
    pkg.version = version;
    fs.writeFileSync(path.join(dist, 'package.json'), JSON.stringify(pkgInfo, null, 2), 'utf8');
    fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify(pkg, null, 2), 'utf8');
    // upload zip code
  }
};