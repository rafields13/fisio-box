const BADGE_COLORS = {
  normal: 'bg-green-100 text-green-800',
  atencao: 'bg-yellow-100 text-yellow-800',
  risco: 'bg-red-100 text-red-800',
  neutro: 'bg-gray-100 text-gray-700',
}

function badgeTipo(classificacao) {
  if (!classificacao) return null
  const lower = classificacao.toLowerCase()
  if (lower.includes('normal') || lower.includes('baixo')) return 'normal'
  if (lower.includes('sobrepeso') || lower.includes('atenção') || lower.includes('atencao')) return 'atencao'
  if (
    lower.includes('risco') ||
    lower.includes('obesidade') ||
    lower.includes('magreza')
  )
    return 'risco'
  return 'neutro'
}

export default function ResultadoCard({ itens }) {
  if (!itens || itens.length === 0) return null

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col gap-4">
      <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide">Resultado</p>
      <div className="flex flex-col gap-3">
        {itens.map((item, i) => {
          const tipo = badgeTipo(item.classificacao)
          return (
            <div key={i} className="flex flex-col gap-0.5">
              <span className="text-xs text-gray-500">{item.label}</span>
              <span className="text-2xl font-bold text-gray-900">
                {item.valor}
                {item.unidade && (
                  <span className="text-base font-normal text-gray-500 ml-1">
                    {item.unidade}
                  </span>
                )}
              </span>
              {item.classificacao && tipo && (
                <span
                  className={`mt-1 inline-block self-start rounded-full px-3 py-0.5 text-sm font-medium ${BADGE_COLORS[tipo]}`}
                >
                  {item.classificacao}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
