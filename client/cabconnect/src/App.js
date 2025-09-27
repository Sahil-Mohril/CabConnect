import logo from './logo.svg';
import './App.css';
import './styles/style.css'
import Manager from './admin/Manager';
import AdminPage from './admin/AdminPage';
import LoginPage from './User/login';
import NavBar from './Modules/Navbar';
import Home from './Modules/Home';


function App() {
  return (<>
    <NavBar />
    <Home />
    {/* <AdminPage /> */}
  </>
  );
}

export default App;
