import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import { toast } from 'react-toastify'
import { StarOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

const RatingModal = ({ children }) => {
	const { user } = useSelector((state) => ({ ...state }))
	const [modalvisible, setModalVisible] = useState(false)

	return (
		<>
			<div onClick={() => setModalVisible(true)}>
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
