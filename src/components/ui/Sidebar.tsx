// src/components/ui/Sidebar.tsx
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-[#f0f0f0] transition-all duration-300 ease-in-out z-50 ${
        isExpanded ? 'w-64' : 'w-12'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full">

        {/* Menu */}
        <nav className="flex-1 py-6">
          <ul className="space-y-2">

            {/* Mis Eventos */}
            <li>
              <a
                href="/mis-eventos"
                className="flex items-center gap-4 px-2 py-3 rounded-lg hover:bg-white transition-colors group"
              >
                <svg
                  className="w-6 h-6 text-gray-700 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span
                  className={`text-gray-700 font-medium whitespace-nowrap transition-opacity duration-300 ${
                    isExpanded ? 'opacity-100' : 'opacity-0 w-0'
                  }`}
                >
                  Mis Eventos
                </span>
              </a>
            </li>

            {/* Mis Tickets */}
            <li>
              <a
                href="/mis-tickets"
                className="flex items-center gap-4 px-2 py-3 rounded-lg hover:bg-white transition-colors group"
              >
                <svg
                  className="w-6 h-6 text-gray-700 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
                <span
                  className={`text-gray-700 font-medium whitespace-nowrap transition-opacity duration-300 ${
                    isExpanded ? 'opacity-100' : 'opacity-0 w-0'
                  }`}
                >
                  Mis Tickets
                </span>
              </a>
            </li>

            {/* Favoritos */}
            <li>
              <a
                href="/favoritos"
                className="flex items-center gap-4 px-2 py-3 rounded-lg hover:bg-white transition-colors group"
              >
                <svg
                  className="w-6 h-6 text-gray-700 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span
                  className={`text-gray-700 font-medium whitespace-nowrap transition-opacity duration-300 ${
                    isExpanded ? 'opacity-100' : 'opacity-0 w-0'
                  }`}
                >
                  Favoritos
                </span>
              </a>
            </li>

          </ul>
        </nav>

        {/* Cerrar Sesión */}
        {isLoggedIn && (
          <div className="border-t border-gray-300 p-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-white transition-colors text-left"
            >
              <svg
                className="w-6 h-6 text-red-600 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span
                className={`text-red-600 font-medium whitespace-nowrap transition-opacity duration-300 ${
                  isExpanded ? 'opacity-100' : 'opacity-0 w-0'
                }`}
              >
                Cerrar Sesión
              </span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
