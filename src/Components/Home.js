import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {

    const navigate = useNavigate()

    const handleOnClick=()=>{
        navigate("/register")
    }
  return (
    <>
      <div className="home-container">
        <div className="hero-section">
          <div className="hero-overlay">
            <div className="hero-content">
              <h1>Welcome to TaskMaster</h1>
              <p>Streamline your productivity with smart task management</p>
              <button className="cta-button" onClick={handleOnClick}>Get Started</button>
            </div>
          </div>
          <img
            src={process.env.PUBLIC_URL + '/taskmanagement.jpg'}
            alt="Task Management Dashboard"
            className="hero-image"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
