import { useState } from 'react'
import CampoTexto from './shared/CampoTexto'
import SecaoFicha from './shared/SecaoFicha'
import BotaoVoz from './shared/BotaoVoz'

const STORAGE_KEY = 'fisio-box-relatorio'

function estadoInicial() {
  return {
    data: new Date().toLocaleDateString('pt-BR'),
    estagiario: '',
    supervisor: '',
    local: '',
    atividades: [{ id: Date.now(), atividade: '', descricao: '' }],
    aprendizados: '',
    dificuldades: '',
    observacoes: '',
  }
}

export default function RelatorioDiario() {
  const [campos, setCampos] = useState(() => {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY)
      if (salvo) {
        const parsed = JSON.parse(salvo)
        return { ...estadoInicial(), ...parsed }
      }
    } catch {}
    return estadoInicial()
  })

  const [rascunhoSalvo, setRascunhoSalvo] = useState(false)

  function handleChange(name, value) {
    setCampos((prev) => ({ ...prev, [name]: value }))
    setRascunhoSalvo(false)
  }

  function handleSalvar() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(campos))
    setRascunhoSalvo(true)
  }

  function handleLimpar() {
    setCampos(estadoInicial())
    setRascunhoSalvo(false)
  }

  function handleImprimir() {
    window.print()
  }

  function handleAddAtividade() {
    setCampos((prev) => ({
      ...prev,
      atividades: [...prev.atividades, { id: Date.now(), atividade: '', descricao: '' }],
    }))
    setRascunhoSalvo(false)
  }

  function handleRemoveAtividade(id) {
    setCampos((prev) => ({
      ...prev,
      atividades: prev.atividades.filter((a) => a.id !== id),
    }))
    setRascunhoSalvo(false)
  }

  function handleChangeAtividade(id, field, value) {
    setCampos((prev) => ({
      ...prev,
      atividades: prev.atividades.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
    }))
    setRascunhoSalvo(false)
  }

  function appendVoz(field) {
    return (texto) =>
      setCampos((prev) => ({
        ...prev,
        [field]: prev[field] + (prev[field] ? ' ' : '') + texto,
      }))
  }

  function appendVozAtividade(id, field) {
    return (texto) =>
      setCampos((prev) => ({
        ...prev,
        atividades: prev.atividades.map((a) =>
          a.id === id ? { ...a, [field]: a[field] + (a[field] ? ' ' : '') + texto } : a
        ),
      }))
  }

  return (
    <div className="relatorio-diario-container space-y-6">

      {/* Cabeçalho impresso */}
      <div className="hidden print:block text-center mb-4">
        <h1 className="text-lg font-bold uppercase tracking-wide">Relatório Diário de Estágio — Fisioterapia</h1>
        <p className="text-xs text-gray-500 mt-0.5">Fisio Box</p>
      </div>

      <SecaoFicha titulo="Identificação">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CampoTexto
            label="Data"
            name="data"
            value={campos.data}
            onChange={handleChange}
            placeholder={new Date().toLocaleDateString('pt-BR')}
            rows={1}
          />
          <CampoTexto
            label="Local / Setor"
            name="local"
            value={campos.local}
            onChange={handleChange}
            placeholder="Ex: UTI Adulto"
            rows={1}
          />
          <CampoTexto
            label="Estagiário(a)"
            name="estagiario"
            value={campos.estagiario}
            onChange={handleChange}
            placeholder="Nome completo"
            rows={1}
          />
          <CampoTexto
            label="Supervisor(a)"
            name="supervisor"
            value={campos.supervisor}
            onChange={handleChange}
            placeholder="Nome do supervisor"
            rows={1}
          />
        </div>
      </SecaoFicha>

      <SecaoFicha titulo="Atividades do Dia">
        <div className="space-y-4">
          {campos.atividades.map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    {index + 1}. Paciente / Atividade
                  </label>
                  <div className="flex items-center gap-1">
                    <BotaoVoz onTranscript={appendVozAtividade(item.id, 'atividade')} />
                    {campos.atividades.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAtividade(item.id)}
                        className="no-print text-gray-400 hover:text-red-500 transition-colors text-lg leading-none px-1"
                        title="Remover"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
                <textarea
                  value={item.atividade}
                  onChange={(e) => handleChangeAtividade(item.id, 'atividade', e.target.value)}
                  placeholder="Nome do paciente ou atividade"
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-y"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">Conduta / Descrição</label>
                  <BotaoVoz onTranscript={appendVozAtividade(item.id, 'descricao')} />
                </div>
                <textarea
                  value={item.descricao}
                  onChange={(e) => handleChangeAtividade(item.id, 'descricao', e.target.value)}
                  placeholder="Técnicas, exercícios, observações..."
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-y"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAtividade}
            className="no-print flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <span className="text-lg leading-none">+</span> Adicionar atividade
          </button>
        </div>
      </SecaoFicha>

      <SecaoFicha titulo="Aprendizados do Dia">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">
              O que aprendeu nesta sessão
            </label>
            <BotaoVoz onTranscript={appendVoz('aprendizados')} />
          </div>
          <CampoTexto
            name="aprendizados"
            value={campos.aprendizados}
            onChange={handleChange}
            placeholder="Conhecimentos, técnicas ou situações novas..."
            rows={4}
          />
        </div>
      </SecaoFicha>

      <SecaoFicha titulo="Dificuldades Encontradas">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">
              Desafios e pontos a desenvolver
            </label>
            <BotaoVoz onTranscript={appendVoz('dificuldades')} />
          </div>
          <CampoTexto
            name="dificuldades"
            value={campos.dificuldades}
            onChange={handleChange}
            placeholder="Situações difíceis, dúvidas, limitações..."
            rows={4}
          />
        </div>
      </SecaoFicha>

      <SecaoFicha titulo="Observações">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Notas extras</label>
            <BotaoVoz onTranscript={appendVoz('observacoes')} />
          </div>
          <CampoTexto
            name="observacoes"
            value={campos.observacoes}
            onChange={handleChange}
            placeholder="Informações adicionais relevantes..."
            rows={3}
          />
        </div>
      </SecaoFicha>

      <SecaoFicha titulo="Assinaturas">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-2">
          <div>
            <p className="text-sm text-gray-600 mb-1">{campos.estagiario || 'Estagiário(a)'}</p>
            <div className="print-assinatura mt-8 pt-2 border-t border-gray-400 w-full">
              <p className="text-xs text-gray-500">Assinatura do(a) Estagiário(a)</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">{campos.supervisor || 'Supervisor(a)'}</p>
            <div className="print-assinatura mt-8 pt-2 border-t border-gray-400 w-full">
              <p className="text-xs text-gray-500">Assinatura do(a) Supervisor(a)</p>
            </div>
          </div>
        </div>
      </SecaoFicha>

      {/* Botões — ocultos na impressão */}
      <div className="no-print flex flex-wrap gap-3 pt-2">
        <button
          onClick={handleImprimir}
          className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Imprimir
        </button>
        <button
          onClick={handleSalvar}
          className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          {rascunhoSalvo ? 'Rascunho salvo ✓' : 'Salvar rascunho'}
        </button>
        <button
          onClick={handleLimpar}
          className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          Limpar
        </button>
      </div>

    </div>
  )
}
