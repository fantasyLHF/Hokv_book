#项目结构
```txt
cloundfunctions 云函数目录
miniprogram 小程序主程序目录
  |- components 公共组件
  |- images 图片目录
  |- pages  小程序页面目录（所有页面保存在此目录）
  |- style 样式目录（组件或页面的公共样式）
  |- app.js 小程序注册入口
  |- app.json 全局配置文件
  |- app.wxss 全局样式文件
  |- sitemap 微信索引文件

project.config.json:记住一些开发者的偏好（字号大小，界面颜色，就是为了方便开发者换电脑工作）

README.md 项目描述文件

```
#云开发
```txt
一个云项目只能创建两个云开发环境
  开发环境
  生产环境

首次开通云环境，需要等待10分钟，云环境才可以生效

云开发主要功能
  云数据库：保存用户数据
  云存储：保存图片、音频、视频
  云函数：操作数据库
```

#页面文件
```txt
home.js 页面注册文件（必须的）
home.wxml 页面内容文件（必须）
home.wxss 页面样式（非必须）
home.json 页面局部配置（非必须）
```

#尺寸单位
```txt
rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。
视图布局应参考iPhone6屏幕作为标准
```

#视图标签
```txt
标签
view:类似于html的div,用于页面布局
text:用法类似html的span
```

#自定义组件
```
```