// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginPage from './pages/auth/LoginPage';
import DogsPage from './pages/dogs/DogsPage';
import { store } from './store';
import ProtectedRoute from './routes/ProtectedRoutes';
import { ROUTES } from './routes/routes';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route
            path={ROUTES.DOGS}
            element={
              <ProtectedRoute>
                <DogsPage />
              </ProtectedRoute>
            }
          />
          <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.LOGIN} replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
