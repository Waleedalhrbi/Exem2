import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";

const API_URL = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=WqEuaIssdUiaBrLWMxq2k2NKGmXli7Pw";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      setBooks(response.data.results.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearch = () => {
    if (search.trim()) {
      const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
      setBooks(filteredBooks);
    } else {
      fetchBooks();
    }
  };

  const toInfo = (rank) => {
    navigate(`/Info/${rank}`);
  };



  return (
    <>
    <Navbar></Navbar>
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Book List</h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2 w-2/3 md:w-1/3"
          placeholder='Search Book by title'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn bg-cyan-900 ml-2 text-white"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.rank} className="bg-white rounded-lg shadow-md overflow-hidden">
            <a href="#!">
              <img
                src={book.book_image}
            
                className="w-full  h-48 object-cover"
              />
            </a>
            <div className="p-4">
              <h5 className="text-lg font-semibold mb-2">{book.title}</h5>
              <h6 className="text-base font-medium mb-2"> {book.author}</h6>
              <p className="text-gray-700 mb-4">{book.description}</p>
              <button
                type="button"
                className="btn bg-cyan-900 text-white"
                onClick={() => toInfo(book.rank)}
              >
                SHOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Home;
