import React, { useState, useMemo } from 'react'
import blogData from '../data/blog.json'

function Blog() {
  const { posts } = blogData;

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
    <div className="bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text min-h-screen py-12 px-4 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Published Articles</h1>
        <p className="text-gray-600 dark:text-dark-text-secondary text-center mb-8">
          Professional articles either authored or co-authored by me.
        </p>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          {/* Tag Filter */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <button
              className={`px-3 py-1 rounded-full border transition-colors duration-150 text-sm font-medium ${selectedTag === 'All' ? 'bg-primary text-white border-primary' : 'bg-primary-light/10 dark:bg-primary/10 text-primary dark:text-primary-light border-primary'}`}
              onClick={() => setSelectedTag('All')}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`px-3 py-1 rounded-full border transition-colors duration-150 text-sm font-medium ${selectedTag === tag ? 'bg-primary text-white border-primary' : 'bg-primary-light/10 dark:bg-primary/10 text-primary dark:text-primary-light border-primary'}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </div>
          {/* Date Sort */}
          <div className="flex items-center gap-2 justify-center md:justify-end">
            <label htmlFor="dateSort" className="text-sm text-gray-600 dark:text-dark-text-secondary">Sort by date:</label>
            <select
              id="dateSort"
              value={dateSort}
              onChange={e => setDateSort(e.target.value)}
              className="rounded border border-gray-300 dark:border-gray-700 px-2 py-1 text-sm bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {filteredPosts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 dark:text-dark-text-secondary py-12">
              No articles found for this filter.
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id + post.title} className="bg-white dark:bg-dark-card rounded-lg overflow-hidden shadow-lg transition-colors duration-200 flex flex-col">
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-3 flex flex-wrap gap-2 items-center">
                    {post.tags && post.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full border border-primary bg-primary-light/10 dark:bg-primary/10 text-primary dark:text-primary-light text-xs font-medium">
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold mb-3 flex-shrink-0">{post.title}</h2>
                  <p className="text-gray-600 dark:text-dark-text-secondary mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-gray-500 dark:text-dark-text-secondary text-sm">
                      {post.date} · {post.readTime}
                    </span>
                    <a 
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary transition-colors duration-200 flex items-center"
                    >
                      Read article
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog 