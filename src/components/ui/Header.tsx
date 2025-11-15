import { useState, useEffect } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setIsLoggedIn(true);
      const userData = JSON.parse(user);
      setUserName(userData.nombre);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <a href="/" className="text-2xl font-bold text-blue-600">
            Ticky
          </a>
          <nav className="hidden md:flex gap-6">
            <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Explorar
            </a>
            <a href="/categorias" className="text-gray-600 hover:text-blue-600 transition-colors">
              Categorías
            </a>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <a
                href="/crear-evento"
                className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Crear Evento
              </a>
              
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block text-gray-700 font-medium">{userName}</span>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <a href="/perfil" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-t-lg">
                    Mi Perfil
                  </a>
                  <a href="/mis-eventos" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                    Mis Eventos
                  </a>
                  <a href="/mis-tickets" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                    Mis Tickets
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-50 rounded-b-lg"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <a
                href="/crear-evento"
                className="hidden md:flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Crear Evento
              </a>
              
              <a
                href="/login"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Iniciar Sesión
              </a>
              
              <a
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Registrarse
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
