import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Signup from './Signup';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import UpdateProduct from './UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
      <Route path="/" element={<h1>This is a home page</h1>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/update/:id" element={<UpdateProduct/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/addproduct" element={<AddProduct/>} />
      <Route path="/productlist" element={<ProductList/>} />


      {/* <Signup/> */}
      {/* <Login/> */}
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
