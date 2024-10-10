import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <>
    <Navbar></Navbar>
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold">Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite books found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((book, index) => (
            <div key={index} className="card bg-base-100 shadow-xl p-4">
              <h5 className="text-lg font-semibold">{book.title}</h5>
              <img src={book.book_image} className="w-full h-auto rounded-lg" />
              <p>{book.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer></Footer>
    </>
  );
};

export default Favorites;
