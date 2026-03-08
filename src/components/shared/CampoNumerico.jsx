export default function CampoNumerico({
  label,
  name,
  value,
  onChange,
  erro,
  placeholder,
  unidade,
  min,
  max,
  step = 'any',
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {unidade && <span className="ml-1 text-gray-400 font-normal">({unidade})</span>}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`w-full rounded-lg border px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            erro ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
          }`}
        />
      </div>
      {erro && <p className="text-red-600 text-sm mt-0.5">{erro}</p>}
    </div>
  )
}
