import './App.css';
import './components/components.css';
import Footer from './components/Footer.jsx';
import MarketCard from './components/MarketCard.jsx';
import Nav from './components/Nav.jsx';
import MarketCardSkeleton from './skeletons/MarketCardSkeleton';


function App() {
  return (
    <div className="App">
      <Nav />
      <div className="markets">

        <MarketCardSkeleton />
        <MarketCardSkeleton />
        <MarketCardSkeleton />
        <MarketCardSkeleton />
      </div>
      <Footer />
    </div>
  );
}


export default App;
