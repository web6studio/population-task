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
}

export {};
