import React from 'react'
import portfolioData from '../data/portfolio.json'
import GitHubContributions from '../components/GitHubContributions'

function Portfolio() {
  const { projects, skills } = portfolioData;
  const glassCardClass = "glass-card group p-6";

  return (
    <div className="w-full text-white/90">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold mb-4 text-center text-gradient">Featured <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Projects</span></h1>
        <p className="text-white/70 text-center mb-12">A selection of my work and contributions</p>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.id} className={`${glassCardClass} flex flex-col`}>
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-semibold mb-2 text-white">{project.title}</h3>
                {project.team && (
                  <h4 className="text-sm font-medium mb-2 text-white/70">Team: {project.team}</h4>
                )}
                <p className="text-white/75 mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 mt-auto">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Live Site →
                    </a>
                  )}
                  {project.github?.frontend && (
                    <a href={project.github.frontend} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Frontend →
                    </a>
                  )}
                  {project.github?.backend && (
                    <a href={project.github.backend} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Backend →
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* GitHub Contributions Section */}
        <GitHubContributions />

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gradient">Technical Skills</h2>
          
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {/* Programming Languages */}
            <div className={glassCardClass}>
              <h3 className="text-xl font-semibold mb-4">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((lang, index) => (
                  <span key={index} className="px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Development Tools */}
            <div className={glassCardClass}>
              <h3 className="text-xl font-semibold mb-4">Development Tools</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tool, index) => (
                  <span key={index} className="px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Professional Tools */}
            <div className={glassCardClass}>
              <h3 className="text-xl font-semibold mb-4">Professional Tools</h3>
              <div className="flex flex-wrap gap-2">
                {skills.professional.map((tool, index) => (
                  <span key={index} className="px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm">
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
