import logo from './logo.svg';
import './App.css';
import './styles/style.css'
import Manager from './admin/Manager';
import AdminPage from './admin/AdminPage';
import LoginPage from './User/login';
import NavBar from './Modules/Navbar';
import Home from './Modules/Home';
import Routing from './Modules/Routing';
import Map from './Modules/Map';
import Geocode from './Modules/Geocode'

function App() {
  return (<>
    <NavBar />
    <Home />
    {/* <Geocode /> */}
    {/* <Routing /> */}
    {/* <AdminPage /> */}
    {/* <Map /> */}
  </>
  );
}

export default App;



