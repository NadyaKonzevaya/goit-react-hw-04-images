import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import api from "../services/api";
import Button from "./Button";
import ImageGallery from "./ImageGallery";
import Loader from "./Loader";
import Modal from "./Modal";
import SearchBar from "./Searchbar";

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

  useEffect(() => {
    if (searchQuery.length > 0) {
      setStatus(Status.PENDING);
      api.fetchImagesWithQuery(searchQuery, page).then(items => {
        setImages(items);
        setStatus(Status.RESOLVED);
      }).catch(error => { 
        setError(error);
        setStatus(Status.REJECTED);
      })
    }
  }, [searchQuery, page])
  
  
  // componentDidMount() {
  //   if (this.state.searchQuery.length > 0) {
  //     this.setState({status: Status.PENDING});
  //     api.fetchImagesWithQuery(this.state.searchQuery, this.state.page).then(items => this.setState({ images: items, status: Status.RESOLVED }))
  //       .catch(error => this.setState({error, status: Status.REJECTED}));
  //  }
  // };
  useEffect(() => {
    setImages([]);
    setPage(1);
    setStatus(Status.PENDING);
    api.fetchImagesWithQuery(searchQuery, 1).then(fotos => {
      setImages(fotos);
      setPage(1);
      setStatus(Status.RESOLVED);
    }).catch(error => { 
      setError(error);
      setStatus(Status.REJECTED)
    });
  }, [searchQuery]);

  useEffect(() => {
    if (page === 1) {
      return
    }
    setStatus(Status.PENDING);
    api.fetchImagesWithQuery(searchQuery, page)
      .then(fotos => {
        setImages(prev => [...prev, ...fotos]);
        setStatus(Status.RESOLVED);
      }).catch(error => { 
        setError(error);
        setStatus( Status.REJECTED)
      })
  }, [page, searchQuery])
  
  // componentDidUpdate(_, prevState) {
  //   if (prevState.searchQuery !== this.state.searchQuery) {
  //     this.setState({ images: [], page: 1, status: Status.PENDING});
  //     api.fetchImagesWithQuery(this.state.searchQuery, 1).then(fotos => this.setState({ images: fotos, page: 1, status: Status.RESOLVED }))
  //       .catch(error => this.setState({error, status: Status.REJECTED}));
  //   } else if (prevState.page !== this.state.page && this.state.page !== 1) {
  //     this.setState({status: Status.PENDING});
  //     api.fetchImagesWithQuery(this.state.searchQuery, this.state.page)
  //       .then(fotos => this.setState(prevState => { return { images: [...prevState.images, ...fotos], status: Status.RESOLVED } }))
  //       .catch(error => this.setState({error, status: Status.REJECTED}));;
  //   }
  // };

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery)
 
  };
  // handleFormSubmit = searchQuery => {
  //   this.setState({ searchQuery });
  // };

  const loadMore = () => {
    setPage(prev => prev + 1)
  };
  // loadMore = () => {
  //   this.setState(prevState => ({ page: prevState.page + 1 }));
  // };

  const handleOpenModal = (largeImageUrl, tags) => {
    setShowModal(true);
    setLargeImageUrl(largeImageUrl);
    setTags(tags);
  };
  // handleOpenModal = (largeImageUrl, tags) => {
  //   this.setState({ showModal: true, largeImageUrl, tags });
  // };

  const toggleModal = () => {
   setShowModal(!showModal)
  };
  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({ showModal: !showModal }))
  // };

 
   
    return (
    <div className={styles.App} >
      <SearchBar onSubmit={ handleFormSubmit} />
      {status === Status.RESOLVED && <ImageGallery items={images} onClick={handleOpenModal}/>}
     {/* { (images.length !== 0)  && <Button onLoadMore={this.loadMore}/>} */}
     { (images.length !== 0)  && <Button onLoadMore={loadMore}/>}
      {status === Status.PENDING && <Loader />}
        {showModal && largeImageUrl && <Modal onClose={toggleModal}>
          <img src={largeImageUrl} alt={tags}  />
        </Modal>}
    </div>
    );
 
};
