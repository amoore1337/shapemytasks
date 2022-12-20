import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import GlobalStyles from './GlobalStyles';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <GlobalStyles />
    <App />
  </BrowserRouter>
);
