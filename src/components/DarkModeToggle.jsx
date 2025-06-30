import React, { useEffect } from 'react'

function DarkModeToggle() {
  const [isDark, setIsDark] = React.useState(false)

  useEffect(() => {
    // Check for saved user preference, first in localStorage, then in system preferences
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else if (savedTheme != 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="rounded-lg transition-all duration-300"
      aria-label="Toggle Dark Mode"
    >
      <div className="relative w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-300">
        {/* Sliding Dot with Icon */}
        <div
          className={`absolute top-1 w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
            isDark ? 'translate-x-8 bg-dark-card' : 'translate-x-1 bg-primary-light'
          }`}
        >
          {/* Sun Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-3 w-3 text-white transition-opacity duration-300 absolute ${isDark ? 'opacity-0' : 'opacity-100'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
            />
          </svg>
          {/* Moon Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-3 w-3 text-white transition-opacity duration-300 absolute ${isDark ? 'opacity-100' : 'opacity-0'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </div>
      </div>
    </button>
  )
}

export default DarkModeToggle 