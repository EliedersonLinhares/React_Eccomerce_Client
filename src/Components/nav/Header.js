import React, { useState } from 'react'
import { Menu } from 'antd'
import {
	AppstoreOutlined,
	SettingOutlined,
	UserOutlined,
	UserAddOutlined,
	LogoutOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
//Usando o use selector para renderização condicional
import { useDispatch, useSelector } from 'react-redux'
//Como não da para usar o history pois logout não tem um rota, usa-se o user-history
import { useHistory } from 'react-router-dom'

const { SubMenu, Item } = Menu

const Header = () => {
	const [current, setCurrent] = useState('home')
	let dispatch = useDispatch()
	//acessando data do redux pelo useselector
	let { user } = useSelector((state) => ({ ...state }))
	let history = useHistory()

	const handleClick = (e) => {
		setCurrent(e.key)
	}

	const logout = () => {
		firebase.auth().signOut()
		dispatch({
			type: 'LOGOUT',
			payload: null,
		})
		history.push('/login')
	}

	return (
		<Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
			<Item key='home' icon={<AppstoreOutlined />}>
				<Link to='/'>Home</Link>
			</Item>
			{!user && (
				<Item key='register' icon={<UserAddOutlined />} className='float-right'>
					<Link to='/register'>Register</Link>
				</Item>
			)}
			{!user && (
				<Item key='login' icon={<UserOutlined />} className='float-right'>
					<Link to='/login'>Login</Link>
				</Item>
			)}

			{user && (
				<SubMenu
					key='SubMenu'
					icon={<SettingOutlined />}
					title={user.email && user.email.split('@')[0]} //Mostar o que vem antes do @
					className='float-right'
				>
					{user && user.role === 'subscriber' && (
						<Item>
							<Link to='/user/history'>Dashboard</Link>
						</Item>
					)}
					{user && user.role === 'admin' && (
						<Item>
							<Link to='/admin/dashboard'>Dashboard</Link>
						</Item>
					)}
					<Item icon={<LogoutOutlined />} onClick={logout}>
						Logout
					</Item>
				</SubMenu>
			)}
		</Menu>
	)
}

export default Header
