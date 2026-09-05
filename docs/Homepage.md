# Homepage Architecture

## Overview

The FreeNav homepage is designed as a **browser homepage navigation page** with a two-layer architecture:

1. **First screen (100vh)** — Full-screen navigation homepage with quick links
2. **Below the fold** — Resource browsing by category

This design allows users to set FreeNav as their browser's homepage/start page for quick daily access.

## First Screen: Navigation Homepage

The first screen is exactly one viewport height (`100vh`) and contains:

- **Logo/Brand** — "FreeNav" in the center
- **Search bar** — Google search (opens in new tab)
- **Language-specific quick links** — Grid of most commonly used websites for the current language

### Quick Links Configuration

Quick links are defined in `src/data/quick-links.ts`:

```typescript
export const quickLinks = {
  en: [
    { name: 'Google', url: 'https://google.com', icon: '🔍' },
    { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
    ...
  ],
  zh: [
    { name: '百度', url: 'https://baidu.com', icon: '' },
    { name: '知乎', url: 'https://zhihu.com', icon: '�' },
    ...
  ],
  ...
};
```

### Supported Languages

- `en` — English (Google, GitHub, YouTube, etc.)
- `zh` — Chinese (Baidu, Bilibili, WeChat, etc.)
- `ja` — Japanese (Yahoo! Japan, NicoNico, Qiita, etc.)
- `ko` — Korean (Naver, Daum, Kakao, etc.)
- `es` — Spanish (YouTube, MercadoLibre, El País, etc.)
- `fr` — French (YouTube, Amazon France, Le Monde, etc.)

### Adding/Editing Quick Links

1. Edit `src/data/quick-links.ts`
2. Add/remove entries in the appropriate language array
3. Each entry requires: `name`, `url`, `icon` (emoji)
4. No build step needed — changes deploy on next commit

```typescript
// Add a new link
{ name: 'Twitter', url: 'https://twitter.com', icon: '🐦' }

// Remove a link
// Simply delete the line
```

## Below the Fold: Resources

Below the first screen, the page continues with:

- **Category grid** — All resource categories with counts
- **Recent resources** — Recently added resources
- **Trending resources** — Most popular/featured resources

## Design Principles

1. **First screen = pure navigation** — No resource content above the fold
2. **Language-aware** — Quick links change based on selected language
3. **Fixed height** — First section is exactly `100vh` (one screen)
4. **Quick access** — One click to any commonly used site
5. **Clean transition** — Scroll reveals the resource directory

## Setting as Browser Homepage

To set FreeNav as your browser homepage:
1. Visit `https://dyd-tech.github.io/freenav/`
2. Use your browser's "Set as homepage" option
3. Or set the URL in your browser's homepage settings

When you open a new tab, you'll see the navigation page with quick links for your language.
