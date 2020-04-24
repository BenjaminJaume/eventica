import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './App.scss';

import Alert from 'react-bootstrap/Alert';

function App() {
  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState('/api');

  const fetchData = useCallback(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        setMessage(json.message);
        setIsFetching(false);
      }).catch(e => {
        setMessage(`API call failed: ${e}`);
        setIsFetching(false);
      })
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          EVENTICA
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
        {process.env.NODE_ENV === 'production' ?
          <p>
            This is a production build from create-react-app.
            </p>
          : <p>
            Edit <code>src/App.js</code> and save to reload.
            </p>
        }
        <p>
          {isFetching
            ? 'Fetching message from API'
            : <>
              « <strong>{message}</strong> »
            </>
          }
        </p>

        {[
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
          'light',
          'dark',
        ].map((variant, idx) => (
          <Alert key={idx} variant={variant}>
            This is a {variant} alert—check it out!
          </Alert>
        ))};
      </header>
    </div>
  );

}

export default App;
