import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions';
import bgImg from "../assets/Images/bgimg.jpg";
import { Link } from 'react-router-dom';
import BASE_URL from '../services/service';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
  background-image: url(${bgImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const FormWrapper = styled.div`
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  color: #fff;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  color: #ffffff;
  font-weight: 700;
`;

const StyledButton = styled.button`
  background: linear-gradient(135deg, #ff416c, #72bf6a);
  border: none;
  color: #fff;
  padding: 0.75rem;
  border-radius: 0.5rem;
  width: 100%;
  font-size: 2.2rem; /* Adjusted for better readability */
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  margin-top: 1rem;

  &:hover {
    background: linear-gradient(135deg, #72bf6a, #72bf6a);
    transform: scale(1.05); /* Slightly scales up the button */
  }
`;

const StyledLink = styled(Link)`
  color: #ffffff;
  text-decoration: underline;
  font-size: 1.9rem; /* Adjusted for better readability */
  
  &:hover {
    color: #ff416c;
    text-decoration: none;
  }
`;

const InputWrapper = styled.div`
  margin-bottom: 1.5rem;

  label {
    color: #ffffff;
    font-weight: 500;
  }

  input {
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: none;
    width: 100%;
    margin-top: 0.5rem;
    font-size: 1rem; /* Adjusted for better readability */
  }
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger' | 'info' | 'warning'>('success');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && data.success) {
        setAlertVariant('success');
        setAlertMessage(data.message || 'Login successful!');
        setShowAlert(true);
        setEmail('');
        setPassword('');

        dispatch(login(data.user));
        setTimeout(() => {
          if (data.user.user_role === '1') {
            navigate('/dashboard');
          } else {
            navigate('/');
          }
        }, 1500);
      } else {
        setAlertVariant('danger');
        setAlertMessage(data.message || 'Login failed!');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setAlertVariant('danger');
      setAlertMessage('An error occurred during login.');
      setShowAlert(true);
    }
  };

  return (
    <LoginContainer>
      <FormWrapper>
        <Title>Login</Title>
        {showAlert && (
          <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
            {alertMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </InputWrapper>
          <StyledButton type="submit">Login</StyledButton>
        </form>
        <div className="mt-3">
          <StyledLink to="/register">Go to register page</StyledLink>
        </div>
        <div className="mt-2">
          <StyledLink to="/forgot-password">Forgot Password?</StyledLink>
        </div>
      </FormWrapper>
    </LoginContainer>
  );
};

export default LoginPage;
