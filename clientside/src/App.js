import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import CreateClub from "./pages/CreateClub";
import MyClubs from "./pages/MyClubs";
import BrowseClubs from "./pages/BrowseClubs";
import { useSelector } from "react-redux";
import CreateEvents from "./pages/CreateEvents";

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-event" element={<CreateEvents />} />
          <Route path="/create-club" element={<CreateClub />} />
          <Route path="/my-clubs" element={<MyClubs />} />
          <Route path="/browse-clubs" element={<BrowseClubs />} />
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
