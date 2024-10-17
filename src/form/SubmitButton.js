import styles from './SubmitButton.module.scss'

const SubmitButton = ({ text}) => {
    return (
        <div >
            <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default SubmitButton