# Population Dashboard API

This backend service provides REST API endpoints to serve population data of countries from 1960 to 2023. It is intended to be used as a backend for interactive dashboards or analytical tools to visualize and analyze global population trends.

## Technology stack

- **FastAPI**: For building RESTful API endpoints.
- **Pandas**: For efficient data loading and manipulation.
- **Uvicorn**: ASGI server to run the FastAPI application.
- **Pydantic**: For data validation and API response schemas.

## Setup and Run

### 1. Clone the repository and navigate to the backend directory:

```bash
git clone <repository-url>
cd backend
```

### 2. Install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Run the application:

```bash
uvicorn app.main:app --reload
```

Your API should now be running at:

```
http://127.0.0.1:8000/population
```

Interactive API docs (Swagger UI) are available at:

```
http://localhost:8000/docs
```

---

## Testing

To run unit tests, execute:

```bash
pytest
```
