import "../css/BookCard.css"
import { useBookContext } from "../contexts/BookContext"

function BookCard({book}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useBookContext()
    const favorite = isFavorite(book.primary_isbn10)

    function onFavoriteClick(e) {
        e.preventDefault()
        if(favorite) removeFromFavorites(book.primary_isbn10)
        else addToFavorites(book)
    }

    return (
    <div className="book-card">
        <div className="book-poster">
            <img src={book.book_image} alt={book.title} />
            <div className="book-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
        <div className="book-info">
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>ISBN:</strong> {book.primary_isbn10}</p>
            <p><strong>Description:</strong> {book.description}</p>
            
            {book.buy_links && (
                    <div className="buy-links">
                        <strong>Buy Links:</strong>
                        <ul>
                            {book.buy_links.map((link) => (
                                <li key={link.name}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

        </div>
    </div>
    );

}

export default BookCard;