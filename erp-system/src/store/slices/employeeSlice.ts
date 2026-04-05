import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Employee {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId?: string;
  departmentName?: string;
  designationId?: string;
  designationTitle?: string;
  employmentType: string;
  joinDate: string;
  status: string;
  baseSalary: number;
  photoUrl?: string;
}

interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    search: string;
    departmentId?: string;
    status?: string;
    employmentType?: string;
  };
}

const initialState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  filters: {
    search: '',
  },
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    fetchEmployeesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchEmployeesSuccess(
      state,
      action: PayloadAction<{ employees: Employee[]; total: number }>
    ) {
      state.employees = action.payload.employees;
      state.pagination.total = action.payload.total;
      state.pagination.totalPages = Math.ceil(
        action.payload.total / state.pagination.limit
      );
      state.isLoading = false;
    },
    fetchEmployeesFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    selectEmployee(state, action: PayloadAction<Employee | null>) {
      state.selectedEmployee = action.payload;
    },
    addEmployee(state, action: PayloadAction<Employee>) {
      state.employees.unshift(action.payload);
      state.pagination.total += 1;
    },
    updateEmployee(state, action: PayloadAction<Employee>) {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
      if (state.selectedEmployee?.id === action.payload.id) {
        state.selectedEmployee = action.payload;
      }
    },
    deleteEmployee(state, action: PayloadAction<string>) {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
      state.pagination.total -= 1;
    },
    setFilters(state, action: PayloadAction<Partial<EmployeeState['filters']>>) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.pagination.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
    },
  },
});

export const {
  fetchEmployeesStart,
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
  selectEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setFilters,
  setPage,
  setLimit,
} = employeeSlice.actions;

export default employeeSlice.reducer;
