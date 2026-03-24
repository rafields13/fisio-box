import { useState } from 'react'
import CampoNumerico from '../shared/CampoNumerico'
import FormulaRef from '../shared/FormulaRef'
import ResultadoCard from '../shared/ResultadoCard'
import { calcularCirtometria } from '../../utils/formulas'
import { validarCirtometria } from '../../utils/validacao'

const FORMULA = [
  'Amplitude = Inspiração − Expiração (em cada nível)',
]

const CAMPOS_INICIAIS = {
  axilarRepouso: '', axilarInsp: '', axilarExp: '',
  xifoideRepouso: '', xifoideInsp: '', xifoideExp: '',
  umbilicalRepouso: '', umbilicalInsp: '', umbilicalExp: '',
}

const NIVEIS = [
  { key: 'axilar',    label: 'Axilar' },
  { key: 'xifoide',  label: 'Xifóide' },
  { key: 'umbilical', label: 'Umbilical' },
]

export default function Cirtometria() {
  const [campos, setCampos] = useState(CAMPOS_INICIAIS)
  const [erros, setErros] = useState({})
  const [resultado, setResultado] = useState(null)

  function handleChange(name, value) {
    setCampos((prev) => ({ ...prev, [name]: value }))
  }

  function handleCalcular() {
    const novosErros = validarCirtometria(campos)
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return
    setResultado(calcularCirtometria(campos))
  }

  function handleLimpar() {
    setCampos(CAMPOS_INICIAIS)
    setErros({})
    setResultado(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <FormulaRef linhas={FORMULA} />

      <div className="flex flex-col gap-6">
        {NIVEIS.map(({ key, label }) => (
          <div key={key} className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide border-b border-gray-200 pb-1">
              {label}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <CampoNumerico
                label="Repouso"
                name={`${key}Repouso`}
                value={campos[`${key}Repouso`]}
                onChange={handleChange}
                erro={erros[`${key}Repouso`]}
                placeholder="cm"
                unidade="cm"
                min={0}
              />
              <CampoNumerico
                label="Inspiração"
                name={`${key}Insp`}
                value={campos[`${key}Insp`]}
                onChange={handleChange}
                erro={erros[`${key}Insp`]}
                placeholder="cm"
                unidade="cm"
                min={0}
              />
              <CampoNumerico
                label="Expiração"
                name={`${key}Exp`}
                value={campos[`${key}Exp`]}
                onChange={handleChange}
                erro={erros[`${key}Exp`]}
                placeholder="cm"
                unidade="cm"
                min={0}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleCalcular}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg w-full transition-colors"
        >
          Calcular
        </button>
        <button
          type="button"
          onClick={handleLimpar}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg w-full transition-colors"
        >
          Limpar
        </button>
      </div>

      {resultado && (
        <ResultadoCard
          itens={[
            { label: 'Amplitude Axilar',     valor: resultado.axilarAmplitude,    unidade: 'cm' },
            { label: 'Amplitude Xifóide',    valor: resultado.xifoideAmplitude,   unidade: 'cm' },
            { label: 'Amplitude Umbilical',  valor: resultado.umbilicalAmplitude, unidade: 'cm' },
          ]}
        />
      )}
    </div>
  )
}
