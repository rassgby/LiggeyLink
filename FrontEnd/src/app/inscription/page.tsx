'use client';
import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { registerCandidatStep1, registerCandidatStep2 } from '../services/candidat';
import { ApiError } from '../types/api'; 

// Interface pour les données du formulaire
interface FormDataType {
  // Étape 1 - Données personnelles
  prenom: string;
  nom: string;
  email: string;
  password: string;
  confirmPassword: string;
  typeCompte: 'candidat' | 'recruteur';
  acceptConditions: boolean;

  // Étape 2 - Données professionnelles (pour les candidats)
  domaine: string;
  niveauEtude: string;
  profil: string;
  anneeExperience: string;
  userId?: string; // Ajouté pour stocker l'ID de l'utilisateur après l'étape 1
}

interface FormErrors {
  [key: string]: string;
}

export default function Inscription() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // État pour suivre l'étape actuelle
  const [formData, setFormData] = useState<FormDataType>({
    // Étape 1
    prenom: "",
    nom: "",
    email: "",
    password: "",
    confirmPassword: "",
    typeCompte: 'candidat',
    acceptConditions: false,

    // Étape 2
    domaine: "",
    niveauEtude: "",
    profil: "",
    anneeExperience: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: isCheckbox ? checked : value
    });

    // Effacer l'erreur quand l'utilisateur corrige le champ
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateStep1 = () => {
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
      newErrors.email = "L'email est requis";
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
      newErrors.acceptConditions = "Vous devez accepter les conditions d'utilisation";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: FormErrors = {};

    // Validation pour le formulaire candidat (étape 2)
    if (formData.typeCompte === 'candidat') {
      if (!formData.domaine) {
        newErrors.domaine = 'Le domaine est requis';
      }

      if (!formData.niveauEtude) {
        newErrors.niveauEtude = "Le niveau d'étude est requis";
      }

      if (!formData.profil) {
        newErrors.profil = 'Le profil est requis';
      }

      if (!formData.anneeExperience) {
        newErrors.anneeExperience = "L'année d'expérience est requise";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = async () => {
    if (validateStep1()) {
      setIsLoading(true);
      try {
        const response = await registerCandidatStep1({
          firstName: formData.prenom,
          lastName: formData.nom,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        setFormData(prevData => ({ ...prevData, userId: response.userId }));
        setCurrentStep(2);
      } catch (error) {
        const apiError = error as ApiError;
        console.error('Erreur lors de l\'inscription (étape 1):', apiError);
        setErrors({ general: apiError.response?.data?.message || apiError.message || 'Erreur lors de l\'inscription (étape 1)' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.typeCompte === 'recruteur') {
      // Pour les recruteurs, valider uniquement l'étape 1
      if (validateStep1()) {
        setIsLoading(true);
        try {
          await registerCandidatStep1({
            firstName: formData.prenom,
            lastName: formData.nom,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          });
          setSuccessMessage('Votre compte a été créé avec succès! Vous allez être redirigé vers la page de connexion.');
          setTimeout(() => {
            router.push('/connexion');
          }, 3000);
        } catch (error) {
          const apiError = error as ApiError;
          console.error('Erreur lors de l\'inscription (étape 1):', apiError);
          setErrors({ general: apiError.response?.data?.message || apiError.message || 'Erreur lors de l\'inscription (étape 1)' });
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      // Pour les candidats, valider en fonction de l'étape actuelle
      if (currentStep === 1) {
        if (validateStep1()) {
          await handleNextStep();
        }
      } else {
        // Étape 2
        if (validateStep2()) {
          setIsLoading(true);
          try {
            await registerCandidatStep2({
              userId: formData.userId!,
              domain: formData.domaine,
              level: formData.niveauEtude,
              profile: formData.profil,
              experience: formData.anneeExperience,
            });
            setSuccessMessage('Votre compte a été créé avec succès! Vous allez être redirigé vers la page de connexion.');
            setTimeout(() => {
              router.push('/connexion');
            }, 3000);
          } catch (error) {
            const apiError = error as ApiError;
            console.error('Erreur lors de l\'inscription (étape 2):', apiError);
            setErrors({ general: apiError.response?.data?.message || apiError.message || 'Erreur lors de l\'inscription (étape 2)' });
          } finally {
            setIsLoading(false);
          }
        }
      }
    }
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function toggleMobileMenu(): void {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  // Détermine quel contenu afficher en fonction du type de compte et de l'étape
  const renderFormContent = () => {
    // Si c'est un recruteur, afficher seulement l'étape 1
    if (formData.typeCompte === 'recruteur' || currentStep === 1) {
      return (
        <>
          {/* Type de compte */}
          <div className="mb-6">
            <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Je m'inscris en tant que
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`flex items-center p-4 rounded-lg cursor-pointer ${formData.typeCompte === 'candidat'
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
                <div>
                  <span className={`block font-medium ${darkMode && formData.typeCompte !== 'candidat' ? 'text-white' : 'text-gray-900'}`}>
                    Candidat
                  </span>
                  <span className={`text-sm ${formData.typeCompte === 'candidat' ? 'text-blue-700' : (darkMode ? 'text-gray-400' : 'text-gray-500')}`}>
                    Je cherche un emploi
                  </span>
                </div>
              </label>

              <label className={`flex items-center p-4 rounded-lg cursor-pointer ${formData.typeCompte === 'recruteur'
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
                    Je publie des offres d'emploi
                  </span>
                </div>
              </label>

              {errors.typeCompte && (
                <p className="col-span-full mt-1 text-red-500 text-sm">{errors.typeCompte}</p>
              )}
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
                J'accepte les <Link href="/conditions" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>conditions d'utilisation</Link> et la <Link href="/confidentialite" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>politique de confidentialité</Link> de LiggeyLink
              </span>
            </label>
            {errors.acceptConditions && <p className="mt-1 text-red-500 text-sm">{errors.acceptConditions}</p>}
          </div>

          {/* Bouton d'action */}
          {formData.typeCompte === 'candidat' ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Continuer
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium ${isLoading ? 'opacity-70 cursor-not-allowed' : ""}`}
            >
              {isLoading ? 'Création du compte...' : 'Créer mon compte'}
            </button>
          )}
        </>
      );
    } else {
      // Étape 2 pour les candidats
      return (
        <>
          <div className="mb-4">
            <h2 className={`text-xl mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Complétez votre profil professionnel
            </h2>
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Ces informations nous aideront à vous proposer des offres adaptées à votre profil.
            </p>
          </div>

          {/* Domaine */}
          <div className="mb-6">
            <label htmlFor="domaine" className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Domaine d'activité
            </label>
            <select
              id="domaine"
              name="domaine"
              value={formData.domaine}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-md bg-gray-100 text-gray-900 border ${errors.domaine ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Sélectionnez votre domaine</option>
              <option value="informatique">Informatique</option>
              <option value="finance">Finance</option>
              <option value="marketing">Marketing</option>
              <option value="sante">Santé</option>
              <option value="education">Éducation</option>
              <option value="commerce">Commerce</option>
              <option value="ingenierie">Ingénierie</option>
              <option value="autre">Autre</option>
            </select>
            {errors.domaine && <p className="mt-1 text-red-500 text-sm">{errors.domaine}</p>}
          </div>

          {/* Niveau d'étude */}
          <div className="mb-6">
            <label htmlFor="niveauEtude" className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Niveau d'étude
            </label>
            <select
              id="niveauEtude"
              name="niveauEtude"
              value={formData.niveauEtude}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-md bg-gray-100 text-gray-900 border ${errors.niveauEtude ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Sélectionnez votre niveau d'étude</option>
              <option value="bac">Bac</option>
              <option value="bac+2">Bac+2</option>
              <option value="bac+3">Bac+3 (Licence)</option>
              <option value="bac+5">Bac+5 (Master)</option>
              <option value="doctorat">Doctorat</option>
              <option value="autre">Autre</option>
            </select>
            {errors.niveauEtude && <p className="mt-1 text-red-500 text-sm">{errors.niveauEtude}</p>}
          </div>

          {/* Profil */}
          <div className="mb-6">
            <label htmlFor="profil" className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Profil / Poste recherché
            </label>
            <input
              type="text"
              id="profil"
              name="profil"
              value={formData.profil}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-md bg-gray-100 text-gray-900 border ${errors.profil ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Ex: Développeur Web, Comptable, Chef de projet..."
            />
            {errors.profil && <p className="mt-1 text-red-500 text-sm">{errors.profil}</p>}
          </div>

          {/* Années d'expérience */}
          <div className="mb-8">
            <label htmlFor="anneeExperience" className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Années d'expérience
            </label>
            <select
              id="anneeExperience"
              name="anneeExperience"
              value={formData.anneeExperience}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-md bg-gray-100 text-gray-900 border ${errors.anneeExperience ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Sélectionnez vos années d'expérience</option>
              <option value="debutant">Débutant / Stage</option>
              <option value="0-2">0 à 2 ans</option>
              <option value="3-5">3 à 5 ans</option>
              <option value="6-10">6 à 10 ans</option>
              <option value="10+">Plus de 10 ans</option>
            </select>
            {errors.anneeExperience && <p className="mt-1 text-red-500 text-sm">{errors.anneeExperience}</p>}
          </div>

          {/* Boutons de navigation */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <button
              type="button"
              onClick={handlePrevStep}
              className="py-3 px-6 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium"
            >
              Retour
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-grow py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium ${isLoading ? 'opacity-70 cursor-not-allowed' : ""}`}
            >
              {isLoading ? 'Création du compte...' : 'Créer mon compte'}
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Head>
        <title>Inscription | LiggeyLink</title>
        <meta name="description" content="Créez votre compte sur LiggeyLink" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`py-4 px-4 md:px-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md sticky top-0 z-10`}>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-xl md:text-2xl font-bold text-blue-600">LiggeyLink</h1>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}
                aria-label="Menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <button
                onClick={toggleDarkMode}
                className={`p-2 ml-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                aria-label={darkMode ? 'Mode clair' : 'Mode sombre'}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className={`hidden md:block flex-grow mx-6`}>
              <ul className="flex space-x-4 md:space-x-8">
                <li><Link href="/" className={`font-medium ${darkMode ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'}`}>Accueil</Link></li>
                <li><Link href="/emplois" className={`font-medium ${darkMode ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'}`}>Offres emploi</Link></li>
              </ul>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/connexion" className={`px-4 py-2 rounded-md ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium`}>
                Connexion
              </Link>

              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                aria-label={darkMode ? 'Mode clair' : 'Mode sombre'}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>

          {/* Mobile menu - Hidden by default, toggle with state */}
          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
            <ul className="flex flex-col space-y-2">
              <li><Link href="/" className={`block py-2 font-medium ${darkMode ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'}`}>Accueil</Link></li>
              <li><Link href="/emplois" className={`block py-2 font-medium ${darkMode ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'}`}>Offres emploi</Link></li>
            </ul>
            <div className="mt-4 flex flex-col space-y-2">
              <Link href="/connexion" className={`px-4 py-2 text-center rounded-md ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium`}>
                Connexion
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className={`w-full max-w-2xl p-8 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className="text-2xl font-bold text-center mb-8">
            Créer votre compte
            {formData.typeCompte === 'candidat' && (
              <span className="text-sm font-normal block mt-1 text-gray-500">
                {currentStep === 1 ? 'Étape 1/2 : Informations personnelles' : 'Étape 2/2 : Profil professionnel'}
              </span>
            )}
          </h1>

          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {renderFormContent()}
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

