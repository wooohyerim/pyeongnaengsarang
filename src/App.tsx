import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import MainFeed from "./pages/MainFeed";
import UserList from "./pages/UserList";
import MyPage from "./pages/MyPage";
import FeedDetail from "./pages/FeedDetail";
import Post from "./pages/Post";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/main" element={<MainFeed />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/mypage/:uid" element={<MyPage />} />
        <Route path="/detail/:postId" element={<FeedDetail />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
