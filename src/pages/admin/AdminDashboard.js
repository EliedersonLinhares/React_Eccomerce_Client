import React, { useEffect, useState } from 'react'
import AdminNav from '../../Components/nav/AdminNav'
import { getProductsbyCount } from '../../functions/product'

const AdminDashboard = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		loadAllProducts()
	}, [])

	const loadAllProducts = () => {
		setLoading(true)
		getProductsbyCount(100)
			.then((res) => {
				setProducts(res.data)
				setLoading(false)
			})
			.catch((err) => {
				setLoading(false)
				console.log(err)
			})
	}

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				{loading ? (
					<h4 className='text-danger'>Loading...</h4>
				) : (
					<h4> All products</h4>
				)}
				<div className='col'>{JSON.stringify(products)}</div>
			</div>
		</div>
	)
}

export default AdminDashboard
