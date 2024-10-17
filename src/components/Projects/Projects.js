import { useLocation } from 'react-router-dom';
import Message from '../../layout/Message/Message';
import styles from './Projects.module.scss'
import Container from '../../layout/Container/Container';
import LinkButton from '../../layout/LinkButton/LinkButton';
import { useEffect, useState } from 'react';
import ProjectCard from '../../projetos/ProjectCard/ProjectCard';
import Loading from '../../layout/Loading/Loading';

const Projects = () => {
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading]= useState(false)
    const [projetoMessage, setProjetoMessage] = useState('')

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
    
                }
            }).then((resposta) => resposta.json()).then((dados) => {
                setProjects(dados)
            setRemoveLoading(true)
            })
            
        }, 300)
        
    }, [])

    function removerProjeto(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then((resp) => resp.json()).then(
            () => {
                setProjects(projects.filter((projeto) => projeto.id !== id))
                setProjetoMessage('Projeto Removido com sucesso')
            }
        )
    }

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }


    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
            <h1>Meus projetos</h1>
            <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            {message && <Message type='success' msg={message} />}
            {projetoMessage && <Message type='error' msg={projetoMessage} />}
            <Container customClass='start'>
                {projects.length > 0 && projects.map((projeto) => (
                    <ProjectCard name={projeto.name} budget={projeto.budget} category={projeto.category.name} key={projeto.name} id={projeto.id} handleRemove={removerProjeto}/>
                ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && <p>
                    Não há projetos!</p>}
            </Container>
        </div>
    )
}

export default Projects;