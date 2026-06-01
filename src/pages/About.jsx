import React from 'react'
import { Helmet } from 'react-helmet-async'

const pillars = [
  {
    title: 'Wealth management and RIA operations',
    body: 'Client service, portfolio operations, planning support, trading workflows, advisor support, and the day-to-day systems that make financial advice dependable.',
  },
  {
    title: 'AI implementation and automation',
    body: 'Practical agentic AI, workflow automation, and internal tooling that reduce friction while preserving oversight, auditability, and human judgment.',
  },
  {
    title: 'Cybersecurity-aware systems',
    body: 'A security-first approach to financial technology, digital hygiene, permissions, operational controls, and resilient personal and professional systems.',
  },
]


function About() {
  return (
    <div className="w-full text-white/90 py-12 px-4">
      <Helmet>
        <title>About · Ethan Luxton</title>
        <meta
          name="description"
          content="About Ethan Luxton: wealth management professional and systems builder focused on RIA operations, AI implementation, cybersecurity, and practical financial technology."
        />
        <link rel="canonical" href="https://ethanluxton.com/about" />
        <meta property="og:title" content="About · Ethan Luxton" />
        <meta
          property="og:description"
          content="Wealth management professional and systems builder focused on RIA operations, AI implementation, cybersecurity, and practical financial technology."
        />
        <meta property="og:url" content="https://ethanluxton.com/about" />
      </Helmet>

      <main className="max-w-6xl mx-auto">
        <section className="glass-card p-8 md:p-10">
          <p className="text-primary uppercase tracking-[0.3em] text-sm font-semibold mb-4">About</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Wealth management professional. Systems builder. Practical technologist.
          </h1>
          <div className="space-y-5 text-white/75 text-lg leading-relaxed max-w-4xl">
            <p>
              I work at the intersection of wealth management, operations, and technology. My professional foundation is in client service, portfolio operations, financial planning support, and RIA workflows; my technical work focuses on AI implementation, automation, cybersecurity, and software tools that make complex processes more reliable.
            </p>
            <p>
              I am especially interested in the places where financial advice, investment operations, secure systems, and AI-enabled workflows overlap. The through-line is simple: turn complex workflows into clear, secure, and useful systems.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3 mt-8">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="glass-card p-6">
              <h2 className="text-xl font-bold text-white mb-3">{pillar.title}</h2>
              <p className="text-white/70 leading-relaxed">{pillar.body}</p>
            </article>
          ))}
        </section>

        <section className="glass-card p-8 mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">What I am building toward</h2>
          <p className="text-white/75 leading-relaxed mb-4">
            My long-term focus is on finance and technology roles where operational judgment matters: RIA operations, investment and trading workflows, fintech tooling, and AI systems that can be trusted in real business environments.
          </p>
          <p className="text-white/75 leading-relaxed">
            I care about tools that are not just impressive demos, but controlled systems: scoped permissions, clear logs, human review at the right moments, and interfaces that make better decisions easier.
          </p>
        </section>

        <section className="glass-card p-6 mt-8 text-sm text-white/60 leading-relaxed">
          Views expressed here are my own and are not investment, tax, legal, or cybersecurity advice. Personal projects and writing are independent unless explicitly stated otherwise.
        </section>
      </main>
    </div>
  )
}

export default About
