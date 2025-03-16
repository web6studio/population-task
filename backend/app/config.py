from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    APP_NAME: str = "Population Dashboard API"
    APP_VERSION: str = "0.1.0"
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DATA_FILE_PATH: str = "population.tsv"
    ALLOWED_ORIGINS: str = "http://localhost:5173"

    model_config = SettingsConfigDict(env_file=".env", extra="allow")

    def get_allowed_origins(self):
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]

settings = Settings()
