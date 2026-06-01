import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

// Page Components
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Blog from './pages/Blog'
import Article from './pages/Article'

function AppShell() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const showDarkVeil =
    location.pathname === '/portfolio' || location.pathname === '/about' || location.pathname.startsWith('/articles')

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/articles', label: 'Articles' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-dark-text transition-colors duration-200">
        <nav className="sticky top-0 z-20 glass backdrop-saturate-150">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-lg sm:text-xl font-semibold tracking-tight">
                  <span className="text-white">Ethan&nbsp;Luxton</span>
                </Link>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <div className="flex items-center space-x-4">
                  {navLinks.map((link) => (
                    <Link key={link.to} to={link.to} className="text-dark-text hover:text-white px-3 py-2 rounded-md transition-colors duration-200">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="md:hidden flex items-center space-x-4">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-dark-text hover:text-white hover:bg-dark-card focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors duration-200"
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? (
                    <XIcon className="block h-6 w-6" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to} onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-dark-text hover:text-white hover:bg-dark-card transition-colors duration-200">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </Transition>
        </nav>

      <main className={`w-full flex-1 transition-colors duration-200 ${showDarkVeil ? '' : 'bg-dark-bg/80'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/articles" element={<Blog />} />
            <Route path="/articles/:slug" element={<Article />} />
            <Route
              path="*"
              element={
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[60vh] flex flex-col items-center justify-center text-center">
                  <h1 className="text-6xl font-extrabold text-gradient">404</h1>
                  <p className="mt-4 text-dark-text-secondary">Page not found</p>
                  <Link
                    to="/"
                    className="mt-6 inline-flex items-center px-6 py-3 rounded-md bg-primary text-white hover:bg-primary-600 transition-colors"
                  >
                    Go Home
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>
        <footer className="border-t border-white/10 bg-dark-bg/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-4 sm:flex-row items-center justify-between text-sm text-dark-text-secondary">
            <div>
              © {new Date().getFullYear()} Ethan Luxton. All rights reserved.
            </div>
            <div className="text-center sm:text-left max-w-xl text-xs text-white/50">
              Views are my own and are not investment, tax, legal, or cybersecurity advice.
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/ethan-luxton" target="_blank" rel="noreferrer" className="hover:text-primary">GitHub</a>
              <a href="https://linkedin.com/in/ethan-luxton" target="_blank" rel="noreferrer" className="hover:text-primary">LinkedIn</a>
            </div>
          </div>
        </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  )
}

export default App
