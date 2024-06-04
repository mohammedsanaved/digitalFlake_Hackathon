import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AppLayout from "./components/AppLayout";
import Category from "./pages/Category";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="category" element={<Category />} />
            <Route path="product" element={<Products />} />
            <Route path="product/new" element={<AddProduct />} />
            <Route path="product/:id" element={<AddProduct />} />
            <Route path="category/new" element={<AddCategory />} />
            <Route path="category/:id" element={<AddCategory />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
