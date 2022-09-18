import styles from './HadImage.module.css'
import { useContext, useRef } from 'react'

import { ImageContext } from '../ImageLoader'
import ImageArray from '../ImageArray'

function AddImageIcon() {
	const input = useRef(null)
	const { setImages } = useContext(ImageContext)

	const reset = () => {
		setImages([])
	}

	const addImage = () => {
		input.current.click()
	}

	const handleChange = (e) => {
		e.preventDefault()

		setImages((preState) => {
			const tmpArr = [...preState]
			const files = e.target.files
			const length = files.length

			for (let i = 0; i < length; i++) {
				if (!tmpArr.find((file) => file.name === files[i].name))
					tmpArr.push(files[i])
			}

			return tmpArr
		})
	}

	return (
		<div className={styles.description}>
			<div className={styles.broom} onClick={reset}>
				<i className="fa-solid fa-trash-can"></i>
				<span>Clear all</span>
			</div>
			<span className={styles.icon} onClick={addImage}>
				<i className="fa-solid fa-table-cells-large fa-6x"></i>
				<p className={styles.tooltip}>Add image</p>
			</span>
			<p className={styles.descriptionText}>Edit any image by clicking the image preview</p>
			<input
				type="file"
				style={{ display: 'none' }}
				onChange={handleChange}
				ref={input}
			/>
		</div>
	)
}

function HadImage() {
	return (
		<>
			<AddImageIcon />
			<ImageArray />
			<div className={styles.btnWrapper}>
				<button className={styles.uploadBtn}>Upload</button>
			</div>
		</>
	)
}

export default HadImage
