import React, { useState, useMemo } from 'react'
import blogData from '../data/blog.json'

function Blog() {
  const { posts } = blogData;
  const glassCardClass = "glass-card group p-6";

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set();
    posts.forEach(post => {
      if (post.tags) post.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  // State for tag filter and date sort
  const [selectedTag, setSelectedTag] = useState('All');
  const [dateSort, setDateSort] = useState('newest');

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;
    if (selectedTag !== 'All') {
      filtered = filtered.filter(post => post.tags && post.tags.includes(selectedTag));
    }
    filtered = filtered.slice().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateSort === 'newest' ? dateB - dateA : dateA - dateB;
    });
    return filtered;
  }, [posts, selectedTag, dateSort]);

  return (
    <div className="w-full text-white/90 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-center text-gradient">Published <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Articles</span></h1>
        <p className="text-white/70 text-center mb-8">Professional articles either authored or co‑authored by me.</p>

        {/* Filters */}
        <div className="glass-card p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          {/* Tag Filter */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <button
              className={`px-3 py-1 rounded-full border transition-colors duration-150 text-sm font-medium ${selectedTag === 'All' ? 'bg-primary text-black border-primary' : 'bg-primary/5 text-primary border-primary/30'}`}
              onClick={() => setSelectedTag('All')}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`px-3 py-1 rounded-full border transition-colors duration-150 text-sm font-medium ${selectedTag === tag ? 'bg-primary text-black border-primary' : 'bg-primary/5 text-primary border-primary/30'}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </div>
          {/* Date Sort */}
          <div className="flex items-center gap-2 justify-center md:justify-end">
            <label htmlFor="dateSort" className="text-sm text-dark-text-secondary">Sort by date:</label>
            <select
              id="dateSort"
              value={dateSort}
              onChange={e => setDateSort(e.target.value)}
              className="rounded border border-primary/30 px-2 py-1 text-sm bg-dark-card text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {filteredPosts.length === 0 ? (
            <div className="col-span-full text-center text-white/70 py-12">
              No articles found for this filter.
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article key={post.id + post.title} className={`${glassCardClass} flex flex-col`}>
                <div className="flex flex-col flex-grow">
                  <div className="mb-3 flex flex-wrap gap-2 items-center">
                    {post.tags && post.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium">
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold mb-3 flex-shrink-0 text-white">{post.title}</h2>
                  <p className="text-white/75 mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700">
                    <span className="text-white/70 text-sm">
                      {post.date} · {post.readTime}
                    </span>
                    <a 
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-600 transition-colors duration-200 flex items-center"
                    >
                      Read article
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog 
