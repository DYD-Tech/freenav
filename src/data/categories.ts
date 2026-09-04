// Shared category definitions used across the site
export const categories = [
  { id: 'ai', name: 'AI', slug: 'ai', icon: '🤖', description: 'Free AI tools, models, and APIs', count: 0 },
  { id: 'development', name: 'Development', slug: 'development', icon: '💻', description: 'Dev tools, playgrounds, and environments', count: 0 },
  { id: 'design', name: 'Design', slug: 'design', icon: '🎨', description: 'Design tools, templates, and assets', count: 0 },
  { id: 'images', name: 'Images', slug: 'images', icon: '📷', description: 'Stock photos, AI image generators', count: 0 },
  { id: 'icons', name: 'Icons', slug: 'icons', icon: '🔲', description: 'Icon libraries and SVG resources', count: 0 },
  { id: 'video', name: 'Video', slug: 'video', icon: '🎬', description: 'Video editing, stock footage, animations', count: 0 },
  { id: 'fonts', name: 'Fonts', slug: 'fonts', icon: '🔤', description: 'Free fonts and typography tools', count: 0 },
  { id: 'music', name: 'Music', slug: 'music', icon: '🎵', description: 'Royalty-free music and sound effects', count: 0 },
  { id: 'pdf', name: 'PDF', slug: 'pdf', icon: '📄', description: 'PDF tools and free documents', count: 0 },
  { id: 'data', name: 'Datasets', slug: 'data', icon: '📊', description: 'Public datasets and APIs', count: 0 },
  { id: 'learning', name: 'Learning', slug: 'learning', icon: '📚', description: 'Free courses, tutorials, and books', count: 0 },
  { id: 'education', name: 'Education', slug: 'education', icon: '🎓', description: 'Online courses and learning platforms', count: 0 },
  { id: 'templates', name: 'Templates', slug: 'templates', icon: '📋', description: 'Website, document, and project templates', count: 0 },
  { id: 'productivity', name: 'Productivity', slug: 'productivity', icon: '⚡', description: 'Productivity tools and browser extensions', count: 0 },
  { id: 'software', name: 'Software', slug: 'software', icon: '🛠️', description: 'Free desktop and mobile software', count: 0 },
  { id: 'tools', name: 'Tools', slug: 'tools', icon: '🔧', description: 'Utility tools and apps', count: 0 },
  { id: 'security', name: 'Security', slug: 'security', icon: '🔒', description: 'Privacy and security tools', count: 0 },
  { id: 'entertainment', name: 'Entertainment', slug: 'entertainment', icon: '🎮', description: 'Games, streaming, and entertainment', count: 0 }
];

// Build a lookup map without Object.fromEntries
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const categoryInfo: Record<string, any> = {};
for (const c of categories) {
  categoryInfo[c.slug] = c;
}

export { categoryInfo };