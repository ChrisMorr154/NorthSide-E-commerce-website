// src/App.js
import "./App.css";
import { Route, Routes } from "react-router-dom";
import RequiredAuth from "./util/authRoutes";
import HomePage from "./pages/HomePage";
import AddProductPage from "./pages/AddProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import CustomerInfoForm from "./pages/CustomerInfoForm";
import { AuthContext } from "./context/authContext";
import { useState } from "react";
import AdminPage from "./pages/AdminPage";
import OrdersPage from "./pages/OrdersPage";
import ContactPage from "./pages/ContactPage";
import SubmissionPage from './pages/SubmissionPage';
import ElectronicOrderSubmission from "./pages/ElectronicOrderSubmission";

function App() {
  const [userLoggedData, setUserLoggedData] = useState({
    token: null,
    userId: null,
    isAdmin: false,
  });

  const login = (token, userId, isAdmin) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("isAdmin", isAdmin);
    setUserLoggedData({ token: token, userId: userId, isAdmin: isAdmin });
  };

  const logout = () => {
    setUserLoggedData({ token: null, userId: null, isAdmin: false });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
  };

  return (
    <AuthContext.Provider
      value={{
        token: userLoggedData.token,
        userId: userLoggedData.userId,
        isAdmin: userLoggedData.isAdmin,
        login: login,
        logout: logout,
      }}
    >
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/customerinfo" element={<CustomerInfoForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/cart/*" element={<CartPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/submission/:POnumber" element={<SubmissionPage />} />
        <Route path="/electronic-order-submission" element={<ElectronicOrderSubmission />} />
        <Route
          path="/addProduct"
          element={
            <RequiredAuth>
              <AddProductPage />
            </RequiredAuth>
          }
        />
        <Route
          path="/update/:id"
          element={
            <RequiredAuth>
              <UpdateProductPage />
            </RequiredAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequiredAuth>
              <AdminPage />
            </RequiredAuth>
          }
        />
        <Route
          path="/orders"
          element={
            <RequiredAuth>
              <OrdersPage />
            </RequiredAuth>
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
