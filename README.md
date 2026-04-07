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

- nas apostilas da FIAP disponiveis em `docs/apostilas_aulas/`;
- no arquivo `docs/sintomas_e_remomendacoes_cardio`;
- no arquivo `docs/taxa_sobrevivencia_taxa_reinter`;
- no dataset `data/heart_disease_uci_fiap(in).csv`, reaproveitado da Fase 1.

Importante: os diagnosticos sugeridos neste projeto sao **simulacoes academicas** e nao substituem avaliacao medica real.

---

## Resumo da Entrega

Esta entrega foi organizada em tres blocos complementares:

- analise do dataset clinico da Fase 1 com foco em distribuicao, fatores de risco e vies;
- extracao de sintomas e sugestao de diagnostico assistido por regras;
- classificacao textual de risco com `TF-IDF` e `LogisticRegression`.

Assim, o projeto atende ao enunciado ao combinar:

- dados clinicos estruturados;
- relatos textuais simulados;
- classificacao automatizada;
- reflexao sobre governanca e vies em saude.

---

## Objetivo da Atividade

Desenvolver uma solucao simples de IA aplicada a saude cardiovascular, contemplando:

- uso do dataset numerico da Fase 1 como base clinica do projeto;
- extracao de sintomas em frases clinicas;
- associacao entre sintomas e possiveis doencas;
- classificacao de frases em `alto risco` e `baixo risco`;
- uso de `TF-IDF` e modelo supervisionado com `scikit-learn`;
- reflexao sobre vies, governanca de dados e uso responsavel de IA em saude.

---

## Estrutura do Repositorio

```text
.
|-- data
|   |-- heart_disease_uci_fiap(in).csv
|   |-- frases_rotuladas_risco.csv
|   |-- frases_sintomas_pacientes.txt
|   |-- mapeamento_dataset_texto.csv
|   `-- mapa_conhecimento_sintomas_doencas.csv
|-- docs
|   |-- apostilas_aulas/
|   |-- roteiro_video_fase2.md
|   |-- sintomas_e_remomendacoes_cardio
|   `-- taxa_sobrevivencia_taxa_reinter
|-- notebooks
|   |-- analise_dataset_fase1.ipynb
|   |-- parte1_extracao_diagnostico.ipynb
|   `-- parte2_classificador_risco.ipynb
|-- src
|   |-- analise_dataset_fase1.py
|   |-- integracao_dataset_texto.py
|   |-- parte1_extracao_diagnostico.py
|   `-- parte2_classificador_risco.py
|-- requirements.txt
`-- README.md
```

---

## Integracao com o Dataset da Fase 1

### Entregaveis

- `data/heart_disease_uci_fiap(in).csv`
- `data/mapeamento_dataset_texto.csv`
- `src/analise_dataset_fase1.py`
- `src/integracao_dataset_texto.py`
- `notebooks/analise_dataset_fase1.ipynb`

### Descricao

Para aderir ao enunciado, a Fase 2 utiliza explicitamente o dataset numerico da Fase 1. Esse CSV foi usado para:

- analisar a distribuicao de pacientes com e sem doenca cardiaca;
- observar variaveis clinicas relevantes como idade, pressao arterial, colesterol, frequencia cardiaca maxima e `oldpeak`;
- discutir vies e representatividade por sexo e faixa etaria;
- reforcar o contexto clinico do modulo textual desenvolvido nesta fase;
- construir um mapeamento explicito entre indicadores clinicos do dataset e expressoes textuais usadas nas frases e na classificacao de risco.

### Execucao

```bash
python src/analise_dataset_fase1.py
python src/integracao_dataset_texto.py
```

Para apresentacao em notebook:

```bash
python -m notebook notebooks/analise_dataset_fase1.ipynb
```

---

## Parte 1 - Extracao de Informacoes e Diagnostico Assistido

### Entregaveis

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
python -m notebook notebooks/parte1_extracao_diagnostico.ipynb
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
python -m notebook notebooks/parte2_classificador_risco.ipynb
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

### Base numerica da Fase 1

O dataset `heart_disease_uci_fiap(in).csv` foi incorporado como base clinica estruturada do projeto. Com isso, a entrega passa a combinar:

- dados clinicos estruturados da Fase 1;
- dados textuais simulados da Fase 2;
- relacao explicita entre indicadores do dataset e expressoes textuais do modulo NLP;
- discussao de vies e governanca em saude.

### Base conceitual das apostilas

As apostilas da FIAP apoiaram principalmente os topicos de:

- NLP e classificacao de texto;
- estruturacao de dados para IA;
- etica, governanca e responsabilidade no uso de modelos.

---

## Governanca de Dados e Vies

Como a atividade envolve saude, alguns cuidados foram considerados:

- uso exclusivamente academico e demonstrativo;
- dados simulados e textos sem identificacao pessoal;
- volume reduzido de exemplos, o que limita generalizacao;
- diagnosticos baseados em regras simples, sem validacao clinica;
- necessidade de revisao humana e interpretacao critica dos resultados.

A analise do dataset da Fase 1 tambem permitiu observar representatividade por sexo e faixa etaria, reforcando a necessidade de desenvolver sistemas rastreaveis, auditaveis e usados com cautela.

---

## Como Reproduzir o Projeto

### Pre-requisitos

- Python 3.12 ou superior
- `pandas`
- `numpy`
- `scikit-learn`
- `jupyter` para executar os notebooks

Instalacao rapida:

```bash
pip install -r requirements.txt
```

### Comandos principais

```bash
python src/analise_dataset_fase1.py
python src/integracao_dataset_texto.py
python src/parte1_extracao_diagnostico.py
python src/parte2_classificador_risco.py
```

---

## Resultados Obtidos

### Analise do dataset da Fase 1

Na analise local do arquivo `heart_disease_uci_fiap(in).csv`, foram observados:

- `303` registros de pacientes
- `165` casos com doenca cardiaca (`target = 1`)
- `138` casos sem doenca cardiaca (`target = 0`)

Esses dados foram usados para contextualizar a Fase 2 e sustentar a discussao sobre fatores clinicos e vies.

### Ponte entre dataset e modulo textual

Foi criado o arquivo `mapeamento_dataset_texto.csv` para documentar como sinais clinicos do dataset da Fase 1 foram refletidos nas expressoes textuais da Fase 2, como por exemplo:

- `exang = 1` -> `dor no peito ao esforco` e `falta de ar ao esforco`
- `trestbps >= 140` -> `pressao alta`
- `oldpeak > 1` -> `dor no peito em aperto`

Isso reforca que a parte textual nao foi criada sem contexto clinico, mas orientada pelos dados estruturados da Fase 1.

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

Para facilitar a gravacao, foi incluido um roteiro em:

- `docs/roteiro_video_fase2.md`

Inserir aqui o link do video no YouTube como **nao listado**:

- Link: `ADICIONAR_LINK_DO_VIDEO`

---

## Checklist do Enunciado

Itens atendidos neste repositorio:

- analise do dataset reaproveitado da Fase 1
- ponte documentada entre o dataset da Fase 1 e a base textual da Fase 2
- arquivo `.txt` com 10 frases completas de sintomas
- arquivo `.csv` com mapa de conhecimento entre sintomas e diagnosticos
- codigo Python para leitura das frases, extracao de sintomas e sugestao de diagnostico
- arquivo `.csv` com frases e rotulos de risco
- notebook `.ipynb` para a extracao e diagnostico assistido
- notebook `.ipynb` para a classificacao com TF-IDF
- documentacao principal no `README.md`

Itens que dependem da equipe fora deste workspace:

- gravar o video e subir no YouTube como nao listado
- substituir `ADICIONAR_LINK_DO_VIDEO` pelo link final

---

## Relacao com os Criterios de Avaliacao

- `Relatos e mapa de conhecimento organizados`: atendido com `frases_sintomas_pacientes.txt` e `mapa_conhecimento_sintomas_doencas.csv`
- `Codigo de extracao de informacoes funcional`: atendido com `parte1_extracao_diagnostico.py` e notebook correspondente
- `Dataset simples criado corretamente`: atendido com `frases_rotuladas_risco.csv`
- `Classificador treinado e testado corretamente`: atendido com `parte2_classificador_risco.py` e `parte2_classificador_risco.ipynb`
- `Documentacao clara e repositorio publico no GitHub com README completo`: atendido neste repositorio
- `Video de demonstracao no YouTube`: pendente apenas a gravacao e inclusao do link final

---

## Conclusao

Com este repositorio, a equipe consegue demonstrar uma solucao funcional e didatica para apoio ao diagnostico automatizado em cardiologia, cobrindo a base numerica da Fase 1, a extracao basica de sintomas e a classificacao de risco textual com IA.

Como evolucao futura, o projeto pode incorporar uma base maior de frases, novos modelos de classificacao e integracao com os modulos seguintes do CardioIA.
