import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AutoScrollToTop } from './components/minors';
import { AuthProvider } from './context/AuthContext';
import { PrediosProvider } from './context/PropertiesContext';
import { UsersProvider } from './context/UsersContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UsersProvider>
        <AuthProvider>
          <PrediosProvider>
            <App />
          </PrediosProvider>
        </AuthProvider>
      </UsersProvider>
      <AutoScrollToTop />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
