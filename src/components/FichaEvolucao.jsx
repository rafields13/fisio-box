import { useState, useEffect } from 'react'
import CampoTexto from './shared/CampoTexto'
import CampoNumerico from './shared/CampoNumerico'
import SecaoFicha from './shared/SecaoFicha'

const STORAGE_KEY = 'fisio-box-ficha'

const ESTADO_INICIAL = {
  // Identificação
  nomePaciente: '',
  data: '',
  sessao: '',
  diagnostico: '',
  // Sinais vitais
  paSistolica: '',
  paDiastolica: '',
  fc: '',
  spo2: '',
  fr: '',
  temperatura: '',
  // SOAP
  subjetivo: '',
  objetivo: '',
  avaliacao: '',
  plano: '',
  observacoes: '',
  // Terapeuta
  nomeTerapeuta: '',
  crefito: '',
}

export default function FichaEvolucao() {
  const [campos, setCampos] = useState(() => {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY)
      return salvo ? { ...ESTADO_INICIAL, ...JSON.parse(salvo) } : ESTADO_INICIAL
    } catch {
      return ESTADO_INICIAL
    }
  })

  const [rascunhoSalvo, setRascunhoSalvo] = useState(false)

  function handleChange(name, value) {
    setCampos((prev) => ({ ...prev, [name]: value }))
    setRascunhoSalvo(false)
  }

  function handleLimpar() {
    setCampos(ESTADO_INICIAL)
    setRascunhoSalvo(false)
  }

  function handleSalvar() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(campos))
    setRascunhoSalvo(true)
  }

  function handleImprimir() {
    window.print()
  }

  const dataHoje = new Date().toLocaleDateString('pt-BR')

  return (
    <div className="ficha-evolucao-container space-y-6">

      {/* Cabeçalho impresso */}
      <div className="hidden print:block text-center mb-4">
        <h1 className="text-lg font-bold uppercase tracking-wide">Ficha de Evolução Fisioterapêutica</h1>
        <p className="text-xs text-gray-500 mt-0.5">Fisio Box</p>
      </div>

      <SecaoFicha titulo="Identificação">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <CampoTexto
              label="Nome do Paciente"
              name="nomePaciente"
              value={campos.nomePaciente}
              onChange={handleChange}
              placeholder="Nome completo"
              rows={1}
            />
          </div>
          <CampoTexto
            label="Data"
            name="data"
            value={campos.data}
            onChange={handleChange}
            placeholder={dataHoje}
            rows={1}
          />
          <CampoTexto
            label="Nº da Sessão"
            name="sessao"
            value={campos.sessao}
            onChange={handleChange}
            placeholder="Ex: 12"
            rows={1}
          />
          <div className="sm:col-span-2">
            <CampoTexto
              label="Diagnóstico / CID"
              name="diagnostico"
              value={campos.diagnostico}
              onChange={handleChange}
              placeholder="Ex: J45 — Asma"
              rows={1}
            />
          </div>
        </div>
      </SecaoFicha>

      <SecaoFicha titulo="Sinais Vitais">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <CampoNumerico
            label="PA Sistólica"
            name="paSistolica"
            value={campos.paSistolica}
            onChange={handleChange}
            placeholder="120"
            unidade="mmHg"
            min={0}
          />
          <CampoNumerico
            label="PA Diastólica"
            name="paDiastolica"
            value={campos.paDiastolica}
            onChange={handleChange}
            placeholder="80"
            unidade="mmHg"
            min={0}
          />
          <CampoNumerico
            label="FC"
            name="fc"
            value={campos.fc}
            onChange={handleChange}
            placeholder="72"
            unidade="bpm"
            min={0}
          />
          <CampoNumerico
            label="SpO₂"
            name="spo2"
            value={campos.spo2}
            onChange={handleChange}
            placeholder="98"
            unidade="%"
            min={0}
            max={100}
          />
          <CampoNumerico
            label="FR"
            name="fr"
            value={campos.fr}
            onChange={handleChange}
            placeholder="16"
            unidade="irpm"
            min={0}
          />
          <CampoNumerico
            label="Temperatura"
            name="temperatura"
            value={campos.temperatura}
            onChange={handleChange}
            placeholder="36.5"
            unidade="°C"
            step="0.1"
            min={0}
          />
        </div>
      </SecaoFicha>

      <SecaoFicha titulo="S — Subjetivo">
        <CampoTexto
          label="Queixa do dia / relato do paciente"
          name="subjetivo"
          value={campos.subjetivo}
          onChange={handleChange}
          placeholder="O que o paciente relata nesta sessão..."
          rows={4}
        />
      </SecaoFicha>

      <SecaoFicha titulo="O — Objetivo">
        <CampoTexto
          label="Achados mensuráveis, exames e testes realizados"
          name="objetivo"
          value={campos.objetivo}
          onChange={handleChange}
          placeholder="Dados observados e medidos pelo fisioterapeuta..."
          rows={4}
        />
      </SecaoFicha>

      <SecaoFicha titulo="A — Avaliação">
        <CampoTexto
          label="Análise clínica"
          name="avaliacao"
          value={campos.avaliacao}
          onChange={handleChange}
          placeholder="Interpretação dos dados subjetivos e objetivos..."
          rows={4}
        />
      </SecaoFicha>

      <SecaoFicha titulo="P — Plano / Conduta">
        <CampoTexto
          label="Técnicas, exercícios e próximos passos"
          name="plano"
          value={campos.plano}
          onChange={handleChange}
          placeholder="Condutas realizadas e planejamento para as próximas sessões..."
          rows={4}
        />
      </SecaoFicha>

      <SecaoFicha titulo="Observações">
        <CampoTexto
          label="Intercorrências ou notas extras"
          name="observacoes"
          value={campos.observacoes}
          onChange={handleChange}
          placeholder="Informações adicionais relevantes..."
          rows={3}
        />
      </SecaoFicha>

      <SecaoFicha titulo="Terapeuta Responsável">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CampoTexto
            label="Nome do Fisioterapeuta"
            name="nomeTerapeuta"
            value={campos.nomeTerapeuta}
            onChange={handleChange}
            placeholder="Nome completo"
            rows={1}
          />
          <CampoTexto
            label="CREFITO"
            name="crefito"
            value={campos.crefito}
            onChange={handleChange}
            placeholder="Ex: 3-12345-F"
            rows={1}
          />
        </div>
        <div className="print-assinatura mt-10 pt-2 border-t border-gray-400 w-64">
          <p className="text-xs text-gray-500">Assinatura</p>
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
