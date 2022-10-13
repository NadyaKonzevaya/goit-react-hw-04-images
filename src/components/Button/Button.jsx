import styles from "./styles.module.css";


const Button = ({onLoadMore}) => (
    <button className={ styles.Button} type="button"onClick={onLoadMore}>Load more</button>
)

export default Button;