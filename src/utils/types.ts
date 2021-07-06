export type State = {
  id: string;
  name: string;
  cities: Array<City>;
};

export type City = {
  id: string;
  name: string;
};

export type States = Array<State>;

export type Cities = Array<City>;
