import { useState } from 'react'
import CampoNumerico from '../shared/CampoNumerico'
import SexoSelect from '../shared/SexoSelect'
import FormulaRef from '../shared/FormulaRef'
import ResultadoCard from '../shared/ResultadoCard'
import { calcularTc6m } from '../../utils/formulas'
import { validarTc6m } from '../../utils/validacao'

const FORMULA = [
  'Homens:  DTC6M = (7,57 × altura) − (5,02 × idade) − (1,76 × peso) − 309',
  'Mulheres: DTC6M = (2,11 × altura) − (2,29 × peso) − (5,78 × idade) + 667',
  '',
  'LIN Homens   = Distância Predita − 153 m',
  'LIN Mulheres = Distância Predita − 139 m',
]

const CAMPOS_INICIAIS = { sexo: '', idade: '', altura: '', peso: '' }

export default function Tc6m() {
  const [campos, setCampos] = useState(CAMPOS_INICIAIS)
  const [erros, setErros] = useState({})
  const [resultado, setResultado] = useState(null)

  function handleChange(name, value) {
    setCampos((prev) => ({ ...prev, [name]: value }))
  }

  function handleCalcular() {
    const novosErros = validarTc6m(campos)
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return
    setResultado(calcularTc6m(campos))
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
            { label: 'Distância Predita', valor: resultado.predito, unidade: 'm' },
            { label: 'Limite Inferior da Normalidade (LIN)', valor: resultado.lin, unidade: 'm' },
          ]}
        />
      )}
    </div>
  )
}
