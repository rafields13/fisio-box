import { useState } from 'react'
import CampoNumerico from '../shared/CampoNumerico'
import SexoSelect from '../shared/SexoSelect'
import FormulaRef from '../shared/FormulaRef'
import ResultadoCard from '../shared/ResultadoCard'
import { calcularTesteDegrau } from '../../utils/formulas'
import { validarTesteDegrau } from '../../utils/validacao'

const FORMULA = [
  'Homens:   Predito = 106 + 17,02 + (−1,24 × idade) + (0,8 × altura) + (−0,39 × peso)',
  'Mulheres: Predito = 106 + (−1,24 × idade) + (0,8 × altura) + (−0,39 × peso)',
  '',
  'Percentual = (degraus realizados ÷ degraus previstos) × 100',
]

const CAMPOS_INICIAIS = { sexo: '', idade: '', altura: '', peso: '', degrausRealizados: '' }

export default function TesteDegrau() {
  const [campos, setCampos] = useState(CAMPOS_INICIAIS)
  const [erros, setErros] = useState({})
  const [resultado, setResultado] = useState(null)

  function handleChange(name, value) {
    setCampos((prev) => ({ ...prev, [name]: value }))
  }

  function handleCalcular() {
    const novosErros = validarTesteDegrau(campos)
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return
    setResultado(calcularTesteDegrau(campos))
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
        <SexoSelect value={campos.sexo} onChange={handleChange} erro={erros.sexo} />
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
          label="Altura"
          name="altura"
          value={campos.altura}
          onChange={handleChange}
          erro={erros.altura}
          placeholder="Ex: 170"
          unidade="cm"
          min={50}
          max={300}
          step={1}
        />
        <CampoNumerico
          label="Peso"
          name="peso"
          value={campos.peso}
          onChange={handleChange}
          erro={erros.peso}
          placeholder="Ex: 70"
          unidade="kg"
          min={1}
        />
        <CampoNumerico
          label="Degraus realizados"
          name="degrausRealizados"
          value={campos.degrausRealizados}
          onChange={handleChange}
          erro={erros.degrausRealizados}
          placeholder="Ex: 60"
          min={1}
          step={1}
        />
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
            { label: 'Degraus Previstos', valor: resultado.predito },
            { label: 'Percentual Predito', valor: resultado.percentual, unidade: '%' },
          ]}
        />
      )}
    </div>
  )
}
