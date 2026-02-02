import React, { useState, useEffect } from 'react';

const GitHubContributions = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = 'ethan-luxton';

  useEffect(() => {
    const CACHE_KEY = `github_contrib_cache_v3:${username}`;
    const ETAG_KEY = `github_contrib_etag_v3:${username}`;
    const ONE_DAY_MS = 24 * 60 * 60 * 1000;

    const readCache = () => {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return null;
        if (!Array.isArray(parsed.items)) return null;
        if (typeof parsed.cachedAt !== 'number') return null;
        return parsed;
      } catch {
        return null;
      }
    };

    const writeCache = (nextItems) => {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ cachedAt: Date.now(), items: nextItems }));
      } catch {
        // ignore
      }
    };

    const readEtag = () => {
      try {
        return localStorage.getItem(ETAG_KEY) || null;
      } catch {
        return null;
      }
    };

    const writeEtag = (etag) => {
      try {
        if (etag) localStorage.setItem(ETAG_KEY, etag);
      } catch {
        // ignore
      }
    };

    const normalizeEvents = (events) => {
      const normalized = [];
      for (const event of events) {
        const repo = event?.repo?.name || 'GitHub';
        const createdAt = event?.created_at;

        if (event?.type === 'PullRequestEvent') {
          const pr = event?.payload?.pull_request;
          if (!pr?.html_url) continue;
          normalized.push({
            id: event.id,
            kind: 'Pull Request',
            repo,
            title: pr.title || 'Pull request',
            number: pr.number,
            state: pr.merged ? 'merged' : pr.state || 'open',
            url: pr.html_url,
            created_at: createdAt,
            labels: Array.isArray(pr.labels) ? pr.labels : [],
          });
          continue;
        }

        if (event?.type === 'PushEvent') {
          const commit = event?.payload?.commits?.[0];
          const sha = commit?.sha;
          const message = commit?.message || 'Pushed commits';
          const url = sha ? `https://github.com/${repo}/commit/${sha}` : `https://github.com/${repo}/commits`;
          normalized.push({
            id: event.id,
            kind: 'Commit',
            repo,
            title: message.split('\n')[0],
            state: 'pushed',
            url,
            created_at: createdAt,
            sha,
            commitCount: Array.isArray(event?.payload?.commits) ? event.payload.commits.length : undefined,
          });
          continue;
        }

        if (event?.type === 'IssuesEvent') {
          const issue = event?.payload?.issue;
          if (!issue?.html_url) continue;
          normalized.push({
            id: event.id,
            kind: 'Issue',
            repo,
            title: issue.title || 'Issue activity',
            number: issue.number,
            state: event?.payload?.action || 'updated',
            url: issue.html_url,
            created_at: createdAt,
            labels: Array.isArray(issue.labels) ? issue.labels : [],
          });
          continue;
        }

        if (event?.type === 'ReleaseEvent') {
          const release = event?.payload?.release;
          if (!release?.html_url) continue;
          normalized.push({
            id: event.id,
            kind: 'Release',
            repo,
            title: release.name || release.tag_name || 'Release',
            tag: release.tag_name,
            state: 'published',
            url: release.html_url,
            created_at: createdAt,
          });
          continue;
        }
      }

      return normalized.slice(0, 6);
    };

    const fetchRecentActivity = async ({ useCacheOnly } = { useCacheOnly: false }) => {
      try {
        const cached = readCache();
        const isFresh = cached && Date.now() - cached.cachedAt < ONE_DAY_MS;

        if (cached?.items?.length) {
          setItems(cached.items);
        }

        if (useCacheOnly || isFresh) {
          setLoading(false);
          return;
        }

        const headers = {};
        const etag = readEtag();
        if (etag) headers['If-None-Match'] = etag;

        // Public activity feed (includes commits, PRs, issues, releases). Cached locally for 24h.
        const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, { headers });

        if (response.status === 304 && cached?.items) {
          setItems(cached.items);
          setLoading(false);
          return;
        }

        if (!response.ok) throw new Error('Failed to fetch GitHub activity');

        const nextEtag = response.headers.get('etag');
        if (nextEtag) writeEtag(nextEtag);

        const events = await response.json();
        const recent = normalizeEvents(Array.isArray(events) ? events : []);

        setItems(recent);
        writeCache(recent);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub pull requests:', error);
        setError('Failed to load contributions. Please try again later.');
        setLoading(false);
      }
    };

    fetchRecentActivity();
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

  if (items.length === 0) {
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
      <h2 className="text-3xl font-bold mb-8 text-center text-gradient">Recent GitHub Activity</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="glass-card group p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-white">
                <a 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  {item.repo.split('/').slice(-1)[0]}
                </a>
              </h3>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white/5 text-white/80 border border-white/10">
                  {item.kind}
                </span>
                {item.kind === 'Pull Request' ? (
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full border ${
                      item.state === 'open'
                        ? 'bg-green-500/10 text-green-600 border-green-500/30'
                        : item.state === 'merged'
                          ? 'bg-purple-500/10 text-purple-600 border-purple-500/30'
                          : 'bg-gray-500/10 text-gray-300 border-gray-500/30'
                    }`}
                  >
                    {item.state === 'open' ? 'Open' : item.state === 'merged' ? 'Merged' : 'Closed'}
                  </span>
                ) : null}
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              {item.kind === 'Pull Request' && item.number ? `#${item.number} — ${item.title}` : item.title}
            </p>
            {Array.isArray(item.labels) && item.labels.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {item.labels.slice(0, 4).map((label) => (
                  <span 
                    key={label.id || label.name}
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
            ) : null}
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>{new Date(item.created_at).toLocaleDateString()}</span>
              {item.kind === 'Commit' && item.commitCount > 1 ? <span>{item.commitCount} commits</span> : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default GitHubContributions; 
