export function round2(n) {
  return Math.round(n * 100) / 100
}

// IMC
export function calcularImc({ peso, altura }) {
  const imc = Number(peso) / (Number(altura) ** 2)
  return {
    imc: round2(imc),
    classificacao: classificarImc(imc),
  }
}

function classificarImc(imc) {
  if (imc < 18.5) return 'Magreza'
  if (imc < 25) return 'Normal'
  if (imc < 30) return 'Sobrepeso'
  if (imc < 35) return 'Obesidade Grau I'
  if (imc < 40) return 'Obesidade Grau II'
  return 'Obesidade Grau III'
}

// RCQ
export function calcularRcq({ cintura, quadril, sexo }) {
  const rcq = round2(Number(cintura) / Number(quadril))
  return {
    rcq,
    classificacao: classificarRcq(rcq, sexo),
  }
}

function classificarRcq(rcq, sexo) {
  const limiar = sexo === 'masculino' ? 0.9 : 0.85
  return rcq >= limiar ? 'Risco aumentado' : 'Baixo risco'
}

// TC6M
export function calcularTc6m({ sexo, idade, altura, peso }) {
  const i = Number(idade), a = Number(altura), p = Number(peso)
  let predito
  if (sexo === 'masculino') {
    predito = (7.57 * a) - (5.02 * i) - (1.76 * p) - 309
  } else {
    predito = (2.11 * a) - (2.29 * p) - (5.78 * i) + 667
  }
  const lin = predito - (sexo === 'masculino' ? 153 : 139)
  return {
    predito: round2(predito),
    lin: round2(lin),
  }
}

// Teste do Degrau
export function calcularTesteDegrau({ sexo, idade, altura, peso, degrausRealizados }) {
  const i = Number(idade), a = Number(altura), p = Number(peso)
  let predito
  if (sexo === 'masculino') {
    predito = 106 + 17.02 + (-1.24 * i) + (0.8 * a) + (-0.39 * p)
  } else {
    predito = 106 + (-1.24 * i) + (0.8 * a) + (-0.39 * p)
  }
  const percentual = (Number(degrausRealizados) / predito) * 100
  return {
    predito: round2(predito),
    percentual: round2(percentual),
  }
}

// Manovacuometria
export function calcularManovacuometria({ sexo, idade }) {
  const i = Number(idade)
  let pimax, pemax
  if (sexo === 'masculino') {
    pimax = (-0.80 * i) + 153
    pemax = (-0.81 * i) + 165.3
    return {
      pimax: round2(pimax),
      pemax: round2(pemax),
      linPimax: round2(pimax - (1.645 * 17)),
      linPemax: round2(pemax - (1.645 * 18)),
    }
  } else {
    pimax = (-0.49 * i) + 110.4
    pemax = (-0.61 * i) + 115.6
    return {
      pimax: round2(pimax),
      pemax: round2(pemax),
      linPimax: round2(pimax - (1.645 * 11)),
      linPemax: round2(pemax - (1.645 * 12)),
    }
  }
}

// Carga Tabágica
export function calcularCargaTabagica({ cigarrosDia, anosFumando }) {
  const carga = (Number(cigarrosDia) / 20) * Number(anosFumando)
  return { carga: round2(carga) }
}
