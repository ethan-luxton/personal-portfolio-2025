import React, { useState, useEffect } from 'react';

const GitHubContributions = () => {
  const [pullRequests, setPullRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = 'ethan-luxton';

  useEffect(() => {
    const fetchPullRequests = async () => {
      try {
        // Fetch pull requests created by the user in public repositories only
        const response = await fetch(
          `https://api.github.com/search/issues?q=author:${username}+type:pr+is:public+-user:${username}+is:public`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch pull requests');
        }

        const data = await response.json();
        
        // Get the most recent public PRs
        const recentPRs = data.items
          .filter(pr => !pr.repository_url.includes(`${username}/`)) // Extra filter for private repos
          .slice(0, 6) // Get top 6 PRs
          .map(pr => ({
            id: pr.id,
            title: pr.title,
            number: pr.number,
            state: pr.state,
            created_at: pr.created_at,
            html_url: pr.html_url,
            repository_url: pr.repository_url,
            repository_name: pr.repository_url.split('/').slice(-1)[0],
            labels: pr.labels
          }));

        setPullRequests(recentPRs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub pull requests:', error);
        setError('Failed to load contributions. Please try again later.');
        setLoading(false);
      }
    };

    fetchPullRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Open Source Contributions</h2>
        <div className="text-center text-red-600 dark:text-red-400">
          {error}
        </div>
      </div>
    );
  }

  if (pullRequests.length === 0) {
    return (
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Open Source Contributions</h2>
        <div className="text-center text-gray-600 dark:text-gray-400">
          No public contributions found. Check back later!
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Recent Open Source Contributions</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pullRequests.map((pr) => (
          <div key={pr.id} className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-lg transition-colors duration-200">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                <a 
                  href={pr.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary dark:hover:text-primary-light"
                >
                  {pr.repository_name}
                </a>
              </h3>
              <div className="flex items-center">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  pr.state === 'open' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                }`}>
                  {pr.state === 'open' ? 'Open' : 'Merged'}
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              #{pr.number} - {pr.title}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {pr.labels.map((label) => (
                <span 
                  key={label.id}
                  className="px-3 py-1 bg-primary-light/10 dark:bg-primary/10 text-primary dark:text-primary-light rounded-full text-sm"
                  style={{
                    backgroundColor: `#${label.color}20`,
                    color: `#${label.color}`
                  }}
                >
                  {label.name}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Created: {new Date(pr.created_at).toLocaleDateString()}</span>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHubContributions; 