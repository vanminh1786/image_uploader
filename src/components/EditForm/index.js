import styles from './EditForm.module.css'

function EditForm({ srcImage }) {
	return (
		<div className={styles.wrapper}>
			<form className={styles.form}>
				<p>Edit</p>
				<img src={srcImage} alt="" />
				<p>Title</p>
				<input type="text" />
				<p>Auto delete image</p>
				<select type="text">
					<option selected>Don't auto delete</option>
					<option value="PT5M">After 5 minutes</option>
				</select>
				<button>Submit</button>
			</form>
			<div>
				<i className="fa-solid fa-xmark"></i>
			</div>
		</div>
	)
}

export default EditForm
