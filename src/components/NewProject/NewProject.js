import { useNavigate } from 'react-router-dom'
import ProjectForm from '../../projetos/ProjectForm/ProjectForm'
import styles from './NewProject.module.scss'

const NewProject = () => {

    const history = useNavigate()

    function createPost(projeto){
        // Inicializar cost and service
        projeto.cost = 0
        projeto.services = []

        fetch('http://localhost:5000/projects', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projeto)
        }).then((resposta) => resposta.json())
        .then((dados) => {
            console.log(dados)
            //redirecionar
            history('/projects', {state: {message: 'Criado com sucesso!'}})
        }).catch((e) => console.log(e))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projetos</h1>
            <p>Cria seu projeto aqui!</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProject