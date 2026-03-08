import { useState } from 'react'

export default function FormulaRef({ linhas }) {
  const [aberta, setAberta] = useState(false)

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 overflow-hidden">
      <button
        type="button"
        onClick={() => setAberta((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <span>Fórmula de referência</span>
        <span className="text-gray-400">{aberta ? '▲' : '▼'}</span>
      </button>
      {aberta && (
        <div className="px-4 pb-4 pt-1 flex flex-col gap-1">
          {linhas.map((linha, i) => (
            <p key={i} className="font-mono text-sm text-gray-600 leading-relaxed">
              {linha}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
