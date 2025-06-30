import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

// Components
import DarkModeToggle from './components/DarkModeToggle'

// Page Components
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Experience from './pages/Experience'
import Blog from './pages/Blog'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
        <nav className="bg-white dark:bg-dark-card shadow-lg transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Logo/Name */}
              <div className="flex items-center">
                
              </div>

              {/* Desktop Navigation and Dark Mode Toggle */}
              <div className="hidden md:flex items-center space-x-8">
                <div className="flex items-center space-x-4">
                  <Link to="/" className="text-gray-600 dark:text-dark-text hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md transition-colors duration-200">
                    Home
                  </Link>
                  <Link to="/portfolio" className="text-gray-600 dark:text-dark-text hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md transition-colors duration-200">
                    Portfolio
                  </Link>
                  <Link to="/experience" className="text-gray-600 dark:text-dark-text hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md transition-colors duration-200">
                    Experience
                  </Link>
                  <Link to="/articles" className="text-gray-600 dark:text-dark-text hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md transition-colors duration-200">
                    Articles
                  </Link>
                </div>
                <DarkModeToggle />
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center space-x-4">
                <DarkModeToggle />
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-dark-text hover:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-card focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors duration-200"
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

          {/* Mobile Navigation */}
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
                <Link to="/" className="block px-3 py-2 rounded-md text-gray-600 dark:text-dark-text hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-card transition-colors duration-200">
                  Home
                </Link>
                <Link to="/portfolio" className="block px-3 py-2 rounded-md text-gray-600 dark:text-dark-text hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-card transition-colors duration-200">
                  Portfolio
                </Link>
                <Link to="/experience" className="block px-3 py-2 rounded-md text-gray-600 dark:text-dark-text hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-card transition-colors duration-200">
                  Experience
                </Link>
                <Link to="/articles" className="block px-3 py-2 rounded-md text-gray-600 dark:text-dark-text hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-card transition-colors duration-200">
                  Articles
                </Link>
              </div>
            </div>
          </Transition>
        </nav>

        {/* Main Content */}
        <main className="w-full min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/articles" element={<Blog />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
