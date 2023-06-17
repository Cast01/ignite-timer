import { produce } from "immer";

import { ActionType } from "./actions";

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

export function cyclesReducer(state: CycleStateType, action: any) {
  switch (action.type) {
    case ActionType.ADD_NEW_CYCLE:
      return produce(state, draft => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })

    case ActionType.FINISHED_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, draft => {
        draft.cycles[currentCycleIndex].finishedDate = 'finished'
        draft.activeCycleId = null
      })
    }

    case ActionType.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, draft => {
        draft.cycles[currentCycleIndex].finishedDate = 'canceled'
        draft.activeCycleId = null
      })
    }

    default:
      return state;
  }
}
