import './utilities/themeLoader'
import StartupAuthCheck from './components/StartUpAuthCheck'
import TokenWatcher from './components/TokenWatcher'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Favourites from './Pages/Favourites'
import PokemonIndividual from './Pages/PokemonIndividual'
import TeamBuilder from './Pages/TeamBuilder'
import PokemonComparison from './Pages/PokemonComparison'
import SilhouetteGame from './Pages/SilhouetteGame'
import Login from './Pages/Login'
import { ToastContainer } from 'react-toastify';
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import Dashboard from './Pages/Dashboard'
import MyTeams from './Pages/MyTeams'
import { FavouritesLoader } from './components/FavouritesLoader'
import ScrollToTop from './Pages/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'

window.addEventListener("storage", (e) => {
  if (e.key === "colorScheme") {
    if (confirm("The theme was changed in another tab.\nReload this page to apply the new theme?\n\nUnsaved work may be lost.")) {
      window.location.reload();
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <div className="min-h-screen flex flex-col">
      <FavouritesLoader>
        <ScrollToTop />
        <StartupAuthCheck />
        <TokenWatcher />
        <Header />

        <div className="flex-grow bg-primary">
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/pokemon' element={<Navigate to="/" replace />} />
            <Route path='/pokemon/:id' element={<PokemonIndividual />} />
            <Route
              path='/favourites'
              element={
                <ProtectedRoute>
                  <Favourites />
                </ProtectedRoute>
              }
            />
            <Route path='/team-builder' element={<TeamBuilder />} />
            <Route path='/dexquest-comparison' element={<PokemonComparison />} />
            <Route path='/silhouette-game' element={<SilhouetteGame />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/dashboard'
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path='/my-teams'
              element={
                <ProtectedRoute>
                  <MyTeams />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        <ToastContainer
          position={"top-right"}
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          theme={"light"}
        />
        <Footer />
      </FavouritesLoader>
    </div>
  </BrowserRouter>
)