import React from 'react'
import portfolioData from '../data/portfolio.json'
import GitHubContributions from '../components/GitHubContributions'

function Portfolio() {
  const { projects, skills } = portfolioData;

  return (
    <div className="bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text transition-colors duration-200">
      <div className="max-w-8xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Featured Projects</h1>
        <p className="text-gray-600 dark:text-dark-text-secondary text-center mb-12">
          A selection of my work and contributions
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-dark-card rounded-lg overflow-hidden shadow-lg transition-colors duration-200">
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                {project.team && (
                  <h4 className="text-md font-semibold mb-2">Team: {project.team}</h4>
                )}
                <p className="text-gray-600 dark:text-dark-text-secondary mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-primary-light/10 dark:bg-primary/10 text-primary dark:text-primary-light rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary dark:text-primary-light hover:underline"
                    >
                      Live Site →
                    </a>
                  )}
                  {project.github?.frontend && (
                    <a 
                      href={project.github.frontend} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary dark:text-primary-light hover:underline"
                    >
                      Frontend →
                    </a>
                  )}
                  {project.github?.backend && (
                    <a 
                      href={project.github.backend} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary dark:text-primary-light hover:underline"
                    >
                      Backend →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Contributions Section */}
        <GitHubContributions />

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Technical Skills</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {/* Programming Languages */}
            <div className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-lg transition-colors duration-200">
              <h3 className="text-xl font-semibold mb-4">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((lang, index) => (
                  <span key={index} className="px-3 py-1 bg-primary-light/10 dark:bg-primary/10 text-primary dark:text-primary-light rounded-full text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Development Tools */}
            <div className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-lg transition-colors duration-200">
              <h3 className="text-xl font-semibold mb-4">Development Tools</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tool, index) => (
                  <span key={index} className="px-3 py-1 bg-primary-light/10 dark:bg-primary/10 text-primary dark:text-primary-light rounded-full text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Professional Tools */}
            <div className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-lg transition-colors duration-200">
              <h3 className="text-xl font-semibold mb-4">Professional Tools</h3>
              <div className="flex flex-wrap gap-2">
                {skills.professional.map((tool, index) => (
                  <span key={index} className="px-3 py-1 bg-primary-light/10 dark:bg-primary/10 text-primary dark:text-primary-light rounded-full text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio 