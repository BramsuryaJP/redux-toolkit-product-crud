import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	getProducts,
	editProduct,
	productSelectors,
} from '../../features/products/productSlice'
import { useParams, useNavigate } from 'react-router-dom'

const EditProduct = () => {
	const [title, setTitle] = useState('')
	const [price, setPrice] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()

	const products = useSelector((state) =>
		productSelectors.selectById(state, id)
	)

	useEffect(() => {
		dispatch(getProducts())
	}, [dispatch])

	useEffect(() => {
		if (products) {
			setTitle(products.title)
			setPrice(products.price)
		}
	}, [products])

	const editProductHandler = async (e) => {
		e.preventDefault()

		await dispatch(editProduct({ id, title, price }))

		navigate('/')
	}

	return (
		<div>
			<form onSubmit={editProductHandler} className='box mt-5'>
				<div className='field'>
					<label className='label'>Title</label>
					<div className='control'>
						<input
							className='input'
							typeof='text'
							placeholder='Title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
				</div>
				<div className='field'>
					<label className='label'>Price</label>
					<div className='control'>
						<input
							className='input'
							typeof='text'
							placeholder='Price'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</div>
				</div>
				<div className='field'>
					<button className='button is-primary'>Edit Product</button>
				</div>
			</form>
		</div>
	)
}

export default EditProduct
