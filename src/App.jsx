import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ProtectedPage from "./pages/ProtectedPage";
import "./index.css";
import Header from "./components/Header";
import PageNotFound from "./pages/PageNotFound";
import OTP from "./pages/OTP";
import { useAppStore } from "./store";
import { useEffect, useState } from "react";
import axios from "axios";
import { GET_CATEGORY_ROUTE, GET_USER_INFO } from "./utils/constants";
function App() {
  const { userInfo, token,category,  setCategory, setUserInfo } = useAppStore();
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? children : <Navigate to="/login" />;
  };
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get(GET_CATEGORY_ROUTE);
        setCategory(res.data.categories);        
      } catch (error) {
        console.log({ error });
      }
    }

    const getUserData = async () => {
      try {
        const res = await axios.get(GET_USER_INFO, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        if (res.data.success) {
          setUserInfo(res.data.newUser);
        } else {
          setUserInfo(undefined);
        }
      } catch (error) {
        console.log({ error });
        setUserInfo(undefined);
      } finally {
        setloading(false);
      }
    };
    if (!userInfo || !category) {
      getUserData();
      getCategory();
    } else {
      setloading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">Loding...</div>
    );
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-otp" element={<OTP />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ProtectedPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
