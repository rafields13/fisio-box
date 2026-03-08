import { useState } from 'react'
import CampoNumerico from '../shared/CampoNumerico'
import FormulaRef from '../shared/FormulaRef'
import ResultadoCard from '../shared/ResultadoCard'
import { calcularTanaka } from '../../utils/formulas'
import { validarTanaka } from '../../utils/validacao'

const FORMULA = [
  'FCmáx = 208 − (0,7 × Idade)',
  'FC de Reserva = FCmáx − FC de Repouso',
  'FC de Treinamento = (FC de Reserva × % Treinamento) + FC de Repouso',
]

const REFERENCIAS = [
  { percentual: 60, label: 'Pacientes graves',    cor: 'bg-red-100 text-red-700 border-red-200' },
  { percentual: 70, label: 'Pacientes moderados', cor: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { percentual: 80, label: 'Pacientes leves',     cor: 'bg-green-100 text-green-700 border-green-200' },
]

const CAMPOS_INICIAIS = { idade: '', fcRepouso: '', percentualTreinamento: '' }

export default function Tanaka() {
  const [campos, setCampos] = useState(CAMPOS_INICIAIS)
  const [erros, setErros] = useState({})
  const [resultado, setResultado] = useState(null)

  function handleChange(name, value) {
    setCampos((prev) => ({ ...prev, [name]: value }))
  }

  function handleCalcular() {
    const novosErros = validarTanaka(campos)
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return
    setResultado(calcularTanaka(campos))
  }

  function handleLimpar() {
    setCampos(CAMPOS_INICIAIS)
    setErros({})
    setResultado(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <FormulaRef linhas={FORMULA} />

      <div className="flex flex-col gap-4">
        <CampoNumerico
          label="Idade"
          name="idade"
          value={campos.idade}
          onChange={handleChange}
          erro={erros.idade}
          placeholder="Ex: 45"
          unidade="anos"
          min={1}
          step={1}
        />
        <CampoNumerico
          label="FC de Repouso"
          name="fcRepouso"
          value={campos.fcRepouso}
          onChange={handleChange}
          erro={erros.fcRepouso}
          placeholder="Ex: 70"
          unidade="bpm"
          min={1}
          step={1}
        />

        <div className="flex flex-col gap-1">
          <CampoNumerico
            label="Percentual de Treinamento"
            name="percentualTreinamento"
            value={campos.percentualTreinamento}
            onChange={handleChange}
            erro={erros.percentualTreinamento}
            placeholder="Ex: 70"
            unidade="%"
            min={1}
            max={100}
            step={1}
          />
          <div className="flex gap-2 mt-1 flex-wrap">
            {REFERENCIAS.map((ref) => (
              <button
                key={ref.percentual}
                type="button"
                onClick={() => handleChange('percentualTreinamento', String(ref.percentual))}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium transition-opacity hover:opacity-80 ${ref.cor}`}
              >
                <span className="font-bold">{ref.percentual}%</span>
                <span>{ref.label}</span>
              </button>
            ))}
          </div>
        </div>
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
            { label: 'FCmáx',              valor: resultado.fcMax,             unidade: 'bpm' },
            { label: 'FC de Reserva',      valor: resultado.fcReserva,         unidade: 'bpm' },
            { label: 'FC de Treinamento',  valor: resultado.fcTreinamento,     unidade: 'bpm' },
          ]}
        />
      )}
    </div>
  )
}
