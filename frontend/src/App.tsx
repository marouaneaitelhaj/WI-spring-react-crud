import AddSongPage from './pages/AddSongPage';
import EditSongPage from './pages/EditSongPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './routes/ProtectedRoute';
import AuthRoute from './routes/AuthRoute';



function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
            <Routes>
            <Route element={<AuthRoute />}>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/songs" element={<HomePage />} />
              <Route path="/add" element={<AddSongPage />} />
              <Route path="/edit/:id" element={<EditSongPage />} />
            </Route>
            </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App
