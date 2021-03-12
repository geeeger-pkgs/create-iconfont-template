# svg转iconfont demo模板

将一堆svg导出图转换成iconfont



### 目录

---

[TOC]

### 相关介绍

---

+ fork自@vant/icons
+ 使用gulp-svgmin替代了直接使用svgo
+ ttf2woff2会编译失败，因为该作者没有提供二进制包，直接编译
+ ttf2woff2不影响程序运行，因为在构建脚本里移除woff2字体产出了
+ 引入了pinyin该模块，用于将中文名称转换成英文名称，方便重写字体名称和class名，
+ 删除了原作的codepoints.js模块，改为实现了个gulp插件用于自动生成字码表
+ 自动字码表从F000开始递增，防止覆盖现有的unicode，导致css展示图片时产生乱码
+ 移除了mdf-file依赖，改用hash-files计算文件夹哈希值
+ 移除了cdn上传



### 项目其他拓展

---

+ fontmin同样能做到相应的效果，与上一章节相同，ttf2woff2编译是个问题，需要去除fontmin的ttf2woff2插件
+ 阿里的iconfont做得更近一步，会将所有svg生成一个js文件，将svg雪碧注入页面，做到支持彩色（使用svg Symbol）。而@vant/icons不支持彩色
+ 使用@vant/icons的开发模式要求我们有一个cdn用于放置文字文件，以提供正确的less文件供用户使用
+ 对于彩色图标，个人意见是产生一套彩色图标组件，直接将svg内置
+ 不从sketch设计稿转的原因，sketch是商业软件，收费，并且只能在mac平台使用



### 安装

---



```shell
npm i
```



### 配置/如何使用

---

```sh
npm run build
```



