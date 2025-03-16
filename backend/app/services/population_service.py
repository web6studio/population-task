from typing import List, Dict, Any
import pandas as pd
from app.utils.data_loader import load_csv_data
from app.config import settings

# Load the dataset once at startup
DATA_DF = load_csv_data(settings.DATA_FILE_PATH, delimiter='\t')

# Ensure year-columns are numeric
year_columns = [col for col in DATA_DF.columns if col.isdigit()]
DATA_DF[year_columns] = DATA_DF[year_columns].apply(pd.to_numeric, errors='coerce').fillna(0).astype(int)

def get_years_range(start_year: int, end_year: int) -> List[int]:
    return list(range(start_year, end_year + 1))

def get_population_data(countries: List[str], start_year: int, end_year: int) -> Dict[str, Any]:
    years = get_years_range(start_year, end_year)
    country_groups = []

    filtered_df = DATA_DF if not countries else DATA_DF[DATA_DF["Country Code"].isin(countries)]

    if filtered_df.empty:
        return {
            "years": years,
            "countries": []
        }

    for row in filtered_df.to_dict(orient="records"):
        data = [row.get(str(year), None) for year in years]
        country_groups.append({
            "code": row["Country Code"],
            "name": row["Country Name"],
            "data": data
        })

    return {
        "years": years,
        "countries": country_groups
    }
