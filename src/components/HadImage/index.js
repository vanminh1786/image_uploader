import styles from './HadImage.module.css'
import { useContext, useRef, useState } from 'react'
import axios from 'axios'
import { Hearts } from 'react-loader-spinner'

import { ImageContext } from '../ImageLoader'
import ImageArray from './ImageArray'

function Icon({ uploaded, setLinks }) {
	const input = useRef(null)
	const { setImages } = useContext(ImageContext)

	const reset = () => {
		setImages([])
		setLinks([])
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
				if (!tmpArr.find((file) => file.name === files[i].name)) {
					files[i].title = files[i].name
					files[i].beDeletedAt = 'never'
					tmpArr.push(files[i])
				}
			}

			return tmpArr
		})
	}

	return (
		<div className={styles.description}>
			<div className={styles.broom} onClick={reset}>
				<i className="fa-solid fa-rotate-left"></i>
				<span>Reset</span>
			</div>
			{!uploaded ? (
				<>
					<span className={styles.icon} onClick={addImage}>
						<i className="fa-solid fa-table-cells-large fa-6x"></i>
						<p className={styles.tooltip}>Add image</p>
					</span>
					<p className={styles.descriptionText}>
						Edit any image by clicking the image preview
					</p>
					<input
						type="file"
						style={{ display: 'none' }}
						multiple
						onChange={handleChange}
						ref={input}
					/>
				</>
			) : (
				<span className={styles.icon} styles={{ color: '#27ae61' }}>
					<i className="fa-solid fa-circle-check fa-6x"></i>
					<p className={styles.descriptionText}>Upload complete</p>
				</span>
			)}
		</div>
	)
}

function HadImage() {
	const { images } = useContext(ImageContext)
	const [isUploading, setIsUploading] = useState(false)
	const [links, setLinks] = useState([])
	const indexOfCurrentImage = useRef(0)
	const uploaded = useRef(false)

	const uploadImages = () => {
		if (indexOfCurrentImage.current > images.length) return
		if (indexOfCurrentImage.current === images.length) {
			indexOfCurrentImage.current = 0
			return
		}

		setIsUploading(true)
		axios({
			method: 'post',
			url: 'http://localhost:8080/public/shopify/image/upload',
			data: images[indexOfCurrentImage.current],
			headers: {
				'content-type': 'multipart/form-data',
				title: images[indexOfCurrentImage.current].title,
				name: images[indexOfCurrentImage.current].name,
				time: images[indexOfCurrentImage.current].beDeletedAt,
			},
		})
			.then((res) => {
				// console.log(res.data)
				++indexOfCurrentImage.current
				uploadImages()
				setLinks((preState) => [...preState, res.data.imageLink])
			})
			.catch((err) => console.log(err))
			.finally(() => {
				uploaded.current = true
				setIsUploading(false)
			})
	}

	return (
		<>
			{!isUploading ? (
				<>
					<Icon uploaded={uploaded.current} setLinks={setLinks} />
					<ImageArray links={links} />
					{!uploaded.current && (
						<div className={styles.btnWrapper} onClick={uploadImages}>
							<button className={styles.uploadBtn}>Upload</button>
						</div>
					)}
				</>
			) : (
				<div
					style={{
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Hearts
						height="80"
						width="80"
						color="red"
						ariaLabel="hearts-loading"
						wrapperStyle={{}}
						wrapperClass=""
						visible={true}
					/>
				</div>
			)}
		</>
	)
}

export default HadImage
