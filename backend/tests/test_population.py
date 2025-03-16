from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_population_all():
    """Test retrieving all countries."""
    response = client.get("/population")
    
    assert response.status_code == 200
    data = response.json()
    
    assert "years" in data
    assert "countries" in data

def test_get_population_specific_country():
    """Test retrieving population data for a specific country (USA)."""
    response = client.get("/population?countries=USA")
    
    assert response.status_code == 200
    data = response.json()
    
    assert "years" in data
    assert "countries" in data
    assert any(c["code"] == "USA" for c in data["countries"])  # Ensure USA is in the response

def test_get_population_invalid_country():
    """Test request with an invalid country code (should return 200 with empty countries array)."""
    response = client.get("/population?countries=INVALID")
    
    assert response.status_code == 200
    json_data = response.json()

    assert "years" in json_data
    assert "countries" in json_data
    assert json_data["countries"] == [] 

def test_get_population_start_greater_than_end():
    """Test request where start_year is greater than end_year (should return 400 Bad Request)."""
    response = client.get("/population?start_year=2023&end_year=1960")
    
    assert response.status_code == 400
    assert "detail" in response.json()


def test_get_population_start_year_below_min():
    """Test request where start_year is below the minimum (should return 400 Bad Request)."""
    response = client.get("/population?start_year=1950&end_year=2000")
    
    assert response.status_code == 422
    assert "detail" in response.json()

def test_get_population_end_year_above_max():
    """Test request where end_year is above the maximum (should return 422 Bad Request)."""
    response = client.get("/population?start_year=2000&end_year=2030")
    
    assert response.status_code == 422
    assert "detail" in response.json()
