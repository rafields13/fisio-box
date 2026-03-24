export default function CampoTexto({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  erro,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full rounded-lg border px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-y ${
          erro ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
        }`}
      />
      {erro && <p className="text-red-600 text-sm mt-0.5">{erro}</p>}
    </div>
  )
}
