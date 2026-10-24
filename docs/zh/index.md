---
layout: home

hero:
  name: "Showcase"
  text: "把每块屏幕，变成相框"
  tagline: 动态图片画廊，展示精彩瞬间。连接本地相册与网络图库，搭配时间、天气和你自己的 AI。
  actions:
    - theme: brand
      text: 下载
      link: /zh/download
    - theme: alt
      text: 打开网页版
      link: https://showcase.joechen.space/app
    - theme: alt
      text: 🌟 GitHub
      link: https://github.com/mrjoechen/ShowcaseApp
    - theme: alt
      text:  ❤️ 捐赠
      link: /zh/donate

features:
  - icon: 🖼
    title: 图片来源
    details: 本地文件夹、系统相册、SMB、FTP、SFTP、WebDAV、S3、Immich、MT Photos、GitHub、Gitee、RSS、TMDB、Unsplash、Pexels，以及歌单封面。
  - icon: 🎨
    title: 展示方式
    details: 幻灯片、淡入淡出、图片墙、日历、Bento、瀑布流和焦点图片墙。幻灯片还可以换成立方体、揭示、翻转和 Duo Fold。
  - icon: 🌤️
    title: 时间与天气
    details: 播放时可以显示时钟、日期、星期、温度和天气，图标和背景会跟着天气变化。
  - icon: 📷
    title: 照片信息
    details: 在幻灯片、淡入淡出和日历里点开照片，查看拍摄时间、相机、曝光、地点和文件信息。
  - icon: ✨
    title: AI 摘要
    details: 接入你自己的模型，为当前照片写说明。
  - icon: 🔒
    title: 本地优先的隐私设计
    details: 照片默认在设备本地展示。AI 图像摘要等可选功能只会连接你明确配置的服务地址。人脸检测在设备本地完成，默认跳过检测到人脸的照片，不为其生成 AI 摘要。
---

<div class="home-motion">

<HomeHeading eyebrow="动态演示" title="七种展示方式，随心切换" details="每种展示方式的手机横屏录屏。" />

<StyleReel />

<div class="home-videos">
  <figure>
    <video src="../images/app/style-picker.mp4" poster="../images/app/style-picker-poster.webp" width="1280" height="576" controls muted loop playsinline preload="none" aria-label="展示方式的录屏"></video>
    <figcaption>切换展示样式</figcaption>
  </figure>
  <figure>
    <video src="../images/app/playback.mp4" poster="../images/app/playback-poster.webp" width="1280" height="590" controls muted loop playsinline preload="none" aria-label="幻灯片播放录屏，带 AI 摘要和天气"></video>
    <figcaption>带 AI 摘要和天气的幻灯片</figcaption>
  </figure>
</div>

</div>
