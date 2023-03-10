import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { Box, Heading } from "@chakra-ui/react";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import { useEffect } from "react";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  return (
    <Box textAlign={"justify"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
