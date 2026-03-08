import { useState } from 'react'

const CALCULADORAS = [
  { id: 'imc',            label: 'IMC',                     descricao: 'Índice de Massa Corporal' },
  { id: 'rcq',            label: 'RCQ',                     descricao: 'Relação Cintura-Quadril' },
  { id: 'tc6m',           label: 'TC6M',                    descricao: 'Teste de Caminhada de 6 Minutos' },
  { id: 'testeDegrau',    label: 'Teste do Degrau',         descricao: 'Aptidão Cardiorrespiratória' },
  { id: 'manovacuometria',label: 'Manovacuometria',         descricao: 'Pressões Respiratórias Máximas' },
  { id: 'cargaTabagica',  label: 'Carga Tabágica',          descricao: 'Maços-Ano' },
]

function PlaceholderCalculadora({ label }) {
  return (
    <div className="flex items-center justify-center h-40 rounded-xl border-2 border-dashed border-gray-200">
      <p className="text-gray-400 text-sm">{label} — em breve</p>
    </div>
  )
}

export default function App() {
  const [ativa, setAtiva] = useState('imc')

  const atual = CALCULADORAS.find((c) => c.id === ativa)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 text-base">

      {/* ── Cabeçalho mobile ── */}
      <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
        <h1 className="text-lg font-bold text-blue-700 tracking-tight">Fisio Box</h1>
        <p className="text-xs text-gray-400">Calculadoras de Fisioterapia</p>
      </header>

      <div className="flex min-h-screen">

        {/* ── Sidebar desktop ── */}
        <aside className="hidden md:flex flex-col w-60 shrink-0 bg-white border-r border-gray-200 py-6 px-3 gap-1">
          <div className="px-3 mb-4">
            <h1 className="text-xl font-bold text-blue-700 tracking-tight">Fisio Box</h1>
            <p className="text-xs text-gray-400 mt-0.5">Calculadoras de Fisioterapia</p>
          </div>
          {CALCULADORAS.map((c) => (
            <button
              key={c.id}
              onClick={() => setAtiva(c.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                ativa === c.id
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="block font-medium">{c.label}</span>
              <span className={`block text-xs mt-0.5 ${ativa === c.id ? 'text-blue-500' : 'text-gray-400'}`}>
                {c.descricao}
              </span>
            </button>
          ))}
        </aside>

        {/* ── Conteúdo principal ── */}
        <main className="flex-1 flex flex-col min-w-0">

          {/* Tabs de navegação mobile */}
          <nav className="md:hidden overflow-x-auto bg-white border-b border-gray-200">
            <div className="flex gap-1 px-3 py-2 min-w-max">
              {CALCULADORAS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setAtiva(c.id)}
                  className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                    ativa === c.id
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Área do calculador */}
          <div className="flex-1 px-4 py-6 max-w-2xl w-full mx-auto">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">{atual.label}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{atual.descricao}</p>
            </div>
            <PlaceholderCalculadora label={atual.label} />
          </div>

        </main>
      </div>
    </div>
  )
}
