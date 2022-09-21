import styles from './TextToSelectImage.module.css'
import FormToAddByURL from './FormToAddByURL'
import { useState } from 'react'

function TextToSelectImage(props) {
	const [isShowed, setIsShowed] = useState(false)

	const addFromDevice = () => {
		props.handleClick()
	}

	const addByURL = () => {
		setIsShowed(true)
	}

	return (
		<>
			<p className={styles.wrapper}>
				You can also &nbsp;
				<span className={styles.loader} onClick={addFromDevice}>
					browse from your computer
				</span>
				&nbsp;or&nbsp;
				<span className={styles.loader} onClick={addByURL}>
					add image URLs
				</span>
				.
			</p>

			{isShowed ? <FormToAddByURL setIsShowed={setIsShowed} /> : null}
		</>
	)
}

export default TextToSelectImage
