'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  
  const jobListings = [
    { id: 1, title: "Développeur Frontend", company: "TechCorp", location: "Paris", type: "CDI", salary: "45-55k€", posted: "Il y a 2 jours", logo: "/api/placeholder/50/50" },
    { id: 2, title: "UX Designer Senior", company: "DesignStudio", location: "Lyon", type: "CDI", salary: "50-60k€", posted: "Il y a 3 jours", logo: "/api/placeholder/50/50" },
    { id: 3, title: "Développeur Backend", company: "DataSystems", location: "Bordeaux", type: "CDD", salary: "40-50k€", posted: "Il y a 5 jours", logo: "/api/placeholder/50/50" },
    { id: 4, title: "Chef de Projet IT", company: "ConsultGroup", location: "Paris", type: "Freelance", salary: "500€/jour", posted: "Il y a 1 jour", logo: "/api/placeholder/50/50" },
    { id: 5, title: "Data Scientist", company: "AI Solutions", location: "Toulouse", type: "CDI", salary: "55-65k€", posted: "Il y a 1 semaine", logo: "/api/placeholder/50/50" },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Head>
        <title>LiggeyLink | Trouvez votre prochain emploi</title>
        <meta name="description" content="Plateforme de recrutement pour connecter talents et entreprises" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`py-4 px-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md sticky top-0 z-10`}>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-blue-600">LiggeyLink</h1>
          </div>
          
          <nav className="flex-grow mx-6 hidden md:block">
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
            <Link href="/inscription" className={`px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium`}>
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
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className={`py-12 px-6 rounded-xl mb-12 ${darkMode ? 'bg-blue-900' : 'bg-blue-600'} text-white`}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Trouvez l&apos;emploi de vos rêves</h2>
            <p className="text-xl mb-8">Des milliers d&apos;offres d&apos;emploi dans le numérique vous attendent</p>
            
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <input 
                  type="text" 
                  placeholder="Titre du poste, compétences ou mots-clés" 
                  className="flex-grow px-4 py-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Rechercher par titre de poste ou compétences"
                />
                <input 
                  type="text" 
                  placeholder="Ville ou région" 
                  className="flex-grow px-4 py-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  aria-label="Rechercher par lieu"
                />
                <button 
                  className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium whitespace-nowrap"
                  onClick={() => {/* Fonction de recherche */}}
                  aria-label="Lancer la recherche"
                >
                  Rechercher
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Jobs Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Dernières offres d&apos;emploi</h2>
            <Link href="/emplois" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>
              Voir toutes les offres →
            </Link>
          </div>
          
          <div className="space-y-4">
            {jobListings.map((job) => (
              <div key={job.id} className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-colors duration-200`}>
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex items-start">
                    <div className="mr-4">
                      <Image 
                        src={job.logo} 
                        alt={`Logo ${job.company}`} 
                        width={50} 
                        height={50} 
                        className="rounded-md"
                      />
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
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-4 md:mt-0 items-center">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mr-4`}>{job.posted}</span>
                    <button 
                      className={`px-4 py-2 rounded-md ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium`}
                      onClick={() => {/* Fonction de postulation */}}
                      aria-label={`Postuler chez ${job.company} pour le poste de ${job.title}`}
                    >
                      Postuler
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Parcourir par catégorie</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Développement", "Design", "Marketing", "Data", "Gestion de projet", "Vente", "Support", "Ressources humaines"].map((category, index) => (
              <Link 
                key={index} 
                href={`/categories/${category.toLowerCase().replace(' ', '-')}`}
                className={`p-6 rounded-lg shadow-md text-center ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} cursor-pointer transition-colors duration-200`}
              >
                <h3 className="text-lg font-medium">{category}</h3>
              </Link>
            ))}
          </div>
        </section>
        
        {/* For Companies Section */}
        <section className={`p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md mb-12`}>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold mb-4">Vous recrutez ?</h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                Publiez vos offres d&apos;emploi et accédez à notre base de candidats qualifiés. 
                Bénéficiez d&apos;outils puissants pour trouver le candidat idéal.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/entreprises/inscription" className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium">
                  Publier une offre
                </Link>
                <Link href="/entreprises/solutions" className={`px-6 py-3 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} font-medium`}>
                  Nos solutions
                </Link>
              </div>
            </div>
            <div className="md:w-1/3">
              <Image 
                src="/api/placeholder/400/300" 
                alt="Services de recrutement" 
                width={400}
                height={300}
                className="h-48 w-full rounded-lg object-cover"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Ils nous font confiance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {name: "Jean Dupont", position: "Développeur Full Stack, TechCorp"},
              {name: "Marie Laurent", position: "Designer UX, DesignStudio"},
              {name: "Thomas Martin", position: "Chef de Projet, ConsultGroup"}
            ].map((testimonial, index) => (
              <div key={index} className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`mb-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`}>
                  {"★".repeat(5)}
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  &quot;LiggeyLink m&apos;a permis de trouver mon emploi idéal en moins de deux semaines. 
                  Le processus était simple et efficace.&quot;
                </p>
                <div className="flex items-center">
                  <div className="mr-3">
                    <Image 
                      src="/api/placeholder/40/40" 
                      alt={testimonial.name} 
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className={`py-12 px-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-600">LiggeyLink</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                La plateforme qui connecte talents et entreprises pour créer les meilleures opportunités professionnelles.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Pour les candidats</h4>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li><Link href="/emplois" className="hover:underline">Rechercher des emplois</Link></li>
                <li><Link href="/candidats/cv" className="hover:underline">Créer un CV</Link></li>
                <li><Link href="/candidats/alertes" className="hover:underline">Alertes emploi</Link></li>
                <li><Link href="/conseils" className="hover:underline">Conseils carrière</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Pour les entreprises</h4>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li><Link href="/entreprises/publier" className="hover:underline">Publier une offre</Link></li>
                <li><Link href="/entreprises/recherche" className="hover:underline">Rechercher des profils</Link></li>
                <li><Link href="/entreprises/solutions" className="hover:underline">Solutions de recrutement</Link></li>
                <li><Link href="/entreprises/tarifs" className="hover:underline">Tarifs</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">À propos</h4>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li><Link href="/a-propos" className="hover:underline">Qui sommes-nous</Link></li>
                <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                <li><Link href="/mentions-legales" className="hover:underline">Mentions légales</Link></li>
                <li><Link href="/confidentialite" className="hover:underline">Confidentialité</Link></li>
              </ul>
            </div>
          </div>
          
          <div className={`border-t ${darkMode ? 'border-gray-600' : 'border-gray-300'} mt-8 pt-8 flex flex-col md:flex-row justify-between items-center`}>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 md:mb-0`}>
              © {new Date().getFullYear()} LiggeyLink. Tous droits réservés.
            </p>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} aria-label="Twitter">
                Twitter
              </Link>
              <Link href="https://linkedin.com" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} aria-label="LinkedIn">
                LinkedIn
              </Link>
              <Link href="https://facebook.com" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} aria-label="Facebook">
                Facebook
              </Link>
              <Link href="https://instagram.com" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} aria-label="Instagram">
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}