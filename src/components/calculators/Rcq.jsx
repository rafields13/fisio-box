import { useState } from 'react'
import CampoNumerico from '../shared/CampoNumerico'
import SexoSelect from '../shared/SexoSelect'
import FormulaRef from '../shared/FormulaRef'
import ResultadoCard from '../shared/ResultadoCard'
import { calcularRcq } from '../../utils/formulas'
import { validarRcq } from '../../utils/validacao'

const FORMULA = [
  'RCQ = Cintura (cm) ÷ Quadril (cm)',
  '',
  'Mulheres — Baixo risco: < 0,85 | Risco aumentado: ≥ 0,85',
  'Homens   — Baixo risco: < 0,90 | Risco aumentado: ≥ 0,90',
]

const CAMPOS_INICIAIS = { sexo: '', cintura: '', quadril: '' }

export default function Rcq() {
  const [campos, setCampos] = useState(CAMPOS_INICIAIS)
  const [erros, setErros] = useState({})
  const [resultado, setResultado] = useState(null)

  function handleChange(name, value) {
    setCampos((prev) => ({ ...prev, [name]: value }))
  }

  function handleCalcular() {
    const novosErros = validarRcq(campos)
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return
    setResultado(calcularRcq(campos))
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
          label="Circunferência da cintura"
          name="cintura"
          value={campos.cintura}
          onChange={handleChange}
          erro={erros.cintura}
          placeholder="Ex: 80"
          unidade="cm"
          min={1}
        />
        <CampoNumerico
          label="Circunferência do quadril"
          name="quadril"
          value={campos.quadril}
          onChange={handleChange}
          erro={erros.quadril}
          placeholder="Ex: 95"
          unidade="cm"
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
            {
              label: 'RCQ',
              valor: resultado.rcq,
              classificacao: resultado.classificacao,
            },
          ]}
        />
      )}
    </div>
  )
}
