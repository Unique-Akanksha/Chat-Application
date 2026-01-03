import styles from '../styles/searchbar.module.scss'
const Searchbar = () => {
    return (
        <div className={styles.searchbar}> <input type="text" placeholder='Search' /></div>
    )
}

export default Searchbar