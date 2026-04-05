import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  categoryId?: string;
  categoryName?: string;
  unit: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  reorderLevel: number;
  warehouseId?: string;
  warehouseName?: string;
  status: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  warehouseId: string;
  warehouseName: string;
  type: string;
  quantity: number;
  previousStock: number;
  newStock: number;
  reference?: string;
  notes?: string;
  createdAt: string;
}

interface InventoryState {
  products: Product[];
  stockMovements: StockMovement[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  filters: {
    search: string;
    categoryId?: string;
    warehouseId?: string;
    lowStock?: boolean;
  };
}

const initialState: InventoryState = {
  products: [],
  stockMovements: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  filters: {
    search: '',
  },
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchProductsSuccess(
      state,
      action: PayloadAction<{ products: Product[]; total: number }>
    ) {
      state.products = action.payload.products;
      state.pagination.total = action.payload.total;
      state.isLoading = false;
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchStockMovementsSuccess(
      state,
      action: PayloadAction<StockMovement[]>
    ) {
      state.stockMovements = action.payload;
    },
    selectProduct(state, action: PayloadAction<Product | null>) {
      state.selectedProduct = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.unshift(action.payload);
      state.pagination.total += 1;
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      if (state.selectedProduct?.id === action.payload.id) {
        state.selectedProduct = action.payload;
      }
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
      state.pagination.total -= 1;
    },
    updateStock(
      state,
      action: PayloadAction<{
        productId: string;
        currentStock: number;
        reservedStock: number;
      }>
    ) {
      const product = state.products.find(
        (p) => p.id === action.payload.productId
      );
      if (product) {
        product.currentStock = action.payload.currentStock;
        product.reservedStock = action.payload.reservedStock;
        product.availableStock =
          action.payload.currentStock - action.payload.reservedStock;
      }
    },
    addStockMovement(state, action: PayloadAction<StockMovement>) {
      state.stockMovements.unshift(action.payload);
    },
    setFilters(
      state,
      action: PayloadAction<Partial<InventoryState['filters']>>
    ) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.pagination.page = action.payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchStockMovementsSuccess,
  selectProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  addStockMovement,
  setFilters,
  setPage,
} = inventorySlice.actions;

export default inventorySlice.reducer;
