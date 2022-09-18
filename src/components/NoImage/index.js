import styles from './NoImage.module.css'
import { useCallback, useRef } from 'react'

import ImageSelectorIcon from '../ImageSelectorIcon'
import TextToSelectImage from '../TextToSelectImage'

function NoImage({ setImages }) {
	const inputRef = useRef(null)

	const handleClick = useCallback(() => {
		//open file input
		inputRef.current.click()
	}, [])

	const handleFilesChange = (event) => {
		event.preventDefault()
		const files = event.target.files
		const length = files.length
		const tmpArr = []

		for (let i = 0; i < length; i++) {
			tmpArr.push(files[i])
		}

		setImages(tmpArr)
	}

	return (
		<div className={styles.wrapper}>
			<ImageSelectorIcon handleClick={handleClick} />
			<TextToSelectImage handleClick={handleClick} />
			<input
				type="file"
				multiple
				style={{ display: 'none' }}
				onChange={handleFilesChange}
				ref={inputRef}
			/>
		</div>
	)
}

export default NoImage
