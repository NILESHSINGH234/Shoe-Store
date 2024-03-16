import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { Products } from "./pages/Products/Products";
import { Wishlist } from "./pages/Wishlist/Wishlist";
import { Cart } from "./pages/Cart/Cart";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages";
import { useAuth } from "./context/AuthContext";
import Mockman from "mockman-js";
import { Navbar } from "./components";
import { Toaster } from "react-hot-toast";
function App() {

  const {
    state: { isLoggedIn },
  } = useAuth();

  return (
    <div className="App">
        <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          // Define default options
          className: "",
          style: {
            minWidth: "280px",
          },
          success: {
            duration: 2000,
          },
        }}
      />
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/products" element={<Products></Products>}></Route>
         <Route path="/wishlist" element={<Wishlist></Wishlist>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        {!isLoggedIn && <Route path="/login" element={<Login></Login>}></Route>}
        {!isLoggedIn && <Route path="/signup" element={<Signup></Signup>}></Route>}
        <Route path="/mock" element={<Mockman></Mockman>}></Route>
      </Routes>
    </div>
  );
}

export default App;
