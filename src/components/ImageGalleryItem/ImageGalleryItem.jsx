import styles from "./styles.module.css";


const ImageGalleryItem = ({ item, onClick }) => {
    
    return (
        <li className={styles.ImageGalleryItem }>
            <img className={styles.ImageGalleryItem_image} src={item.webformatURL} alt={item.tags} onClick={() =>  onClick(item.largeImageURL, item.tags)} />
        </li>
    )
}
export default ImageGalleryItem;