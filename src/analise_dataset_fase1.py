from __future__ import annotations

from pathlib import Path

import pandas as pd


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_PATH = BASE_DIR / "data" / "heart_disease_uci_fiap(in).csv"


def carregar_dataset() -> pd.DataFrame:
    return pd.read_csv(DATA_PATH)


def preparar_dataset(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df["sexo_label"] = df["sex"].map({0: "feminino", 1: "masculino"}).fillna("nao informado")
    df["faixa_etaria"] = pd.cut(
        df["age"],
        bins=[0, 39, 49, 59, 69, 120],
        labels=["ate 39", "40-49", "50-59", "60-69", "70+"],
        include_lowest=True,
    )
    return df


def exibir_resumo_geral(df: pd.DataFrame) -> None:
    print("=== Resumo Geral do Dataset da Fase 1 ===")
    print(f"Linhas: {df.shape[0]}")
    print(f"Colunas: {df.shape[1]}")
    print("\nDistribuicao da variavel target:")
    print(df["target"].value_counts().rename(index={0: "sem doenca", 1: "com doenca"}).to_string())


def exibir_estatisticas_clinicas(df: pd.DataFrame) -> None:
    colunas = ["age", "trestbps", "chol", "thalach", "oldpeak"]
    print("\n=== Estatisticas Clinicas ===")
    print(df[colunas].agg(["mean", "median", "min", "max"]).round(2).to_string())


def exibir_analise_vies(df: pd.DataFrame) -> None:
    sexo = (
        df.groupby("sexo_label", observed=False)["target"]
        .agg(["count", "mean"])
        .rename(columns={"count": "qtd_pacientes", "mean": "taxa_doenca"})
    )
    sexo["taxa_doenca"] = (sexo["taxa_doenca"] * 100).round(2)

    faixa = (
        df.groupby("faixa_etaria", observed=False)["target"]
        .agg(["count", "mean"])
        .rename(columns={"count": "qtd_pacientes", "mean": "taxa_doenca"})
    )
    faixa["taxa_doenca"] = (faixa["taxa_doenca"] * 100).round(2)

    print("\n=== Analise por Sexo ===")
    print(sexo.to_string())

    print("\n=== Analise por Faixa Etaria ===")
    print(faixa.to_string())


def exibir_indicadores_risco(df: pd.DataFrame) -> None:
    indicadores = {
        "pressao_alta_repouso_maior_ou_igual_140": (df["trestbps"] >= 140).mean() * 100,
        "colesterol_maior_ou_igual_240": (df["chol"] >= 240).mean() * 100,
        "angina_induzida_exercicio": (df["exang"] == 1).mean() * 100,
        "glicemia_jejum_alta": (df["fbs"] == 1).mean() * 100,
    }

    print("\n=== Indicadores de Risco no Dataset ===")
    for nome, valor in indicadores.items():
        print(f"{nome}: {valor:.2f}%")


def main() -> None:
    df = preparar_dataset(carregar_dataset())
    exibir_resumo_geral(df)
    exibir_estatisticas_clinicas(df)
    exibir_analise_vies(df)
    exibir_indicadores_risco(df)


if __name__ == "__main__":
    main()
