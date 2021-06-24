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
import MarketForm from './components/MarketForm.jsx';


function App() {
  // state
  const [authToken, setAuthToken] = useState(null);
  const [loginPage, setLoginPage] = useState(false);
  const [allMarkets, setAllMarkets] = useState(null);
  const [marketToDisplay, setMarketToDisplay] = useState(null);
  const [displayForm, setDisplayForm] = useState(false);
  const [searchParam, setSearchParam] = useState('');
  const [searchCategory, setSearchCategory] = useState('name');



  // functions [event handlers]
  const handleShowLogin = (show) => {
    setLoginPage(show);
  }

  const handleShowForm = (show) => {
    setDisplayForm(show);
  }

  const handleSearchChange = (e) => {
    setSearchParam(e.target.value);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchCategory === 'name') {
      const result = allMarkets.filter(market => market.name.toLowerCase().includes(searchParam.trim()));
      setMarketToDisplay(result);
    }
    else if (searchCategory === 'category') {
      const result = allMarkets.filter(market => market.foodCategory.toLowerCase().includes(searchParam.trim()));
      setMarketToDisplay(result);
    }
    console.log({ searchParam, searchCategory });
  }

  const handleSearchCategory = (x) => {
    setSearchCategory(x);
  }

  useEffect(() => {
    setTimeout(async () => {
      // get all data from the API | delay for skeleton screen
      const raw = await fetch('http://localhost:3001/api/market');
      const data = await raw.json();
      setAllMarkets(data);
      setMarketToDisplay(data);
    }, 3 * 1000);
  }, []);



  return (
    <div className="App">
      <Nav 
       handleShowLogin={handleShowLogin}
       handleSearchChange={handleSearchChange}
       handleSearchSubmit={handleSearchSubmit}
       searchCategory={searchCategory}
       handleSearchCategory={handleSearchCategory}
      />

      <div className="intro-text">
        <h1>Welcome,
          <br />
          L<img src={eyes} alt="" />king for a place to <img src={cart} alt="" /> ??
        </h1>
      </div>

      <div className="markets">
        {/* if market details is not ready from API call */}
        {!allMarkets && [1, 2, 3, 4, 5].map(x => (
          <MarketCardSkeleton key={x} />
        ))}

        {/* if market card exists */}
        {marketToDisplay && marketToDisplay.map(market => (
          <MarketCard
            key={market._id}
            name={market.name}
            description={market.description}
            category={market.foodCategory}
            address={`${market.geolocation.lat}, ${market.geolocation.long}`}
          />
        ))}
      </div>

      <Footer />

      <Login
        loginPage={loginPage}
        handleShowLogin={handleShowLogin}
      />

      <MarketForm
        displayForm={displayForm}
        handleShowForm={handleShowForm}
      />

      <div 
        className="add-market-btn"
        onClick={() => handleShowForm(true)}>
        <img src={add} alt="+" />
      </div>
    </div>
  );
}


export default App;
