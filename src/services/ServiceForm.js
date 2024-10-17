
import { useState } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import styles from '../projetos/ProjectForm/ProjectForm.module.scss'

const ServiceForm = ({handleSubmit, btnText, projectData}) => {

    const [service, setService] = useState({})
    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e) {
        
        setService({...service, [e.target.name]: e.target.value})
    }
    return (
        <form className={styles.form} onSubmit={submit}>
            <Input type='text' text='Nome do Serviço' name='name' placeholder='Insira o nome do serviço' handleOnChange={handleChange} />
            <Input type='number' text='Custo do Serviço' name='cost' placeholder='Insira o custo do serviço' handleOnChange={handleChange} />
            <Input type='text' text='Descrição do Serviço' name='description' placeholder='Insira a descrição do serviço' handleOnChange={handleChange} />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ServiceForm