import styles from './ImageArray.module.css'
import { useContext, useRef } from 'react'

import ImageEditor from './ImageEditor'
import { ImageContext } from '../../ImageLoader'

function ImageArray({ links }) {
	const { images } = useContext(ImageContext)
	const popup = useRef(null)
	const uploaded = links.length === 0 ? false : true

	const handleClick = (index) => {
		navigator.clipboard.writeText(links[index])
		popup.current.style.visibility = 'visible'
		setTimeout(() => {
			popup.current.style.visibility = 'hidden'
		}, 1000)
	}

	return (
		<>
			{!uploaded ? (
				<div className={styles.wrapper}>
					{images &&
						images.map((image) => {
							return <ImageEditor key={image.name} image={image} />
						})}
				</div>
			) : (
				<div className={styles.loadedWrapper}>
					{images.map((image, index) => {
						return (
							<div className={styles.subContent} key={image.name}>
								<img src={URL.createObjectURL(image)} alt="" />
								<div className={styles.link}>
									<p>{links[index]}</p>
									<span
										className={styles.copyIcon}
										onClick={() => handleClick(index)}
									>
										<i className="fa-solid fa-copy">
											<span>copy</span>
										</i>
									</span>
								</div>
							</div>
						)
					})}
					<div className={styles.popup} ref={popup}>
						<p>Copied!</p>
					</div>
				</div>
			)}
		</>
	)
}

export default ImageArray
