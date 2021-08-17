import React, { useState, useEffect } from 'react'
import AdminNav from '../../../Components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getProduct } from '../../../functions/product'

import FileUpload from '../../../Components/forms/FileUpload'
import { LoadingOutlined } from '@ant-design/icons'

import { getCategories, getCategorySubs } from '../../../functions/category'

import ProductUpdateForm from '../../../Components/forms/ProductUpdateForm'

const initialState = {
	title: '',
	description: '',
	price: '',
	categories: [],
	category: '',
	subs: [],
	shipping: '',
	quantity: '',
	images: [],
	colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
	brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
	color: '',
	brand: '',
}

const ProductUpdate = ({ match }) => {
	//state
	const [values, setValues] = useState(initialState)

	// redux
	const { user } = useSelector((state) => ({ ...state }))

	const { slug } = match.params

	useEffect(() => {
		loadProduct()
	}, [])

	const loadProduct = () => {
		getProduct(slug).then((p) => {
			setValues({ ...values, ...p.data })
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value })
		// console.log(e.target.name, " ----- ", e.target.value);
	}

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>

				<div className='col-md-10'>
					<h4>Product Update</h4>
					<ProductUpdateForm
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						setValues={setValues}
						values={values}
					/>
					<hr />
				</div>
			</div>
		</div>
	)
}

export default ProductUpdate
