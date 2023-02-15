import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AutoScrollToTop } from './components/minors';
import { AuthProvider, PropertiesProvider, UsersProvider } from './context';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UsersProvider>
        <AuthProvider>
          <PropertiesProvider>
            <App />
          </PropertiesProvider>
        </AuthProvider>
      </UsersProvider>
      <AutoScrollToTop />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
