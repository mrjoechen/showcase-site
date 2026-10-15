---
layout: home

hero:
  name: "Showcase"
  text: "Showcase a gallery of lively moments."
  tagline: 动态图片画廊，展示精彩瞬间
  image:
    src: /images/showcase_logo.png
    alt: Showcase App
  actions:
    - theme: brand
      text: Download
      link: /download
    - theme: alt
      text: Open the web app
      link: https://showcase.joechen.space/app
    - theme: alt
      text: ✨ GitHub
      link: https://github.com/mrjoechen/ShowcaseApp
    - theme: alt
      text: 💖 Support
      link: /donate

features:
  - icon: 🖼
    title: Image sources
    details: Local folders, the system gallery, SMB, FTP, SFTP, WebDAV, S3, Immich, MT Photos, GitHub, Gitee, RSS, TMDB, Unsplash, Pexels, and playlist covers.
  - icon: 🎨
    title: Display styles
    details: Slide, Fade, Frame wall, Calendar, Bento, Waterfall, and Focus Photo Wall. Slide also includes Cube, Reveal, Flip, and Duo Fold.
  - icon: 🌤️
    title: Time and weather
    details: Playback can show the clock, date, weekday, temperature, and conditions, with an icon and background that follow the weather.
  - icon: 📷
    title: Photo information
    details: In Slide, Fade, and Calendar, tap a photo to see capture time, camera, exposure, place, and file details.
  - icon: ✨
    title: AI summaries
    details: Connect your own model to describe the current photo.
  - icon: 🔒
    title: Local-first privacy
    details: Your photos are displayed locally by default. Optional features like AI image summaries only connect to the service endpoints you explicitly configure. Face detection runs on your device, and by default photos with a detected face are skipped for AI summaries.
---

<div class="home-preview">

## Preview

<div class="home-screenshots">
  <img src="./images/app/home_en.webp" width="720" height="1560" loading="lazy" alt="Home screen" />
  <img src="./images/app/add_source_en.webp" width="720" height="1560" loading="lazy" alt="Add a source" />
  <img src="./images/app/settings_1_en.webp" width="720" height="1560" loading="lazy" alt="Display settings" />
  <img src="./images/app/settings_2_en.webp" width="720" height="1560" loading="lazy" alt="More display settings" />
</div>

<video class="home-video" src="./images/app/style-picker.mp4" poster="./images/app/style-picker-poster.webp" width="1280" height="576" controls muted loop playsinline preload="none" aria-label="Screen recording of the display styles"></video>

<video class="home-video" src="./images/app/playback.mp4" poster="./images/app/playback-poster.webp" width="1280" height="590" controls muted loop playsinline preload="none" aria-label="Screen recording of slideshow playback with AI summaries and weather"></video>

</div>
