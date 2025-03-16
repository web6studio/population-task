from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import population_router
from app.config import settings

allowed_origins = settings.get_allowed_origins()
app = FastAPI(title=settings.APP_NAME, version=settings.APP_VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(population_router.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
