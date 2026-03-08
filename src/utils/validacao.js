const CAMPO_OBRIGATORIO = 'Preencha este campo.'
const SEXO_OBRIGATORIO = 'Selecione o sexo.'

function positivo(val) {
  return val !== '' && Number(val) > 0
}

// IMC
export function validarImc({ peso, altura }) {
  const erros = {}
  if (!positivo(peso)) erros.peso = CAMPO_OBRIGATORIO
  const a = Number(altura)
  if (!altura || a < 0.5 || a > 3.0) erros.altura = 'Informe uma altura entre 0,50 e 3,00 m.'
  return erros
}

// RCQ
export function validarRcq({ cintura, quadril, sexo }) {
  const erros = {}
  if (!sexo) erros.sexo = SEXO_OBRIGATORIO
  if (!positivo(cintura)) erros.cintura = CAMPO_OBRIGATORIO
  if (!positivo(quadril)) erros.quadril = CAMPO_OBRIGATORIO
  return erros
}

// TC6M
export function validarTc6m({ sexo, idade, altura, peso }) {
  const erros = {}
  if (!sexo) erros.sexo = SEXO_OBRIGATORIO
  if (!positivo(idade)) erros.idade = CAMPO_OBRIGATORIO
  const a = Number(altura)
  if (!altura || a < 50 || a > 300) erros.altura = 'Informe uma altura entre 50 e 300 cm.'
  if (!positivo(peso)) erros.peso = CAMPO_OBRIGATORIO
  return erros
}

// Teste do Degrau
export function validarTesteDegrau({ sexo, idade, altura, peso, degrausRealizados }) {
  const erros = {}
  if (!sexo) erros.sexo = SEXO_OBRIGATORIO
  if (!positivo(idade)) erros.idade = CAMPO_OBRIGATORIO
  const a = Number(altura)
  if (!altura || a < 50 || a > 300) erros.altura = 'Informe uma altura entre 50 e 300 cm.'
  if (!positivo(peso)) erros.peso = CAMPO_OBRIGATORIO
  if (!positivo(degrausRealizados)) erros.degrausRealizados = CAMPO_OBRIGATORIO
  return erros
}

// Manovacuometria
export function validarManovacuometria({ sexo, idade }) {
  const erros = {}
  if (!sexo) erros.sexo = SEXO_OBRIGATORIO
  if (!positivo(idade)) erros.idade = CAMPO_OBRIGATORIO
  return erros
}

// Tanaka
export function validarTanaka({ idade, fcRepouso, percentualTreinamento }) {
  const erros = {}
  if (!positivo(idade)) erros.idade = CAMPO_OBRIGATORIO
  if (!positivo(fcRepouso)) erros.fcRepouso = CAMPO_OBRIGATORIO
  const p = Number(percentualTreinamento)
  if (!percentualTreinamento || p <= 0 || p > 100)
    erros.percentualTreinamento = 'Informe um percentual entre 1 e 100.'
  return erros
}

// Carga Tabágica
export function validarCargaTabagica({ cigarrosDia, anosFumando }) {
  const erros = {}
  if (!positivo(cigarrosDia)) erros.cigarrosDia = CAMPO_OBRIGATORIO
  if (!positivo(anosFumando)) erros.anosFumando = CAMPO_OBRIGATORIO
  return erros
}
