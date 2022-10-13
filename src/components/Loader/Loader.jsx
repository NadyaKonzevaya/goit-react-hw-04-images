import { Hearts } from 'react-loader-spinner';
import styles from "./styles.module.css";

const Loader = () => (
    <div  className={styles.loader}>
        <Hearts
        color="pink"
        height={80}
        width={80} 
    />
    </div>
    
)


export default Loader;