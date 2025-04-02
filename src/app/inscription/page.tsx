'use client';
import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

// Soit supprimer cette interface si vous n'en avez pas besoin
// Soit l'utiliser dans la déclaration de l'état formData
interface FormDataType {
  prenom: string;
  nom: string;
  email: string;
  password: string;
  confirmPassword: string;
  typeCompte: 'candidat' | 'recruteur';
  acceptConditions: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function Inscription() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    prenom: "",
    nom: "",
    email: "",
    password: "",
    confirmPassword: "",
    typeCompte: 'candidat',
    acceptConditions: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Effacer l'erreur quand l'utilisateur corrige le champ
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };
      
  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    // Validation prénom
    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    } else if (formData.prenom.length < 2) {
      newErrors.prenom = 'Le prénom doit contenir au moins 2 caractères';
    }
    
    // Validation nom
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    } else if (formData.nom.length < 2) {
      newErrors.nom = 'Le nom doit contenir au moins 2 caractères';
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "L&apos;email est requis";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Veuillez entrer une adresse email valide';
    }
    
    // Validation mot de passe
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial';
      }
    }
    
    // Validation confirmation mot de passe
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    // Validation du type de compte
    if (!formData.typeCompte) {
      newErrors.typeCompte = 'Veuillez sélectionner un type de compte';
    }

    // Validation des conditions
    if (!formData.acceptConditions) {
      newErrors.acceptConditions = "Vous devez accepter les conditions d&apos;utilisation";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulation d'une requête d'inscription
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage('Votre compte a été créé avec succès! Vous allez être redirigé vers la page de connexion.');
        
        // Redirection vers la page de connexion après un délai
        setTimeout(() => {
          router.push('/connexion');
        }, 3000);
      }, 1500);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Head>
        <title>Inscription | LiggeyLink</title>
        <meta name="description" content="Créez votre compte LiggeyLink et accédez à toutes les fonctionnalités" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`py-4 px-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md sticky top-0 z-10`}>
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">LiggeyLink</Link>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><Link href="/" className={`font-medium ${darkMode ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'}`}>Accueil</Link></li>
              <li><Link href="/emplois" className={`font-medium ${darkMode ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'}`}>Offres d&apos;emploi</Link></li>
              <li><Link href="/entreprises" className={`font-medium ${darkMode ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'}`}>Entreprises</Link></li>
              <li><Link href="/conseils" className={`font-medium ${darkMode ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'}`}>Conseils carrière</Link></li>
            </ul>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/connexion" className={`px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} font-medium`}>
              Connexion
            </Link>
            <Link href="/inscription" className={`px-4 py-2 rounded-md ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium`}>
              Inscription
            </Link>
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className={`w-full max-w-2xl p-8 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className="text-2xl font-bold text-center mb-8">Créer votre compte</h1>
          
          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {successMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type de compte */}
            <div className="mb-6">
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Je m&apos;inscris en tant que
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`flex items-center p-4 rounded-lg cursor-pointer ${
                  formData.typeCompte === 'candidat' 
                    ? 'bg-blue-100 border-2 border-blue-500' 
                    : `${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-100 border border-gray-300'}`
                }`}>
                  <input
                    type="radio"
                    name="typeCompte"
                    value="candidat"
                    checked={formData.typeCompte === 'candidat'}
                    onChange={handleChange}
                    className="mr-3 h-4 w-4 text-blue-600"
                  />
                  <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Candidat</span>
                  {errors.typeCompte && (
                    <p className="mt-1 text-sm text-red-600">{errors.typeCompte}</p>
                  )}
                  {errors.typeCompte && (
                    <p className="mt-1 text-sm text-red-600">{errors.typeCompte}</p>
                  )}
                  <div>
                    <span className={`block font-medium ${darkMode && formData.typeCompte !== 'candidat' ? 'text-white' : 'text-gray-900'}`}>
                      Candidat
                    </span>
                    <span className={`text-sm ${formData.typeCompte === 'candidat' ? 'text-blue-700' : (darkMode ? 'text-gray-400' : 'text-gray-500')}`}>
                      Je cherche un emploi
                    </span>
                  </div>
                </label>
                
                <label className={`flex items-center p-4 rounded-lg cursor-pointer ${
                  formData.typeCompte === 'recruteur' 
                    ? 'bg-blue-100 border-2 border-blue-500' 
                    : `${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-100 border border-gray-300'}`
                }`}>
                  <input
                    type="radio"
                    name="typeCompte"
                    value="recruteur"
                    checked={formData.typeCompte === 'recruteur'}
                    onChange={handleChange}
                    className="mr-3 h-4 w-4"
                  />
                  <div>
                    <span className={`block font-medium ${darkMode && formData.typeCompte !== 'recruteur' ? 'text-white' : 'text-gray-900'}`}>
                      Recruteur
                    </span>
                    <span className={`text-sm ${formData.typeCompte === 'recruteur' ? 'text-blue-700' : (darkMode ? 'text-gray-400' : 'text-gray-500')}`}>
                      Je publie des offres d&apos;emploi
                    </span>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Nom et prénom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="prenom" className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Prénom
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-md bg-gray-100 text-gray-900 border ${errors.prenom ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Votre prénom"
                />
                {errors.prenom && <p className="mt-1 text-red-500 text-sm">{errors.prenom}</p>}
              </div>
              
              <div>
                <label htmlFor="nom" className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Nom
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-md bg-gray-100 text-gray-900 border ${errors.nom ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Votre nom"
                />
                {errors.nom && <p className="mt-1 text-red-500 text-sm">{errors.nom}</p>}
              </div>
            </div>
            
            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md bg-gray-100 text-gray-900 border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="votre@email.com"
              />
              {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
            </div>
            
            {/* Mot de passe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="password" className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-md bg-gray-100 text-gray-900 border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password}</p>}
                <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Au moins 8 caractères
                </p>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-md bg-gray-100 text-gray-900 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
            </div>
            
            {/* Conditions d'utilisation */}
            <div className="mb-8">
              <label className={`flex items-start ${errors.acceptConditions ? 'text-red-500' : ""}`}>
                <input
                  type="checkbox"
                  name="acceptConditions"
                  checked={formData.acceptConditions}
                  onChange={handleChange}
                  className={`mt-1 mr-2 h-4 w-4 ${errors.acceptConditions ? 'border-red-500' : ""}`}
                />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  J&apos;accepte les <Link href="/conditions" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>conditions d&apos;utilisation</Link> et la <Link href="/confidentialite" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>politique de confidentialité</Link> de LiggeyLink
                </span>
              </label>
              {errors.acceptConditions && <p className="mt-1 text-red-500 text-sm">{errors.acceptConditions}</p>}
            </div>
            
            {/* Bouton d'inscription */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium ${isLoading ? 'opacity-70 cursor-not-allowed' : ""}`}
            >
              {isLoading ? 'Création du compte...' : 'Créer mon compte'}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-300 text-center">
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Vous avez déjà un compte ?{' '}
              <Link href="/connexion" className={`font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                Connectez-vous
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className={`py-8 px-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto text-center">
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} LiggeyLink. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}