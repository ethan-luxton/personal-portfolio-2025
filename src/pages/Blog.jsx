import React from 'react'
import blogData from '../data/blog.json'

function Blog() {
  const { posts } = blogData;

  return (
    <div className="bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text min-h-screen py-12 px-4 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Published Articles</h1>
        <p className="text-gray-600 dark:text-dark-text-secondary text-center mb-12">
          Professional articles on cybersecurity, finance, and technology.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-dark-card rounded-lg overflow-hidden shadow-lg transition-colors duration-200 flex flex-col">
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-3">
                  <span className="px-3 py-1 bg-primary-light/10 dark:bg-primary/10 text-primary dark:text-primary-light rounded-full text-sm">
                    {post.category}
                  </span>
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
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog 