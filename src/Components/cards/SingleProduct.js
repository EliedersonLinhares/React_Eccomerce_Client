import React from 'react'
import { Card, Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import laptop from '../../images/laptop.png'
import ProductListItems from './ProductListItems'
import StarRating from 'react-star-ratings'
import RatingModal from '../modal/RatingModal'

const { TabPane } = Tabs

//this is children component of product Page
const SingleProduct = ({ product, onStarClick, star }) => {
	const { title, images, description, _id } = product

	return (
		<>
			<div className='col-md-7'>
				{images && images.length ? (
					<Carousel showArrows={true} autoPlay infiniteLoop>
						{images &&
							images.map((i) => (
								<img src={i.url} key={i.public_id} alt='Product' />
							))}
					</Carousel>
				) : (
					<Card
						cover={<img src={laptop} className='mb-3 card-image' alt='' />}
					></Card>
				)}

				<Tabs type='card'>
					<TabPane tab='Description' key='1'>
						{description && description}
					</TabPane>
					<TabPane tab='More' key='2'>
						Call us on xx to learn more about this product
					</TabPane>
				</Tabs>
			</div>
			<div className='col-md-5'>
				<h1 className='bg-info p-3'>{title}</h1>

				<Card
					actions={[
						<>
							<ShoppingCartOutlined className='text-success' /> <br />
							Add to Cart
						</>,
						<Link to='/'>
							<HeartOutlined className='text-info' /> <br /> Add to Wishlist
						</Link>,
						<RatingModal>
							<StarRating
								name={_id}
								numberOfStars={5}
								rating={star}
								changeRating={onStarClick}
								isSelectable={true}
								starRatedColor='red'
							/>
						</RatingModal>,
					]}
				>
					<ProductListItems product={product} />
				</Card>
			</div>
		</>
	)
}

export default SingleProduct
