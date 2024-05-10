import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [loginError, setLoginError] = useState('');

  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // to stop the page to be refresh.
  
    try {
          // Make a POST request to the login API endpoint
          const response = await fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          });

        // Check if the response is successful
          if (response.ok)
          {

            setLoginSuccess(true);
            setLoginError("");

            // Redirect to user onboarding page after 2 seconds
            setTimeout(() => {
                  history.push('/user-onboarding');
                }, 2000); // Redirect after 2 seconds
          } 
          else 
          {
            // Handle login error
            const errorData = await response.json();
            setLoginError(errorData.error);
          }
      } 
      catch (error) 
      {
        console.error('Login error:', error);
        setLoginError('An error occurred while logging in. Please try again.');
      }



  };

  return (
    <div style={{maxWidth: '500px', margin: '40px auto', padding: '20px'}}>
      <h1 style={{color: 'black', marginLeft: '150px', marginBottom: '30px'}}>Login</h1>
      {loginError && <div style={{ color: 'red', marginBottom: '10px' }}>{loginError}</div>}
      {loginSuccess && <div style={{ color: 'green', marginBottom: '10px' }}>Login Successfully!</div>}
      <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="email" style={{ marginRight: '60px' }} >Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            style={{ width: '200px' }} // Increase width
            required
          />
        </div>

        <div style={{ marginBottom: '0px' }}>
          <label htmlFor="password" style={{ marginRight: '30px' }} >Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            style={{ width: '200px' }} // Increase width
            required
          />
        </div>
        <div>
          <a href="/" style={{ marginLeft: '190px', textDecoration: 'none', color: 'blue' }} >Forgot Password </a>
        </div>
        <button type="submit" style={{ fontWeight: 'bold',width: '220px', marginLeft: '100px', marginTop:'60px',backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;