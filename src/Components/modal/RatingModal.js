import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import { toast } from 'react-toastify'
import { StarOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

const RatingModal = ({ children }) => {
	const { user } = useSelector((state) => ({ ...state }))
	const [modalvisible, setModalVisible] = useState(false)

	let history = useHistory()
	let { slug } = useParams()

	const handleModal = () => {
		if (user && user.token) {
			setModalVisible(true)
		} else {
			history.push({
				pathname: '/login',
				state: { from: `/product/${slug}` },
			})
		}
	}

	return (
		<>
			<div onClick={handleModal}>
				<StarOutlined className='text-danger' />
				<br />
				{user ? 'Leave rating' : 'Login to leave rating'}
			</div>
			<Modal
				title='Leave your rating'
				centered
				visible={modalvisible}
				onOk={() => {
					setModalVisible(false)
					toast.success('Thanks for your review. It will appear soon')
				}}
				onCancel={() => setModalVisible(false)}
			>
				{children}
			</Modal>
		</>
	)
}

export default RatingModal
