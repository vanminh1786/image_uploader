import styles from './ImageEditor.module.css'
import { useContext, useRef } from 'react'

import { ImageContext } from '../../../ImageLoader'
import EditForm from './EditForm'

function ImageEditor({ image }) {
	const { setImages } = useContext(ImageContext)
	const form = useRef(null)

	const srcImage = URL.createObjectURL(image)

	const deleteImage = () => {
		setImages((preState) => {
			return preState.filter((curImage) => {
				return curImage.name !== image.name
			})
		})
	}

	const editImage = () => {
		form.current.style.display = 'block'
	}

	return (
		<>
			<div className={styles.wrapper}>
				<img
					className={styles.image}
					src={srcImage}
					alt=""
					onClick={editImage}
				/>
				<div className={styles.deleteBtn} onClick={deleteImage}>
					<i className="fa-solid fa-xmark"></i>
				</div>
				<div className={styles.editBtn} onClick={editImage}>
					<i className="fa-solid fa-pen-to-square"></i>
				</div>
			</div>

			<div style={{ display: 'none' }} ref={form}>
				<EditForm curRef={form} srcImage={srcImage} title={image.name} />
			</div>
		</>
	)
}

export default ImageEditor
