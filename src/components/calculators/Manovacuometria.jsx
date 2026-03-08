import { useState } from 'react'
import CampoNumerico from '../shared/CampoNumerico'
import SexoSelect from '../shared/SexoSelect'
import FormulaRef from '../shared/FormulaRef'
import ResultadoCard from '../shared/ResultadoCard'
import { calcularManovacuometria } from '../../utils/formulas'
import { validarManovacuometria } from '../../utils/validacao'

const FORMULA = [
  'Homens:   PImáx = (−0,80 × idade) + 155,3',
  '          PEmáx = (−0,81 × idade) + 165,3',
  'Mulheres: PImáx = (−0,49 × idade) + 110,4',
  '          PEmáx = (−0,61 × idade) + 115,6',
  '',
  'LIN Homens:   PImáx = Predito − (1,645 × 17)  |  PEmáx = Predito − (1,645 × 18)',
  'LIN Mulheres: PImáx = Predito − (1,645 × 11)  |  PEmáx = Predito − (1,645 × 12)',
]

const CAMPOS_INICIAIS = { sexo: '', idade: '' }

export default function Manovacuometria() {
  const [campos, setCampos] = useState(CAMPOS_INICIAIS)
  const [erros, setErros] = useState({})
  const [resultado, setResultado] = useState(null)

  function handleChange(name, value) {
    setCampos((prev) => ({ ...prev, [name]: value }))
  }

  function handleCalcular() {
    const novosErros = validarManovacuometria(campos)
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return
    setResultado(calcularManovacuometria(campos))
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
            { label: 'PImáx Predito', valor: resultado.pimax, unidade: 'cmH₂O' },
            { label: 'PEmáx Predito', valor: resultado.pemax, unidade: 'cmH₂O' },
            { label: 'LIN PImáx', valor: resultado.linPimax, unidade: 'cmH₂O' },
            { label: 'LIN PEmáx', valor: resultado.linPemax, unidade: 'cmH₂O' },
          ]}
        />
      )}
    </div>
  )
}
