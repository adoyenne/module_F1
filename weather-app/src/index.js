import React from 'react';
import { createRoot } from 'react-dom/client';  // Импорт createRoot
import App from './App';  // Импорт основного компонента
import 'leaflet/dist/leaflet.css';  // Импорт Leaflet стилей
import './styles/styles.css';       // Импорт пользовательских стилей

// Получаем элемент с id "root" в котором будет рендериться React-приложение
const rootElement = document.getElementById('root');

// Создаём root для рендеринга
const root = createRoot(rootElement);

// Рендерим приложение
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);