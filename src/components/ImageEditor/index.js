import styles from './ImageEditor.module.css'
import { useContext, useState } from 'react'

import { ImageContext } from '../ImageLoader'
import EditForm from '../EditForm'

function ImageEditor({ image }) {
	const { setImages } = useContext(ImageContext)
	const [isEditing, setIsEditing] = useState(false)

	const srcImage = URL.createObjectURL(image)
	console.log(image)

	const deleteImage = () => {
		setImages((preState) => {
			return preState.filter((curImage) => {
				return curImage.name !== image.name
			})
		})
	}

	const editImage = () => {
		setIsEditing(true)
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

			{isEditing ? (
				<EditForm setIsEditing={setIsEditing} srcImage={srcImage} />
			) : null}
		</>
	)
}

export default ImageEditor
