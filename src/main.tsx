import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import { ProductProvider } from './context/Context.tsx';
import './index.css';
import ErrorBoundary from './ErrorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ProductProvider>
        <Router>
          <App />
        </Router>
      </ProductProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
