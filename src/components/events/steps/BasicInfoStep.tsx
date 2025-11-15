interface Props {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
}

export default function BasicInfoStep({ data, updateData, onNext }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Información del Evento</h2>

      <div>
        <label className="block text-sm font-medium mb-2">Título del evento *</label>
        <input
          type="text"
          value={data.titulo}
          onChange={(e) => updateData({ titulo: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Descripción *</label>
        <textarea
          value={data.descripcion}
          onChange={(e) => updateData({ descripcion: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg h-32"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Categoría *</label>
        <select
          value={data.categoria}
          onChange={(e) => updateData({ categoria: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        >
          <option value="">Selecciona una categoría</option>
          <option value="concierto">Concierto</option>
          <option value="conferencia">Conferencia</option>
          <option value="teatro">Teatro</option>
          <option value="deportes">Deportes</option>
          <option value="festival">Festival</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Etiquetas (separadas por coma)
        </label>
        <input
          type="text"
          value={data.etiquetas.join(', ')}
          onChange={(e) =>
            updateData({ etiquetas: e.target.value.split(',').map((t) => t.trim()) })
          }
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="música, rock, concierto"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Fecha del evento *</label>
          <input
            type="date"
            value={data.fecha}
            onChange={(e) => updateData({ fecha: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Hora *</label>
          <input
            type="time"
            value={data.hora}
            onChange={(e) => updateData({ hora: e.target.value + ':00' })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Restricción de edad *</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="restriccion"
              value="todo_publico"
              checked={data.restriccion_edad === 'todo_publico'}
              onChange={(e) => updateData({ restriccion_edad: e.target.value })}
              className="mr-2"
            />
            Apto para todo el público
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="restriccion"
              value="con_adulto"
              checked={data.restriccion_edad === 'con_adulto'}
              onChange={(e) => updateData({ restriccion_edad: e.target.value })}
              className="mr-2"
            />
            Menores con adulto responsable
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="restriccion"
              value="solo_mayores"
              checked={data.restriccion_edad === 'solo_mayores'}
              onChange={(e) => updateData({ restriccion_edad: e.target.value })}
              className="mr-2"
            />
            Solo mayores de 18 años
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
      >
        Continuar
      </button>
    </form>
  );
}