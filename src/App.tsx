import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import MainFeed from "./pages/MainFeed";
import UserList from "./pages/UserList";
import MyPage from "./pages/MyPage";
import FeedDetail from "./pages/FeedDetail";
import Post from "./pages/Post";
import ProtectedRoute from "./components/ ProtectedRoute";

function App() {
  return (
    <>
      <Helmet>
        <title>ㅍㄴㅅㄹ</title>
        <link rel="icon" href="/logo.ico" />
      </Helmet>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/main"
            element={
              // <ProtectedRoute>
              <MainFeed />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mypage/:uid"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/detail/:postId"
            element={
              // <ProtectedRoute>
              <FeedDetail />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <Post />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
