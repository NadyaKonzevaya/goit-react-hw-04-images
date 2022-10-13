import styles from "./styles.module.css";
import { Component } from "react";
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

export class App extends Component {
  state = {
    page: 1,
    searchQuery: "",
    images: [],
    showModal: false,
    largeImageUrl: '',
    tags: "",
    status: Status.IDLE,
    error: "",
  }

  componentDidMount() {
    if (this.state.searchQuery.length > 0) {
      this.setState({status: Status.PENDING});
      api.fetchImagesWithQuery(this.state.searchQuery, this.state.page).then(items => this.setState({ images: items, status: Status.RESOLVED }))
        .catch(error => this.setState({error, status: Status.REJECTED}));
   }
  };
  
  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ images: [], page: 1, status: Status.PENDING});
      api.fetchImagesWithQuery(this.state.searchQuery, 1).then(fotos => this.setState({ images: fotos, page: 1, status: Status.RESOLVED }))
        .catch(error => this.setState({error, status: Status.REJECTED}));
    } else if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState({status: Status.PENDING});
      api.fetchImagesWithQuery(this.state.searchQuery, this.state.page)
        .then(fotos => this.setState(prevState => { return { images: [...prevState.images, ...fotos], status: Status.RESOLVED } }))
        .catch(error => this.setState({error, status: Status.REJECTED}));;
    }
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleOpenModal = (largeImageUrl, tags) => {
    this.setState({ showModal: true, largeImageUrl, tags });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }))
  };

  render() {
    const { images, showModal, largeImageUrl, tags,status } = this.state;
    return (
    <div className={styles.App} >
      <SearchBar onSubmit={ this.handleFormSubmit} />
      {status === Status.RESOLVED && <ImageGallery items={images} onClick={this.handleOpenModal}/>}
     {/* { (images.length !== 0)  && <Button onLoadMore={this.loadMore}/>} */}
     { (images.length !== 0)  && <Button onLoadMore={this.loadMore}/>}
      {status === Status.PENDING && <Loader />}
        {showModal && largeImageUrl && <Modal onClose={this.toggleModal}>
          <img src={largeImageUrl} alt={tags}  />
        </Modal>}
    </div>
    );
  }
};
