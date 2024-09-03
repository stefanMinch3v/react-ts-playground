import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Session = {
  id: string;
  title: string;
  summary: string;
  description: string;
  date: string;
  image: string;
  duration: number;
};

type SessionState = {
  upcomingSessions: Session[]
}

type PayloadActionType = Session;

const initialState: SessionState = {
  upcomingSessions: []
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    bookSession(state, action: PayloadAction<PayloadActionType>) {
      const itemIndex = state.upcomingSessions.findIndex(x => x.id === action.payload.id);

      if (itemIndex >= 0) {
        return;
      }

      state.upcomingSessions.push({ ...action.payload });
    },
    cancelSession(state, action: PayloadAction<string>) {
      const itemIndex = state.upcomingSessions.findIndex(x => x.id === action.payload);

      if (itemIndex < 0) {
        return;
      }

      state.upcomingSessions.splice(itemIndex, 1);
    }
  }
});

export const { bookSession: bookSessionAction, cancelSession: cancelSessionAction } = sessionSlice.actions;