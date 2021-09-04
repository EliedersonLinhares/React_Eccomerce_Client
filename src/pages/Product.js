import React, { useEffect, useState } from 'react'
import { getProduct, productStar } from '../functions/product'
import SingleProduct from '../Components/cards/SingleProduct'
import { useSelector } from 'react-redux'

const Product = ({ match }) => {
	const [product, setProduct] = useState({})
	const [star, setStar] = useState(0)
	//redux
	const { user } = useSelector((state) => ({ ...state }))

	const { slug } = match.params

	useEffect(() => {
		loadSingleProduct()
	}, [slug])

	useEffect(() => {
		if (product.ratings && user) {
			let existingRatingObject = product.ratings.find(
				(ele) => ele.postedBy.toString() === user._id.toString()
			)
			existingRatingObject && setStar(existingRatingObject.star) //current user star
		}
	})

	const loadSingleProduct = () => {
		getProduct(slug).then((res) => setProduct(res.data))
	}

	const onStarClick = (newRating, name) => {
		setStar(newRating)
		productStar(name, newRating, user.token).then((res) => {
			loadSingleProduct() //if want update product in real time
		})
	}

	return (
		<div className='container-fluid'>
			<div className='row pt-4'>
				<SingleProduct
					product={product}
					onStarClick={onStarClick}
					star={star}
				/>
			</div>
			<div className='row'>
				<div className='col text-center pt-5 pb-5'>
					<hr />
					<h4>Related Products</h4>
					<hr />
				</div>
			</div>
		</div>
	)
}

export default Product
