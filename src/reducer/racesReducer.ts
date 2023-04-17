export interface Race {
  id: number;
  raceLocation: string;
  raceName: string;
  raceDate: string;
  raceDetails: string;
  organiser:string;
}

export interface Update {
  id: number;
  updates?: Race;
}

export interface Action {
  type: 'ADD_RACE' | 'UPDATE_RACE' | 'DELETE_RACE'
  payload: Race | Update;
}

export interface State {
  races: Race[];
}

export const racesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_RACE':
      return {
        ...state,
        races: [...state.races, action.payload as Race]
      };
    case 'UPDATE_RACE':
      const { id, updates } = action.payload as Update;
      return {
        ...state,
        races: state.races.map((race) => {
          if (race.id === id) {
            return {
              ...race,
              ...updates
            };
          }
          return race;
        })
      };
    case 'DELETE_RACE': {
      const { id } = action.payload;
      return {
        ...state,
        races: state.races.filter((race) => race.id !== id)
      };
    }
    default:
      return state;
  }
};