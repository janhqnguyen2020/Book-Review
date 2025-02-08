import { createContext, useState, useEffect, useContext } from "react";

const BookContext = createContext()

export const useBookContext = () => useContext(BookContext)

export const BookProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")

        if(storedFavs) setFavorites(JSON.parse(storedFavs))
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (book) => {
        setFavorites(prev => [...prev, book])
    }

    const removeFromFavorites = (primary_isbn10) => {
        setFavorites(prev => prev.filter(book => book.primary_isbn10 !== primary_isbn10))
    }

    const isFavorite = (primary_isbn10) => {
        return favorites.some(book => book.primary_isbn10 === primary_isbn10)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <BookContext.Provider value={value}>
        {children}
    </BookContext.Provider>
}