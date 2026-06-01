import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import LightPillar from '../components/LightPillar';

function Home() {
  const glassCardClass = "group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(120,119,198,0.2)] h-full flex flex-col";
  const iconContainerClass = "inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-white/10 shadow-inner mb-6 group-hover:scale-110 transition-transform duration-500";

  const brandPillars = [
    {
      title: 'Wealth Management',
      body: 'RIA operations, planning support, portfolio workflows, client service, and the systems that make financial advice reliable.',
      color: 'text-blue-400',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    },
    {
      title: 'AI + Software Systems',
      body: 'Practical automation, agentic AI, React/Node tools, and clean interfaces that turn messy workflows into usable systems.',
      color: 'text-purple-400',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
    },
    {
      title: 'Cybersecurity-Aware Operations',
      body: 'Digital hygiene, permission boundaries, auditability, and security-first thinking for financial and personal technology.',
      color: 'text-pink-400',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#050014]">
      <Helmet>
        <title>Ethan Luxton · Wealth Management, AI Implementation, and Secure Systems</title>
        <meta
          name="description"
          content="Ethan Luxton is a wealth management professional and systems builder focused on RIA operations, AI implementation, cybersecurity, and practical financial technology."
        />
        <link rel="canonical" href="https://ethanluxton.com/" />
        <meta property="og:title" content="Ethan Luxton · Wealth Management, AI Implementation, and Secure Systems" />
        <meta
          property="og:description"
          content="A wealth management professional and systems builder focused on RIA operations, AI implementation, cybersecurity, and practical financial technology."
        />
        <meta property="og:url" content="https://ethanluxton.com/" />
      </Helmet>

      <LightPillar
        topColor="#5227FF"
        bottomColor="#FF9FFC"
        intensity={0.9}
        rotationSpeed={0.3}
        glowAmount={0.003}
        pillarWidth={3.0}
        pillarHeight={0.5}
        noiseIntensity={0.4}
        pillarRotation={1}
        interactive={false}
        mixBlendMode="normal"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <section className="relative z-10 flex-grow flex flex-col justify-center w-full">
        <main className="mx-auto max-w-7xl px-6 py-20 lg:py-32 flex flex-col items-center">
          <div className="text-center max-w-4xl mx-auto">
            <p className="mb-5 text-sm sm:text-base uppercase tracking-[0.35em] text-blue-200/80 font-semibold">
              Wealth Management · AI Implementation · Secure Systems
            </p>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-white mb-8 drop-shadow-sm">
              Ethan Luxton
            </h1>
            <p className="text-lg sm:text-2xl text-gray-200 font-light leading-relaxed max-w-3xl mx-auto mb-10">
              Wealth management professional and systems builder focused on financial operations, AI implementation, cybersecurity, and practical software tools.
              <br className="hidden sm:block" />
              I turn complex workflows into clear, secure, and useful systems.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full sm:w-auto">
              <Link to="/portfolio" className="relative inline-flex group items-center justify-center px-8 py-3.5 text-base font-semibold text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 overflow-hidden">
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                <span className="relative flex items-center">
                  View Projects
                  <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              <Link to="/about" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-gray-200 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm hover:scale-105">
                About Me
              </Link>

              <Link to="/articles" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-gray-200 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm hover:scale-105">
                Read Articles
              </Link>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {brandPillars.map((pillar) => (
              <div key={pillar.title} className={glassCardClass}>
                <div className={iconContainerClass}>
                  <svg className={`h-7 w-7 ${pillar.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {pillar.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                <p className="text-gray-400 leading-relaxed flex-grow">{pillar.body}</p>
              </div>
            ))}
          </div>
        </main>
      </section>
    </div>
  )
}

export default Home
