from __future__ import annotations

from pathlib import Path

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_PATH = BASE_DIR / "data" / "frases_rotuladas_risco.csv"


def carregar_dataset() -> pd.DataFrame:
    return pd.read_csv(DATA_PATH)


def treinar_classificador(df: pd.DataFrame) -> tuple[Pipeline, pd.Series, pd.Series]:
    X_train, X_test, y_train, y_test = train_test_split(
        df["frase"],
        df["situacao"],
        test_size=0.3,
        random_state=42,
        stratify=df["situacao"],
    )

    pipeline = Pipeline(
        steps=[
            ("tfidf", TfidfVectorizer(ngram_range=(1, 2), strip_accents="unicode")),
            ("modelo", LogisticRegression(max_iter=1000)),
        ]
    )

    pipeline.fit(X_train, y_train)
    previsoes = pipeline.predict(X_test)
    return pipeline, y_test, pd.Series(previsoes, index=y_test.index)


def exibir_resultados(y_test: pd.Series, previsoes: pd.Series) -> None:
    acuracia = accuracy_score(y_test, previsoes)
    matriz = confusion_matrix(y_test, previsoes, labels=["alto risco", "baixo risco"])
    relatorio = classification_report(y_test, previsoes)

    print("=== Classificador de Risco Cardiologico ===")
    print(f"Acuracia: {acuracia:.2%}")
    print("\nMatriz de confusao [alto risco, baixo risco]:")
    print(matriz)
    print("\nRelatorio de classificacao:")
    print(relatorio)


def testar_novas_frases(modelo: Pipeline) -> None:
    novas_frases = [
        "dor no peito com suor frio e falta de ar",
        "leve cansaco muscular depois de uma caminhada",
        "palpitacoes com tontura e quase desmaio",
    ]
    previsoes = modelo.predict(novas_frases)

    print("\nPrevisoes em frases novas:")
    for frase, risco in zip(novas_frases, previsoes):
        print(f"- {frase} -> {risco}")


def main() -> None:
    df = carregar_dataset()
    modelo, y_test, previsoes = treinar_classificador(df)
    exibir_resultados(y_test, previsoes)
    testar_novas_frases(modelo)


if __name__ == "__main__":
    main()
