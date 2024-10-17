import styles from './Loading.module.scss'
import loading from '../../img/loading.svg'

const Loading = () => {
    return(
        <div className={styles.loader_container}>
            <img src={loading} alt='Loading'/>
        </div>
    )
}

export default Loading