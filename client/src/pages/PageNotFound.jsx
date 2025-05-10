import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className=" flex flex-col items-center justify-center space-y-4">
        <h1 className="text-blue-500 md:text-3xl">404</h1>
        <h1 className="text-4xl md:text-7xl">Page not found</h1>
        <p className="text-gray-400 md:text-xl">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link
          to={'/'}
          className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none"
        >
          Go back home
        </Link>
      </div>
    </section>
  );
};

export default PageNotFound;
