import styles from './App.module.css'
import Logo from './components/Logo'
import Type from './components/Type'
import ImageLoader from './components/ImageLoader'

function App() {
	return (
		<div
			className={styles.app}
			onDragOver={(e) => e.preventDefault()}
			onDrop={(e) => e.preventDefault()}
		>
			<Logo />
			<div className={styles.content}>
				<ImageLoader />
			</div>
			<Type />
		</div>
	)
}

export default App
