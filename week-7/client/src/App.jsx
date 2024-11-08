// firstly, Don't get overwhelmed and if you are then go with client-easy.
import { useState } from "react";
import Courses from "./components/Courses";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import "./styles.css";

function Error() {
  const [count, SetCount] = useState(0);
  const navigate = useNavigate();

  const backToHome = () => navigate("/");

  return (
    <>
      <button onClick={() => SetCount((c) => c + 1)}>count = {count}</button>
      <div>
        <button onClick={backToHome}>go back to home</button>
      </div>
    </>
  );
}

function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <div className="header">
          <div className="header-right">
            <Link to="/">
              <>Coursify</>
            </Link>
          </div>
          <div className="header-left">
            <div>
              <Link to="/coursePreview">Preview-courses</Link>
            </div>
            <div>
              <Link to="/login">Login</Link>
            </div>
            <div>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/coursePreview" element={<Courses />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
