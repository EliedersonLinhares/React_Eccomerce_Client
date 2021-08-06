import React, { useState, useEffect } from 'react'
import AdminNav from '../../../Components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { createProduct } from '../../../functions/product'
import ProductCreateForm from '../../../Components/forms/ProductCreateForm'
import FileUpload from '../../../Components/forms/FileUpload'
import { LoadingOutlined } from '@ant-design/icons'

import { getCategories, getCategorySubs } from '../../../functions/category'

const ProductUpdate = () => {
	// redux
	const { user } = useSelector((state) => ({ ...state }))

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>

				<div className='col-md-10'>
					<h4>Product Update</h4>
					<hr />
				</div>
			</div>
		</div>
	)
}

export default ProductUpdate
