import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../slices/authSlice";
import { useState } from "react";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // You can add more validation logic here
    if (email && password) {
      // Dispatch login action
      dispatch(login());
      // Redirect to the home page
      navigate("/");
    }
  };

  return (
    <div className="card w-96 glass">
      <div className="card-body">
        <h2 className="card-title text-black font-bold">Sign In</h2>
        <label htmlFor="email" className="text-gray-500 mt-2">
          Email
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered bg-white border-gray-200 border-2 text-black focus:border-primary_btn_idle"
        />
        <label htmlFor="password" className="text-gray-500">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered bg-white border-gray-200 border-2 text-black focus:border-primary_btn_idle"
        />
        <div className="card-actions justify-center my-6">
          <button
            className="btn w-full bg-primary_btn_idle border-none plus-jakarta text-white hover:bg-primary_btn_hover btn-sm sm:btn-md"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>
        <p className="text-gray-500">
          Don't have an account yet?{" "}
          <Link to="/sign-up" className="text-primary_btn_idle font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
