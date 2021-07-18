import React, { useState, useEffect } from 'react'
import AdminNav from '../../../Components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategories } from '../../../functions/category'
import { createSub, getSub, removeSub } from '../../../functions/sub'
import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import CategoryForm from '../../../Components/forms/CategoryForm'
import LocalSearch from '../../../Components/forms/LocalSearch'

const SubCreate = () => {
	const { user } = useSelector((state) => ({ ...state }))

	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	const [categories, setCategories] = useState([]) //for select combo
	const [category, setCategory] = useState('') //for set value

	//searching /filtering
	//step1
	const [keyword, setKeyword] = useState('')

	useEffect(() => {
		loadCategories()
	}, [])

	const loadCategories = () =>
		getCategories().then((c) => setCategories(c.data))

	const handleSubmit = (e) => {
		e.preventDefault()
		// console.log(name);
		setLoading(true)
		createSub({ name, parent: category }, user.token)
			.then((res) => {
				// console.log(res)
				setLoading(false)
				setName('')
				toast.success(`"${res.data.name}" is created`)
				//loadCategories()
			})
			.catch((err) => {
				console.log(err)
				setLoading(false)
				if (err.response.status === 400) toast.error(err.response.data)
			})
	}

	const handleRemove = async (slug) => {
		// let answer = window.confirm("Delete?");
		// console.log(answer, slug);
		if (window.confirm('Delete?')) {
			setLoading(true)
			removeSub(slug, user.token)
				.then((res) => {
					setLoading(false)
					toast.error(`${res.data.name} deleted`)
					//loadCategories()
				})
				.catch((err) => {
					if (err.response.status === 400) {
						setLoading(false)
						toast.error(err.response.data)
					}
				})
		}
	}

	//step 4
	const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col'>
					{loading ? (
						<h4 className='text-danger'>Loading..</h4>
					) : (
						<h4>Create sub category</h4>
					)}

					<div className='form-group'>
						<label>Parent Category</label>
						<select
							name='category'
							className='form-control'
							onChange={(e) => setCategory(e.target.value)}
						>
							<option>Please Select...</option>
							{categories.map((c) => (
								<option key={c._id} value={c._id}>
									{c.name}
								</option>
							))}
						</select>
					</div>

					<CategoryForm
						handleSubmit={handleSubmit}
						name={name}
						setName={setName}
					/>
					<hr />
					{/** step 2 and 3 */}
					<LocalSearch keyword={keyword} setKeyword={setKeyword} />

					{/** step 5 */}
					{/** {categories.filter(searched(keyword)).map((c) => (
						<div className='alert alert-secondary' key={c._id}>
							{c.name}
							<span
								onClick={() => handleRemove(c.slug)}
								className='btn btn-sm float-right'
							>
								<DeleteOutlined className='text-danger' />
							</span>
							<Link to={`/admin/category/${c.slug}`}>
								<span className='btn btn-sm float-right'>
									<EditOutlined className='text-warning' />
								</span>
							</Link>
						</div>
					))} */}
				</div>
			</div>
		</div>
	)
}

export default SubCreate
