from typing import Optional
from fastapi import APIRouter, Query, HTTPException
from app.services import population_service
from app.models.population_model import PopulationResponse

router = APIRouter(tags=["population"])

@router.get("/population", response_model=PopulationResponse)
async def get_population(
    countries: Optional[str] = Query(
        None, 
        description="Comma-separated country codes (e.g., DEU,USA). Use 'ALL' for aggregated data."
    ),
    start_year: int = Query(
        1960, 
        ge=1960, 
        le=2023, 
        description="Start year of population data (1960-2023)."
    ),
    end_year: int = Query(
        2023, 
        ge=1960, 
        le=2023, 
        description="End year of population data (1960-2023)."
    )
):
    if start_year > end_year:
        raise HTTPException(status_code=400, detail="start_year cannot be greater than end_year")

    country_list = [c.strip().upper() for c in countries.split(",")] if countries else []

    try:
        data = population_service.get_population_data(country_list, start_year, end_year)
        return data
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
