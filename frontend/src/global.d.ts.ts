declare global {
  interface Country {
    code: string;
    name: string;
    data: number[];
  }
  
  interface Population {
    years: number[];
    countries: Country[];
  }

  interface SelectedPoint {
    year: number;
    countryCode: string;
    countryName: string;
    population: number;
  }
}

export {};
