import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Readed = () => {
  const [readBooks, setReadBooks] = useState([]);

  useEffect(() => {
    const savedReadBooks = JSON.parse(localStorage.getItem('readBooks')) || [];
    setReadBooks(savedReadBooks);
  }, []);

  return (
    <>
    <Navbar></Navbar>
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold">Read Books</h2>
      {readBooks.length === 0 ? (
        <p>No read books found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {readBooks.map((book, index) => (
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

export default Readed;
