import './App.css';
import './components/components.css';
import Footer from './components/Footer.jsx';
import MarketCard from './components/MarketCard.jsx';
import Nav from './components/Nav.jsx';


function App() {
  return (
    <div className="App">
      <Nav />
      <MarketCard />
      <Footer />
    </div>
  );
}


export default App;
