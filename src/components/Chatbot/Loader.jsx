import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader w-dvh h-dvh flex items-center justify-center">
        <section className="dots-container w-full h-full">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </section>
    </div>
  )
}

export default Loader;
