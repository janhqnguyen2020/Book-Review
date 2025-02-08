import BookCard from "../components/BookCard";
import { useEffect, useState } from "react";
import "../css/Home.css"
import { getPopularBooks, searchBookTitle } from "../services/api";

function Home() {

    const[searchQuery, setSearchQuery] = useState("");
    const[books, setBooks] = useState([])
    const[error, setError] = useState(null);
    const[loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPopularBooks = async () => {
            try {
                const popularBooks = await getPopularBooks()
                setBooks(popularBooks)
            } catch (err) {
                console.log(err)
                setError("Failed to load Books...")
            } finally {
                setLoading(false)
            }
        }

        loadPopularBooks()

    }, [])

    //created bc onSubmit parameter cannot be blank
    const handleSearch = async (e) => {
        e.preventDefault()
        if(!searchQuery.trim()) return
        if(loading) return

        setLoading(true)
        try {
            const searchResults = await searchBookTitle(searchQuery)
            setBooks(searchResults)
            setError(null)
        } catch (err) {
            setError("Failed to find book...")
        } finally {
            setLoading(false)
        }
    }

    return (
    <div className="home">
        
        <div className="search-grid">
        <form onSubmit={handleSearch} className="search-btn">
            <input 
                type="text" 
                placeholder="Search for Book..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
        </form>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (<div className="loading">Loading...</div>)
        : ( <div className="book-grid">
                {books.map((book) => 
                    (
                        <BookCard book={book} key={book.title}/>
                    )
                )}
            </div>
        )}

    </div>
    );
}

export default Home;