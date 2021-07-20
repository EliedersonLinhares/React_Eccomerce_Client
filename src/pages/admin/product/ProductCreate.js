import React, { useState, useEffect } from 'react'
import AdminNav from '../../../Components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { createproduct } from '../../../functions/product'
//import { Link } from 'react-router-dom'
//import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
//import CategoryForm from '../../../Components/forms/CategoryForm'
//import LocalSearch from '../../../Components/forms/LocalSearch'

const ProductCreate = () => {
	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col-md-10'>Product create form</div>
			</div>
		</div>
	)
}

export default ProductCreate
