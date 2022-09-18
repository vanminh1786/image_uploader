import styles from './Logo.module.css'

function Logo() {
	return (
		<div className={styles.logo}>
			<img
				src="https://bravebits.jira.com/s/azc3hx/b/8/fa5a6db90963628fc3254e4c3f44c25b/_/jira-logo-scaled.png"
				alt="logo"
			/>
		</div>
	)
}

export default Logo
