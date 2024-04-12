import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "../src/pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Article from "./pages/Article";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import Favorite from "./pages/Favorite";
import CreateArticle from "./pages/CreateArticle";
import EditArticle from "./pages/EditArticle";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/article/:slug" element={<Article />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/:username/favorites" element={<Favorite />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/editor" element={<CreateArticle />} />
        <Route path="/editor/:slug" element={<EditArticle />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
