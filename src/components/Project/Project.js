import { useParams } from 'react-router-dom'
import styles from './Project.module.scss'
import { useEffect, useState } from 'react'
import Loading from '../../layout/Loading/Loading';
import Container from '../../layout/Container/Container';
import ProjectForm from '../../projetos/ProjectForm/ProjectForm';
import Message from '../../layout/Message/Message';
import ServiceForm from '../../services/ServiceForm';
import { parse, v4 as uuidv4} from 'uuid';
import ServiceCard from '../../services/ServiceCard';



const Project = () => {

    const { id} = useParams()
    const [project, setProject]= useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [typeMessage, setTypeMessage] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET", headers: {
                    'Content-Type': 'application/json'
                }
            }).then((resp) => resp.json()).then((dados)=> {
                setProject(dados)
                setServices(dados.services)
            })
        }, 3000)
    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function removeService(id, cost) {
        const serviceUpdated = project.services.filter((service) => 
        service.id !== id)

        const projectUpdated = project
        projectUpdated.services = serviceUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then((resposta) => resposta.json()).then((data) => {
            setProject(projectUpdated)
            setServices(serviceUpdated)
            setMessage('Serviço excluído com sucesso!')
            setTypeMessage('success')
        })

    }
    
    function editPost(projeto) {
        setMessage('')
        if(projeto.budget < projeto.cost){
            setMessage('Orçamento não pode ser menor que o custo do projeto!')
            setTypeMessage('error')
            return false
            
        }

        fetch(`http://localhost:5000/projects/${projeto.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projeto)
        }).then(resp => resp.json()).then((data) => {
            setProject(projeto)
            setShowProjectForm(false)
            setMessage('Projeto Atualizado!')
            setTypeMessage('success')
        })
    }

    function createService(projeto) {
        setMessage('')
        const lastService = projeto.services[projeto.services.length - 1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(projeto.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(projeto.budget)) {
            setMessage("Orçamento ultrapassado, verifique o valor do serviço")
            setTypeMessage('error')
            projeto.services.pop()
            return false
        }

        projeto.cost = newCost

        fetch(`http://localhost:5000/projects/${projeto.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projeto)
        }).then(resp => resp.json()).then((data)=> {
            setShowServiceForm(false)
        })
    }

    return (
        <>
        {project.name ? (<div className={styles.project_details}>
            <Container customClass='column'>
                {message && <Message type={typeMessage} msg={message} />}
                <div className={styles.project_details_container}>
                    <h1>Projeto: {project.name} 
                    </h1>
                    <button onClick={toggleProjectForm}>{!showProjectForm ? 'Editar Projeto' : 'Fechar'}</button>
                    {!showProjectForm ? (
                        <div className={styles.project_details_formInfo}>
                            <p><span>Categoria: </span> {project.category.name}</p>
                            <p><span>Total de Orçamento: </span> R${project.budget}</p>
                            <p><span>Total Utilizado: </span> {project.cost}</p>
                             </div>

                    ) : <div className={styles.project_details_formInfo}><ProjectForm handleSubmit={editPost} btnText='Concluir Edição' projectData={project} /></div> }
                </div>
                <div className={styles.project_details_service}>
                        <h2>Adicione um serviço:</h2>
                        <button onClick={toggleServiceForm}>{!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}</button>
                        <div className={styles.project_details_formInfo}>
                            {
                                showServiceForm && ( <ServiceForm handleSubmit={createService} btnText='Cria seu serviço' projectData={project}/>)
                            }
                        </div>
                </div>
                <h2>Serviços</h2>
                <Container customClass='start'>
                   {services.length > 0 && (
                    services.map((servico) => (
                        <ServiceCard 
                            id={servico.id}
                            name={servico.name}
                            cost={servico.cost}
                            description={servico.description}
                            key={servico.id}
                            handleRemove={removeService}
                        />
                    ))
                   )}
                   {services.length === 0 && <p>Não há serviços</p>}
                </Container>
            </Container>
        </div>) : <Loading />}
        </>
    )
}

export default Project