import React, { useState, FormEvent } from 'react';
import styled from '@emotion/styled';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import bgImg from "../assets/Images/bgimg.jpg";
import { Link } from 'react-router-dom';
import BASE_URL from '../services/service';

const FormContainer = styled.div`
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
  background: #ffffff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
  color: #113740;
`;

const securityQuestions = [
  'What was the name of your first pet?',
  'What is your favorite color?',
  'What is your nickname?',
];

const RegistrationForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [user_role, setUser_role] = useState<string>('user');
  const [showAlert, setShowAlert] = useState(false); // State to control visibility of Alert
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger' | 'info' | 'warning'>(
    'success',
  ); // Alert variant (success, danger, info, warning)
  const [alertMessage, setAlertMessage] = useState<string>(''); // Alert message content
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [securityAnswer, setSecurityAnswer] = useState<string>('');

  const navigate = useNavigate();
 
    const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          security_question: selectedQuestion,
          security_answer: securityAnswer,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAlertVariant('success');
        setAlertMessage(data.msg || 'Registration successful!');
        setShowAlert(true);
        setUsername('');
        setEmail('');
        setPassword('');
        setSelectedQuestion('');
        setSecurityAnswer('');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setAlertVariant('danger');
        setAlertMessage('Registration failed! ' + data.msg);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setAlertVariant('danger');
      setAlertMessage('An error occurred.');
      setShowAlert(true);
    }
  };

  return (
    <FormContainer>
      <FormWrapper>
        <Title>Registration</Title>
        {/* Display Alert if showAlert state is true */}
        {showAlert && (
          <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
            {alertMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
           <label htmlFor="securityQuestion" className="form-label">Security Question</label>
           <select
            id="securityQuestion"
            className="form-select"
            value={selectedQuestion}
            onChange={e => setSelectedQuestion(e.target.value)}
            required
          >
            <option value="">Select a question</option>
            {securityQuestions.map((question, index) => (
              <option key={index} value={question}>{question}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="securityAnswer" className="form-label">Security Answer</label>
          <input
            type="text"
            className="form-control"
            id="securityAnswer"
            placeholder="Enter your security answer"
            value={securityAnswer}
            onChange={e => setSecurityAnswer(e.target.value)}
            required
          />
        </div>
          <button type="submit" className="btn btn-primary w-100 mb-2">
            Register
          </button>

          <span>
            <Link to='/login'>Return to Login Page</Link>
          </span>
        </form>
      </FormWrapper>
    </FormContainer>
  );
};

export default RegistrationForm;


/*

import React, { useState, FormEvent } from 'react';
import styled from '@emotion/styled';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import bgImg from "../assets/Images/bgimg.jpg";
import { Link } from 'react-router-dom';
import BASE_URL from '../services/service';

const FormContainer = styled.div`
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
  font-size: 2.2rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  margin-top: 1rem;

  &:hover {
    background: linear-gradient(135deg, #72bf6a, #72bf6a);
    transform: scale(1.05);
  }
`;

const StyledLink = styled(Link)`
  color: #ffffff;
  text-decoration: underline;
  font-size: 1.9rem;

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

  input, select {
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: none;
    width: 100%;
    margin-top: 0.5rem;
    font-size: 1rem;
  }
`;

const RegistrationForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger' | 'info' | 'warning'>('success');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [securityAnswer, setSecurityAnswer] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          security_question: selectedQuestion,
          security_answer: securityAnswer,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAlertVariant('success');
        setAlertMessage(data.msg || 'Registration successful!');
        setShowAlert(true);
        setUsername('');
        setEmail('');
        setPassword('');
        setSelectedQuestion('');
        setSecurityAnswer('');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setAlertVariant('danger');
        setAlertMessage('Registration failed! ' + data.msg);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setAlertVariant('danger');
      setAlertMessage('An error occurred.');
      setShowAlert(true);
    }
  };

  return (
    <FormContainer>
      <FormWrapper>
        <Title>Register</Title>
        {showAlert && (
          <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
            {alertMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="email">Email</label>
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
          <InputWrapper>
            <label htmlFor="securityQuestion">Security Question</label>
            <select
              id="securityQuestion"
              value={selectedQuestion}
              onChange={e => setSelectedQuestion(e.target.value)}
              required
            >
              <option value="">Select a question</option>
              {securityQuestions.map((question, index) => (
                <option key={index} value={question}>{question}</option>
              ))}
            </select>
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="securityAnswer">Security Answer</label>
            <input
              type="text"
              id="securityAnswer"
              placeholder="Enter your security answer"
              value={securityAnswer}
              onChange={e => setSecurityAnswer(e.target.value)}
              required
            />
          </InputWrapper>
          <StyledButton type="submit">Register</StyledButton>
          <div className="mt-3">
            <StyledLink to='/login'>Return to Login Page</StyledLink>
          </div>
        </form>
      </FormWrapper>
    </FormContainer>
  );
};

export default RegistrationForm;


*/