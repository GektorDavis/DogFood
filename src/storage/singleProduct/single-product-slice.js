import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isError } from '../../utils/store';

export const fetchSingleProduct = createAsyncThunk(
  'singleProduct/fetchSingleProduct',
  async function (
    productId,
    { rejectWithValue, fulfillWithValue, extra: api }
  ) {
    try {
      const data = await api.getProductById(productId);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCreateReview = createAsyncThunk(
  'createReview/fetchCreateReview',
  async function (
    { productId, data: body },
    { rejectWithValue, fulfillWithValue, extra: api }
  ) {
    try {
      const data = await api.createReviewProduct(productId, body);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  data: {},
  loading: true,
  error: null,
};

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  reducers: {
    setProductState: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCreateReview.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setProductState } = singleProductSlice.actions;
export default singleProductSlice.reducer;
