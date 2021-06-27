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
import EditForm from './components/EditForm';


function App() {
  // state
  const emptymarket = { 'name': '', 'category': '', 'foodCategory': '', 'description': '', 'geolocation': { 'lat': 0, 'long': 0 } };
  const [authToken, setAuthToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginPage, setLoginPage] = useState(false);
  const [loginWarning, setLoginWarning] = useState('');
  const [allMarkets, setAllMarkets] = useState(null);
  const [editDetails, setEditDetails] = useState(emptymarket);
  const [marketToDisplay, setMarketToDisplay] = useState(null);
  const [displayForm, setDisplayForm] = useState(false);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [searchParam, setSearchParam] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [searchCategory, setSearchCategory] = useState('name');
  const createBtnStyle = loggedIn ? 'flex' : 'none';
  // const API = 'https://market-data-bank.herokuapp.com';
  const API = 'http://localhost:3001';





  // functions [event handlers]
  useEffect(() => {
    setTimeout(async () => {
      // get all data from the API | delay for skeleton screen
      try {
        const raw = await fetch(`${API}/api/market`);
        const data = await raw.json();
        setAllMarkets(data);
        setMarketToDisplay(data);
      }
      catch(error) {
        alert('An error occured while getting Markets from DB !');
        setAllMarkets(0);
        setMarketToDisplay(0);
      }
    }, 3 * 1000);
  }, [refresh]);

  const handleShowLogin = (show) => {
    setLoginPage(show);
  }

  const handleShowForm = (show) => {
    setDisplayForm(show);
  }

  const handleShowEdit = (show) => {
    setDisplayEdit(show);
  }

  const handleSearchChange = (e) => {
    setSearchParam(e.target.value);
  }

  const handleSearchCategory = (x) => {
    setSearchCategory(x);
  }

  function getDistance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;

    return Math.sqrt((x * x) + (y * y));
  }





  // bigger event handlers
  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    setLoginWarning('Loading . . . . .');
    try {
      const raw = await fetch(`${API}/api/admin/login`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const response = await raw.json();
      
      if (response.login) {
        setLoginWarning('');
        setLoggedIn(response.login);
        setAuthToken(response.token);
        setLoginPage(false);
      }
      else {
        setLoginWarning('Invalid email or password !');
      }
    }
    catch(error) {
      setLoginWarning('*An error occured !');
    }
  }

  const handleDelete = async (id) => {
    try {
      const raw = await fetch(`${API}/api/market/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
        }
      });
      const response = await raw.json();

      // remove the deleted element from the page
      let duplicate = marketToDisplay;
      const modified = duplicate.filter(market => market._id !== id);
      setMarketToDisplay(null);
      setMarketToDisplay(modified);
    }
    catch(error) {
      alert('An error occured while deleting Market !');
    }
  }

  const handleCreate = async (e, body) => {
    try {
      e.preventDefault();
      const details = await body;
      const raw = await fetch(`${API}/api/market`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
        },
        body: JSON.stringify(details)
      });
      const response = await raw.json();
      setRefresh(!refresh);
    }
    catch(error) {
      alert('An error occured while getting Markets from DB !');
    }
  }

  const handleEdit = (id) => {
    const request = allMarkets.filter(market => market._id === id);
    setEditDetails(request[0]);
    setDisplayEdit(true);
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

    else if (searchCategory === 'location') {
      setSearchParam('');
      navigator.geolocation.getCurrentPosition(
        (result) => {
          const {latitude, longitude} = result.coords

          // sort based on the nearest location
          let duplicate = allMarkets;
          duplicate.forEach(market => market.distance = getDistance(latitude, longitude, market.geolocation.lat, market.geolocation.long));
          duplicate.sort((a, b) => a.distance - b.distance);
          setMarketToDisplay(null);
          setMarketToDisplay(duplicate);

        },
        (error) => {
          console.log(error);
          alert('Location Access Denied !!!');
        }
      );
    }
    console.log({ searchParam, searchCategory });
  }








  return (
    <div className="App">
      <Nav 
        searchParam={searchParam}
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
            id={market._id}
            name={market.name}
            images={market.images}
            loggedIn={loggedIn}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            description={market.description}
            category={market.foodCategory}
            geolocation={market.geolocation}
          />
        ))}
      </div>

      <Footer />

      <Login
        loginPage={loginPage}
        handleLogin={handleLogin}
        loginWarning={loginWarning}
        handleShowLogin={handleShowLogin}
      />

      <EditForm 
        displayEdit={displayEdit}
        editDetails={editDetails}
        handleShowEdit={handleShowEdit}
      />

      <MarketForm
        displayForm={displayForm}
        handleShowForm={handleShowForm}
        handleCreate={handleCreate}
      />

      <div 
        className="add-market-btn"
        style={{display: createBtnStyle}}
        onClick={() => handleShowForm(true)}>
        <img src={add} alt="+" />
      </div>
    </div>
  );
}


export default App;
