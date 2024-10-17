import { useState } from 'react'
import Input from '../../form/Input'
import Select from '../../form/Select'
import SubmitButton from '../../form/SubmitButton'
import styles from './ProjectForm.module.scss'
import { useEffect } from 'react'
const ProjectForm = ({handleSubmit, btnText, projectData}) => {
    
   
    const [categorias, setCategorias] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(()=> {
        fetch('http://localhost:5000/categories', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resposta) => resposta.json())
        .then((dados) => {
            setCategorias(dados)
        }).catch((e) => console.log(e))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({...project, [e.target.name]: e.target.value})
        console.log(project)
    }

    function handleCategory(e) {
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }})
        console.log(project)
    }
    return (
        <form onSubmit={submit} className={styles.form}>
            <div>
            <Input type='text' text='Nome do Projeto' name='name' placeholder='Insira o nome do Projeto' handleOnChange={handleChange} value={project.name} />
            </div>
            <div>
            <Input type='number' text='Orçamento do Projeto' name='budget' placeholder='Insira orçamento total' handleOnChange={handleChange} value={project.budget} />
            </div>
            <div>
            <Select options={categorias} name='category_id' text='Selecione a categoria' handleOnChange={handleCategory} value={project.category ? project.category.id : ''}/>
            </div>
            <div>
               <SubmitButton text={btnText} />
            </div>
            
        </form>
    )
}

export default ProjectForm