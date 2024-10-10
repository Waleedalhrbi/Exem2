import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

const Info = () => {
  const { rank } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=WqEuaIssdUiaBrLWMxq2k2NKGmXli7Pw');
        const books = response.data.results.books;  
        const selectedBook = books.find(b => b.rank === parseInt(rank)); 
        setBook(selectedBook);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBooks();
  }, [rank]);

  const handleAddToFavorites = () => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFavorite = existingFavorites.some(favBook => favBook.title === book.title);
    
    if (isAlreadyFavorite) {
      alert('This book is already added to favorite');
    } else {
      const updatedFavorites = [...existingFavorites, book];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      navigate('/Favorites');
    }
  };

  const handleMarkAsRead = () => {
    const existingReadBooks = JSON.parse(localStorage.getItem('readBooks')) || [];
    const isAlreadyRead = existingReadBooks.some(readBook => readBook.title === book.title);

    if (isAlreadyRead) {
      alert('This book is already added to read');
    } else {
      const updatedReadBooks = [...existingReadBooks, book];
      localStorage.setItem('readBooks', JSON.stringify(updatedReadBooks));
      navigate('/Readed');
    }
  };

  if (!book) return <div className="text-center text-xl font-semibold">Loading...</div>;
  

  return (
    <>
    <Navbar></Navbar>
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg  max-w-2xl mb-12 mt-14">
      <h2 className="text-3xl font-bold text-center text-gray-800">{book.title}</h2>
      <div className='flex justify-center'>
      <img src={book.book_image} className="w-56 h-auto rounded-lg mt-4" />
      </div>
      <h6 className="text-base font-medium mb-2"> {book.author}</h6>
      <p className="mt-4 text-gray-600">{book.description}</p>
      <a href={book.amazon_product_url} target="_blank" rel="noopener noreferrer">
  <button className="btn bg-cyan-900 mt-4 text-white">
    Buy it now
  </button>
</a>



      <div className="flex justify-between mt-6">
        <button className="btn bg-[#176B87] text-white" onClick={handleAddToFavorites}>
          Add to Favorites
        </button>
        <button className="btn bg-[#176B87] text-white hover:bg-" onClick={handleMarkAsRead}>
          Mark as Read
        </button>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Info;


