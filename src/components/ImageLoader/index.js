import { useState, createContext } from 'react'

import NoImage from '../NoImage'
import HadImage from '../HadImage'

const ImageContext = createContext()

function ImageLoader() {
	const [images, setImages] = useState([])

	return (
		<>
			{images.length === 0 ? (
				<NoImage setImages={setImages} />
			) : (
				<ImageContext.Provider value={{ images, setImages }}>
					<HadImage />
				</ImageContext.Provider>
			)}
		</>
	)
}

export { ImageContext }
export default ImageLoader
