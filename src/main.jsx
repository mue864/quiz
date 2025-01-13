import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from './app/DataProvider.jsx'
import { CategoryProvider } from './app/CategoryProvider.jsx'

createRoot(document.getElementById("root")).render(
  <Router>
    <CategoryProvider>
      {/* quiz provider */}
      <DataProvider>
        <App />
      </DataProvider>
    </CategoryProvider>
  </Router>
);
