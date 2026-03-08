import { useState } from 'react'
import CampoNumerico from '../shared/CampoNumerico'
import FormulaRef from '../shared/FormulaRef'
import ResultadoCard from '../shared/ResultadoCard'
import { calcularImc } from '../../utils/formulas'
import { validarImc } from '../../utils/validacao'

const FORMULA = [
  'IMC = Peso (kg) ÷ Altura² (m)',
  '',
  'Magreza: < 18,5',
  'Normal: 18,5 – 24,9',
  'Sobrepeso: 25,0 – 29,9',
  'Obesidade Grau I: 30,0 – 34,9',
  'Obesidade Grau II: 35,0 – 39,9',
  'Obesidade Grau III: ≥ 40,0',
]

const CAMPOS_INICIAIS = { peso: '', altura: '' }

export default function Imc() {
  const [campos, setCampos] = useState(CAMPOS_INICIAIS)
  const [erros, setErros] = useState({})
  const [resultado, setResultado] = useState(null)

  function handleChange(name, value) {
    setCampos((prev) => ({ ...prev, [name]: value }))
  }

  function handleCalcular() {
    const novosErros = validarImc(campos)
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return
    setResultado(calcularImc(campos))
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
          label="Altura"
          name="altura"
          value={campos.altura}
          onChange={handleChange}
          erro={erros.altura}
          placeholder="Ex: 1.75"
          unidade="m"
          min={0.5}
          max={3.0}
          step={0.01}
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
            {
              label: 'IMC',
              valor: resultado.imc,
              unidade: 'kg/m²',
              classificacao: resultado.classificacao,
            },
          ]}
        />
      )}
    </div>
  )
}
