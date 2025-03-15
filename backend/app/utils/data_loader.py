import pandas as pd

def load_csv_data(file_path: str, delimiter: str = ',') -> pd.DataFrame:
    try:
        return pd.read_csv(file_path, delimiter=delimiter)
    except Exception as e:
        raise RuntimeError(f"Error loading CSV/TSV data: {e}")
