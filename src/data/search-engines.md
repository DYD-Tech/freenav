# Search Engines Configuration

Location: `src/data/search-engines.ts`

This file defines all search engines available in the homepage search bar.

## Structure

```typescript
export const searchEngines = [
  {
    id: 'unique-id',
    name: 'Display Name',
    icon: '🔍',
    url: 'https://example.com/search?q={query}',
    description: 'Optional description'
  },
  ...
];
```

## Fields

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique identifier (lowercase, no spaces) |
| `name` | Yes | Display name shown in dropdown |
| `icon` | Yes | Emoji icon shown in dropdown |
| `url` | Yes | Search URL with `{query}` placeholder |
| `description` | No | Optional description |

## Adding a New Search Engine

Add a new entry to the array:

```typescript
{
  id: 'youtube',
  name: 'YouTube',
  icon: '🎥',
  url: 'https://www.youtube.com/results?search_query={query}',
  description: 'YouTube video search'
}
```

## Affiliate / Monetization Links

For promotional search links, simply add them to the array:

```typescript
{
  id: 'special-search',
  name: 'Special Search',
  icon: '💰',
  url: 'https://your-affiliate-link.com/search?q={query}',
  description: 'Our special search partner'
}
```

## Set Default Engine

Change `defaultSearchEngine` to any engine id:

```typescript
export const defaultSearchEngine = 'google';
```
