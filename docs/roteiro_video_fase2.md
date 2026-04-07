# Roteiro de Video - Fase 2

## Duracao sugerida

Entre 3 e 4 minutos.

## Estrutura sugerida

### 1. Apresentacao do projeto

"Este projeto foi desenvolvido para a atividade Fase 2 do CardioIA, com foco em diagnostico automatizado usando NLP e classificacao de texto na area cardiologica."

### 2. Parte 1 - Extracao de sintomas

Mostrar:

- arquivo `data/frases_sintomas_pacientes.txt`
- arquivo `data/mapa_conhecimento_sintomas_doencas.csv`
- execucao de `src/parte1_extracao_diagnostico.py`

Fala sugerida:

"Na Parte 1, criamos 10 frases simulando relatos de pacientes e um mapa de conhecimento em CSV associando sintomas a possiveis diagnosticos. O script le as frases, identifica sintomas por regras simples e sugere um diagnostico assistido."

### 3. Parte 2 - Classificador de risco

Mostrar:

- arquivo `data/frases_rotuladas_risco.csv`
- notebook `notebooks/parte2_classificador_risco.ipynb` ou script `src/parte2_classificador_risco.py`
- saida com acuracia, matriz de confusao e previsoes

Fala sugerida:

"Na Parte 2, criamos uma base rotulada com frases de alto e baixo risco. Aplicamos TF-IDF para transformar o texto em vetores numericos e treinamos um classificador com Logistic Regression. Depois, avaliamos o desempenho com acuracia e matriz de confusao."

### 4. Governanca e vies

Mostrar o `README.md`.

Fala sugerida:

"Tambem discutimos governanca e vies, porque o projeto lida com saude. Os dados sao simulados, a base e pequena e os resultados nao substituem avaliacao medica. O objetivo aqui e academico e demonstrativo."

### 5. Encerramento

Fala sugerida:

"Com isso, entregamos uma solucao funcional de apoio ao diagnostico textual em cardiologia, alinhada ao enunciado da Fase 2."
