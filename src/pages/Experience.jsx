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

  return (
    <div className="bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-12 text-center">Professional Experience</h1>
        
        {/* Work Experience Section with Timeline */}
        <div className="relative mb-16">
          {/* Main vertical line - now only covers the experience section */}
          <div className="absolute left-12 top-0 h-[calc(100%-2rem)] w-0.5 bg-blue-400 dark:bg-blue-500"></div>
          
          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative flex">
                {/* Timeline icon */}
                <div className="absolute left-12 -translate-x-1/2 w-12 h-12 rounded-full bg-blue-500 dark:bg-blue-400 border-4 border-white dark:border-dark-bg flex items-center justify-center z-10">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {getIconForRole(experience.role)}
                  </svg>
                </div>
                
                {/* Content card */}
                <div className="ml-24 bg-white dark:bg-[#1a1f2e] rounded-lg p-6 shadow-lg transition-colors duration-200 flex-grow">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{experience.role}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{experience.company} - {experience.location}</p>
                    <p className="text-gray-500 dark:text-gray-400">{experience.duration}</p>
                  </div>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc ml-4">
                    {experience.description.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  {experience.technologies && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {experience.technologies.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-sm">
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

        {/* Education Section - No Timeline */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="bg-white dark:bg-[#1a1f2e] rounded-lg p-6 shadow-lg transition-colors duration-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                <p className="text-gray-600 dark:text-gray-300">{edu.school} - {edu.location}</p>
                <p className="text-gray-500 dark:text-gray-400">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section - No Timeline */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Certifications & Achievements</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-white dark:bg-[#1a1f2e] rounded-lg p-6 shadow-lg transition-colors duration-200">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{cert.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Experience 