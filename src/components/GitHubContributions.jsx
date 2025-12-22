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
        <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-primary/30 border-t-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Open Source Contributions</h2>
        <div className="text-center text-red-400">
          {error}
        </div>
      </div>
    );
  }

  if (pullRequests.length === 0) {
    return (
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Open Source Contributions</h2>
        <div className="text-center text-gray-400">
          No public contributions found. Check back later!
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-gradient">Recent Open Source Contributions</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pullRequests.map((pr) => (
          <article key={pr.id} className="glass-card group p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-white">
                <a 
                  href={pr.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  {pr.repository_name}
                </a>
              </h3>
              <div className="flex items-center">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  pr.state === 'open' 
                    ? 'bg-green-500/10 text-green-600 border border-green-500/30'
                    : 'bg-purple-500/10 text-purple-600 border border-purple-500/30'
                }`}>
                  {pr.state === 'open' ? 'Open' : 'Merged'}
                </span>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              #{pr.number} - {pr.title}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {pr.labels.map((label) => (
                <span 
                  key={label.id}
                  className="px-3 py-1 rounded-full text-sm border"
                  style={{
                    backgroundColor: `#${label.color}1a`,
                    color: `#${label.color}`,
                    borderColor: `#${label.color}4d`
                  }}
                >
                  {label.name}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Created: {new Date(pr.created_at).toLocaleDateString()}</span>
              
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default GitHubContributions; 
