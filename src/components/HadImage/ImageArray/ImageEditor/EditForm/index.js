import { useState, useContext } from 'react'
import styles from './EditForm.module.css'

import { ImageContext } from '../../../../ImageLoader'

function EditForm({ curRef, srcImage, title }) {
	const [choice, setChoice] = useState('')
	const { setImages } = useContext(ImageContext)
	const [newTitle, setNewTitle] = useState(title)

	const exit = () => {
		curRef.current.style.display = 'none'
	}

	const handleChangeTitle = (e) => {
		setNewTitle(e.target.value)
	}

	const handleChange = (e) => {
		setChoice(e.target.value)
	}

	const submit = (e) => {
		e.preventDefault()

		exit()

		if (newTitle !== title || choice !== 'never') {
			setImages((preState) => {
				const tmpArr = [...preState]
				tmpArr.forEach((image) => {
					if (image.name === title) {
						image.title = newTitle
						image.beDeletedAt = choice
					}
				})
				return tmpArr
			})
		}
	}

	return (
		<div className={styles.wrapper}>
			<form className={styles.form} onSubmit={submit}>
				<div className={styles.exitBtn} onClick={exit}>
					<i className="fa-solid fa-xmark"></i>
				</div>
				<h2>Edit</h2>
				<div className={styles.image}>
					<img src={srcImage} alt="" />
				</div>
				<p className={styles.subTitle}>Title</p>
				<input type="text" value={newTitle} onChange={handleChangeTitle} />
				<p className={styles.subTitle}>Auto delete image</p>
				<input type="date" value={choice} onChange={handleChange} />
				<button onClick={submit}>Submit</button>
			</form>
		</div>
	)
}

export default EditForm
