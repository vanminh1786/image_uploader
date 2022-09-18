import styles from './ImageSelectorIcon.module.css'

function ImageSelectorIcon(props) {
	const handleClick = () => {
		props.handleClick()
	}

	return (
		<div className={styles.wrapper} onClick={handleClick}>
			<div className={styles.icon}>
				<i className="fa-solid fa-cloud-arrow-up fa-6x"></i>
			</div>
			<p className={styles.description}>Paste images here to upload</p>
		</div>
	)
}

export default ImageSelectorIcon
