import React, { useState, useEffect } from 'react'
import AdminNav from '../../../Components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getProduct, updateProduct } from '../../../functions/product'

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

const ProductUpdate = ({ match, history }) => {
	//state
	const [values, setValues] = useState(initialState)
	const [subOptions, setSubOptions] = useState([])
	const [categories, SetCategories] = useState([])
	const [arrayOfSubs, setArrayOfSubs] = useState([])
	const [selectedCategory, setSelectedCategory] = useState('')
	const [loading, setLoading] = useState(false)

	// redux
	const { user } = useSelector((state) => ({ ...state }))

	const { slug } = match.params

	useEffect(() => {
		loadProduct()
		loadCategories()
	}, [])

	const loadProduct = () => {
		getProduct(slug).then((p) => {
			//1-Load single product
			setValues({ ...values, ...p.data })
			//2- load single product category subs
			getCategorySubs(p.data.category._id).then((res) => {
				setSubOptions(res.data) //on first load, show default sub categories
			})
			//3- prepare array of id's to show as default sub values in antd select
			let arr = []
			p.data.subs.map((s) => {
				arr.push(s._id)
			})
			setArrayOfSubs((prev) => arr) //required for ant
		})
	}

	const loadCategories = () => {
		getCategories().then((c) => SetCategories(c.data))
	}
	const handleCategoryChange = (e) => {
		e.preventDefault()
		setValues({ ...values, subs: [] })

		setSelectedCategory(e.target.value)

		getCategorySubs(e.target.value).then((res) => {
			console.log('Sub Options pn category click', res)
			setSubOptions(res.data)
		})

		//if user clicks back to the original category show its sub categories in default
		if (values.category._id === e.target.value) {
			loadProduct()
		}
		//clear old sub categories id's
		setArrayOfSubs([])
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)

		values.subs = arrayOfSubs
		values.category = selectedCategory ? selectedCategory : values.category

		updateProduct(slug, values, user.token)
			.then((res) => {
				setLoading(false)
				toast.success(`"${res.data.title}" is updated`)
				history.push('/admin/products')
			})
			.catch((err) => {
				console.log(err)
				setLoading(false)
				toast.error(err.response.data.err)
			})
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
					{loading ? (
						<LoadingOutlined className='text-danger h1' />
					) : (
						<h4>Product Update</h4>
					)}
					<hr />

					<div className='p-3'>
						<FileUpload
							values={values}
							setValues={setValues}
							setLoading={setLoading}
						/>
					</div>
					<br />
					<ProductUpdateForm
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						setValues={setValues}
						values={values}
						handleCategoryChange={handleCategoryChange}
						categories={categories}
						subOptions={subOptions}
						arrayOfSubs={arrayOfSubs}
						setArrayOfSubs={setArrayOfSubs}
						selectedCategory={selectedCategory}
					/>
					<hr />
				</div>
			</div>
		</div>
	)
}

export default ProductUpdate
