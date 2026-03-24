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

const CALCULADORAS = [
  { id: 'imc',             label: 'IMC',              descricao: 'Índice de Massa Corporal',          componente: Imc },
  { id: 'rcq',             label: 'RCQ',              descricao: 'Relação Cintura-Quadril',           componente: Rcq },
  { id: 'tc6m',            label: 'TC6M',             descricao: 'Teste de Caminhada de 6 Minutos',  componente: Tc6m },
  { id: 'testeDegrau',     label: 'Teste do Degrau',  descricao: 'Aptidão Cardiorrespiratória',       componente: TesteDegrau },
  { id: 'manovacuometria', label: 'Manovacuometria',  descricao: 'Pressões Respiratórias Máximas',   componente: Manovacuometria },
  { id: 'cargaTabagica',   label: 'Carga Tabágica',   descricao: 'Maços-Ano',                        componente: CargaTabagica },
  { id: 'tanaka',          label: 'Tanaka',            descricao: 'Frequência Cardíaca de Treinamento', componente: Tanaka },
  { id: 'cirtometria',    label: 'Cirtometria',       descricao: 'Cirtometria Toraco-abdominal',        componente: Cirtometria },
  { id: 'brawner',        label: 'Brawner',           descricao: 'FC Máxima (Beta-bloqueadores)',       componente: Brawner },
]

export default function App() {
  const [ativa, setAtiva] = useState('imc')

  const isFicha = ativa === 'ficha'
  const isRelatorio = ativa === 'relatorio'
  const atual = (isFicha || isRelatorio) ? null : CALCULADORAS.find((c) => c.id === ativa)
  const Calculadora = atual ? atual.componente : null

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
          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col gap-1">
            <button
              onClick={() => setAtiva('ficha')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isFicha
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="block font-medium">Ficha de Evolução</span>
              <span className={`block text-xs mt-0.5 ${isFicha ? 'text-blue-500' : 'text-gray-400'}`}>
                Preencher e Imprimir
              </span>
            </button>
            <button
              onClick={() => setAtiva('relatorio')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isRelatorio
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="block font-medium">Relatório Diário</span>
              <span className={`block text-xs mt-0.5 ${isRelatorio ? 'text-blue-500' : 'text-gray-400'}`}>
                Relatório de Estágio
              </span>
            </button>
          </div>
        </aside>

        {/* ── Conteúdo principal ── */}
        <main className="flex-1 flex flex-col min-w-0">

          {/* Tabs mobile */}
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
              <button
                onClick={() => setAtiva('ficha')}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  isFicha
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Ficha
              </button>
              <button
                onClick={() => setAtiva('relatorio')}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  isRelatorio
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Relatório
              </button>
            </div>
          </nav>

          {/* Conteúdo ativo */}
          <div className={`flex-1 px-4 py-6 w-full mx-auto ${(isFicha || isRelatorio) ? 'max-w-3xl' : 'max-w-2xl'}`}>
            {isFicha ? (
              <>
                <div className="mb-6 no-print">
                  <h2 className="text-xl font-bold text-gray-800">Ficha de Evolução</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Preencher e Imprimir</p>
                </div>
                <FichaEvolucao />
              </>
            ) : isRelatorio ? (
              <>
                <div className="mb-6 no-print">
                  <h2 className="text-xl font-bold text-gray-800">Relatório Diário de Estágio</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Preencher e Imprimir</p>
                </div>
                <RelatorioDiario />
              </>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800">{atual.label}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{atual.descricao}</p>
                </div>
                <Calculadora key={ativa} />
              </>
            )}
          </div>

        </main>
      </div>
    </div>
  )
}
