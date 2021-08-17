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
	const [subOptions, setSubOptions] = useState([])
	const [categories, SetCategories] = useState([])

	// redux
	const { user } = useSelector((state) => ({ ...state }))

	const { slug } = match.params

	useEffect(() => {
		loadProduct()
		loadCategories()
	}, [])

	const loadProduct = () => {
		getProduct(slug).then((p) => {
			setValues({ ...values, ...p.data })
		})
	}

	const loadCategories = () => {
		getCategories().then((c) => SetCategories(c.data))
	}
	const handleCategoryChange = (e) => {
		e.preventDefault()
		setValues({ ...values, subs: [], category: e.target.value })
		getCategorySubs(e.target.value).then((res) => {
			console.log('Sub Options pn category click', res)
			setSubOptions(res.data)
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
						handleCategoryChange={handleCategoryChange}
						categories={categories}
						subOptions={subOptions}
					/>
					<hr />
				</div>
			</div>
		</div>
	)
}

export default ProductUpdate
