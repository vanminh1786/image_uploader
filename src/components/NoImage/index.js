import styles from './NoImage.module.css'
import { useCallback, useRef } from 'react'

import ImageSelectorIcon from './ImageSelectorIcon'
import TextToSelectImage from './TextToSelectImage'

function NoImage({ setImages }) {
	const inputRef = useRef(null)
	const dropZone = useRef(null)

	const handleClick = useCallback(() => {
		//open file input
		inputRef.current.click()
	}, [])

	const handleFilesChange = (e) => {
		e.preventDefault()

		const files = e.target.files || e.dataTransfer.files
		const length = files.length
		const tmpArr = []

		for (let i = 0; i < length; i++) {
			files[i].beDeletedAt = 'never'
			files[i].title = files[i].name
			tmpArr.push(files[i])
		}

		setImages(tmpArr)
	}

	const handleDragOver = (e) => {
		e.preventDefault()
		dropZone.current.style.border = '1px solid #fff'
	}

	const handleDragLeave = (e) => {
		e.preventDefault()
		dropZone.current.style.border = 'none'
	}

	return (
		<div
			className={styles.wrapper}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleFilesChange}
			ref={dropZone}
		>
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
