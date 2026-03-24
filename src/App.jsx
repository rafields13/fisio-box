import { useState } from 'react'
import Imc from './components/calculators/Imc'
import Rcq from './components/calculators/Rcq'
import Tc6m from './components/calculators/Tc6m'
import TesteDegrau from './components/calculators/TesteDegrau'
import Manovacuometria from './components/calculators/Manovacuometria'
import CargaTabagica from './components/calculators/CargaTabagica'
import Tanaka from './components/calculators/Tanaka'
import Cirtometria from './components/calculators/Cirtometria'
import Brawner from './components/calculators/Brawner'
import FichaEvolucao from './components/FichaEvolucao'
import RelatorioDiario from './components/RelatorioDiario'

function ModuloIcon({ id, className = 'w-3.5 h-3.5' }) {
  if (id === 'cardio') return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 13.5 C8 13.5 2 9.5 2 6 A3 3 0 0 1 8 4.5 A3 3 0 0 1 14 6 C14 9.5 8 13.5 8 13.5Z" />
      <path d="M3.5 6.5 L5 6.5 L6 4.5 L7.5 8.5 L9 5.5 L10 7 L10.5 6.5 L12.5 6.5" />
    </svg>
  )
  if (id === 'avaliacao') return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="4.5" r="2" />
      <path d="M4 14 C4 10.5 5.8 9 8 9 C10.2 9 12 10.5 12 14" />
    </svg>
  )
  if (id === 'documentos') return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="1.5" width="10" height="13" rx="1.5" />
      <path d="M5.5 5.5 H10.5" />
      <path d="M5.5 8 H10.5" />
      <path d="M5.5 10.5 H8.5" />
    </svg>
  )
  return null
}

const MODULOS = [
  {
    id: 'cardio',
    label: 'Cardiorrespiratória',
    labelCurto: 'Cardio',
    itens: [
      { id: 'tc6m',            label: 'TC6M',            descricao: 'Teste de Caminhada de 6 Minutos',     componente: Tc6m },
      { id: 'testeDegrau',     label: 'Teste do Degrau', descricao: 'Aptidão Cardiorrespiratória',          componente: TesteDegrau },
      { id: 'manovacuometria', label: 'Manovacuometria', descricao: 'Pressões Respiratórias Máximas',      componente: Manovacuometria },
      { id: 'cirtometria',     label: 'Cirtometria',     descricao: 'Cirtometria Toraco-abdominal',        componente: Cirtometria },
      { id: 'cargaTabagica',   label: 'Carga Tabágica',  descricao: 'Maços-Ano',                          componente: CargaTabagica },
      { id: 'tanaka',          label: 'Tanaka',           descricao: 'Frequência Cardíaca de Treinamento', componente: Tanaka },
      { id: 'brawner',         label: 'Brawner',          descricao: 'FC Máxima (Beta-bloqueadores)',      componente: Brawner },
    ],
  },
  {
    id: 'avaliacao',
    label: 'Avaliação Geral',
    labelCurto: 'Avaliação',
    itens: [
      { id: 'imc', label: 'IMC', descricao: 'Índice de Massa Corporal', componente: Imc },
      { id: 'rcq', label: 'RCQ', descricao: 'Relação Cintura-Quadril',  componente: Rcq },
    ],
  },
  {
    id: 'documentos',
    label: 'Documentos',
    labelCurto: 'Docs',
    itens: [
      { id: 'ficha',     label: 'Ficha de Evolução', descricao: 'Preencher e Imprimir',  componente: FichaEvolucao },
      { id: 'relatorio', label: 'Relatório Diário',  descricao: 'Relatório de Estágio',  componente: RelatorioDiario },
    ],
  },
]

export default function App() {
  const [moduloId, setModuloId] = useState('cardio')
  const [itemPorModulo, setItemPorModulo] = useState({
    cardio:     'tc6m',
    avaliacao:  'imc',
    documentos: 'ficha',
  })

  const moduloAtivo = MODULOS.find(m => m.id === moduloId)
  const itemAtivoId = itemPorModulo[moduloId]
  const itemAtivo   = moduloAtivo.itens.find(i => i.id === itemAtivoId)
  const Componente  = itemAtivo.componente
  const isLargo     = moduloAtivo.id === 'documentos'

  function selecionarModulo(id) {
    setModuloId(id)
  }

  function selecionarItem(itemId) {
    setItemPorModulo(prev => ({ ...prev, [moduloId]: itemId }))
  }

  function selecionarItemDesktop(mId, iId) {
    setModuloId(mId)
    setItemPorModulo(prev => ({ ...prev, [mId]: iId }))
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 text-base">

      {/* ── Cabeçalho mobile ── */}
      <header className="md:hidden sticky top-0 z-10 bg-white border-b border-gray-200">

        {/* Linha 1: logo + seletor de módulo */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
          <div className="flex-1 min-w-0">
            <span className="text-base font-bold text-blue-700 tracking-tight">Fisio Box</span>
          </div>
          <div className="flex gap-1">
            {MODULOS.map(m => (
              <button
                key={m.id}
                onClick={() => selecionarModulo(m.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  moduloId === m.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <ModuloIcon id={m.id} />
                {m.labelCurto}
              </button>
            ))}
          </div>
        </div>

        {/* Linha 2: itens do módulo ativo */}
        <nav className="overflow-x-auto">
          <div className="flex gap-1 px-3 py-2 min-w-max">
            {moduloAtivo.itens.map(item => (
              <button
                key={item.id}
                onClick={() => selecionarItem(item.id)}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  itemAtivoId === item.id
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>

      </header>

      <div className="flex min-h-screen">

        {/* ── Sidebar desktop ── */}
        <aside className="hidden md:flex flex-col w-60 shrink-0 bg-white border-r border-gray-200 py-6 px-3 gap-1 overflow-y-auto">
          <div className="px-3 mb-4">
            <h1 className="text-xl font-bold text-blue-700 tracking-tight">Fisio Box</h1>
            <p className="text-xs text-gray-400 mt-0.5">Calculadoras de Fisioterapia</p>
          </div>

          {MODULOS.map((modulo, moduloIdx) => (
            <div key={modulo.id} className={moduloIdx > 0 ? 'mt-3 pt-3 border-t border-gray-100' : ''}>
              <div className="flex items-center gap-1.5 px-3 mb-1">
                <ModuloIcon id={modulo.id} className="w-3 h-3 text-gray-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {modulo.label}
                </span>
              </div>
              {modulo.itens.map(item => {
                const isAtivo = moduloId === modulo.id && itemAtivoId === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => selecionarItemDesktop(modulo.id, item.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isAtivo
                        ? 'bg-blue-100 text-blue-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="block font-medium">{item.label}</span>
                    <span className={`block text-xs mt-0.5 ${isAtivo ? 'text-blue-500' : 'text-gray-400'}`}>
                      {item.descricao}
                    </span>
                  </button>
                )
              })}
            </div>
          ))}
        </aside>

        {/* ── Conteúdo principal ── */}
        <main className="flex-1 flex flex-col min-w-0">
          <div className={`flex-1 px-4 py-6 w-full mx-auto ${isLargo ? 'max-w-3xl' : 'max-w-2xl'}`}>
            <div className={`mb-6 ${isLargo ? 'no-print' : ''}`}>
              <h2 className="text-xl font-bold text-gray-800">{itemAtivo.label}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{itemAtivo.descricao}</p>
            </div>
            <Componente key={itemAtivo.id} />
          </div>
        </main>

      </div>
    </div>
  )
}
