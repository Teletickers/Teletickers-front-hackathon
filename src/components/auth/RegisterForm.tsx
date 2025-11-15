// src/components/auth/RegisterForm.tsx
import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { REGISTER_MUTATION } from '../../lib/graphql/mutations';
import type { AuthPayload } from '../../types';

interface RegisterData {
  register: AuthPayload;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    dni: '',
    numero_cel: '',
  });
  const [error, setError] = useState('');
  const [register, { loading }] = useMutation<RegisterData>(REGISTER_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await register({ variables: formData });
      if (data) {
        localStorage.setItem('token', data.register.token);
        localStorage.setItem('user', JSON.stringify(data.register.user));
        window.location.href = '/';
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">Nombre completo</label>
        <input
          type="text"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">DNI</label>
        <input
          type="text"
          value={formData.dni}
          onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          maxLength={8}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Teléfono (opcional)</label>
        <input
          type="tel"
          value={formData.numero_cel}
          onChange={(e) => setFormData({ ...formData, numero_cel: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Contraseña</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Registrando...' : 'Registrarse'}
      </button>

      <p className="text-center text-sm">
        ¿Ya tienes cuenta?{' '}
        <a href="/login" className="text-blue-600 hover:underline">
          Inicia sesión
        </a>
      </p>
    </form>
  );
}