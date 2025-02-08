const API_KEY = "zgInoGxczl6yG00rmmJ3FCK5WGhKY7s8";
const BASE_URL = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json"
const SEARCH_URL = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json";

export const getPopularBooks = async() => {
    try {
        const response = await fetch(`${BASE_URL}?api-key=${API_KEY}`);
        if(!response.ok) {
            throw new Error("Failed to fetch books");
        }
        const data = await response.json()
        return data.results.books;
    } catch (error) {
        console.error("Error fetching books: ", error);
        return [];
    }

};

export const searchBookTitle = async (query) => {
    try {
        const response = await fetch(`${SEARCH_URL}?title=${encodeURIComponent(query)}&api-key=${API_KEY}`);
        if (!response.ok) {
            throw new Error("Failed to search book");
        }
        const data = await response.json();
        console.log(data)
        return data.results.length > 0 ? data.results.map(result => result.book) : []; // Extract books if results exist
    } catch (error) {
        console.error("Error searching book: ", error);
        return [];
    }
};
