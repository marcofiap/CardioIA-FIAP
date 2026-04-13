# Faculdade de Informática e Administração Paulista

<p align="center">
  <img src="https://github.com/Luiz-FIAP/Fase_06_Cap_1_Despertar_da_Rede_Neural/blob/main/Ir_alem2/docs/examples/logo-fiap.png?raw=true" width="45%">
</p>

<h1 align="center">CardioIA - Fase 2: Diagnóstico Automatizado</h1>

<p align="center">
  <strong>FIAP | Tecnólogo em Inteligência Artificial | Fase 2 | Capítulo 1</strong>
</p>

---

## Equipe

### Grupo 3

| Integrante | GitHub |
|---|---|
| Felipe Sabino da Silva | [@FelipeSabinoTMRS](https://github.com/FelipeSabinoTMRS) |
| Juan Felipe Voltolini | [@juanvoltolini-rm562890](https://github.com/juanvoltolini-rm562890) |
| Luiz Henrique Ribeiro de Oliveira | [@Luiz-FIAP](https://github.com/Luiz-FIAP) |
| Marco Aurélio Eberhardt Assimpção | [@marcofiap](https://github.com/marcofiap) |
| Paulo Henrique Senise | [@PauloSenise](https://github.com/PauloSenise) |

---

## Introdução

Este repositório reúne os entregáveis da atividade **Fase 2: Diagnóstico Automatizado - IA no Estetoscópio Digital**, parte do projeto **CardioIA**.

Nesta etapa, a proposta é simular um módulo inteligente de apoio ao diagnóstico cardiológico, utilizando processamento de texto, classificação supervisionada e análise básica de risco clínico a partir de descrições curtas de sintomas.

O trabalho foi desenvolvido com base:

- no arquivo `docs/sintomas_e_remomendacoes_cardio`;
- no arquivo `docs/taxa_sobrevivencia_taxa_reinter`;
- no dataset `data/heart_disease_uci_fiap(in).csv`, reaproveitado da Fase 1.

Importante: os diagnósticos sugeridos neste projeto são **simulações acadêmicas** e não substituem avaliação médica real.

---

## Resumo da Entrega

Esta entrega foi organizada em três blocos complementares:

- análise do dataset clínico da Fase 1 com foco em distribuição, fatores de risco e vieses;
- extração de sintomas e sugestão de diagnóstico assistido por regras;
- classificação textual de risco com `TF-IDF` e `LogisticRegression`.

Assim, o projeto atende ao enunciado ao combinar:

- dados clínicos estruturados;
- relatos textuais simulados;
- classificação automatizada;
- reflexão sobre governança e vieses em saúde.

---

## Organização do Repositório

Este repositório foi preparado para concentrar a atividade principal da Fase 2 e também os dois módulos `Ir Além` no mesmo projeto.

- `data/`, `src/` e `notebooks/`: atividade principal da Fase 2
- `frontend/`: estrutura reservada para o Ir Além 1
- `mlp-ecg/`: estrutura reservada para o Ir Além 2

Documentações complementares:

- `frontend/README.md`: orientações específicas do Ir Além 1
- `mlp-ecg/README.md`: orientações específicas do Ir Além 2

---

## Objetivo da Atividade

Desenvolver uma solução simples de IA aplicada à saúde cardiovascular, contemplando:

- uso do dataset numérico da Fase 1 como base clínica do projeto;
- extração de sintomas em frases clínicas;
- associação entre sintomas e possíveis doenças;
- classificação de frases em `alto risco` e `baixo risco`;
- uso de `TF-IDF` e modelo supervisionado com `scikit-learn`;
- reflexão sobre vieses, governança de dados e uso responsável de IA em saúde.

---

## Estrutura do Repositório

```text
.
|-- data
|   |-- heart_disease_uci_fiap(in).csv
|   |-- frases_rotuladas_risco.csv
|   |-- frases_sintomas_pacientes.txt
|   |-- mapeamento_dataset_texto.csv
|   `-- mapa_conhecimento_sintomas_doencas.csv
|-- docs
|   |-- roteiro_video_fase2.md
|   |-- sintomas_e_remomendacoes_cardio
|   `-- taxa_sobrevivencia_taxa_reinter
|-- frontend
|   |-- components/
|   |-- contexts/
|   |-- pages/
|   |-- services/
|   `-- README.md
|-- mlp-ecg
|   |-- assets/
|   |-- data/
|   |-- notebooks/
|   `-- README.md
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

## Escopo por Bloco

### Atividade principal

Esta parte já contempla:

- uso do dataset da Fase 1;
- extração de sintomas e diagnóstico assistido;
- classificação textual de risco;
- análise de vieses e documentação principal.

### Ir Além 1

Esta parte será desenvolvida em `frontend/` e deverá conter:

- React + Vite;
- Context API;
- autenticação simulada;
- proteção de rotas;
- listagem de pacientes;
- agendamento de consultas;
- dashboard.

### Ir Além 2

Esta parte será desenvolvida em `mlp-ecg/` e deverá conter:

- notebook de imagens de ECG;
- pré-processamento;
- MLP com Keras;
- treinamento e avaliação;
- exemplos de imagens.

---

## Integração com o Dataset da Fase 1

### Entregáveis

- `data/heart_disease_uci_fiap(in).csv`
- `data/mapeamento_dataset_texto.csv`
- `src/analise_dataset_fase1.py`
- `src/integracao_dataset_texto.py`
- `notebooks/analise_dataset_fase1.ipynb`

### Descrição

Para aderir ao enunciado, a Fase 2 utiliza explicitamente o dataset numérico da Fase 1. Esse CSV foi usado para:

- analisar a distribuição de pacientes com e sem doença cardíaca;
- observar variáveis clínicas relevantes como idade, pressão arterial, colesterol, frequência cardíaca máxima e `oldpeak`;
- discutir vieses e representatividade por sexo e faixa etária;
- reforçar o contexto clínico do módulo textual desenvolvido nesta fase;
- construir um mapeamento explícito entre indicadores clínicos do dataset e expressões textuais usadas nas frases e na classificação de risco.

### Execução

```bash
python src/analise_dataset_fase1.py
python src/integracao_dataset_texto.py
```

Para apresentação em notebook:

```bash
python -m notebook notebooks/analise_dataset_fase1.ipynb
```

---

## Parte 1 - Extração de Informações e Diagnóstico Assistido

### Entregáveis

- `data/frases_sintomas_pacientes.txt`
- `data/mapa_conhecimento_sintomas_doencas.csv`
- `src/parte1_extracao_diagnostico.py`
- `notebooks/parte1_extracao_diagnostico.ipynb`

### Descrição

Nesta parte, foi criada uma base com 10 frases completas simulando relatos de pacientes. As frases incluem sintomas, tempo de início e impacto na rotina, conforme solicitado no enunciado.

Também foi criado um mapa de conhecimento em CSV relacionando sintomas a possíveis diagnósticos, incluindo:

- Infarto Agudo do Miocárdio
- Angina
- Insuficiência Cardíaca
- Arritmia
- Hipertensão

O script Python realiza:

- leitura do arquivo `.txt` com os relatos;
- normalização do texto, removendo acentos e pontuação;
- identificação de sintomas por regras simples;
- sugestão de diagnóstico assistido com base no mapa de conhecimento.

### Execução

```bash
python src/parte1_extracao_diagnostico.py
```

Para apresentação em notebook:

```bash
python -m notebook notebooks/parte1_extracao_diagnostico.ipynb
```

---

## Parte 2 - Classificador Básico de Texto

### Entregáveis

- `data/frases_rotuladas_risco.csv`
- `src/parte2_classificador_risco.py`
- `notebooks/parte2_classificador_risco.ipynb`

### Descrição

Foi criada uma base simulada com frases médicas rotuladas como:

- `alto risco`
- `baixo risco`

O classificador utiliza:

- `TF-IDF` para vetorização textual;
- `LogisticRegression` do `scikit-learn` como modelo supervisionado;
- divisão entre treino e teste com `train_test_split`;
- avaliação por acurácia, matriz de confusão e relatório de classificação.

Na validação local do script, a solução alcançou **90% de acurácia** no conjunto de teste utilizado nesta versão do projeto.

### Execução

```bash
python src/parte2_classificador_risco.py
```

Para apresentação em notebook:

```bash
python -m notebook notebooks/parte2_classificador_risco.ipynb
```

---

## Bases Utilizadas

### Base textual

Os textos `docs/sintomas_e_remomendacoes_cardio` e `docs/taxa_sobrevivencia_taxa_reinter` foram usados como referência para:

- sintomas isquêmicos;
- dispneia e síncope;
- fatores de risco cardiovascular;
- mortalidade e readmissão;
- contexto clínico e epidemiológico.

### Base numérica da Fase 1

O dataset `heart_disease_uci_fiap(in).csv` foi incorporado como base clínica estruturada do projeto. Com isso, a entrega passa a combinar:

- dados clínicos estruturados da Fase 1;
- dados textuais simulados da Fase 2;
- relação explícita entre indicadores do dataset e expressões textuais do módulo NLP;
- discussão de vieses e governança em saúde.

---

## Governança de Dados e Vieses

Como a atividade envolve saúde, alguns cuidados foram considerados:

- uso exclusivamente acadêmico e demonstrativo;
- dados simulados e textos sem identificação pessoal;
- volume reduzido de exemplos, o que limita generalização;
- diagnósticos baseados em regras simples, sem validação clínica;
- necessidade de revisão humana e interpretação crítica dos resultados.

A análise do dataset da Fase 1 também permitiu observar representatividade por sexo e faixa etária, reforçando a necessidade de desenvolver sistemas rastreáveis, auditáveis e usados com cautela.

---

## Como Reproduzir o Projeto

### Pré-requisitos

- Python 3.12 ou superior
- `pandas`
- `numpy`
- `scikit-learn`
- `jupyter` para executar os notebooks

Instalação rápida:

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

### Análise do dataset da Fase 1

Na análise local do arquivo `heart_disease_uci_fiap(in).csv`, foram observados:

- `303` registros de pacientes;
- `165` casos com doença cardíaca (`target = 1`);
- `138` casos sem doença cardíaca (`target = 0`).

Esses dados foram usados para contextualizar a Fase 2 e sustentar a discussão sobre fatores clínicos e vieses.

### Ponte entre dataset e módulo textual

Foi criado o arquivo `mapeamento_dataset_texto.csv` para documentar como sinais clínicos do dataset da Fase 1 foram refletidos nas expressões textuais da Fase 2, como por exemplo:

- `exang = 1` -> `dor no peito ao esforço` e `falta de ar ao esforço`
- `trestbps >= 140` -> `pressão alta`
- `oldpeak > 1` -> `dor no peito em aperto`

Isso reforça que a parte textual não foi criada sem contexto clínico, mas orientada pelos dados estruturados da Fase 1.

### Parte 1 - Diagnóstico assistido por regras

Exemplos de diagnósticos sugeridos pelo script:

- "dor no peito em aperto, irradiando para o braço esquerdo" -> `Infarto Agudo do Miocárdio`
- "fadiga constante, inchaço nas pernas e dificuldade para dormir deitado" -> `Insuficiência Cardíaca`
- "palpitações fortes, batimentos irregulares e tontura" -> `Arritmia`

Esses resultados mostram que a ontologia simples em CSV consegue identificar sintomas relevantes e associar cada frase a um diagnóstico provável de forma transparente.

### Parte 2 - Classificação de risco textual

Na validação local do classificador, foi obtido o seguinte resultado:

- Acurácia: `90.00%`

Resumo da matriz de confusão:

- 4 frases de `alto risco` classificadas corretamente
- 1 frase de `alto risco` classificada incorretamente
- 5 frases de `baixo risco` classificadas corretamente

Exemplos de previsões com frases novas:

- "dor no peito com suor frio e falta de ar" -> `alto risco`
- "leve cansaço muscular depois de uma caminhada" -> `baixo risco`
- "palpitações com tontura e quase desmaio" -> `alto risco`

Esses resultados indicam que o modelo consegue diferenciar frases com sinais clínicos mais graves de relatos menos críticos dentro do escopo reduzido e acadêmico da atividade.

---

## Entrega em Vídeo

O enunciado exige um vídeo de até 4 minutos demonstrando a solução completa.

Para facilitar a gravação, foi incluído um roteiro em:

- `docs/roteiro_video_fase2.md`

Inserir aqui o link do vídeo no YouTube como **não listado**:

- Link: `ADICIONAR_LINK_DO_VIDEO`

---

## Checklist do Enunciado

Itens atendidos neste repositório:

- análise do dataset reaproveitado da Fase 1
- ponte documentada entre o dataset da Fase 1 e a base textual da Fase 2
- arquivo `.txt` com 10 frases completas de sintomas
- arquivo `.csv` com mapa de conhecimento entre sintomas e diagnósticos
- código Python para leitura das frases, extração de sintomas e sugestão de diagnóstico
- arquivo `.csv` com frases e rótulos de risco
- notebook `.ipynb` para a extração e diagnóstico assistido
- notebook `.ipynb` para a classificação com TF-IDF
- documentação principal no `README.md`

Itens que dependem da equipe fora deste workspace:

- gravar o vídeo e subir no YouTube como não listado
- substituir `ADICIONAR_LINK_DO_VIDEO` pelo link final

---

## Relação com os Critérios de Avaliação

- `Relatos e mapa de conhecimento organizados`: atendido com `frases_sintomas_pacientes.txt` e `mapa_conhecimento_sintomas_doencas.csv`
- `Código de extração de informações funcional`: atendido com `parte1_extracao_diagnostico.py` e notebook correspondente
- `Dataset simples criado corretamente`: atendido com `frases_rotuladas_risco.csv`
- `Classificador treinado e testado corretamente`: atendido com `parte2_classificador_risco.py` e `parte2_classificador_risco.ipynb`
- `Documentação clara e repositório público no GitHub com README completo`: atendido neste repositório
- `Vídeo de demonstração no YouTube`: pendente apenas a gravação e inclusão do link final

---

## Conclusão

Com este repositório, a equipe consegue demonstrar uma solução funcional e didática para apoio ao diagnóstico automatizado em cardiologia, cobrindo a base numérica da Fase 1, a extração básica de sintomas e a classificação de risco textual com IA.

Como evolução futura, o projeto pode incorporar uma base maior de frases, novos modelos de classificação e integração com os módulos seguintes do CardioIA.
