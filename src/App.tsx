import { Routes, Route } from "react-router-dom"
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Default, Details, Cart, ProductList, Modal } from './components';


function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/details" element={<Details product={{
          id: 0,
          title: "",
          img: "",
          price: 0,
          inCart: false,
          company: "",
          info: ""
        }} />} />
        <Route path="*" element={<Default />} />
      </Routes>
      <Modal /> 

    </>
  )
}

export default App;
