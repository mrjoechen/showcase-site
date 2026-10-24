// Screenshots, screen recordings, and copy for the home page device previews.
// Copy follows the App Store preview images; screenshots live in docs/images/screens
// and display-style recordings in docs/images/styles.
import { computed } from "vue";
import { useData } from "vitepress";

export type Locale = "en" | "zh";

export function useLocale() {
  const { localeIndex } = useData();
  return computed<Locale>(() => (localeIndex.value === "zh" ? "zh" : "en"));
}
export type PlatformId = "phone" | "tablet" | "tv";
export type Tone =
  | "green"
  | "teal"
  | "blue"
  | "magenta"
  | "purple"
  | "red"
  | "amber"
  | "cyan";

type Text = Record<Locale, string>;

export interface Screen {
  id: string;
  tone: Tone;
  eyebrow: Text;
  title: Text;
  details: Text;
  // A phone screenshot taken in landscape. These are shown in a sideways phone frame
  // and use one image for every language.
  landscape?: boolean;
}

const landscapePhone = { widths: [800, 1600], thumbWidth: 280 };

export interface Platform {
  id: PlatformId;
  label: Text;
  // Source widths available for each screenshot, smallest first.
  widths: number[];
  thumbWidth: number;
  // Whether the screenshots have separate English and Chinese versions.
  localized: boolean;
  width: number;
  height: number;
  screens: Screen[];
}

const urls = import.meta.glob<string>("../../images/screens/*.webp", {
  eager: true,
  import: "default",
});

function url(file: string) {
  const found = urls[`../../images/screens/${file}.webp`];
  if (!found) throw new Error(`Missing screenshot: ${file}`);
  return found;
}

// `name` is a file in docs/images/screens without its `-<width>.webp` suffix.
export function imageSrcset(name: string, widths: number[]) {
  return {
    src: url(`${name}-${widths[widths.length - 1]}`),
    srcset: widths.map((w) => `${url(`${name}-${w}`)} ${w}w`).join(", "),
  };
}

export function screenSrcset(platform: Platform, screen: Screen, locale: Locale) {
  const { widths, thumbWidth } = screen.landscape ? landscapePhone : platform;
  const name =
    platform.localized && !screen.landscape
      ? `${platform.id}-${screen.id}-${locale}`
      : `${platform.id}-${screen.id}`;
  return {
    ...imageSrcset(name, widths),
    thumb: url(`${name}-${thumbWidth}`),
  };
}

const clipUrls = import.meta.glob<string>("../../images/styles/*.{mp4,webp}", {
  eager: true,
  import: "default",
});

function clipUrl(file: string) {
  const found = clipUrls[`../../images/styles/${file}`];
  if (!found) throw new Error(`Missing recording: ${file}`);
  return found;
}

export interface StyleClip {
  id: string;
  label: Text;
  details: Text;
  video: string;
  poster: string;
}

// Landscape phone recordings of each display style, in the app's own menu order.
export const styleClips: StyleClip[] = [
  {
    id: "slide",
    label: { en: "Slide", zh: "幻灯片" },
    details: {
      en: "One photo at a time, with an AI summary when you want one.",
      zh: "一次一张，需要时还能附上 AI 摘要。",
    },
  },
  {
    id: "fade",
    label: { en: "Fade", zh: "淡入淡出" },
    details: {
      en: "Each photo dissolves gently into the next.",
      zh: "照片之间柔和地淡入淡出。",
    },
  },
  {
    id: "framewall",
    label: { en: "Frame wall", zh: "图片墙" },
    details: {
      en: "A full wall of photos that keeps changing.",
      zh: "铺满整屏的照片墙，持续轮换。",
    },
  },
  {
    id: "calendar",
    label: { en: "Calendar", zh: "日历" },
    details: {
      en: "A photo beside today's calendar page.",
      zh: "照片旁配一页今日日历。",
    },
  },
  {
    id: "bento",
    label: { en: "Bento", zh: "Bento 拼贴" },
    details: {
      en: "Photos in mixed sizes, arranged into one neat layout.",
      zh: "大小画面有序拼贴在一起。",
    },
  },
  {
    id: "waterfall",
    label: { en: "Waterfall", zh: "瀑布流" },
    details: {
      en: "Staggered columns of photos that keep scrolling.",
      zh: "错落的照片列缓缓滚动。",
    },
  },
  {
    id: "focus",
    label: { en: "Focus photo wall", zh: "焦点图片墙" },
    details: {
      en: "One photo takes center stage on a spacious wall.",
      zh: "焦点照片居中放大，四周照片环绕。",
    },
  },
].map((clip) => ({
  ...clip,
  video: clipUrl(`${clip.id}.mp4`),
  poster: clipUrl(`${clip.id}-poster.webp`),
}));

const sources: Screen = {
  id: "sources",
  tone: "teal",
  eyebrow: { en: "Photo sources", zh: "多来源连接" },
  title: { en: "All your photo sources. One showcase.", zh: "好照片，不止一个来源" },
  details: {
    en: "Connect your gallery, SMB, WebDAV, S3, and more.",
    zh: "连接本地相册、SMB、WebDAV、S3 及更多图片来源。",
  },
};

const styles: Screen = {
  id: "styles",
  tone: "blue",
  eyebrow: { en: "Display styles", zh: "展示样式" },
  title: { en: "A new way to see your photos.", zh: "一种心情，一种展法" },
  details: {
    en: "Choose your layout, transitions, and slideshow pace.",
    zh: "从幻灯片到照片墙，自选展示样式、转场与播放节奏。",
  },
};

const frame: Screen = {
  id: "frame",
  tone: "purple",
  eyebrow: { en: "Everyday photo frame", zh: "照片时钟" },
  title: { en: "A photo frame for every day.", zh: "把屏幕变成生活的风景" },
  details: {
    en: "Your photos, with the time, date, and weather.",
    zh: "欣赏照片的同时，一眼查看时间、日期与天气。",
  },
};

const bento: Screen = {
  id: "bento",
  tone: "red",
  eyebrow: { en: "Bento layout", zh: "Bento 拼贴" },
  title: { en: "Your photos. Beautifully arranged.", zh: "把珍藏，拼成一面风景" },
  details: {
    en: "A bento layout that brings every moment together.",
    zh: "大小画面有序排列，用 Bento 拼贴呈现你的照片集。",
  },
};

const focus: Screen = {
  id: "focus",
  tone: "amber",
  eyebrow: { en: "Focus photo wall", zh: "焦点照片墙" },
  title: { en: "Put your favorites in the spotlight.", zh: "让每张照片，都有主场" },
  details: {
    en: "A spacious photo wall with a standout center frame.",
    zh: "焦点照片居中放大，让珍藏在照片墙中脱颖而出。",
  },
};

export const platforms: Platform[] = [
  {
    id: "phone",
    label: { en: "Phone", zh: "手机" },
    widths: [640],
    thumbWidth: 160,
    localized: true,
    width: 1206,
    height: 2622,
    screens: [
      { ...frame, landscape: true },
      { ...bento, landscape: true },
      sources,
      styles,
    ],
  },
  {
    id: "tablet",
    label: { en: "Tablet", zh: "平板" },
    widths: [800, 1600],
    thumbWidth: 280,
    localized: true,
    width: 2388,
    height: 1668,
    screens: [
      frame,
      {
        id: "home",
        tone: "green",
        eyebrow: { en: "Your albums", zh: "我的相册" },
        title: { en: "Every album, one tap away.", zh: "每个相册，一点即播" },
        details: {
          en: "Your photo sources line up on the home screen, ready to play.",
          zh: "图片来源整齐排列在首页，轻点即可开始播放。",
        },
      },
      sources,
      styles,
      bento,
      focus,
    ],
  },
  {
    id: "tv",
    label: { en: "TV", zh: "电视" },
    widths: [960, 1920],
    thumbWidth: 280,
    localized: false,
    width: 3840,
    height: 2160,
    screens: [
      {
        id: "slide",
        tone: "purple",
        eyebrow: { en: "Big screen", zh: "大屏幕" },
        title: { en: "Your photos deserve the biggest screen.", zh: "好照片，值得最大的屏幕" },
        details: {
          en: "A photo frame for your living room, with the time, date, and weather.",
          zh: "客厅里的数字相框，同时显示时间、日期与天气。",
        },
      },
      {
        id: "home",
        tone: "green",
        eyebrow: { en: "Your albums", zh: "我的相册" },
        title: { en: "Every album, one click away.", zh: "每个相册，一键即播" },
        details: {
          en: "Your photo sources line up on the home screen, ready to play.",
          zh: "图片来源整齐排列在首页，按一下遥控器即可开始播放。",
        },
      },
      {
        ...sources,
        details: {
          en: "Connect SMB, WebDAV, S3, Immich, and more.",
          zh: "连接 SMB、WebDAV、S3、Immich 及更多图片来源。",
        },
      },
      styles,
      {
        id: "wall",
        tone: "cyan",
        eyebrow: { en: "Photo wall", zh: "图片墙" },
        title: { en: "Every moment, all at once.", zh: "所有瞬间，一屏尽览" },
        details: {
          en: "Fill your TV with a wall of your favorite photos.",
          zh: "用一整面照片墙，铺满你的电视。",
        },
      },
      bento,
      focus,
    ],
  },
];

export const homeCopy = {
  en: {
    heroAlt: {
      tv: "Showcase on a TV, playing a slideshow with the time and weather",
      tablet: "Showcase on a tablet, showing a frame wall with the time and weather",
      phone: "Showcase on a phone in landscape, showing photos in the bento layout",
    },
    previewEyebrow: "Preview",
    previewTitle: "One gallery. Every screen.",
    previewDetails: "Pick a device to see how Showcase looks on it.",
    devices: "Device",
    previous: "Previous screen",
    next: "Next screen",
    featuresEyebrow: "Features",
    featuresTitle: "Everything a photo frame needs.",
    styles: "Display style",
    pause: "Pause recording",
    play: "Play recording",
    motionEyebrow: "In motion",
    motionTitle: "Many ways to show your photos.",
    motionDetails: "Screen recordings of every display style, on a phone in landscape.",
    stylePickerLabel: "Screen recording of the display styles",
    stylePickerCaption: "Switching display styles",
    playbackLabel: "Screen recording of slideshow playback with AI summaries and weather",
    playbackCaption: "Slideshow with AI summaries and weather",
  },
  zh: {
    heroAlt: {
      tv: "电视上的 Showcase，正在播放幻灯片并显示时间和天气",
      tablet: "平板上的 Showcase，以图片墙展示照片和时间天气",
      phone: "横屏手机上的 Showcase，以 Bento 拼贴展示照片",
    },
    previewEyebrow: "界面预览",
    previewTitle: "一个画廊，每块屏幕",
    previewDetails: "切换设备，看看 Showcase 在不同屏幕上的样子。",
    devices: "设备",
    previous: "上一张",
    next: "下一张",
    featuresEyebrow: "功能",
    featuresTitle: "数字相框需要的，都在这里",
    styles: "展示方式",
    pause: "暂停录屏",
    play: "播放录屏",
    motionEyebrow: "动态演示",
    motionTitle: "多种展示方式，随心切换",
    motionDetails: "每种展示方式的手机横屏录屏。",
    stylePickerLabel: "展示方式的录屏",
    stylePickerCaption: "切换展示样式",
    playbackLabel: "幻灯片播放录屏，带 AI 摘要和天气",
    playbackCaption: "带 AI 摘要和天气的幻灯片",
  },
} satisfies Record<Locale, unknown>;
