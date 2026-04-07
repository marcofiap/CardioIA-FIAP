# Faculdade de Informatica e Administracao Paulista

<p align="center">
  <img src="https://github.com/Luiz-FIAP/Fase_06_Cap_1_Despertar_da_Rede_Neural/blob/main/Ir_alem2/docs/examples/logo-fiap.png?raw=true" width="45%">
</p>

<h1 align="center">CardioIA - Fase 2: Diagnostico Automatizado</h1>

<p align="center">
  <strong>FIAP | Tecnologo em Inteligencia Artificial | Fase 2 | Capitulo 1</strong>
</p>

---

## Equipe

### Grupo 3

| Integrante | GitHub |
|---|---|
| Felipe Sabino da Silva | [@FelipeSabinoTMRS](https://github.com/FelipeSabinoTMRS) |
| Juan Felipe Voltolini | [@juanvoltolini-rm562890](https://github.com/juanvoltolini-rm562890) |
| Luiz Henrique Ribeiro de Oliveira | [@Luiz-FIAP](https://github.com/Luiz-FIAP) |
| Marco Aurelio Eberhardt Assimpcao | [@marcofiap](https://github.com/marcofiap) |
| Paulo Henrique Senise | [@PauloSenise](https://github.com/PauloSenise) |

---

## Introducao

Este repositorio reune os entregaveis da atividade **Fase 2: Diagnostico Automatizado - IA no Estetoscopio Digital**, parte do projeto **CardioIA**.

Nesta etapa, a proposta e simular um modulo inteligente de apoio ao diagnostico cardiologico, utilizando processamento de texto, classificacao supervisionada e analise basica de risco clinico a partir de descricoes curtas de sintomas.

O trabalho foi desenvolvido com base:

- no arquivo `docs/sintomas_e_remomendacoes_cardio`;
- no arquivo `docs/taxa_sobrevivencia_taxa_reinter`;
- na continuidade conceitual do dataset e do contexto construidos na Fase 1.

Importante: os diagnosticos sugeridos neste projeto são **simulacões acadêmicas** e não substituem avaliação médica real.

---

## Objetivo da Atividade

Desenvolver uma solução simples de IA aplicada a saúde cardiovascular, contemplando:

- extracao de sintomas em frases clinicas;
- associação entre sintomas e possíveis doenças;
- classificação de frases em `alto risco` e `baixo risco`;
- uso de `TF-IDF` e modelo supervisionado com `scikit-learn`;
- reflexão sobre viés, governança de dados e uso responsável de IA em saúde.

---

## Estrutura do Repositorio

```text
.
|-- data
|   |-- frases_rotuladas_risco.csv
|   |-- frases_sintomas_pacientes.txt
|   `-- mapa_conhecimento_sintomas_doencas.csv
|-- docs
|   |-- sintomas_e_remomendacoes_cardio
|   `-- taxa_sobrevivencia_taxa_reinter
|-- notebooks
|   |-- parte1_extracao_diagnostico.ipynb
|   `-- parte2_classificador_risco.ipynb
|-- src
|   |-- parte1_extracao_diagnostico.py
|   `-- parte2_classificador_risco.py
`-- README.md
```

---

## Parte 1 - Extracao de Informações e Diagnóstico Assistido

### Entregáveis

- `data/frases_sintomas_pacientes.txt`
- `data/mapa_conhecimento_sintomas_doencas.csv`
- `src/parte1_extracao_diagnostico.py`
- `notebooks/parte1_extracao_diagnostico.ipynb`

### Descricao

Nesta parte, foi criada uma base com 10 frases completas simulando relatos de pacientes. As frases incluem sintomas, tempo de inicio e impacto na rotina, conforme solicitado no enunciado.

Tambem foi criado um mapa de conhecimento em CSV relacionando sintomas a possiveis diagnosticos, incluindo:

- Infarto Agudo do Miocardio
- Angina
- Insuficiencia Cardiaca
- Arritmia
- Hipertensao

O script Python realiza:

- leitura do arquivo `.txt` com os relatos;
- normalizacao do texto, removendo acentos e pontuacao;
- identificacao de sintomas por regras simples;
- sugestao de diagnostico assistido com base no mapa de conhecimento.

### Execucao

```bash
python src/parte1_extracao_diagnostico.py
```

Para apresentacao em notebook:

```bash
jupyter notebook notebooks/parte1_extracao_diagnostico.ipynb
```

---

## Parte 2 - Classificador Basico de Texto

### Entregaveis

- `data/frases_rotuladas_risco.csv`
- `src/parte2_classificador_risco.py`
- `notebooks/parte2_classificador_risco.ipynb`

### Descricao

Foi criada uma base simulada com frases medicas rotuladas como:

- `alto risco`
- `baixo risco`

O classificador utiliza:

- `TF-IDF` para vetorizacao textual;
- `LogisticRegression` do `scikit-learn` como modelo supervisionado;
- divisao entre treino e teste com `train_test_split`;
- avaliacao por acuracia, matriz de confusao e relatorio de classificacao.

Na validacao local do script, a solucao alcancou **90% de acuracia** no conjunto de teste utilizado nesta versao do projeto.

### Execucao

```bash
python src/parte2_classificador_risco.py
```

Para apresentacao em notebook:

```bash
jupyter notebook notebooks/parte2_classificador_risco.ipynb
```

---

## Bases Utilizadas

### Base textual

Os textos `docs/sintomas_e_remomendacoes_cardio` e `docs/taxa_sobrevivencia_taxa_reinter` foram usados como referencia para:

- sintomas isquemicos;
- dispneia e sincope;
- fatores de risco cardiovascular;
- mortalidade e readmissao;
- contexto clinico e epidemiologico.

---

## Governanca de Dados e Vies

Como a atividade envolve saude, alguns cuidados foram considerados:

- uso exclusivamente academico e demonstrativo;
- dados simulados e textos sem identificacao pessoal;
- volume reduzido de exemplos, o que limita generalizacao;
- diagnosticos baseados em regras simples, sem validacao clinica;
- necessidade de revisao humana e interpretacao critica dos resultados.

Os textos-base indicam que fatores como idade avancada e hipertensao estao associados a piores desfechos, o que reforca a importancia de desenvolver sistemas rastreaveis, auditaveis e usados com cautela.

---

## Como Reproduzir o Projeto

### Pre-requisitos

- Python 3.12 ou superior
- `pandas`
- `numpy`
- `scikit-learn`
- `jupyter` para executar os notebooks

### Comandos principais

```bash
python src/parte1_extracao_diagnostico.py
python src/parte2_classificador_risco.py
```

---

## Resultados Obtidos

### Parte 1 - Diagnostico assistido por regras

Exemplos de diagnosticos sugeridos pelo script:

- "dor no peito em aperto, irradiando para o braco esquerdo" -> `Infarto Agudo do Miocardio`
- "fadiga constante, inchaco nas pernas e dificuldade para dormir deitado" -> `Insuficiencia Cardiaca`
- "palpitacoes fortes, batimentos irregulares e tontura" -> `Arritmia`

Esses resultados mostram que a ontologia simples em CSV consegue identificar sintomas relevantes e associar cada frase a um diagnostico provavel de forma transparente.

### Parte 2 - Classificacao de risco textual

Na validacao local do classificador, foi obtido o seguinte resultado:

- Acuracia: `90.00%`

Resumo da matriz de confusao:

- 4 frases de `alto risco` classificadas corretamente
- 1 frase de `alto risco` classificada incorretamente
- 5 frases de `baixo risco` classificadas corretamente

Exemplos de previsoes com frases novas:

- "dor no peito com suor frio e falta de ar" -> `alto risco`
- "leve cansaco muscular depois de uma caminhada" -> `baixo risco`
- "palpitacoes com tontura e quase desmaio" -> `alto risco`

Esses resultados indicam que o modelo consegue diferenciar frases com sinais clinicos mais graves de relatos menos criticos dentro do escopo reduzido e academico da atividade.

---

## Entrega em Video

O enunciado exige um video de ate 4 minutos demonstrando a solucao completa.

Inserir aqui o link do video no YouTube como **nao listado**:

- Link: `ADICIONAR_LINK_DO_VIDEO`

---

## Conclusao

Com este repositorio, a equipe consegue demonstrar uma solucao funcional e didatica para apoio ao diagnostico automatizado em cardiologia, cobrindo desde a extracao basica de sintomas ate a classificacao de risco textual com IA.

Como evolucao futura, o projeto pode incorporar uma base maior de frases, novos modelos de classificacao e integracao com os modulos seguintes do CardioIA.
