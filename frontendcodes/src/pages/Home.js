import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./unnamed.jpg";
function Home() {
  // const backgroundStyle = {
  //     backgroundImage: `url(${backgroundImage})`,
  //     backgroundSize: 'cover',
  //     backgroundPosition: 'center',
  //     height: '100vh',
  //     width: '100%',
  //     display: 'flex',
  //     justifyContent: 'center',
  //     alignItems: 'center'
  //   };
  const navigate = useNavigate();
  const goto = () => {
    navigate("/login");
  };
  return (
    <div className="home">
      <div className="homecontents">
        <h1>
          All <span style={{ color: "red" }}>your</span> favourites in one place
        </h1>
        <h2>
          order <span style={{ color: "red" }}>anywhere</span>, eat{" "}
          <span>anything</span>
        </h2>
        <button id="home-btn" onClick={goto}>
          get started
        </button>
      </div>
    </div>
  );
}

export default Home;
