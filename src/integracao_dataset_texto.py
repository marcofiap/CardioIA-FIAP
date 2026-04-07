from __future__ import annotations

from pathlib import Path

import pandas as pd


BASE_DIR = Path(__file__).resolve().parents[1]
DATASET_PATH = BASE_DIR / "data" / "heart_disease_uci_fiap(in).csv"
MAPEAMENTO_PATH = BASE_DIR / "data" / "mapeamento_dataset_texto.csv"


def carregar_dados() -> tuple[pd.DataFrame, pd.DataFrame]:
    dataset = pd.read_csv(DATASET_PATH)
    mapeamento = pd.read_csv(MAPEAMENTO_PATH)
    return dataset, mapeamento


def calcular_taxa(df: pd.DataFrame, mascara: pd.Series) -> float:
    recorte = df.loc[mascara]
    if recorte.empty:
        return 0.0
    return recorte["target"].mean() * 100


def resumo_indicadores(df: pd.DataFrame) -> pd.DataFrame:
    linhas = [
        {
            "indicador_clinico": "angina_induzida_exercicio",
            "regra_dataset": "exang = 1",
            "qtd_pacientes": int((df["exang"] == 1).sum()),
            "taxa_target_1_percentual": round(calcular_taxa(df, df["exang"] == 1), 2),
        },
        {
            "indicador_clinico": "pressao_arterial_elevada",
            "regra_dataset": "trestbps >= 140",
            "qtd_pacientes": int((df["trestbps"] >= 140).sum()),
            "taxa_target_1_percentual": round(calcular_taxa(df, df["trestbps"] >= 140), 2),
        },
        {
            "indicador_clinico": "colesterol_elevado",
            "regra_dataset": "chol >= 240",
            "qtd_pacientes": int((df["chol"] >= 240).sum()),
            "taxa_target_1_percentual": round(calcular_taxa(df, df["chol"] >= 240), 2),
        },
        {
            "indicador_clinico": "alteracao_isquemica",
            "regra_dataset": "oldpeak > 1",
            "qtd_pacientes": int((df["oldpeak"] > 1).sum()),
            "taxa_target_1_percentual": round(calcular_taxa(df, df["oldpeak"] > 1), 2),
        },
        {
            "indicador_clinico": "idade_maior_risco",
            "regra_dataset": "age >= 60",
            "qtd_pacientes": int((df["age"] >= 60).sum()),
            "taxa_target_1_percentual": round(calcular_taxa(df, df["age"] >= 60), 2),
        },
    ]
    return pd.DataFrame(linhas)


def main() -> None:
    dataset, mapeamento = carregar_dados()
    resumo = resumo_indicadores(dataset)

    print("=== Integracao entre Dataset da Fase 1 e Base Textual da Fase 2 ===")
    print("\nIndicadores clinicos observados no dataset:")
    print(resumo.to_string(index=False))

    print("\nMapeamento de indicadores para expressoes textuais:")
    print(mapeamento.to_string(index=False))


if __name__ == "__main__":
    main()
