export interface Cycle {
  id: string;
  task: string;
  minutesAmmount: number;
  startDate: Date;
  finishedDate: 'finished' | 'canceled' | 'pending';
}

interface CycleStateType {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export enum ActionType {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  FINISHED_CYCLE = 'FINISHED_CYCLE',
}

export function cyclesReducer(state: CycleStateType, action: any) {
  switch (action.type) {
    case ActionType.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      };

    case ActionType.FINISHED_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              finishedDate: 'finished',
            };
          }
          return state;
        }),
        activeCycleId: null,
      };

    case ActionType.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              finishedDate: 'canceled',
            };
          }
          return state;
        }),
        activeCycleId: null,
      };

    default:
      return state;
  }
}
