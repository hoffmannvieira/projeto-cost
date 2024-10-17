import styles from '../projetos/ProjectCard/ProjectCard.module.scss'
import { BsTrashFill } from 'react-icons/bs'

const ServiceCard = ({name, id, description, handleRemove, cost}) => {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost)
    }
    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo Total: </span> R$ {cost}

            </p>
            <p>{description}</p>
            <div className={styles.project_card_actions}>
            <button onClick={remove}>
                <BsTrashFill /> Remover
                </button>
            </div>
        </div>
    )
}

export default ServiceCard