import { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token') === 'true') {
      navigate('/songs');
    }
  }, [navigate]);
  return <LoginForm />;
}

export default LoginPage;
