import React from 'react'
import { Link } from 'react-router-dom'
import LightPillar from '../components/LightPillar';


function Home() {
  const glassCardClass = "group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(120,119,198,0.2)] h-full flex flex-col";
  
  // Icon container style
  const iconContainerClass = "inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-white/10 shadow-inner mb-6 group-hover:scale-110 transition-transform duration-500";

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#050014]">
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

      {/* Content Layer */}
      <section className="relative z-10 flex-grow flex flex-col justify-center w-full">
        <main className="mx-auto max-w-7xl px-6 py-20 lg:py-32 flex flex-col items-center">
          
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-grey mb-8 drop-shadow-sm">
              Ethan Luxton
            </h1>
            
            <p className="text-lg sm:text-2xl text-gray font-light leading-relaxed max-w-2xl mx-auto mb-10">
              Wealth management professional bridging{" "}
              <span className="text-gray font-medium">AI consulting and implementation</span>,{" "}
              <span className="text-gray font-medium">software engineering</span>, and{" "}
              <span className="text-gray-200 font-medium">cybersecurity</span>.
              <br className="hidden sm:block" />
              
              Translating complex problems into clear, effective solutions.
            </p>


            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full sm:w-auto">
              
              <Link to="/portfolio" className="relative inline-flex group items-center justify-center px-8 py-3.5 text-base font-semibold text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 overflow-hidden">
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                <span className="relative flex items-center">
                  View My Work
                  <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              <Link to="/articles" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-gray-200 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm hover:scale-105">
                Read Articles
              </Link>
            </div>
          </div>

          {/* 3-Column Grid (Services/Skills) */}
          <div className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
            
            {/* Card 1: Wealth Management */}
            <div className={glassCardClass}>
              <div className={iconContainerClass}>
                <svg className="h-7 w-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Wealth Management</h3>
              <p className="text-gray-400 leading-relaxed flex-grow">Portfolio construction, holistic financial planning, and high-touch client service strategies.</p>
            </div>

            {/* Card 2: Software Engineering */}
            <div className={glassCardClass}>
              <div className={iconContainerClass}>
                <svg className="h-7 w-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Software Engineering</h3>
              <p className="text-gray-400 leading-relaxed flex-grow">Full‑stack development with a focus on clean React architecture and scalable Node.js backends.</p>
            </div>

            {/* Card 3: Cybersecurity */}
            <div className={glassCardClass}>
              <div className={iconContainerClass}>
                <svg className="h-7 w-7 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Cybersecurity</h3>
              <p className="text-gray-400 leading-relaxed flex-grow">Implementing security-first mindsets, protecting data, and building resilient systems.</p>
            </div>

          </div>
        </main>
      </section>
    </div>
  )
}

export default Home
