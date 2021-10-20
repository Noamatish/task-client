import React, { useState, useEffect } from "react";

const Oops = () => {
  const [clock, setClock] = useState(10);

  useEffect(() => {
    const handler = () => {
      setClock((prev) => {
        if (prev === 1) {
          window.location.href = "/";
        }
        return prev - 1;
      });
    };
    setInterval(handler, 1000);
    return () => {
      clearInterval(handler);
    };
  }, []);

  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="error-page">
      <div className="error-page--top">
        <p className="error-page-title">Oops</p>
      </div>
      <img
        src="/assets/images/error.svg"
        alt=""
        className="error-page-big-img"
      />
      <p className="error-page-description">
        Error
      </p>
      <button
        onClick={goHome}
        className="error-page-redirect button-hover-dark"
      >
        Go to home ({clock})
      </button>
    </div>
  );
};

export default Oops;
