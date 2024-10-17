import styles from './Navbar.module.scss'
import { Link } from 'react-router-dom'

import logo from '../../img/costs_logo.png'
import Container from '../Container/Container'

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                    <img src={logo} alt='Logo projeto' />
                </Link>
            <ul className={styles.list}>
                <li>
                <Link to="/">Home</Link>
            
                </li>
                <li>
                <Link to="/projects">Projetos</Link>
            
                </li>
                <li>
                <Link to="/contact">Contato</Link>
            
                </li>

                <li>
                <Link to="/company">Empresa</Link>
                
                </li>

                <li>
                <Link to="/newproject">Novo Projeto</Link>
                </li>

            
            </ul>
            </Container>
            
        </nav>
    )
}

export default Navbar