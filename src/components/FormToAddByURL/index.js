import { useState } from 'react'
import styles from './FormToAddByURL.module.css'

function FormToAddByURL({ setIsShowed }) {
	const [url, setUrl] = useState('')

	const closeForm = () => {
		setIsShowed(false)
	}

	const handleChange = (e) => {
		setUrl(e.target.value)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.form}>
				<p>Add image URLs</p>
				<div className={styles.exitBtn} onClick={closeForm}>
					<i className="fa-solid fa-xmark"></i>
				</div>
				<textarea rows={4} placeholder="Add the image URLs here" value={url} onChange={handleChange} />
				<button>Submit</button>
			</div>
		</div>
	)
}

export default FormToAddByURL
