import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: string;
  workHours?: number;
  overtimeHours: number;
  notes?: string;
}

interface AttendanceState {
  records: AttendanceRecord[];
  isLoading: boolean;
  error: string | null;
  selectedDate: string;
  filters: {
    employeeId?: string;
    status?: string;
    departmentId?: string;
  };
}

const initialState: AttendanceState = {
  records: [],
  isLoading: false,
  error: null,
  selectedDate: new Date().toISOString().split('T')[0],
  filters: {},
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    fetchAttendanceStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchAttendanceSuccess(
      state,
      action: PayloadAction<AttendanceRecord[]>
    ) {
      state.records = action.payload;
      state.isLoading = false;
    },
    fetchAttendanceFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    checkIn(state, action: PayloadAction<AttendanceRecord>) {
      const existingIndex = state.records.findIndex(
        (r) =>
          r.employeeId === action.payload.employeeId &&
          r.date === action.payload.date
      );
      if (existingIndex !== -1) {
        state.records[existingIndex] = action.payload;
      } else {
        state.records.push(action.payload);
      }
    },
    checkOut(state, action: PayloadAction<{ employeeId: string; date: string; checkOut: string; workHours: number }>) {
      const record = state.records.find(
        (r) =>
          r.employeeId === action.payload.employeeId &&
          r.date === action.payload.date
      );
      if (record) {
        record.checkOut = action.payload.checkOut;
        record.workHours = action.payload.workHours;
        record.status = 'PRESENT';
      }
    },
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
    setFilters(state, action: PayloadAction<Partial<AttendanceState['filters']>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  fetchAttendanceStart,
  fetchAttendanceSuccess,
  fetchAttendanceFailure,
  checkIn,
  checkOut,
  setSelectedDate,
  setFilters,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
