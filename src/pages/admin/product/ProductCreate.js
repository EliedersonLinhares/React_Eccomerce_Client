import React, { useState, useEffect } from 'react'
import AdminNav from '../../../Components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { createProduct } from '../../../functions/product'
import ProductCreateForm from '../../../Components/forms/ProductCreateForm'
import FileUpload from '../../../Components/forms/FileUpload'
import { LoadingOutlined } from '@ant-design/icons'
//import { Link } from 'react-router-dom'
//import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
//import LocalSearch from '../../../Components/forms/LocalSearch'

import { getCategories, getCategorySubs } from '../../../functions/category'

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

const ProductCreate = () => {
	const [values, setValues] = useState(initialState)
	const [subOptions, setSubOptions] = useState([])
	const [showSub, setShowSub] = useState(false)
	const [loading, setLoading] = useState(false)

	// redux
	const { user } = useSelector((state) => ({ ...state }))

	useEffect(() => {
		loadCategories()
	}, [])

	const loadCategories = () =>
		getCategories().then((c) => setValues({ ...values, categories: c.data }))

	const handleSubmit = (e) => {
		e.preventDefault()
		createProduct(values, user.token)
			.then((res) => {
				console.log(res)
				//console.log(JSON.stringify(res.data))
				//toast.success(`"${values.title}" is created`)
				window.alert(`"${res.data.title}" is created`)
				window.location.reload()
			})
			.catch((err) => {
				console.log(err)
				//if (err.response.status === 400) toast.error(err.response.data)
				toast.error(err.response.data.err)
			})
	}

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value })
		// console.log(e.target.name, " ----- ", e.target.value);
	}

	const handleCategoryChange = (e) => {
		e.preventDefault()
		setValues({ ...values, subs: [], category: e.target.value })
		getCategorySubs(e.target.value).then((res) => {
			console.log('Sub Options pn category click', res)
			setSubOptions(res.data)
		})
		setShowSub(true)
	}

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>

				<div className='col-md-10'>
					{loading ? (
						<LoadingOutlined className='text-danger h1' />
					) : (
						<h4>Product create</h4>
					)}
					<hr />

					<div className='p-3'>
						<FileUpload
							values={values}
							setValues={setValues}
							setLoading={setLoading}
						/>
					</div>
					{JSON.stringify(values.images)}
					<ProductCreateForm
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						setValues={setValues}
						values={values}
						handleCategoryChange={handleCategoryChange}
						subOptions={subOptions}
						showSub={showSub}
					/>
				</div>
			</div>
		</div>
	)
}

export default ProductCreate
