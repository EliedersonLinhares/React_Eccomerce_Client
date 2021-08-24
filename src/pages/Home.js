import React, { useEffect, useState } from 'react'
import { getProductsbyCount } from '../functions/product'
import ProductCard from '../Components/cards/ProductCard'
import Jumbotron from '../Components/cards/Jumbotron'

const Home = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		loadAllProducts()
	}, [])

	const loadAllProducts = () => {
		setLoading(true)
		getProductsbyCount(3).then((res) => {
			setProducts(res.data)
			setLoading(false)
		})
	}

	return (
		<>
			<div className='jumbotron text-danger h1 font-weight-bold text-center'>
				<Jumbotron text={['Latest Products', 'New Arrivals', 'Best Sellers']} />
			</div>

			<div className='container'>
				<div className='row'>
					{products.map((product) => (
						<div key={product._id} className='col-md-4'>
							<ProductCard product={product} />
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default Home
