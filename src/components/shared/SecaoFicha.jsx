export default function SecaoFicha({ titulo, children }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 pb-1 border-b border-gray-200">
        {titulo}
      </h3>
      {children}
    </div>
  )
}
