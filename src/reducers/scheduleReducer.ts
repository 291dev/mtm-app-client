import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScheduleStore } from "../interfaces/extapi/schedule";

export const initialState: {
  selected: ScheduleStore,
  schedules: { [taskId: number]: ScheduleStore }
} = {
  selected: {
    taskId: 0,
    taskName: null,
    detail: null,
    startAt: null,
    importance: null,
    toBeDone: null,
    doneAt: null,
  },
  schedules: {}
};

type ScheduleListStore = typeof initialState.schedules;

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    postSchedule: (state, action: PayloadAction<ScheduleStore>) => {
      if (action.payload.taskId) {
        state.schedules[action.payload.taskId] = action.payload
      }
    },
    getSchedule: (state, action: PayloadAction<ScheduleListStore>) => {
      state.schedules = action.payload;
    },
    selectSchedule: (state, action: PayloadAction<ScheduleStore>) => {
      state.selected = action.payload;
    },
    deleteSchedule: (state, action: PayloadAction<number>) => {
      delete state.schedules[action.payload];
    }
  }
})

export const { postSchedule, getSchedule, selectSchedule, deleteSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;