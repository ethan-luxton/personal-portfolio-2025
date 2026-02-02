import React from 'react'
import experienceData from '../data/experience.json'

function Experience() {
  const { experiences, education, certifications } = experienceData;

  const getIconForRole = (role) => {
    switch (role) {
      case "Wealth Management Associate":
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        );
      case "Business Owner":
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        );
      case "Universal Banker":
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        );
      case "Education and Public Outreach Intern":
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        );
      default:
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        );
    }
  };

  // Common Glass Card Styles
  const glassCardClass = "glass-card group p-6";

  return (
    <div className="w-full text-white/90">
      <div className="max-w-5xl mx-auto px-4 py-12">
        
        {/* Section Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-16 text-center tracking-tight">
          Professional <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Experience</span>
        </h1>
        
        {/* Work Experience Section with Timeline */}
        <div className="relative mb-24">
          {/* Vertical Timeline Line with Gradient */}
          <div className="absolute left-4 md:left-12 top-2 h-full w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent"></div>
          
          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((experience) => (
              <div key={experience.id} className="relative flex flex-col md:flex-row md:items-start">
                
                {/* Timeline Icon */}
                <div className="absolute left-4 md:left-12 -translate-x-1/2 flex-shrink-0 mt-1">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(120,119,198,0.3)] z-10">
                    <svg className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {getIconForRole(experience.role)}
                    </svg>
                  </div>
                </div>
                
                {/* Content Card */}
                <div className={`ml-12 md:ml-24 flex-grow ${glassCardClass}`}>
                  {/* Role & Company Header */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                        {experience.role}
                      </h3>
                      {experience.role2 && (
                        <h4 className="text-md font-semibold text-white tracking-tight">
                          {experience.role2}
                        </h4>
                      )}
                      {experience.role3 && (
                        <h5 className="text-sm font-semibold text-white/90 tracking-tight">
                          {experience.role3}
                        </h5>
                      )}
                      <p className="text-white/80 font-medium">{experience.company} • {experience.location}</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80 whitespace-nowrap w-fit">
                      {experience.duration}
                    </div>
                  </div>

                  {/* Description List */}
                  <ul className="space-y-3 text-white/85 leading-relaxed list-none mb-6">
                    {experience.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0"></span>
                        <span className="text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies Pills */}
                  {experience.technologies && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                      {experience.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 transition-all hover:border-white/30 cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold mb-10 text-center tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Education</span>
          </h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className={`${glassCardClass} flex flex-col md:flex-row md:justify-between md:items-center gap-4`}>
                <div>
                  <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                  <p className="text-white/80 mt-1">{edu.school} • {edu.location}</p>
                </div>
                <div className="text-white/70 font-medium text-sm bg-black/20 px-4 py-2 rounded-full border border-white/10">
                  {edu.year}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mt-24 mb-12">
          <h2 className="text-3xl font-bold mb-10 text-center tracking-tight">
            Certifications & <span className="text-purple-400">Achievements</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <div key={cert.id} className={`${glassCardClass} flex flex-col justify-between min-h-[140px]`}>
                <h3 className="text-lg font-semibold text-white leading-snug">{cert.title}</h3>
                <div className="mt-4 flex items-center gap-2 text-sm text-white/70">
                  <div className="w-2 h-2 rounded-full bg-white/60"></div>
                  {cert.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Experience
