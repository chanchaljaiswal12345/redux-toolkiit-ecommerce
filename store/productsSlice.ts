// store/productsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';
import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  description: string;
   category: string;
   price: number;
  // Add other properties as needed
}

interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
}

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setProducts, setSelectedProduct } = productsSlice.actions;

export const fetchProducts = (): AppThunk => async (dispatch) => {
  try {
    const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
    dispatch(setProducts(response.data));
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export const fetchData = (id: number): AppThunk => async (dispatch) => {
  try {
    const response = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
    dispatch(setSelectedProduct(response.data));
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

export const selectProducts = (state: RootState) => state.products.items;
export const selectSelectedProduct = (state: RootState) => state.products.selectedProduct;

export default productsSlice.reducer;
