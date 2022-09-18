import styles from './ImageArray.module.css'
import { useContext } from 'react'

import ImageEditor from '../ImageEditor'
import { ImageContext } from '../ImageLoader'

function ImageArray() {
	const { images } = useContext(ImageContext)

	return (
		<div className={styles.wrapper}>
			{images &&
				images.map((image) => {
					return <ImageEditor key={image.name} image={image} />
				})}
		</div>
	)
}

export default ImageArray
