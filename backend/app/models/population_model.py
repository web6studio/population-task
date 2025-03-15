from typing import List, Union
from pydantic import BaseModel

class CountryPopulation(BaseModel):
    code: str
    name: str
    data: List[Union[int, None]]  # Population numbers per year (can be None if data missing)

class PopulationResponse(BaseModel):
    years: List[int]
    countries: List[CountryPopulation]
