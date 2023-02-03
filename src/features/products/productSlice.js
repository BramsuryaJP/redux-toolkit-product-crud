import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getProducts = createAsyncThunk(
	'products/getProducts',
	async () => {
		const res = await axios.get('http://localhost:5000/products')
		return res.data
	}
)

export const addProduct = createAsyncThunk(
	'products/addProduct',
	async ({ title, price }) => {
		const res = await axios.post('http://localhost:5000/products', {
			price,
			title,
		})
		return res.data
	}
)

export const editProduct = createAsyncThunk(
	'products/editProduct',
	async ({ id, title, price }) => {
		const res = await axios.patch(`http://localhost:5000/products/${id}`, {
			price,
			title,
		})
		return res.data
	}
)

export const deleteProduct = createAsyncThunk(
	'products/deleteProducts',
	async (id) => {
		await axios.delete(`http://localhost:5000/products/${id}`)
		return id
	}
)

const productEntity = createEntityAdapter({
	selectId: (products) => products.id,
})

const productSlice = createSlice({
	name: 'products',
	initialState: productEntity.getInitialState(),
	extraReducers: {
		[getProducts.fulfilled]: (state, action) => {
			productEntity.setAll(state, action.payload)
		},
		[addProduct.fulfilled]: (state, action) => {
			productEntity.addOne(state, action.payload)
		},
		[editProduct.fulfilled]: (state, action) => {
			productEntity.updateOne(state, {
				id: action.payload.id,
				updates: action.payload,
			})
		},
		[deleteProduct.fulfilled]: (state, action) => {
			productEntity.removeOne(state, action.payload)
		},
	},
})

export const productSelectors = productEntity.getSelectors(
	(state) => state.products
)
export default productSlice.reducer
