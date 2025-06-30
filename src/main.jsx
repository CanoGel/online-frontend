import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CartProvider } from './context/CartContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Provider } from 'react-redux';
import store from './redux/store'; // <-- Make sure this path is correct

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </CartProvider>
    </Provider>
  </React.StrictMode>
);