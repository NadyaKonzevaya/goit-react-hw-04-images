import styles from "./styles.module.css";

import  ImageGalleryItem  from "components/ImageGalleryItem";

const ImageGallery = ({items, ...restProps}) => {
    return (
        <ul className={styles.ImageGallery}>
            {items.map(item => 
                <ImageGalleryItem
                    item={item}
                    key={item.id}
                    src={item.webformatURL}
                    alt={item.tags}
                    {...restProps}
                />
            )}
        </ul>
    )

}

export default ImageGallery;
