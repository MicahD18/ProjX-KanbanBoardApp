/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function divide(x: number, y: number) {
  if (y === 0) {
    throw new Error("You can't divide by zero.");
  }
  return Math.round(x / y);
}

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      setLoggedIn(true);
      return navigate("/boards");
    }
  }, [loggedIn, navigate]);

  return (
    <div className="bg-red-500">
      <p>hello there!</p>
      <button className="btn btn-primary">Button</button>
    </div>
  );
}

export default App;
