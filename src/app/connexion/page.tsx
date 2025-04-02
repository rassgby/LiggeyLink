'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Connexion() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Logique de connexion à implémenter
    console.log('Tentative de connexion avec:', { email, password, rememberMe });
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Head>
        <title>Connexion | LiggeyLink</title>
        <meta name="description" content="Connectez-vous à votre compte LiggeyLink" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`py-4 px-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md sticky top-0 z-10`}>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/">
              <h1 className="text-2xl font-bold text-blue-600">LiggeyLink</h1>
            </Link>
          </div>
          
          <nav className="flex-grow mx-6 hidden md:block">
            {/* <ul className="flex space-x-8">
              <li><Link href="/" className={`font-medium ${darkMode ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'}`}>Accueil</Link></li>
              <li><Link href="/emplois" className={`font-medium ${darkMode ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'}`}>Offres d'emploi</Link></li>
              <li><Link href="/entreprises" className={`font-medium ${darkMode ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'}`}>Entreprises</Link></li>
              <li><Link href="/conseils" className={`font-medium ${darkMode ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'}`}>Conseils carrière</Link></li>
            </ul> */}
          </nav>
          
          <div className="flex items-center space-x-4">
            {/* <Link href="/connexion" className={`px-4 py-2 rounded-md ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium`}>
              Connexion
            </Link>
            <Link href="/inscription" className={`px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} font-medium`}>
              Inscription
            </Link> */}
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 py-12 flex items-center justify-center">
        <div className={`w-full max-w-md p-8 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 font-medium">
                Adresse e-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="votre@email.com"
                required
              />
            </div>
            
            <div className="mb-5">
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="font-medium">
                  Mot de passe
                </label>
                <Link href="/mot-de-passe-oublie" className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>
                  Mot de passe oublié ?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Se souvenir de moi
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full px-4 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Se connecter
            </button>
          </form>
          
          <div className="mt-6 flex flex-col items-center">
            <div className={`relative w-full mb-4 flex items-center justify-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className={`absolute inset-x-0 top-1/2 h-px ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
              <span className={`relative px-3 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>Ou</span>
            </div>
            
            <button className={`w-full mb-3 px-4 py-3 flex items-center justify-center rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} font-medium`}>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continuer avec Google
            </button>
            
            <button className={`w-full px-4 py-3 flex items-center justify-center rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} font-medium`}>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              Continuer avec Facebook
            </button>
          </div>
          
          <p className="mt-8 text-center">
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Pas encore de compte ? </span>
            <Link href="/inscription" className={`font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>
              inscrivez-vous
            </Link>
          </p>
        </div>
      </main>

      <footer className={`py-12 px-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* <div>
              <h3 className="text-xl font-bold mb-4 text-blue-600">LiggeyLink</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                La plateforme qui connecte talents et entreprises pour créer les meilleures opportunités professionnelles.
              </p>
            </div> */}
            
            {/* <div>
              <h4 className="font-bold mb-4">Pour les candidats</h4>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li><Link href="#" className="hover:underline">Rechercher des emplois</Link></li>
                <li><Link href="#" className="hover:underline">Créer un CV</Link></li>
                <li><Link href="#" className="hover:underline">Alertes emploi</Link></li>
                <li><Link href="#" className="hover:underline">Conseils carrière</Link></li>
              </ul>
            </div> */}
            
            {/* <div>
              <h4 className="font-bold mb-4">Pour les entreprises</h4>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li><Link href="#" className="hover:underline">Publier une offre</Link></li>
                <li><Link href="#" className="hover:underline">Rechercher des profils</Link></li>
                <li><Link href="#" className="hover:underline">Solutions de recrutement</Link></li>
                <li><Link href="#" className="hover:underline">Tarifs</Link></li>
              </ul>
            </div> */}
            
            {/* <div>
              <h4 className="font-bold mb-4">À propos</h4>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li><Link href="#" className="hover:underline">Qui sommes-nous</Link></li>
                <li><Link href="#" className="hover:underline">Contact</Link></li>
                <li><Link href="#" className="hover:underline">Mentions légales</Link></li>
                <li><Link href="#" className="hover:underline">Confidentialité</Link></li>
              </ul>
            </div> */}
          </div>
          
          <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 md:mb-0`}>
              © {new Date().getFullYear()} LiggeyLink.
            </p>
            {/* <div className="flex space-x-4">
              <Link href="#" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                Twitter
              </Link>
              <Link href="#" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                LinkedIn
              </Link>
              <Link href="#" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                Facebook
              </Link>
              <Link href="#" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                Instagram
              </Link>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
}