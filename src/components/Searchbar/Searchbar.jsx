import { useState } from "react";
import { toast } from 'react-toastify';
import styles from "./styles.module.css";


// class SearchBar extends Component {
//     state = {
//         searchQuery: "",
//     };

function SearchBar({onSubmit}) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = e => {
        setSearchQuery(e.currentTarget.value.toLowerCase());
    }
    // handleChange = e => {
    //     this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
    // }

    const handleSubmit = e => {
        e.preventDefault();

        if (searchQuery.trim() === "") {
            toast.error("Введите валидное слово.");
            return;
        }
       onSubmit(searchQuery);
        setSearchQuery("");
    }
    // handleSubmit = e => {
    //     e.preventDefault();

    //     if (this.state.searchQuery.trim() === "") {
    //         toast.error("Введите валидное слово.");
    //         return;
    //     }
    //     this.props.onSubmit(this.state.searchQuery);
    //     this.setState({ searchQuery: "" });
    // }

    
        return (
        <header className={styles.Searchbar}>
            <form className={styles.SearchForm} onSubmit={handleSubmit}>
                <button type="submit" className={styles.SearchForm_button}>
                    <span className={styles.SearchForm_button_label}>Search</span>
                </button>

                <input
                    className={styles.SearchForm_input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={searchQuery}
                    onChange={handleChange}

                />
            </form>
        </header>
    )
    
}

export default SearchBar;