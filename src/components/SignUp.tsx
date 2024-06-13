import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="card w-96 glass">
      <div className="card-body">
        <h2 className="card-title text-black font-bold">Create an Account</h2>
        <label htmlFor="title" className="text-gray-500 mt-2">
          Email
        </label>
        <input
          type="text"
          id="title"
          className="input input-bordered bg-white border-gray-200 border-2 text-black focus:border-primary_btn_idle"
        />
        <label htmlFor="title" className="text-gray-500">
          Password
        </label>
        <input
          type="text"
          id="title"
          className="input input-bordered bg-white border-gray-200 border-2 text-black focus:border-primary_btn_idle"
        />
        <div className="card-actions justify-center my-6">
          <button className="btn w-full bg-primary_btn_idle border-none plus-jakarta text-white hover:bg-primary_btn_hover btn-sm sm:btn-md">
            Sign Up
          </button>
        </div>
        <p className="text-gray-500">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-primary_btn_idle font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
