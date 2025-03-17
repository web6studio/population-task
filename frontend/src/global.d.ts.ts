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

  interface TransformedPopulationData {
    year: number;
    [countryCode: string]: number;
  };

  interface SelectedPoint {
    year: number;
    payload: {
      dataKey: string;
      name: string;
      value: number;
      color: string;
    }[];
    data: TransformedPopulationData[];
  };
  
}

export {};
