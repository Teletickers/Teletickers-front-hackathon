// src/components/categories/CategoriesPage.tsx
import ApolloWrapper from '../providers/ApolloWrapper';
import Sidebar from '../ui/Sidebar';
import Header from '../ui/Header';
import Footer from '../ui/Footer';

const CATEGORIES = [
  {
    name: 'Conciertos',
    slug: 'concierto',
    icon: '🎵',
    description: 'Disfruta de la mejor música en vivo',
    color: 'from-purple-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&h=400&fit=crop',
  },
  {
    name: 'Teatro',
    slug: 'teatro',
    icon: '🎭',
    description: 'Las mejores obras y presentaciones',
    color: 'from-red-500 to-orange-500',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=400&fit=crop',
  },
  {
    name: 'Deportes',
    slug: 'deportes',
    icon: '⚽',
    description: 'Partidos y eventos deportivos',
    color: 'from-green-500 to-teal-500',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop',
  },
  {
    name: 'Conferencias',
    slug: 'conferencia',
    icon: '💼',
    description: 'Aprende con expertos del sector',
    color: 'from-blue-500 to-indigo-500',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
  },
  {
    name: 'Festivales',
    slug: 'festival',
    icon: '🎪',
    description: 'Experiencias únicas y memorables',
    color: 'from-yellow-500 to-red-500',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop',
  },
  {
    name: 'Arte y Cultura',
    slug: 'otro',
    icon: '🎨',
    description: 'Exposiciones y eventos culturales',
    color: 'from-cyan-500 to-blue-500',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop',
  },
];

export default function CategoriesPage() {
  const handleCategoryClick = (slug: string) => {
    window.location.href = `/buscar?categoria=${slug}`;
  };

  return (
    <>
      <Sidebar />
      <div className="ml-12">
        <Header />
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Explora por Categorías</h1>
            <p className="text-gray-600 text-lg">
              Encuentra el evento perfecto para ti
            </p>
          </div>

          {/* Categorías Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {CATEGORIES.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryClick(category.slug)}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Imagen de fondo */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay degradado */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`}
                  ></div>

                  {/* Contenido */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <div className="text-5xl mb-3">{category.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>

                  {/* Badge de contador (opcional) */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {Math.floor(Math.random() * 50) + 10}+ eventos
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Sección adicional */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Usa nuestra búsqueda avanzada para encontrar eventos específicos por ubicación,
              precio y más filtros personalizados
            </p>
            <button
              onClick={() => (window.location.href = '/')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Ir a búsqueda avanzada
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}