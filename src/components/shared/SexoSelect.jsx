export default function SexoSelect({ value, onChange, erro }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="sexo" className="text-sm font-medium text-gray-700">
        Sexo
      </label>
      <select
        id="sexo"
        name="sexo"
        value={value}
        onChange={(e) => onChange('sexo', e.target.value)}
        className={`w-full rounded-lg border px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white ${
          erro ? 'border-red-400 bg-red-50' : 'border-gray-300'
        }`}
      >
        <option value="">Selecione o sexo</option>
        <option value="masculino">Masculino</option>
        <option value="feminino">Feminino</option>
      </select>
      {erro && <p className="text-red-600 text-sm mt-0.5">{erro}</p>}
    </div>
  )
}
