import { createContext, ReactNode, useContext, useReducer } from "react";

export type Timer = {
  name: string,
  duration: number
};

type TimersState = {
  isRunning: boolean,
  timers: Timer[]
};

type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void,
  startTimers: () => void,
  stopTimers: () => void
}

type TimersContextProviderProps = {
  children: ReactNode
}

type Action = StartTimerAction | StopTimerAction | AddTimerAction;

type StartTimerAction = {
  type: 'START_TIMERS'
}

type StopTimerAction = {
  type: 'STOP_TIMERS'
}

type AddTimerAction = {
  type: 'ADD_TIMER',
  payload: Timer
}

function timersReducer(state: TimersState, action: Action) : TimersState {
  switch (action.type) {
    case 'ADD_TIMER':
      return {
        ...state,
        timers: [
          ...state.timers,
          {
            name: action.payload.name,
            duration: action.payload.duration
          }
        ]
      };
    case 'START_TIMERS':
      return {
        ...state,
        isRunning: true,
      };
    case 'STOP_TIMERS':
      return {
        ...state,
        isRunning: false,
      };
    default: return state;
  }
}

const TimersContext = createContext<TimersContextValue | null>(null);

const initialState: TimersState = {
  isRunning: true,
  timers: []
}

// custom hook
export function useTimersContext() {
  const timersCtx = useContext(TimersContext)!;

  // null-check if need

  return timersCtx;
}

export default function TimersContextProvider({ children } : TimersContextProviderProps) {
  const [timersState, dispatch] = useReducer(timersReducer, initialState);

  const ctx: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer(timerData) {
      dispatch({ type: 'ADD_TIMER', payload: timerData })
    },
    startTimers() {
      dispatch({ type: 'START_TIMERS' })
    },
    stopTimers() {
      dispatch({ type: 'STOP_TIMERS' })
    },
  };

  return <TimersContext.Provider value={ctx}>{ children }</TimersContext.Provider>
}