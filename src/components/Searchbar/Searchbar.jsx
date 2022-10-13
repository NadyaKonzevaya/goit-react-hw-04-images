import { Component } from "react";
import { toast } from 'react-toastify';
import styles from "./styles.module.css";


class SearchBar extends Component {
    state = {
        searchQuery: "",
    };

    handleChange = e => {
        this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
    }

    handleSubmit = e => {
        e.preventDefault();

        if (this.state.searchQuery.trim() === "") {
            toast.error("Введите валидное слово.");
            return;
        }
        this.props.onSubmit(this.state.searchQuery);
        this.setState({ searchQuery: "" });
    }

    render() {
        return (
        <header className={styles.Searchbar}>
            <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
                <button type="submit" className={styles.SearchForm_button}>
                    <span className={styles.SearchForm_button_label}>Search</span>
                </button>

                <input
                    className={styles.SearchForm_input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={this.state.searchQuery}
                    onChange={this.handleChange}

                />
            </form>
        </header>
    )
    }
    
}

export default SearchBar;