import "../css/Favorites.css"
import { useBookContext } from "../contexts/BookContext";
import BookCard from "../components/BookCard";

function Favorites() {
    const {favorites} = useBookContext()

        return (
        <div className="favorites">
            <h2>Your Favorites</h2>
            {favorites.length > 0 ? ( // 🔹 Check if the array is not empty
                <div className="book-grid">
                    {favorites.map(book => (
                        <BookCard book={book} key={book.primary_isbn10} />
                    ))}
                </div>
            ) : (
                <div className="favorites-empty">
                    <h2>No Favorite Books Yet</h2>
                    <p>Add books to your favorite collection and see them here</p>
                </div>
            )}
    </div>
    );
}

export default Favorites;