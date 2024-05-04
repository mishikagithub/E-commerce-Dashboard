
import './App.css';
import Navbar from "./components/Nav"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from "./components/footer"
import Signup from "./components/signup"
import Privatecomponenets from './components/privatecomponent';
import Login from "./components/login"
import Addproduct from "./components/Addproduct"
import Products from "./components/productslist"
import Update from "./components/updateproducts"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>

        <Route element={<Privatecomponenets />}>
        <Route  path="/" element={<Products/>}/>
        <Route path="/Add" element={<Addproduct/>}/>
        <Route path="/update/:id" element={<Update/>}/>
        <Route path="/logout" element={<h1>logout products listing</h1>}/>
        <Route path="/profile" element={<h1>profile products listing</h1>}/>       
     </Route>

        <Route path="/signup" element={<Signup/>}/> 
        <Route path="/login" element={<Login/>}/> 
      </Routes>  
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
