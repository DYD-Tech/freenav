// Search engines configuration
// Add/remove/modify search engines here
// Each engine requires: name, url (with {query} placeholder), icon (emoji), and optional description

export const searchEngines = [
  {
    id: 'google',
    name: 'Google',
    icon: '🔍',
    url: 'https://www.google.com/search?q={query}',
    description: 'Google Web Search'
  },
  {
    id: 'bing',
    name: 'Bing',
    icon: '🔍',
    url: 'https://www.bing.com/search?q={query}',
    description: 'Microsoft Bing Search'
  },
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    icon: '🦆',
    url: 'https://duckduckgo.com/?q={query}',
    description: 'Privacy-focused search'
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '🐙',
    url: 'https://github.com/search?q={query}',
    description: 'Search code & repositories'
  },
  {
    id: 'freenav',
    name: 'FreeNav',
    icon: '🧭',
    url: '/freenav/search?q={query}',
    description: 'Search free resources'
  }
];

// Default search engine (first one is default)
export const defaultSearchEngine = 'google';

// Helper: get search engine by id
export function getSearchEngine(id: string) {
  return searchEngines.find(e => e.id === id) || searchEngines[0];
}
