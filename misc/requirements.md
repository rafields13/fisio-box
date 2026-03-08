# Requisitos do Site de Cálculo de Fórmulas de Fisioterapia

## 1. Objetivo

Desenvolver uma aplicação web simples, focada em receber dados de pacientes e calcular automaticamente resultados baseados em fórmulas validadas de fisioterapia cardiorrespiratória.

## 2. Escopo

O escopo inicial contempla um Produto Mínimo Viável (MVP) em formato de site estático ou aplicação de página única (SPA). O sistema servirá exclusivamente para a entrada manual de parâmetros clínicos e antropométricos, executando o cálculo no momento da requisição e exibindo os resultados e classificações imediatamente na tela.

## 3. Público de uso

Estudantes de fisioterapia, fisioterapeutas formados e outros profissionais de saúde que necessitam de uma ferramenta de apoio à decisão clínica rápida e acessível para avaliações cardiorrespiratórias.

## 4. Estrutura funcional do site

A aplicação deve ser organizada de forma enxuta, com a seguinte navegação e estrutura de interface:

* Página inicial contendo um menu ou lista de acesso rápido para todas as calculadoras disponíveis.
* Página ou seção dedicada para cada fórmula clínica.
* Campos de entrada de dados (inputs) organizados e com rótulos claros.
* Botão de ação principal ("Calcular").
* Área de exibição de resultados em destaque.
* Exibição da fórmula teórica utilizada como referência.
* Área de texto para exibição da classificação clínica ou interpretação do resultado, quando aplicável.

## 5. Requisitos funcionais

* O sistema deve permitir que o usuário selecione a calculadora desejada na página inicial.
* O sistema deve disponibilizar um campo de seleção de sexo (Masculino/Feminino) nas calculadoras que exigem essa distinção.
* O sistema deve fornecer campos numéricos para inserção de peso, altura, idade, circunferências e dados específicos de testes (degraus, cigarros, anos, etc.).
* O sistema deve validar e impedir o cálculo se os campos obrigatórios estiverem vazios.
* O sistema deve processar o cálculo matemático instantaneamente ao acionar o botão "Calcular".
* O sistema deve exibir a classificação de risco ou diagnóstico funcional (ex: Magreza, Risco Aumentado) conforme os dados processados.
* O sistema deve prover um botão "Limpar" para apagar todos os campos e resultados da tela atual.
* O sistema deve permitir a realização de múltiplos cálculos sequenciais sem necessidade de recarregar a página.

## 6. Regras de negócio

As regras a seguir definem a lógica de cálculo e as referências clínicas do sistema:

**Índice de Massa Corporal (IMC)**

* A fórmula utilizada deve ser: Peso / Altura².


* A unidade de Peso deve ser em quilogramas (kg).


* A unidade de Altura deve ser em metros (m).


* A classificação deve seguir a tabela da OMS:


* Magreza: < 18.5.


* Normal: 18.5 a 24.9.


* Sobrepeso: 25.0 a 29.9.


* Obesidade Grau I: 30.0 a 34.9.


* Obesidade Grau II: 35.0 a 39.9.


* Obesidade Grau III: ≥ 40.0.





**Relação Cintura-Quadril (RCQ)**

* A fórmula utilizada deve ser: Circunferência da cintura / Circunferência do quadril.


* As unidades de cintura e quadril devem ser em centímetros (cm).


* O sexo é obrigatório para determinar a classificação.


* A classificação de risco para Mulheres deve ser: Baixo risco se < 0.85; Risco aumentado se ≥ 0.85.


* A classificação de risco para Homens deve ser: Baixo risco se < 0.90; Risco aumentado se ≥ 0.90.



**Teste de Caminhada de 6 Minutos (TC6M)**

* As unidades base devem ser: Altura em cm, Idade em anos, Peso em kg.


* O sexo é obrigatório para selecionar a fórmula correta.


* Fórmula para Homens: C6M = (7.57 × Altura) - (5.02 × Idade) - (1.76 × Peso) - 309.


* Fórmula para Mulheres: DTC6M = (2.11 × Altura) - (2.29 × Peso) - (5.78 × Idade) + 667.


* O Limite Inferior da Normalidade (LIN) para Homens deve ser calculado subtraindo 153m da Distância Predita.


* O Limite Inferior da Normalidade (LIN) para Mulheres deve ser calculado subtraindo 139m da Distância Predita.



**Teste do Degrau**

* As unidades base devem ser: Idade em anos, Altura em cm, Peso em kg.


* O sexo é obrigatório.


* Valor Predito para Homens: 106 + (17.02 × 1) + (-1.24 × Idade) + (0.8 × Altura) + (-0.39 × Peso).


* Valor Predito para Mulheres: 106 + (-1.24 × Idade) + (0.8 × Altura) + (-0.39 × Peso).


* O Percentual Predito deve ser calculado como: (Número de Degraus Realizados / Número de Degraus Previstos) × 100.



**Manovacuometria**

* A unidade de Idade deve ser em anos.


* O sexo é obrigatório.


* Valores Preditos para Homens: PImáx = -0.80 × Idade + 153; PEmáx = -0.81 × Idade + 165.3.


* Valores Preditos para Mulheres: PImáx = -0.49 × Idade + 110.4; PEmáx = -0.61 × Idade + 115.6.


* Limites Inferiores da Normalidade para Homens: PImáx = Valor Predito - (1.645 × 17 cmH2O); PEmáx = Valor Predito - (1.645 × 18 cmH2O).


* Limites Inferiores da Normalidade para Mulheres: PImáx = Valor Predito - (1.645 × 11 cmH2O); PEmáx = Valor Predito - (1.645 × 12 cmH2O).



**Carga Tabágica**

* A fórmula deve ser: (Número de cigarros por dia / 20) × Número de anos fumando.



**Regras Gerais de Arredondamento**

* Todos os resultados numéricos finais devem ser arredondados para duas casas decimais, utilizando o padrão matemático convencional.

## 7. Requisitos não funcionais

* **Responsividade:** O site deve adaptar-se perfeitamente a dispositivos móveis (smartphones e tablets) e desktops.
* **Performance:** Carregamento instantâneo, operando majoritariamente no lado do cliente (client-side) sem necessidade de requisições de rede para efetuar os cálculos.
* **Usabilidade:** Interface clara, com bom contraste e botões de fácil clique (touch-friendly).
* **Manutenibilidade:** Código fonte organizado, preferencialmente modularizado por calculadora.
* **Acessibilidade e Legibilidade:** Fontes legíveis (tamanho mínimo sugerido de 16px para corpo de texto).
* **Compatibilidade:** Funcionalidade garantida nas versões recentes do Chrome, Firefox, Safari e Edge.

## 8. Campos necessários por calculadora

* **IMC:** Peso (kg), Altura (m).
* **RCQ:** Sexo, Circunferência da cintura (cm), Circunferência do quadril (cm).
* **Teste de Caminhada de 6 Minutos:** Sexo, Idade (anos), Altura (cm), Peso (kg).
* **Teste do Degrau:** Sexo, Idade (anos), Altura (cm), Peso (kg), Número de degraus realizados.
* **Manovacuometria:** Sexo, Idade (anos).
* **Carga Tabágica:** Número de cigarros por dia, Número de anos fumando.

## 9. Saídas esperadas por calculadora

* **IMC:** Valor do IMC numérico e interpretação textual da categoria (ex: "Sobrepeso").
* **RCQ:** Valor da RCQ numérico e interpretação textual de risco (ex: "Risco aumentado").
* **Teste de Caminhada de 6 Minutos:** Valor da Distância Predita (m) e Valor do Limite Inferior da Normalidade (m).
* **Teste do Degrau:** Valor Predito numérico e Percentual Predito (%).
* **Manovacuometria:** Valores Preditos numéricos de PImáx e PEmáx, e Limites Inferiores da Normalidade correspondentes.
* **Carga Tabágica:** Valor numérico de maços-ano.

## 10. Validações

* Não permitir a entrada de números negativos; todos os inputs devem ser maiores que zero.
* Tornar obrigatório o preenchimento de todos os campos pertinentes à calculadora ativa antes de liberar o evento de cálculo.
* Impedir divisão por zero (ex: Altura = 0 ou Quadril = 0).
* Garantir a unidade de medida correta via placeholder ou máscara (ex: exigir que altura no IMC seja validada como número decimal entre 0.50 e 3.00 metros, e altura em cm nas demais seja validada como número inteiro entre 50 e 300 centímetros).
* Exibir mensagens de erro ou alertas amigáveis em texto vermelho ou em modais curtos caso o usuário insira um dado inválido.

## 11. Fora de escopo neste primeiro momento

Para garantir a entrega rápida do MVP, os seguintes itens estão **estritamente fora do escopo**:

* Sistema de login ou autenticação.
* Cadastro e gerenciamento de usuários ou pacientes.
* Histórico de cálculos salvos ou banco de dados.
* Geração de documentos para impressão (PDF, DOCX).
* Integração com sistemas externos ou prontuários eletrônicos.
* Dashboards de análise ou gráficos complexos.
* Animações ou perfumarias visuais avançadas que não agreguem à usabilidade principal.

## 12. Sugestão de MVP

Uma aplicação web construída com React e TailwindCSS. O site será hospedado gratuitamente em plataformas estáticas. Contará com uma única página (Single Page Application) possuindo uma aba ou menu lateral para trocar dinamicamente os formulários das 6 calculadoras. O foco visual será em formulários limpos, botões grandes e resultados em texto destacado.

## 13. Critérios de aceite

* **Critério 1:** É possível acessar o site em um dispositivo móvel e os formulários não quebram a tela (não há scroll horizontal indesejado).
* **Critério 2:** Ao inserir Peso: 70 e Altura: 1.75 no IMC, o sistema retorna 22.86 e a classificação "Normal".
* **Critério 3:** Ao deixar um campo de altura em branco e clicar em calcular, o sistema não calcula e exibe uma mensagem pedindo o preenchimento do campo.
* **Critério 4:** Todas as 6 calculadoras estão presentes, com suas respectivas fórmulas descritas na tela e operando de forma independente.
