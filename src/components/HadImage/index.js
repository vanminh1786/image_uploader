import styles from './HadImage.module.css'
import { useContext, useRef, useState } from 'react'
import axios from 'axios'
import { Hearts } from 'react-loader-spinner'

import { ImageContext } from '../ImageLoader'
import ImageArray from './ImageArray'

function Icon({ uploaded, setLinks, hasError }) {
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
					<span className={styles.icon} style={{ color: '#00a7dd' }} onClick={addImage}>
						<i className="fa-solid fa-table-cells-large fa-6x"></i>
						<p className={styles.tooltip}>Add image</p>
					</span>
					<p className={styles.descriptionText} style={{ color: '#00a7dd' }}>
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
				<>
					{!hasError ? 
						<span className={styles.icon} style={{ color: '#00a7dd' }}>
							<i className="fa-solid fa-circle-check fa-6x"></i>
							<p className={styles.descriptionText}>Upload complete</p>
						</span> : 
						<span className={styles.icon} style={{ color: 'red' }}>
						<i className="fa-solid fa-circle-xmark fa-6x"></i>
						<p className={styles.descriptionText}>Upload failed</p>
					</span>
					}
				</>
			)}
		</div>
	)
}

function HadImage() {
	const { images } = useContext(ImageContext)
	const [isUploading, setIsUploading] = useState(false)
	const [hasError, setHasError] = useState(false)
	const [links, setLinks] = useState([])
	const indexOfCurrentImage = useRef(0)
	const uploaded = useRef(false)

	const uploadImages = () => {
		if (indexOfCurrentImage.current > images.length) return
		if (indexOfCurrentImage.current === images.length) {
			indexOfCurrentImage.current = 0
			return
		}

		if (!isUploading) setIsUploading(true)
		const currentImage = images[indexOfCurrentImage.current]
		
		axios({
			method: 'post',
			url: ((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost:8080' : 'https://apps.pagefly.io') + '/api/public/pagefly/image/upload',
			data: currentImage,
			headers: {
				'content-type': 'multipart/form-data',
				title: currentImage.title,
				name: currentImage.name,
				time: currentImage.beDeletedAt,
			},
		})
			.then((res) => {
				// console.log(res.data)
				++indexOfCurrentImage.current
				uploadImages()
				setLinks((preState) => [...preState, res.data.imageLink])
			})
			.catch(() => {
				setHasError(true)
			})
			.finally(() => {
				uploaded.current = true
				setIsUploading(false)
			})
	}

	return (
		<>
			{!isUploading ? (
				<>
					<Icon uploaded={uploaded.current} setLinks={setLinks} hasError={hasError} />
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
