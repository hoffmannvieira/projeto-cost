
import styles from '../Home/Home.module.scss'
import {ReactComponent as Image} from '../../img/savings.svg'
import LinkButton from '../../layout/LinkButton/LinkButton';

const Home = () => {
    return (
        <section className={styles.home_container}>
            <h1 className={styles.home_container_titulo}>Bem vindo ao projeto <span>Costs</span></h1>
            <p>Comece agora mesmo a gerenciar seus projetos!</p>
            <LinkButton to='/newproject' text='Criar Projeto' />
            <Image className={styles.home_container_img} />
        </section>
    )
}


export default Home;