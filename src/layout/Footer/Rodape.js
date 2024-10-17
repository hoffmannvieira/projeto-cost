import styles from './Footer.module.scss'
import { FaFacebook as Face, FaInstagram as Insta, FaLinkedin as Linkedin} from 'react-icons/fa';

const Rodape = () => {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li>
                    <Face/>
                </li>
                <li>
                    <Insta/>
                </li>
                <li>
                    <Linkedin/>
                </li>
                
            </ul>
            <p className={styles.copy_right}>
                <span>
                    Costs &copy; 2024
                </span>
                </p>

        </footer>
    )
}

export default Rodape;