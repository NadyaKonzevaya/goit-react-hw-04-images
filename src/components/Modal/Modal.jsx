import styles from "./styles.module.css";
import { useEffect } from "react";

// class Modal extends Component {

function Modal({onClose, children}) {

    // const handleKeyDown = e => {
    //     if (e.code === "Escape") {
    //         onClose();
    //     }
    // }
        const handleBackdropClick = e => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }

    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === "Escape") {
                onClose();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
        }, [onClose])
    
        // componentDidMount() {
        //     window.addEventListener("keydown", handleKeyDown);
        // }

        return (
            <div className={styles.Overlay} onClick={handleBackdropClick}>
                <div className={styles.Modal}>
                    {children}
                </div>
            </div>
        )
    }

export default Modal;