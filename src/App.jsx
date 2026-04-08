
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Friends from './pages/friendsPage/Friends';
import About from './pages/About';
import Chat from './components/Chat';
import ProfilePage from './pages/userProfilePage/ProfilePage';
import MessagePage from './pages/message/MessagePage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './store/AuthSlice';
import Followers from './components/Followers';
import Following from './components/Following';
import { useEffect } from 'react';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import UseSocket1 from './hooks/UseSocket1';

function App() {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  console.log(login)

  useEffect(() => {
    if (login && !user?._id) {
      dispatch(fetchUser());
    }
  }, [login]);

  UseSocket1(user);
  // useEffect(() => {
  //   console.log("useEffect", user?._id)
  //   if (user?._id) {
  //     useSocket(user)
  //   }
  // }, [user?._id])



  return (
    <div className="App">

      <BrowserRouter>
        <div style={{ height: "4rem" }}> <Navbar /></div>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/signup' element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path='/friends' element={<ProtectedRoute><Friends /></ProtectedRoute>} />
          <Route path='/about' element={<About />} />
          <Route path='/followers' element={<ProtectedRoute><Followers /></ProtectedRoute>} />
          <Route path='/following' element={<ProtectedRoute><Following /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path='/chat' element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path='/messages' element={<ProtectedRoute><MessagePage /></ProtectedRoute>} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
