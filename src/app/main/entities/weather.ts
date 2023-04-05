
export interface Weather {
  current?: {
    temp : number;
    weather: [
      {
        id: number;
        icon: string;
        description: string;
        main: string;
      }
    ]
  };
  errorMessage?: string;
}
