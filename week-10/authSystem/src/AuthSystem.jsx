import { AppBar } from "./components/AppBar";
import { Login } from "./components/Login";
import { Home } from "./components/Home";

export const AuthSystem = () => {
  return (
    <div>
      <AppBar />
      <Login />
      <Home />
    </div>
  );
};
