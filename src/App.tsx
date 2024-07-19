// import reactLogo from './logo.svg'
import { Routes, Route } from "react-router-dom"
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Default, Details, Cart, ProductList } from './components';


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/details" element={<Details />} />
        <Route path="*" element={<Default />} />
      </Routes>

    </>
  )
}

export default App;
