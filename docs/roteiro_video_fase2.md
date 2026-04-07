# Roteiro de Video - Fase 2

## Duracao sugerida

Entre 3 e 4 minutos.

## Objetivo do video

Demonstrar que a entrega atende ao enunciado da Fase 2, combinando:

- uso do dataset da Fase 1;
- extracao de sintomas em frases textuais;
- sugestao de diagnostico assistido;
- classificacao de risco com IA;
- discussao de vies e governanca em saude.

## Estrutura sugerida

### 1. Apresentacao do projeto

Mostrar:

- repositorio no GitHub
- titulo do projeto no `README.md`

Fala sugerida:

"Este projeto foi desenvolvido para a atividade Fase 2 do CardioIA, com foco em diagnostico automatizado em cardiologia. A solucao combina o dataset clinico da Fase 1 com modulos de NLP e classificacao de texto desenvolvidos nesta fase."

### 2. Integracao com o dataset da Fase 1

Mostrar:

- arquivo `data/heart_disease_uci_fiap(in).csv`
- script `src/analise_dataset_fase1.py` ou notebook `notebooks/analise_dataset_fase1.ipynb`
- saida da analise com quantidade de registros, distribuicao do `target` e recorte por sexo ou faixa etaria

Fala sugerida:

"Primeiro, reaproveitamos o dataset da Fase 1 para manter coerencia com o enunciado. Fizemos uma analise exploratoria do arquivo clinico, observando distribuicao dos pacientes, variaveis relevantes e possiveis vies por sexo e faixa etaria."

### 3. Parte 1 - Extracao de sintomas e diagnostico assistido

Mostrar:

- arquivo `data/frases_sintomas_pacientes.txt`
- arquivo `data/mapa_conhecimento_sintomas_doencas.csv`
- execucao de `src/parte1_extracao_diagnostico.py`

Fala sugerida:

"Na Parte 1, criamos 10 frases simulando relatos de pacientes e um mapa de conhecimento em CSV associando sintomas a possiveis diagnosticos. O script le as frases, identifica sintomas por regras simples e sugere um diagnostico assistido."

### 4. Parte 2 - Classificador de risco

Mostrar:

- arquivo `data/frases_rotuladas_risco.csv`
- notebook `notebooks/parte2_classificador_risco.ipynb` ou script `src/parte2_classificador_risco.py`
- saida com acuracia, matriz de confusao e previsoes

Fala sugerida:

"Na Parte 2, criamos uma base rotulada com frases de alto e baixo risco. Aplicamos TF-IDF para transformar o texto em vetores numericos e treinamos um classificador com Logistic Regression. Depois, avaliamos o desempenho com acuracia, matriz de confusao e previsoes em frases novas."

### 5. Governanca e vies

Mostrar:

- secao de governanca no `README.md`
- secao de analise do dataset da Fase 1

Fala sugerida:

"Tambem discutimos governanca e vies, porque o projeto lida com saude. O dataset da Fase 1 ajudou a analisar representatividade e contexto clinico, enquanto os dados textuais desta fase sao simulados e usados apenas para fins academicos."

### 6. Encerramento

Mostrar:

- secao `Checklist do Enunciado` no `README.md`

Fala sugerida:

"Com isso, entregamos uma solucao funcional alinhada ao enunciado da Fase 2, integrando dados estruturados, extracao de sintomas, diagnostico assistido, classificacao de risco e reflexao sobre vies em saude."

## Ordem pratica de gravacao

1. Abrir o `README.md` e apresentar o projeto.
2. Mostrar o CSV `heart_disease_uci_fiap(in).csv` e a analise da Fase 1.
3. Mostrar os arquivos da Parte 1 e executar o script de extracao.
4. Mostrar a base rotulada e executar a classificacao da Parte 2.
5. Encerrar no `README.md`, destacando criterios de avaliacao e checklist.
