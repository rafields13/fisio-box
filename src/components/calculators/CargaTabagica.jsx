import { useState } from 'react'
import CampoNumerico from '../shared/CampoNumerico'
import FormulaRef from '../shared/FormulaRef'
import ResultadoCard from '../shared/ResultadoCard'
import { calcularCargaTabagica } from '../../utils/formulas'
import { validarCargaTabagica } from '../../utils/validacao'

const FORMULA = [
  'Carga Tabágica (maços-ano) = (cigarros/dia ÷ 20) × anos fumando',
]

const CAMPOS_INICIAIS = { cigarrosDia: '', anosFumando: '' }

export default function CargaTabagica() {
  const [campos, setCampos] = useState(CAMPOS_INICIAIS)
  const [erros, setErros] = useState({})
  const [resultado, setResultado] = useState(null)

  function handleChange(name, value) {
    setCampos((prev) => ({ ...prev, [name]: value }))
  }

  function handleCalcular() {
    const novosErros = validarCargaTabagica(campos)
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return
    setResultado(calcularCargaTabagica(campos))
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
          label="Cigarros por dia"
          name="cigarrosDia"
          value={campos.cigarrosDia}
          onChange={handleChange}
          erro={erros.cigarrosDia}
          placeholder="Ex: 20"
          min={1}
          step={1}
        />
        <CampoNumerico
          label="Anos fumando"
          name="anosFumando"
          value={campos.anosFumando}
          onChange={handleChange}
          erro={erros.anosFumando}
          placeholder="Ex: 10"
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
            { label: 'Carga Tabágica', valor: resultado.carga, unidade: 'maços-ano' },
          ]}
        />
      )}
    </div>
  )
}
