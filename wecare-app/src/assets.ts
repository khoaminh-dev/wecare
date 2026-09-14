import type { ImageSourcePropType } from 'react-native';

export const images = {
  logo: require('../assets/brand/wecare-logo.png'),
  logoReverse: require('../assets/brand/wecare-logo-reverse.png'),
  heroBackground: require('../assets/images/hero-background-1536.webp'),
  heroProducts: require('../assets/images/hero-products-1050.webp'),
  wearable: require('../assets/images/wearable-1024.webp'),
  phone: require('../assets/images/phone-640.webp'),
  brain: require('../assets/images/brain-640.webp'),
  care: require('../assets/images/care-1536.webp'),
  technology: require('../assets/images/technology-1536.webp'),
  dashboard: require('../assets/graphics/dashboard.png'),
  appDashboard: require('../assets/graphics/app-dashboard.png'),
} satisfies Record<string, ImageSourcePropType>;

export const icons = {
  shield: require('../assets/icons/shield-check.png'),
  brain: require('../assets/icons/brain.png'),
  chart: require('../assets/icons/bar-chart.png'),
  leaf: require('../assets/icons/leaf.png'),
  watch: require('../assets/icons/watch.png'),
  activity: require('../assets/icons/activity.png'),
  file: require('../assets/icons/file-text.png'),
  hand: require('../assets/icons/hand.png'),
  running: require('../assets/icons/running.png'),
  bell: require('../assets/icons/bell.png'),
  share: require('../assets/icons/share.png'),
  infinity: require('../assets/icons/infinity.png'),
  flask: require('../assets/icons/flask.png'),
  users: require('../assets/icons/users.png'),
  settings: require('../assets/icons/settings.png'),
  arrow: require('../assets/icons/arrow-right.png'),
  play: require('../assets/icons/play.png'),
  menu: require('../assets/icons/menu.png'),
  close: require('../assets/icons/close.png'),
  facebook: require('../assets/icons/facebook.png'),
  youtube: require('../assets/icons/youtube.png'),
  linkedin: require('../assets/icons/linkedin.png'),
} satisfies Record<string, ImageSourcePropType>;

export type IconName = keyof typeof icons;
