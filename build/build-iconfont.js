/**
 * build iconfont from svg
 */
const { src, dest, series } = require('gulp');
const hashFiles = require('hash-files');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const svgmin = require('gulp-svgmin')

const config = require('./config');
const clean = require('./clean');
const encode = require('./build-encode');
const metadataProvider = require('./metadata-provider')

const { join } = require('path');
const makeCodePoints = require('./make-codepoints');
const destDir = join(__dirname, '../lib');
const svgDir = join(__dirname, '../assets/svg-fonts');
const template = join(__dirname, './template.tpl');

// woff2可以尝试
const formats = ['ttf', 'woff'];

// get md5 from assets
const md5 = hashFiles.sync({
  files: [join(svgDir, '**')]
}).slice(0, 6);
const fontName = `${config.name}-${md5}`;

let codepointsRef = {
  codepoints: {},
  aliases: {}
}

console.log(destDir)

function makeCodePointsTask() {
  return src([`${svgDir}/*.svg`])
    .pipe(makeCodePoints(codepointsRef))
}

// generate font from svg && build index.less
function font() {
  return src([`${svgDir}/*.svg`])
    .pipe(
      svgmin({
        plugins: [{
          removeAttrs: {
            attrs: '(fill|stroke)'
          }
        }]
      })
    )
    .pipe(
      iconfontCss({
        fontName: config.name,
        path: template,
        aliases: codepointsRef.aliases,
        targetPath: '../lib/index.less',
        normalize: true,
        fixedCodepoints: codepointsRef.codepoints,
        cssClass: fontName, // this is a trick to pass fontName to template
      })
    )
    .pipe(
      iconfont({
        fontName,
        formats,
        metadataProvider: metadataProvider(codepointsRef)
      })
    )
    .pipe(dest(destDir));
}

function cleanTask(cb) {
  clean();
  cb();
}

function encodeTask(cb) {
  encode(fontName, destDir);
  cb();
}

exports.default = series(
  cleanTask,
  makeCodePointsTask,
  font,
  encodeTask
);
