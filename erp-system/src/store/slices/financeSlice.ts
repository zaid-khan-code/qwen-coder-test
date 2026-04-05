import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Payroll {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string;
  baseSalary: number;
  allowances: number;
  bonuses: number;
  deductions: number;
  netSalary: number;
  status: string;
  paymentDate?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  type: string;
  clientName: string;
  issueDate: string;
  dueDate: string;
  total: number;
  amountPaid: number;
  balance: number;
  status: string;
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  status: string;
  employeeName?: string;
}

interface FinanceState {
  payrolls: Payroll[];
  invoices: Invoice[];
  expenses: Expense[];
  summary: {
    totalRevenue: number;
    totalExpenses: number;
    pendingInvoices: number;
    pendingPayroll: number;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: FinanceState = {
  payrolls: [],
  invoices: [],
  expenses: [],
  summary: {
    totalRevenue: 0,
    totalExpenses: 0,
    pendingInvoices: 0,
    pendingPayroll: 0,
  },
  isLoading: false,
  error: null,
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    fetchFinanceDataStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchFinanceDataSuccess(
      state,
      action: PayloadAction<{
        payrolls: Payroll[];
        invoices: Invoice[];
        expenses: Expense[];
        summary: FinanceState['summary'];
      }>
    ) {
      state.payrolls = action.payload.payrolls;
      state.invoices = action.payload.invoices;
      state.expenses = action.payload.expenses;
      state.summary = action.payload.summary;
      state.isLoading = false;
    },
    fetchFinanceDataFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addPayroll(state, action: PayloadAction<Payroll>) {
      state.payrolls.push(action.payload);
    },
    addInvoice(state, action: PayloadAction<Invoice>) {
      state.invoices.push(action.payload);
    },
    addExpense(state, action: PayloadAction<Expense>) {
      state.expenses.push(action.payload);
    },
    updatePayrollStatus(
      state,
      action: PayloadAction<{ id: string; status: string }>
    ) {
      const payroll = state.payrolls.find((p) => p.id === action.payload.id);
      if (payroll) {
        payroll.status = action.payload.status;
      }
    },
    updateInvoiceStatus(
      state,
      action: PayloadAction<{ id: string; status: string }>
    ) {
      const invoice = state.invoices.find((i) => i.id === action.payload.id);
      if (invoice) {
        invoice.status = action.payload.status;
      }
    },
  },
});

export const {
  fetchFinanceDataStart,
  fetchFinanceDataSuccess,
  fetchFinanceDataFailure,
  addPayroll,
  addInvoice,
  addExpense,
  updatePayrollStatus,
  updateInvoiceStatus,
} = financeSlice.actions;

export default financeSlice.reducer;
