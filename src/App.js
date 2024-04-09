import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Article from "./Article";
import Profile from "./Profile";
import Favorite from "./Favorite";
import Setting from "./Setting";
import Editor from "./Editor";

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
        <Route path="/editor" element={<Editor />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
