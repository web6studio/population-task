import os
from pydantic import BaseSettings

# TODO: Add .env var
class Settings(BaseSettings):
    APP_NAME: str = "Population Dashboard API"
    APP_VERSION: str = "0.1.0"
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DATA_FILE_PATH: str = os.path.join(os.getcwd(), "population.tsv") 

    class Config:
        env_file = ".env"

settings = Settings()
