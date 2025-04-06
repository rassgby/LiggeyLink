'use client';
import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// Définition des interfaces pour typer correctement nos données
interface JobListing {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  experienceLevel: string;
  salary: string;
  posted: string;
  date: Date;
  logo: string;
  description: string;
}

interface Filters {
  jobType: string[];
  experienceLevel: string[];
  salary: string[];
  datePosted: string;
}

export default function JobListings() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [filters, setFilters] = useState<Filters>({
    jobType: [],
    experienceLevel: [],
    salary: [],
    datePosted: 'any'
  });
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');

  // Utiliser useMemo pour éviter de recréer le tableau à chaque rendu
  const allJobs = useMemo(() => [
    {
      id: 1, title: "Développeur Frontend", company: "TechCorp", location: "Paris", type: "CDI", experienceLevel: "Confirmé", salary: "45-55k€", posted: "Il y a 2 jours", date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), logo: "/api/placeholder/50/50",
      description: "Nous recherchons un développeur frontend expérimenté maîtrisant React, Next.js et Tailwind CSS."
    },
    {
      id: 2, title: "UX Designer Senior", company: "DesignStudio", location: "Lyon", type: "CDI", experienceLevel: "Senior", salary: "50-60k€", posted: "Il y a 3 jours", date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), logo: "/api/placeholder/50/50",
      description: "Rejoignez notre équipe de designers pour créer des expériences utilisateur exceptionnelles."
    },
    {
      id: 3, title: "Développeur Backend", company: "DataSystems", location: "Bordeaux", type: "CDD", experienceLevel: "Débutant", salary: "40-50k€", posted: "Il y a 5 jours", date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), logo: "/api/placeholder/50/50",
      description: "Poste de développeur backend Node.js avec expérience en bases de données SQL et NoSQL."
    },
    {
      id: 4, title: "Chef de Projet IT", company: "ConsultGroup", location: "Paris", type: "Freelance", experienceLevel: "Senior", salary: "500€/jour", posted: "Il y a 1 jour", date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), logo: "/api/placeholder/50/50",
      description: "Gérez des projets IT complexes pour nos clients dans divers secteurs d'activité."
    },
    {
      id: 5, title: "Data Scientist", company: "AI Solutions", location: "Toulouse", type: "CDI", experienceLevel: "Confirmé", salary: "55-65k€", posted: "Il y a 1 semaine", date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), logo: "/api/placeholder/50/50",
      description: "Développez des modèles de machine learning pour nos solutions d'IA."
    },
    {
      id: 6, title: "Ingénieur DevOps", company: "CloudServices", location: "Nantes", type: "CDI", experienceLevel: "Confirmé", salary: "45-60k€", posted: "Il y a 4 jours", date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), logo: "/api/placeholder/50/50",
      description: "Mettez en place et optimisez notre infrastructure cloud et nos pipelines CI/CD."
    },
    {
      id: 7, title: "Développeur Mobile", company: "AppFactory", location: "Lille", type: "CDD", experienceLevel: "Confirmé", salary: "40-50k€", posted: "Il y a 3 jours", date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), logo: "/api/placeholder/50/50",
      description: "Développez des applications mobiles natives pour iOS et Android."
    },
    {
      id: 8, title: "Product Owner", company: "InnovateNow", location: "Paris", type: "CDI", experienceLevel: "Senior", salary: "55-70k€", posted: "Il y a 6 jours", date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), logo: "/api/placeholder/50/50",
      description: "Définissez la vision produit et collaborez avec les équipes de développement pour livrer des fonctionnalités à forte valeur ajoutée."
    },
    {
      id: 9, title: "Administrateur Système", company: "SecurityNet", location: "Marseille", type: "Alternance", experienceLevel: "Débutant", salary: "30-35k€", posted: "Il y a 2 jours", date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), logo: "/api/placeholder/50/50",
      description: "Gérez et maintenez notre infrastructure système et réseau en garantissant un haut niveau de sécurité."
    },
    {
      id: 10, title: "Développeur Fullstack", company: "WebAgency", location: "Strasbourg", type: "CDI", experienceLevel: "Confirmé", salary: "45-55k€", posted: "Il y a 1 jour", date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), logo: "/api/placeholder/50/50",
      description: "Développez des applications web complètes en utilisant les technologies modernes du frontend et du backend."
    }
  ], []);

  // Filtrer les offres d'emploi en fonction des critères
  useEffect(() => {
    let filteredJobs = [...allJobs];

    // Filtre par terme de recherche
    if (searchTerm) {
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par localisation
    if (searchLocation) {
      filteredJobs = filteredJobs.filter(job =>
        job.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    // Filtre par type de contrat
    if (filters.jobType.length > 0) {
      filteredJobs = filteredJobs.filter(job =>
        filters.jobType.includes(job.type)
      );
    }

    // Filtre par niveau d'expérience
    if (filters.experienceLevel.length > 0) {
      filteredJobs = filteredJobs.filter(job =>
        filters.experienceLevel.includes(job.experienceLevel)
      );
    }

    // Filtre par date de publication
    if (filters.datePosted !== 'any') {
      const now = new Date();
      const cutoffDate = new Date();

      switch (filters.datePosted) {
        case 'today':
          cutoffDate.setDate(now.getDate() - 1);
          break;
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
      }

      filteredJobs = filteredJobs.filter(job => job.date >= cutoffDate);
    }

    // Tri des résultats
    if (sortBy === 'newest') {
      filteredJobs.sort((a, b) => b.date.getTime() - a.date.getTime());
    } else if (sortBy === 'oldest') {
      filteredJobs.sort((a, b) => a.date.getTime() - b.date.getTime());
    }
    // 'relevance' est le tri par défaut, conservé tel quel

    setJobListings(filteredJobs);
  }, [searchTerm, searchLocation, filters, sortBy, allJobs]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleFilterChange = (category: keyof Filters, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };

      if (category === 'datePosted') {
        newFilters.datePosted = value;
      } else {
        if (newFilters[category].includes(value)) {
          newFilters[category] = newFilters[category].filter(item => item !== value);
        } else {
          newFilters[category] = [...newFilters[category], value];
        }
      }

      return newFilters;
    });
    setCurrentPage(1); // Réinitialiser à la première page après un changement de filtre
  };

  const clearFilters = () => {
    setFilters({
      jobType: [],
      experienceLevel: [],
      salary: [],
      datePosted: 'any'
    });
    setSearchTerm('');
    setSearchLocation('');
  };

  // Pagination
  const jobsPerPage = 5;
  const totalPages = Math.ceil(jobListings.length / jobsPerPage);
  const paginatedJobs = jobListings.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Head>
        <title>LiggeyLink | Trouvez votre prochain emploi</title>
        <meta name="description" content="Plateforme de recrutement pour connecter talents et entreprises" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={`py-4 px-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md sticky top-0 z-10`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">LiggeyLink</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block flex-grow mx-6">
            <ul className="flex space-x-8">
              <li><Link href="/" className={`font-medium ${darkMode ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'}`}>Accueil</Link></li>
              <li><Link href="/emplois" className={`font-medium ${darkMode ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'}`}>Offres d&apos;emploi</Link></li>
            </ul>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/connexion" className={`px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} font-medium`}>
              Connexion
            </Link>
            <Link href="/inscription" className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Inscription
            </Link>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              aria-label={darkMode ? "Activer le mode clair" : "Activer le mode sombre"}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-lg mr-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              aria-label="Menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              aria-label={darkMode ? "Activer le mode clair" : "Activer le mode sombre"}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden mt-4 py-4 px-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <nav className="mb-4">
              <ul className="space-y-3">
                <li><Link href="/" className={`block py-2 px-4 rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'}`}>Accueil</Link></li>
                <li><Link href="/emplois" className={`block py-2 px-4 rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'}`}>Offres d&apos;emploi</Link></li>
              </ul>
            </nav>
            <div className="flex flex-col space-y-2 px-4">
              <Link href="/connexion" className={`py-2 px-4 rounded-md text-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} font-medium`}>
                Connexion
              </Link>
              <Link href="/inscription" className="py-2 px-4 rounded-md text-center bg-blue-600 hover:bg-blue-700 text-white font-medium">
                Inscription
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Offres d&apos;emploi</h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Découvrez {jobListings.length} offres d&apos;emploi correspondant à vos critères
          </p>
        </div>

        {/* Barre de recherche */}
        <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'} mb-8`}>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Titre du poste, compétences ou mots-clés"
              className="flex-grow px-4 py-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="text"
              placeholder="Ville ou région"
              className="flex-grow px-4 py-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <button className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium whitespace-nowrap">
              Rechercher
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtres */}
          <aside className={`md:w-1/4 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'} sticky top-24`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filtres</h2>
                <button
                  onClick={clearFilters}
                  className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                >
                  Réinitialiser
                </button>
              </div>

              {/* Type de contrat */}
              <div className="mb-6">
                <h3 className="font-bold mb-3">Type de contrat</h3>
                <div className="space-y-2">
                  {['CDI', 'CDD', 'Freelance', 'Stage', 'Alternance'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.jobType.includes(type)}
                        onChange={() => handleFilterChange('jobType', type)}
                        className="mr-2 h-4 w-4 text-blue-600"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Niveau d'expérience */}
              <div className="mb-6">
                <h3 className="font-bold mb-3">Niveau d&apos;expérience</h3>
                <div className="space-y-2">
                  {['Débutant', 'Confirmé', 'Senior'].map((level) => (
                    <label key={level} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.experienceLevel.includes(level)}
                        onChange={() => handleFilterChange('experienceLevel', level)}
                        className="mr-2 h-4 w-4 text-blue-600"
                      />
                      <span>{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date de publication */}
              <div className="mb-6">
                <h3 className="font-bold mb-3">Date de publication</h3>
                <div className="space-y-2">
                  {[
                    { value: 'any', label: 'Toutes les dates' },
                    { value: 'today', label: 'Dernières 24h' },
                    { value: 'week', label: '7 derniers jours' },
                    { value: 'month', label: '30 derniers jours' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        checked={filters.datePosted === option.value}
                        onChange={() => handleFilterChange('datePosted', option.value)}
                        className="mr-2 h-4 w-4 text-blue-600"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Bouton pour afficher/masquer les filtres sur mobile */}
          <button
            className="md:hidden mb-4 px-4 py-2 rounded-md bg-blue-600 text-white font-medium"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            {isFilterOpen ? 'Masquer les filtres' : 'Afficher les filtres'}
          </button>

          {/* Liste des offres */}
          <div className="md:w-3/4">
            <div className="flex justify-between items-center mb-4">
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {jobListings.length} résultat{jobListings.length !== 1 ? 's' : ''}
              </p>
              <div className="flex items-center space-x-2">
                <label className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Trier par :</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`p-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
                >
                  <option value="relevance">Pertinence</option>
                  <option value="newest">Plus récent</option>
                  <option value="oldest">Plus ancien</option>
                </select>
              </div>
            </div>

            {/* Affichage des offres */}
            <div className="space-y-4">
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <div key={job.id} className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-colors duration-200`}>
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="flex items-start">
                        <div className="mr-4">
                          <div className="relative w-12 h-12">
                            <Image
                              src={job.logo}
                              alt={job.company}
                              fill
                              className="rounded-md object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <Link href={`/emplois/${job.id}`} className={`text-xl font-semibold mb-1 block ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>
                            {job.title}
                          </Link>
                          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{job.company}</p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                              {job.location}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                              {job.type}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                              {job.salary}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                              {job.experienceLevel}
                            </span>
                          </div>
                          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
                            {job.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex mt-4 md:mt-0 items-center">
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mr-4`}>{job.posted}</span>
                        <button className={`px-4 py-2 rounded-md ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium`}>
                          Postuler
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'} text-center`}>
                  <p>Aucune offre ne correspond à vos critères.</p>
                  <button
                    onClick={clearFilters}
                    className={`mt-4 px-4 py-2 rounded-md ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium`}
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${currentPage === 1
                      ? `${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'}`
                      : `${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`
                      }`}
                  >
                    Précédent
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-md ${currentPage === page
                        ? 'bg-blue-600 text-white'
                        : `${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages
                      ? `${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'}`
                      : `${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`
                      }`}
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}
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