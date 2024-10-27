import React, { useState } from "react";
import Box from "../components/Box";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SIGNUP_ROUTES } from "../utils/constants";
import axios from "axios";
import { useAppStore } from "../store/index";
const SignUp = () => {
  const { setToken } = useAppStore();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const validateSignup = () => {
    if (!name.length) {
      toast.error("Name is required");
      return false;
    }
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password should be of 8 characters");
      return false;
    }
    return true;
  };

  const handleNameInput = (e) => {
    setName(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handleFormSubmit = async () => {
    if (validateSignup()) {
      const res = await axios.post(
        SIGNUP_ROUTES,
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);

        navigate("/verify-otp");
      } else {
        toast.error(res.data.message);
      }
    }
  };
  return (
    <Box>
      <div className="flex flex-col">
        <h1 className="mb-5 text-3xl text-center">Create your account</h1>

        <label htmlFor="name" className="mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={handleNameInput}
          className="mb-5 p-2 border rounded w-[400px]"
        />

        <label htmlFor="email" className="mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailInput}
          className="p-2 mb-5 border rounded w-[400px]"
        />
        <label htmlFor="email" className="mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={handlePasswordInput}
            className="p-2 mb-5 border rounded w-[400px]"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-5 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
          >
            {showPassword ? (
              <i className="fa-solid fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}{" "}
          </button>
        </div>
        <button
          className="mt-5 pt-3  pb-3 w-full text-sm mb-5 bg-black text-white hover:bg-gray-700 py-2 rounded transition-all duration-300"
          onClick={handleFormSubmit}
        >
          CREATE ACCOUNT
        </button>
        <button onClick={() => navigate("/login")}>
          Have an Account? <span className="font-semibold"> LOGIN </span>
        </button>
      </div>
    </Box>
  );
};

export default SignUp;
