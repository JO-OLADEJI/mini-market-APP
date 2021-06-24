import { useEffect, useState } from 'react';
import './App.css';
import './components/components.css';
import Footer from './components/Footer.jsx';
import Login from './components/Login.jsx';
import MarketCard from './components/MarketCard.jsx';
import Nav from './components/Nav.jsx';
import MarketCardSkeleton from './skeletons/MarketCardSkeleton';
import eyes from './assets/eyes.png';
import cart from './assets/cart.png';
import add from './assets/add.png';


function App() {
  // const [adminAuthToken, setAdminAuthToken] = useState(null);
  const [loginPage, setLoginPage] = useState(false);
  const [allMarkets, setAllMarkets] = useState(null);

  const handleShowLogin = (show) => {
    setLoginPage(show);
  }

  useEffect(() => {
    setTimeout(async () => {
      // get all data from the API | delay for skeleton screen
      const raw = await fetch('http://localhost:3001/api/market');
      const data = await raw.json();
      setAllMarkets(data);
    }, 3 * 1000);
  });

  return (
    <div className="App">
      <Nav 
       handleShowLogin={handleShowLogin}
      />

      <div className="intro-text">
        <h1>Welcome,
          <br />
          L<img src={eyes} />king for a place to <img src={cart} /> ??
        </h1>
      </div>

      <div className="markets">
        {/* if market card exists */}
        {allMarkets && allMarkets.map(market => (
          <MarketCard 
            key={market._id}
            name={market.name}
            description={market.description}
            category={market.foodCategory}
            address={`${market.geolocation.lat}, ${market.geolocation.long}`}
          />
        ))}

        {/* if market details is not ready from API call */}
        {!allMarkets && [1, 2, 3, 4, 5].map(x => (
          <MarketCardSkeleton key={x} />
        ))}
      </div>

      <Footer />

      <Login
        loginPage={loginPage}
        handleShowLogin={handleShowLogin}
      />

      <div className="add-market-btn">
        <img src={add} alt="+" />
      </div>
    </div>
  );
}


export default App;
