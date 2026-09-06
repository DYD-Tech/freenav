// Language-specific homepage quick links organized by category
// These are the most useful websites for each language region
// Edit this file to add/remove/modify quick links

export interface QuickLinkCategory {
  name: string;
  icon: string;
  links: QuickLink[];
}

export interface QuickLink {
  name: string;
  url: string;
  icon: string;
}

// Default (English) links organized by category
export const quickLinkCategories: Record<string, QuickLinkCategory[]> = {
  en: [
    {
      name: 'AI & Search',
      icon: '🤖',
      links: [
        { name: 'Google', url: 'https://google.com', icon: '🔍' },
        { name: 'ChatGPT', url: 'https://chat.openai.com', icon: '🤖' },
        { name: 'Bing', url: 'https://bing.com', icon: '🅱️' },
        { name: 'DuckDuckGo', url: 'https://duckduckgo.com', icon: '🦆' },
        { name: 'Perplexity', url: 'https://perplexity.ai', icon: '🧠' },
        { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
      ],
    },
    {
      name: 'Design & Media',
      icon: '🎨',
      links: [
        { name: 'YouTube', url: 'https://youtube.com', icon: '🎥' },
        { name: 'Figma', url: 'https://figma.com', icon: '🎨' },
        { name: 'Dribbble', url: 'https://dribbble.com', icon: '🏀' },
        { name: 'Behance', url: 'https://behance.net', icon: '🖼️' },
        { name: 'Pexels', url: 'https://pexels.com', icon: '📷' },
        { name: 'Unsplash', url: 'https://unsplash.com', icon: '📸' },
      ],
    },
    {
      name: 'Productivity',
      icon: '⚡',
      links: [
        { name: 'Notion', url: 'https://notion.so', icon: '📋' },
        { name: 'Todoist', url: 'https://todoist.com', icon: '✅' },
        { name: 'Vercel', url: 'https://vercel.com', icon: '▲' },
        { name: 'Netlify', url: 'https://netlify.com', icon: '🌐' },
        { name: 'Obsidian', url: 'https://obsidian.md', icon: '📔' },
        { name: 'Reddit', url: 'https://reddit.com', icon: '🤖' },
      ],
    },
    {
      name: 'Learn & Read',
      icon: '📚',
      links: [
        { name: 'Wikipedia', url: 'https://wikipedia.org', icon: '📚' },
        { name: 'Coursera', url: 'https://coursera.org', icon: '🎓' },
        { name: 'Khan Academy', url: 'https://khanacademy.org', icon: '📖' },
        { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
        { name: 'Hacker News', url: 'https://news.ycombinator.com', icon: '📰' },
        { name: 'BBC', url: 'https://bbc.com', icon: '📺' },
      ],
    },
  ],
  zh: [
    {
      name: 'AI & Search',
      icon: '🤖',
      links: [
        { name: '百度', url: 'https://baidu.com', icon: '🔍' },
        { name: 'Bing', url: 'https://bing.com', icon: '🅱️' },
        { name: '知乎', url: 'https://zhihu.com', icon: '💡' },
        { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
        { name: '哔哩哔哩', url: 'https://bilibili.com', icon: '🎬' },
        { name: '微信', url: 'https://weixin.qq.com', icon: '💬' },
      ],
    },
    {
      name: 'Design & Media',
      icon: '🎨',
      links: [
        { name: '网易云音乐', url: 'https://music.163.com', icon: '🎵' },
        { name: '小红书', url: 'https://xiaohongshu.com', icon: '📸' },
        { name: '豆瓣', url: 'https://douban.com', icon: '🎬' },
        { name: '腾讯视频', url: 'https://v.qq.com', icon: '🎥' },
        { name: '微博', url: 'https://weibo.com', icon: '微' },
        { name: 'QQ', url: 'https://qq.com', icon: '🎮' },
      ],
    },
    {
      name: 'Productivity',
      icon: '⚡',
      links: [
        { name: '网易邮箱', url: 'https://163.com', icon: '📧' },
        { name: '百度贴吧', url: 'https://tieba.baidu.com', icon: '💬' },
        { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
        { name: 'Vercel', url: 'https://vercel.com', icon: '▲' },
        { name: 'Notion', url: 'https://notion.so', icon: '📋' },
        { name: '腾讯网', url: 'https://qq.com', icon: '🎮' },
      ],
    },
    {
      name: 'Learn & Read',
      icon: '📚',
      links: [
        { name: '百度百科', url: 'https://baike.baidu.com', icon: '📚' },
        { name: '腾讯课堂', url: 'https://ke.qq.com', icon: '🎓' },
        { name: '小米学院', url: 'https://xiaomi.com', icon: '📖' },
        { name: '今日头条', url: 'https://toutiao.com', icon: '📰' },
        { name: '搜狐', url: 'https://sohu.com', icon: '📺' },
        { name: '新浪新闻', url: 'https://sina.com.cn', icon: '📰' },
      ],
    },
  ],
  ja: [
    {
      name: 'AI & Search',
      icon: '🤖',
      links: [
        { name: 'Google', url: 'https://google.com', icon: '🔍' },
        { name: 'Bing', url: 'https://bing.com', icon: '🅱️' },
        { name: 'Yahoo! Japan', url: 'https://yahoo.co.jp', icon: '📰' },
        { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
        { name: 'ニコニコ', url: 'https://nicovideo.jp', icon: '🎬' },
        { name: 'Qiita', url: 'https://qiita.com', icon: '💻' },
      ],
    },
    {
      name: 'Design & Media',
      icon: '🎨',
      links: [
        { name: 'YouTube', url: 'https://youtube.com', icon: '🎥' },
        { name: 'ツイッター', url: 'https://twitter.com', icon: '🐦' },
        { name: 'インスタグラム', url: 'https://instagram.com', icon: '📷' },
        { name: 'ピクセラ', url: 'https://pexels.com', icon: '📷' },
        { name: 'アンサンブル', url: 'https://unsplash.com', icon: '📸' },
        { name: 'ツーン', url: 'https://dribbble.com', icon: '🏀' },
      ],
    },
    {
      name: 'Productivity',
      icon: '⚡',
      links: [
        { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
        { name: 'はてなブログ', url: 'https://hatenablog.com', icon: '📝' },
        { name: 'ZOZOTOWN', url: 'https://zozo.jp', icon: '🛍️' },
        { name: '楽天', url: 'https://rakuten.co.jp', icon: '🛒' },
        { name: 'Amazon.co.jp', url: 'https://amazon.co.jp', icon: '📦' },
        { name: 'LINE', url: 'https://line.me', icon: '💬' },
      ],
    },
    {
      name: 'Learn & Read',
      icon: '📚',
      links: [
        { name: 'Wikipedia', url: 'https://wikipedia.org', icon: '📚' },
        { name: 'qiita', url: 'https://qiita.com', icon: '💻' },
        { name: 'はてな', url: 'https://hatena.ne.jp', icon: '📝' },
        { name: 'NHK', url: 'https://www3.nhk.or.jp', icon: '📺' },
        { name: '朝刊', url: 'https://asahi.com', icon: '🗞️' },
        { name: '読売新聞', url: 'https://yomiuri.co.jp', icon: '🗞️' },
      ],
    },
  ],
  ko: [
    {
      name: 'AI & Search',
      icon: '🤖',
      links: [
        { name: 'Google', url: 'https://google.com', icon: '🔍' },
        { name: '네이버', url: 'https://naver.com', icon: '🟦' },
        { name: 'BING', url: 'https://bing.com', icon: '🅱️' },
        { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
        { name: '다음', url: 'https://daum.net', icon: '🔍' },
        { name: '깃허브', url: 'https://github.com', icon: '🐙' },
      ],
    },
    {
      name: 'Design & Media',
      icon: '🎨',
      links: [
        { name: '유튜브', url: 'https://youtube.com', icon: '🎥' },
        { name: '트위터', url: 'https://twitter.com', icon: '🐦' },
        { name: '인스타그램', url: 'https://instagram.com', icon: '📷' },
        { name: '네이버 블로그', url: 'https://blog.naver.com', icon: '📝' },
        { name: '카카오톡', url: 'https://kakao.com', icon: '💬' },
        { name: '텐쑤트리', url: 'https://www.twitch.tv', icon: '🎮' },
      ],
    },
    {
      name: 'Productivity',
      icon: '⚡',
      links: [
        { name: '카카오톡', url: 'https://kakao.com', icon: '💬' },
        { name: '네이버 블로그', url: 'https://blog.naver.com', icon: '📝' },
        { name: '쿠팡', url: 'https://coupang.com', icon: '🛒' },
        { name: '배달의민족', url: 'https://baedaltong.com', icon: '🚗' },
        { name: '깃허브', url: 'https://github.com', icon: '🐙' },
        { name: '트위터', url: 'https://twitter.com', icon: '🐦' },
      ],
    },
    {
      name: 'Learn & Read',
      icon: '📚',
      links: [
        { name: 'Wikipedia', url: 'https://wikipedia.org', icon: '📚' },
        { name: '네이버 뉴스', url: 'https://news.naver.com', icon: '📰' },
        { name: '조선일보', url: 'https://chosun.com', icon: '🗞️' },
        { name: '한겨레', url: 'https://hani.co.kr', icon: '🗞️' },
        { name: 'EBS', url: 'https://www.ebs.co.kr', icon: '🎓' },
        { name: 'KBS', url: 'https://www.kbs.co.kr', icon: '📺' },
      ],
    },
  ],
  es: [
    {
      name: 'AI & Search',
      icon: '🤖',
      links: [
        { name: 'Google', url: 'https://google.com', icon: '🔍' },
        { name: 'Bing', url: 'https://bing.com', icon: '🅱️' },
        { name: 'DuckDuckGo', url: 'https://duckduckgo.com', icon: '🦆' },
        { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
        { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
        { name: 'Wikipedia', url: 'https://wikipedia.org', icon: '📚' },
      ],
    },
    {
      name: 'Design & Media',
      icon: '🎨',
      links: [
        { name: 'YouTube', url: 'https://youtube.com', icon: '🎥' },
        { name: 'Instagram', url: 'https://instagram.com', icon: '📷' },
        { name: 'El País', url: 'https://eluniversal.com.mx', icon: '🗞️' },
        { name: 'Flickr', url: 'https://flickr.com', icon: '📸' },
        { name: 'Pexels', url: 'https://pexels.com', icon: '📷' },
        { name: 'Unsplash', url: 'https://unsplash.com', icon: '📸' },
      ],
    },
    {
      name: 'Productivity',
      icon: '⚡',
      links: [
        { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
        { name: 'MercadoLibre', url: 'https://mercadolibre.com', icon: '🛒' },
        { name: 'Amazon España', url: 'https://amazon.es', icon: '📦' },
        { name: 'BBVA', url: 'https://bbva.es', icon: '🏦' },
        { name: 'Deezer', url: 'https://deezer.com', icon: '🎵' },
        { name: 'Telecinco', url: 'https://mediaset.es', icon: '📺' },
      ],
    },
    {
      name: 'Learn & Read',
      icon: '📚',
      links: [
        { name: 'Wikipedia', url: 'https://wikipedia.org', icon: '📚' },
        { name: 'Universidad', url: 'https://edx.org', icon: '🎓' },
        { name: 'Coursera', url: 'https://coursera.org', icon: '🎓' },
        { name: 'BBC', url: 'https://bbc.com', icon: '📺' },
        { name: 'CNN', url: 'https://cnn.com', icon: '🗞️' },
        { name: 'El Mundo', url: 'https://eluniversal.com.mx', icon: '🗞️' },
      ],
    },
  ],
  fr: [
    {
      name: 'AI & Search',
      icon: '🤖',
      links: [
        { name: 'Google', url: 'https://google.com', icon: '🔍' },
        { name: 'Bing', url: 'https://bing.com', icon: '🅱️' },
        { name: 'DuckDuckGo', url: 'https://duckduckgo.com', icon: '🦆' },
        { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
        { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
        { name: 'Wikipedia', url: 'https://wikipedia.org', icon: '📚' },
      ],
    },
    {
      name: 'Design & Media',
      icon: '🎨',
      links: [
        { name: 'YouTube', url: 'https://youtube.com', icon: '🎥' },
        { name: 'Instagram', url: 'https://instagram.com', icon: '📷' },
        { name: 'Le Monde', url: 'https://lemonde.fr', icon: '🗞️' },
        { name: 'Flickr', url: 'https://flickr.com', icon: '📸' },
        { name: 'Pexels', url: 'https://pexels.com', icon: '📷' },
        { name: 'Unsplash', url: 'https://unsplash.com', icon: '📸' },
      ],
    },
    {
      name: 'Productivity',
      icon: '⚡',
      links: [
        { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
        { name: 'Amazon France', url: 'https://amazon.fr', icon: '📦' },
        { name: 'OVHcloud', url: 'https://ovhcloud.com', icon: '☁️' },
        { name: 'Canal+', url: 'https://canalplus.com', icon: '🎬' },
        { name: 'Deezer', url: 'https://deezer.com', icon: '🎵' },
        { name: 'Leboncoin', url: 'https://leboncoin.fr', icon: '🛒' },
      ],
    },
    {
      name: 'Learn & Read',
      icon: '📚',
      links: [
        { name: 'Wikipedia', url: 'https://wikipedia.org', icon: '📚' },
        { name: 'Coursera', url: 'https://coursera.org', icon: '🎓' },
        { name: 'Open Classrooms', url: 'https://openclassrooms.com', icon: '🎓' },
        { name: 'France Culture', url: 'https://franceculture.fr', icon: '🎧' },
        { name: 'Le Figaro', url: 'https://lefigaro.fr', icon: '🗞️' },
        { name: 'France 24', url: 'https://france24.com', icon: '📺' },
      ],
    },
  ],
};

// Flat list for backward compat (used by search bar default engine)
export const defaultLinks: QuickLink[] = quickLinkCategories.en.flatMap(c => c.links);

export const searchEngines = [
  { name: 'Google', value: 'google', emoji: '🔍' },
  { name: 'Bing', value: 'bing', emoji: '🅱️' },
  { name: 'DuckDuckGo', value: 'duckduck', emoji: '🦆' },
  { name: 'GitHub', value: 'github', emoji: '🐙' },
];

export const searchEngineUrls: Record<string, string> = {
  google: 'https://www.google.com/search?q=',
  bing: 'https://www.bing.com/search?q=',
  duckduck: 'https://duckduckgo.com/?q=',
  github: 'https://github.com/search?q=',
};

// Translations for category names
export const categoryTranslations: Record<string, Record<string, string>> = {
  en: { 'AI & Search': 'AI & Search', 'Design & Media': 'Design & Media', 'Productivity': 'Productivity', 'Learn & Read': 'Learn & Read' },
  zh: { 'AI & Search': 'AI & 搜索', 'Design & Media': '设计与媒体', 'Productivity': '效率工具', 'Learn & Read': '学习阅读' },
  ja: { 'AI & Search': 'AI・検索', 'Design & Media': 'デザイン・メディア', 'Productivity': '生産性', 'Learn & Read': '学習・読書' },
  ko: { 'AI & Search': 'AI 및 검색', 'Design & Media': '디자인 및 미디어', 'Productivity': '생산성', 'Learn & Read': '학습 및 독서' },
  es: { 'AI & Search': 'IA y Búsqueda', 'Design & Media': 'Diseño y Medios', 'Productivity': 'Productividad', 'Learn & Read': 'Aprender y Leer' },
  fr: { 'AI & Search': 'IA et Recherche', 'Design & Media': 'Design et Médias', 'Productivity': 'Productivité', 'Learn & Read': 'Apprendre et Lire' },
};

// Legacy exports used by other files
export const quickLinks = quickLinkCategories;
