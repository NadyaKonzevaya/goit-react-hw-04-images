import styles from "./styles.module.css";
import { Component } from "react";

class Modal extends Component {

   handleKeyDown = e => {
        if (e.code === "Escape") {
            this.props.onClose();
        }
    }
   
    handleBackdropClick = e => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    }
    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
     }
    render() {
        return (
            <div className={styles.Overlay} onClick={this.handleBackdropClick}>
            <div className={styles.Modal}>
                {this.props.children}
            </div>
        </div>
    )
    }
    
}

export default Modal;