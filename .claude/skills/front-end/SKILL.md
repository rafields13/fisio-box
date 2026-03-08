# Skill: front-end

Diretrizes para construir a interface do **fisio-box** — calculadoras de fisioterapia cardiorrespiratória em React + TailwindCSS.

---

## Idioma

**Todo texto visível ao usuário deve estar em pt-BR.** Isso inclui labels, placeholders, mensagens de erro, botões, títulos e classificações clínicas. Nomes de variáveis, funções e comentários de código permanecem em inglês.

---

## Stack & Ferramentas

- **Vite** como build tool (scaffolding: `npm create vite@latest . -- --template react`)
- **React** com hooks funcionais (`useState`, `useCallback`). Sem class components.
- **TailwindCSS** v3 para todos os estilos. Sem CSS modules, sem CSS-in-JS.
- Sem dependências de UI externas (ex: MUI, Chakra). Componentes feitos à mão.
- Sem gerenciador de estado global (Redux, Zustand). Estado local com `useState` é suficiente.

---

## Estrutura de Arquivos

```
src/
  components/
    calculators/
      Imc.jsx
      Rcq.jsx
      Tc6m.jsx
      TesteDegrau.jsx
      Manovacuometria.jsx
      CargaTabagica.jsx
    shared/
      CampoNumerico.jsx   # input numérico reutilizável com label e erro
      SexoSelect.jsx      # seleção Masculino/Feminino
      ResultadoCard.jsx   # exibe valor numérico + classificação em destaque
      FormulaRef.jsx      # exibe a fórmula teórica em bloco colapsável ou fixo
  utils/
    formulas.js           # funções puras de cálculo — sem JSX, sem side effects
    validacao.js          # funções puras de validação de inputs
  App.jsx                 # shell da SPA: sidebar/menu + renderização do calculador ativo
  main.jsx
```

---

## Padrão de Calculadora

Cada calculadora é um componente independente que segue esta estrutura interna:

```jsx
// 1. estado local para cada campo do formulário (string vazia como valor inicial)
// 2. estado local para erros (objeto com chave por campo)
// 3. estado local para resultado (null enquanto não calculado)

function Imc() {
  const [campos, setCampos] = useState({ peso: '', altura: '' })
  const [erros, setErros] = useState({})
  const [resultado, setResultado] = useState(null)

  function handleCalcular() {
    const novosErros = validarImc(campos)
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return
    setResultado(calcularImc(campos))
  }

  function handleLimpar() {
    setCampos({ peso: '', altura: '' })
    setErros({})
    setResultado(null)
  }

  return ( /* formulário + FormulaRef + ResultadoCard */ )
}
```

**Regras do padrão:**
- Campos iniciam como string vazia, não `0` ou `null`
- Validação sempre ocorre antes do cálculo; se houver erros, aborta e não exibe resultado antigo
- Botão "Limpar" reseta tudo: campos, erros e resultado
- A `FormulaRef` fica visível o tempo todo (não depende de haver resultado)
- O `ResultadoCard` só renderiza se `resultado !== null`

---

## Componentes Compartilhados

### `CampoNumerico`
```jsx
// Props: label, name, value, onChange, erro, placeholder, min, max, step, unidade
// Exibe: label acima, input, unidade ao lado (ex: "kg"), mensagem de erro abaixo em vermelho
```

### `SexoSelect`
```jsx
// Props: value, onChange, erro
// Opções: '' (placeholder "Selecione o sexo"), 'masculino', 'feminino'
// Label: "Sexo"
```

### `ResultadoCard`
```jsx
// Props: itens = [{ label, valor, unidade?, classificacao? }]
// Exibe cada item em destaque: label em cinza pequeno, valor em texto grande/bold
// Se classificacao presente, exibe badge colorido (verde = normal/baixo risco, amarelo/vermelho = risco)
```

### `FormulaRef`
```jsx
// Props: titulo, linhas = [string]
// Bloco com fundo levemente diferenciado, fonte monospace menor
// Título: "Fórmula de referência"
```

---

## Lógica de Cálculo (`utils/formulas.js`)

Funções puras que recebem um objeto de campos (valores já parseados como `Number`) e retornam um objeto de resultado. Nunca acessam estado React.

```js
// Exemplo de contrato:
export function calcularImc({ peso, altura }) {
  const imc = peso / (altura * altura)
  return {
    imc: round2(imc),
    classificacao: classificarImc(imc),
  }
}
```

- `round2(n)` = `Math.round(n * 100) / 100`
- Cada calculadora tem sua própria função de cálculo e de classificação no mesmo arquivo
- Funções de classificação retornam a string pt-BR exata (ex: `'Sobrepeso'`, `'Risco aumentado'`)

---

## Validação (`utils/validacao.js`)

Funções puras que recebem o objeto de campos (strings, como estão no estado) e retornam `{ [nomeCampo]: 'mensagem de erro em pt-BR' }`. Objeto vazio = sem erros.

```js
export function validarImc({ peso, altura }) {
  const erros = {}
  if (!peso || Number(peso) <= 0) erros.peso = 'Informe um peso válido (maior que zero).'
  if (!altura || Number(altura) < 0.5 || Number(altura) > 3.0)
    erros.altura = 'Informe uma altura entre 0,50 e 3,00 m.'
  return erros
}
```

**Mensagens de erro padrão (pt-BR):**
- Campo vazio: `'Preencha este campo.'`
- Valor fora do intervalo: `'Informe um valor entre X e Y.'`
- Seleção obrigatória: `'Selecione o sexo.'`
- Divisão por zero: `'O valor não pode ser zero.'`

---

## Estilo & Layout (TailwindCSS)

**Layout geral (desktop/mobile):**
- Mobile: menu de calculadoras no topo (navbar ou tabs deslizáveis), conteúdo abaixo
- Desktop (md+): sidebar fixa à esquerda (~240px), conteúdo à direita com scroll

**Tokens visuais a manter consistentes:**
- Fonte base ≥ 16px (`text-base` no body)
- Botão "Calcular": `bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg w-full`
- Botão "Limpar": `bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg w-full`
- Erro inline: `text-red-600 text-sm mt-1`
- Card de resultado: `bg-blue-50 border border-blue-200 rounded-xl p-4`
- Sidebar item ativo: fundo `bg-blue-100`, texto `text-blue-700 font-semibold`

**Responsividade:**
- Nunca use larguras fixas em px que causem scroll horizontal
- Inputs: `w-full`
- Container principal: `max-w-2xl mx-auto px-4`

---

## Nomenclatura e Convenções

| Contexto | Convenção |
|---|---|
| Componentes React | PascalCase em pt-BR (`CampoNumerico`, `TesteDegrau`) |
| Funções de cálculo | camelCase com prefixo `calcular` (`calcularImc`) |
| Funções de validação | camelCase com prefixo `validar` (`validarImc`) |
| Funções de classificação | camelCase com prefixo `classificar` (`classificarImc`) |
| Props de campos | nomes em pt-BR curtos (`peso`, `altura`, `cintura`) |
| Constantes clínicas | UPPER_SNAKE_CASE com comentário de fonte (`LIN_TC6M_HOMENS = 153`) |

---

## O que NÃO fazer

- Não usar `useEffect` para disparar cálculos ao mudar campo; calcular sempre no clique de "Calcular"
- Não criar rotas (React Router); a navegação entre calculadoras é por estado simples em `App.jsx`
- Não armazenar histórico, não usar `localStorage`
- Não usar bibliotecas de validação (yup, zod, react-hook-form); a validação é simples e manual
- Não adicionar animações além de transições simples de Tailwind (`transition-colors`)
- Não truncar resultados com `toFixed()` diretamente na view; arredondar com `round2()` nas funções de cálculo
