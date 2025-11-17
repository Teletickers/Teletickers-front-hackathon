// src/components/ui/Sidebar.tsx
'use client';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggleTheme = (theme: 'light' | 'dark') => {
    const isDark = theme === 'dark';
    setIsDarkMode(isDark);
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', isDark);
    setShowThemeMenu(false);
  };

  return (
    <div
      className={`fixed left-4 top-20 h-auto max-h-[calc(100vh-2rem)] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-600 transition-all duration-300 ease-in-out z-50 flex flex-col ${
        isExpanded ? 'w-56' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        setIsExpanded(false);
        setShowThemeMenu(false);
      }}
    >
      <nav className="py-4 px-2 flex-1">
        <ul className="space-y-1">

          {/* Mis Eventos */}
          <li>
            <a
              href="/mis-eventos"
              className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              <svg
                className="w-6 h-6 text-gray-600 dark:text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span className={`text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
                Mis Eventos
              </span>
            </a>
          </li>

          {/* Mis Tickets */}
          <li>
            <a
              href="/mis-tickets"
              className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              <svg
                className="w-6 h-6 text-gray-600 dark:text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
              </svg>
              <span className={`text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
                Mis Tickets
              </span>
            </a>
          </li>

          {/* Favoritos */}
          <li>
            <a
              href="/favoritos"
              className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              <svg
                className="w-6 h-6 text-gray-600 dark:text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span className={`text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
                Favoritos
              </span>
            </a>
          </li>

        </ul>
      </nav>

      {/* Configuración */}
      <div className="border-t border-gray-200 dark:border-gray-600 p-2 mt-24">
        <div className="relative">
          <button
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className="w-full flex items-center gap-4 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
          >
            <svg
              className="w-6 h-6 text-gray-600 dark:text-gray-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span className={`text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
              Configuración
            </span>
          </button>

          {showThemeMenu && isExpanded && (
            <div className="absolute bottom-full left-2 mb-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <button
                onClick={() => toggleTheme('light')}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  !isDarkMode ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
              >
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Modo Claro</span>
              </button>

              <button
                onClick={() => toggleTheme('dark')}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  isDarkMode ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
              >
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Modo Oscuro</span>
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
