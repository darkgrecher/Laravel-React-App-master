import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/contextprovider";

const HomePage = () => {
  const navigate = useNavigate();
  const { token } = useStateContext();
  const handleLoginClick = () => {
    if (token) {
      navigate("/admin-dashboard");
    } else {
      navigate("/login");
    }
  };
  const handleRegisterClick = () => {
    if (token) {
      navigate("/user");
    } else {
      navigate("/register");
    }
  };
  return (
    <div className="HomePage">
      <header className="header">
        <div className="logo">Learn Programming</div>
        <nav className="nav">
          <button className="nav-button " onClick={handleLoginClick}>
            <b>Login</b>
          </button>
          <button className="nav-button" onClick={handleRegisterClick}>
            <b>Sign up</b>
          </button>
        </nav>
      </header>
      <section className="hero-section">
        <h1>Zero to Hero : Build Your Programming Skills</h1>
        <br /><br />
        <p>
        Take your first steps into the world of coding and go from a
         complete beginner to a programming pro. With easy-to-follow lessons, 
         hands-on projects, and expert guidance, this platform will help you master 
         the skills needed to build real-world applications and achieve your coding
          goals.
        </p>
      </section>
      <section className="info-section">
        <h2>About Learn Programming
        </h2>
        <br /><br />
        <div className="info-cards">
          <div className="info-card">
            <h3>Explore new skills</h3>
            <br />
            <p>
            Access 10,000+ courses in AI, Programming, Web development, and more.
            </p>
          </div>
          <div className="info-card">
            <h3>Earn valuable credentials</h3>
            <br />
            <p>
            Get certificates for every course you finish and boost your chances of getting hired after your trial ends at no additional cost.
            </p>
          </div>
          <div className="info-card">
            <h3>Learn from the best</h3>
            <br />
            <p>
            Take your skills to the next level with expert-led courses and Learn Programming Coach, your AI-powered guide.
            </p>
          </div>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2024 Learn Programming Inc. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
