import './utilities/themeLoader'
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
        <Header />

        {/* 🛠️ Here's the important wrapper */}
        <div className="flex-grow">
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/pokemon' element={<Navigate to="/" replace />} />
            <Route path='/pokemon/:id' element={<PokemonIndividual />} />
            <Route path='/favourites' element={<Favourites />} />
            <Route path='/team-builder' element={<TeamBuilder />} />
            <Route path='/dexquest-comparison' element={<PokemonComparison />} />
            <Route path='/silhouette-game' element={<SilhouetteGame />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/my-teams' element={<MyTeams />} />
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