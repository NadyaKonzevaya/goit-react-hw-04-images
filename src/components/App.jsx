import styles from "./styles.module.css";
import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import Button from "./Button";
import ImageGallery from "./ImageGallery";
import Loader from "./Loader";
import Modal from "./Modal";
import SearchBar from "./Searchbar";
import { ToastContainer, toast } from "react-toastify";

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};


export function App() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState("");
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState("");

  // const cardRef = useRef(null);

  const scrollDown = () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
  }
  const handleFormSubmit = searchQuery => {
    setStatus(Status.PENDING);
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([])
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
    setStatus(Status.PENDING);
   
   
       
  };

  useEffect(() => {
    if (status === Status.PENDING) {
      api.fetchImagesWithQuery(searchQuery, page).then(items => {
        setImages(prev => [...prev, ...items]);
        setStatus(Status.RESOLVED);
         scrollDown();
       
      }).catch(error => { 
        setError(error);
        setStatus(Status.REJECTED);
      })
    }
  }, [page, searchQuery, status])
    
  

  const handleOpenModal = (largeImageUrl, tags) => {
    setLargeImageUrl(largeImageUrl);
    setTags(tags);
    toggleModal();
  };

  const toggleModal = () => {
   setShowModal(!showModal)
  };
   
    return (
    <div className={styles.App} >
      <SearchBar onSubmit={ handleFormSubmit} />
      {status === Status.RESOLVED && <ImageGallery items={images} onClick={handleOpenModal}/>}
     { (images.length !== 0)  && <Button onLoadMore={loadMore}/>}
      {status === Status.PENDING && <Loader />}
        {showModal && largeImageUrl && <Modal onClose={toggleModal}>
          <img src={largeImageUrl} alt={tags}  />
        </Modal>}
    </div>
    );
 
};
