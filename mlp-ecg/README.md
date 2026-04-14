# Ir Alem 2 - Diagnostico Visual em Cardiologia com MLP

Este modulo contem a entrega do `Ir Alem 2`, focada na classificacao binaria de ECG com rede neural `MLP`.

## Objetivo

Treinar uma rede neural `MLP` com `Keras` para classificar exames como:

- `normal`
- `anormal`

Usamos o dataset recomendado no enunciado, `heartbeat`, publicado por Shayan Fazeli no Kaggle. Como essa base e distribuida em arquivos `CSV` com sinais de ECG, o notebook converte cada batimento para uma representacao visual em tons de cinza antes do treinamento. Assim, mantemos o uso do dataset oficial recomendado e, ao mesmo tempo, atendemos ao foco do `Ir Alem 2` em diagnostico visual.

## Estrutura

```text
mlp-ecg/
|-- assets/
|   `-- examples/
|       |-- ecg_abnormal_exemplo.svg
|       `-- ecg_normal_exemplo.svg
|-- data/
|   `-- heartbeat/
|       |-- ptbdb_abnormal.csv
|       `-- ptbdb_normal.csv
|-- notebooks/
|   `-- ir_alem_2_mlp_ecg.ipynb
`-- README.md
```

## Dataset Utilizado

Dataset utilizado no modulo:

- `heartbeat`, de Shayan Fazeli no Kaggle:
  https://www.kaggle.com/datasets/shayanfazeli/heartbeat

Arquivos esperados para este notebook:

- `mlp-ecg/data/heartbeat/ptbdb_normal.csv`
- `mlp-ecg/data/heartbeat/ptbdb_abnormal.csv`

Observacao:

- os arquivos de dados nao foram versionados no Git por causa do tamanho;
- a pasta `mlp-ecg/data/heartbeat/` esta no `.gitignore`;
- basta baixar o dataset no Kaggle e copiar os dois arquivos acima para essa pasta local.

## Download no Windows

Para baixar o dataset localmente no Windows, foi utilizado `curl` diretamente no endpoint de download do Kaggle.

Comando usado:

```powershell
curl.exe -L "https://www.kaggle.com/api/v1/datasets/download/shayanfazeli/heartbeat" -o "mlp-ecg\data\heartbeat\heartbeat.zip"
```

Depois disso, o arquivo `.zip` pode ser extraido na mesma pasta para disponibilizar:

- `ptbdb_normal.csv`
- `ptbdb_abnormal.csv`
- `mitbih_train.csv`
- `mitbih_test.csv`

Neste projeto, essa foi a forma utilizada para obter a base localmente no ambiente Windows.

## Como Este Projeto Trata o Aspecto Visual

Embora o dataset recomendado venha em `CSV`, cada linha representa um sinal de ECG. No notebook, cada sinal e transformado em uma imagem `64x64` em escala de cinza, criando uma entrada visual compativel com a proposta do `Ir Alem 2`.

Isso nos permite afirmar no projeto que:

- usamos exatamente o dataset recomendado no enunciado;
- realizamos preprocessamento visual dos sinais;
- treinamos uma `MLP` sobre a representacao visual gerada.

## O Que o Notebook Faz

O notebook `mlp-ecg/notebooks/ir_alem_2_mlp_ecg.ipynb` executa o fluxo completo:

1. le os sinais `ptbdb_normal.csv` e `ptbdb_abnormal.csv`;
2. balanceia as classes para manter o notebook leve;
3. converte cada sinal de ECG em imagem `64x64` em tons de cinza;
4. normaliza os pixels para o intervalo `[0, 1]`;
5. achata as imagens para entrada em uma `MLP`;
6. treina a rede com `Keras`;
7. avalia com acuracia, matriz de confusao e relatorio de classificacao.

## Como Executar

Instale as dependencias do projeto:

```bash
pip install -r requirements.txt
```

Abra o notebook:

```bash
jupyter notebook mlp-ecg/notebooks/ir_alem_2_mlp_ecg.ipynb
```

## Resultado Esperado

Ao executar o notebook com os arquivos do dataset na pasta indicada, voce tera:

- preprocessamento completo dos sinais de ECG;
- visualizacao dos sinais convertidos em imagem;
- treinamento da rede `MLP`;
- acuracia final no conjunto de teste;
- previsoes para exames normais e anormais.

## Exemplos de Imagens

Foram incluidos exemplos ilustrativos em:

- `mlp-ecg/assets/examples/ecg_normal_exemplo.svg`
- `mlp-ecg/assets/examples/ecg_abnormal_exemplo.svg`

Essas imagens servem para documentar visualmente o tipo de padrao trabalhado no projeto e ajudar na apresentacao do repositorio e do video.

## Entregaveis Atendidos

- notebook comentado e funcional
- README explicativo
- exemplos de imagens de ECG no repositorio
- estrutura pronta para treino e avaliacao com MLP em Keras

## Video

Adicionar no README principal ou neste modulo o link do video no YouTube como `nao listado`:

- Link: `ADICIONAR_LINK_DO_VIDEO`
