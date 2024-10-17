import { useEffect, useState } from 'react'
import styles from './Message.module.scss'


const Message = ({type, msg}) => {

    const [visivel, setVisivel] = useState(false)

    useEffect(() => {
         if(!msg) {
          setVisivel(false)
            return
        }
        setVisivel(true)
        const timer = setTimeout(() => {
            setVisivel(false)
        }, 3000)

        return () => clearTimeout(timer)
     }, [msg])
  
    return (
        <>
        {
            visivel && (<div className={`${styles.message} ${styles[type]}`}>
                {msg}
            </div>)
        }
        </>
    )
}

export default Message