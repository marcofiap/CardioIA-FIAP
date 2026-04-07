from __future__ import annotations

from collections import Counter
from pathlib import Path
import re
import unicodedata

import pandas as pd


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BASE_DIR / "data"
FRASES_PATH = DATA_DIR / "frases_sintomas_pacientes.txt"
MAPA_PATH = DATA_DIR / "mapa_conhecimento_sintomas_doencas.csv"


def normalizar_texto(texto: str) -> str:
    texto_sem_acentos = unicodedata.normalize("NFKD", texto).encode("ascii", "ignore").decode("ascii")
    texto_limpo = re.sub(r"[^a-zA-Z0-9\s]", " ", texto_sem_acentos.lower())
    return re.sub(r"\s+", " ", texto_limpo).strip()


def carregar_frases(path: Path) -> list[str]:
    return [linha.strip() for linha in path.read_text(encoding="utf-8").splitlines() if linha.strip()]


def identificar_diagnosticos(frase: str, mapa: pd.DataFrame) -> dict[str, object]:
    frase_normalizada = normalizar_texto(frase)
    correspondencias: list[tuple[str, str, str]] = []

    for linha in mapa.itertuples(index=False):
        sintomas = []
        for coluna in ("sintoma_1", "sintoma_2"):
            valor = getattr(linha, coluna)
            if isinstance(valor, str) and valor.strip():
                sintomas.append(normalizar_texto(valor))

        sintomas_encontrados = [s for s in sintomas if s and s in frase_normalizada]
        if sintomas_encontrados:
            correspondencias.append((linha.doenca_associada, " | ".join(sintomas_encontrados), frase))

    if not correspondencias:
        return {
            "frase": frase,
            "sintomas_identificados": "nenhum sintoma mapeado",
            "diagnostico_sugerido": "Encaminhar para avaliacao clinica",
            "confianca_regra": 0,
        }

    contagem_doencas = Counter(item[0] for item in correspondencias)
    diagnostico_sugerido, confianca = contagem_doencas.most_common(1)[0]
    sintomas_unicos = sorted({item[1] for item in correspondencias})

    return {
        "frase": frase,
        "sintomas_identificados": "; ".join(sintomas_unicos),
        "diagnostico_sugerido": diagnostico_sugerido,
        "confianca_regra": confianca,
    }


def main() -> None:
    mapa = pd.read_csv(MAPA_PATH)
    frases = carregar_frases(FRASES_PATH)

    resultados = [identificar_diagnosticos(frase, mapa) for frase in frases]
    df_resultados = pd.DataFrame(resultados)

    print("=== Diagnostico Assistido por Regras ===")
    print(df_resultados.to_string(index=False))


if __name__ == "__main__":
    main()
