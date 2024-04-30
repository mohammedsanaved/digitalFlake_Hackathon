import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AppLayout from "./components/AppLayout";
import Category from "./pages/Category";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="category" element={<Category />} />
            <Route path="product" element={<Products />} />
            <Route path="product/new" element={<AddProduct />} />
            <Route path="category/new" element={<AddCategory />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
