import { Routes, Route } from 'react-router-dom'
import AddProduct from './components/products/AddProduct'
import EditProduct from './components/products/EditProduct'
import ShowProducts from './components/products/ShowProducts'
import MainProductPage from './pages/products'

function App() {
	return (
		<div className='container'>
			<Routes>
				<Route
					index
					element={<MainProductPage children={<ShowProducts />} />}
				/>
				<Route
					path='/add-product'
					element={<MainProductPage children={<AddProduct />} />}
				/>
				<Route
					path='/edit-product/:id'
					element={<MainProductPage children={<EditProduct />} />}
				/>
			</Routes>
		</div>
	)
}

export default App
