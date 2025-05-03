// pages/index.js
'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  User, 
  Briefcase, 
  PieChart, 
  Settings, 
  LogOut, 
  Search,
  Bell,
  ChevronDown,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  MapPin,
  Building,
  Star,
  Filter,
  Menu,
  X,
  Plus
} from 'lucide-react';

export default function Home() {
  type ApplicationStatus = 'En attente' | 'Entretien' | 'Refusé' | 'Accepté';

  const [applications, setApplications] = useState<Array<{
    id: number;
    company: string;
    position: string;
    date: string;
    status: ApplicationStatus;
    logo: string;
  }>>([
    { 
      id: 1, 
      company: 'Tech Solutions', 
      position: 'Développeur Frontend', 
      date: '2025-04-10', 
      status: 'En attente',
      logo: '/api/placeholder/40/40'
    },
    { 
      id: 2, 
      company: 'Innovation Labs', 
      position: 'Ingénieur Full Stack', 
      date: '2025-04-05', 
      status: 'Entretien',
      logo: '/api/placeholder/40/40'
    },
    { 
      id: 3, 
      company: 'DigitalCraft', 
      position: 'UX Designer', 
      date: '2025-03-28', 
      status: 'Refusé',
      logo: '/api/placeholder/40/40'
    },
  ]);

  const [jobListings, setJobListings] = useState([
    { 
      id: 1, 
      company: 'TechGrowth', 
      position: 'Développeur React', 
      location: 'Paris', 
      type: 'CDI',
      posted: '2025-04-15',
      salary: '45-55k €',
      logo: '/api/placeholder/64/64',
      featured: true
    },
    { 
      id: 2, 
      company: 'WebSolutions', 
      position: 'Développeur Next.js', 
      location: 'Lyon', 
      type: 'CDD',
      posted: '2025-04-14',
      salary: '40-48k €',
      logo: '/api/placeholder/64/64'
    },
    { 
      id: 3, 
      company: 'CreativeMinds', 
      position: 'UX/UI Designer', 
      location: 'Bordeaux', 
      type: 'Freelance',
      posted: '2025-04-12',
      salary: '400-500 €/j',
      logo: '/api/placeholder/64/64'
    },
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [screenSize, setScreenSize] = useState('');

  // Détecter la taille de l'écran pour gérer l'affichage responsive
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1024);
      if (width >= 1024) {
        setSidebarOpen(false);
        setScreenSize('lg');
      } else if (width >= 640) {
        setScreenSize('md');
      } else {
        setScreenSize('sm');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const statusColors = {
    'En attente': {bg: 'bg-amber-100', text: 'text-amber-800', icon: Clock},
    'Entretien': {bg: 'bg-emerald-100', text: 'text-emerald-800', icon: Calendar},
    'Refusé': {bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle},
    'Accepté': {bg: 'bg-blue-100', text: 'text-blue-800', icon: CheckCircle}
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Head>
        <title>LiggeyLink - Gérez votre carrière professionnelle</title>
        <meta name="description" content="Application de suivi de candidatures professionnelles" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Barre latérale */}
      <div className="flex h-full">
        <aside className={`w-64 md:w-72 h-screen bg-gradient-to-b from-blue-700 to-indigo-800 text-white fixed z-30 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative`}>
          <div className="p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">LiggeyLink</h2>
              <p className="text-blue-200 text-xs mt-1">Construisez votre avenir professionnel</p>
            </div>
            <button onClick={toggleSidebar} className="lg:hidden text-white p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="px-6 py-4">
            <div className="flex items-center space-x-4 mb-8">
              <div className="relative">
                <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-lg font-bold">
                  ML
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-medium">Mapate LOUM</h3>
                <p className="text-sm text-blue-200">Développeur Web</p>
              </div>
            </div>
          </div>
          
          <nav className="mt-2 px-4">
            <button 
              onClick={() => {
                setActiveTab('dashboard');
                if (isMobile) setSidebarOpen(false);
              }}
              className={`flex items-center w-full px-4 py-3 rounded-xl mb-1 transition-all duration-200 ${
                activeTab === 'dashboard' 
                  ? 'bg-black/75 bg-opacity-15 text-white shadow-sm' 
                  : 'text-blue-100 hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <PieChart className="h-5 w-5 mr-3" />
              <span>Tableau de bord</span>
            </button>
            
            <button 
              onClick={() => {
                setActiveTab('profile');
                if (isMobile) setSidebarOpen(false);
              }}
              className={`flex items-center w-full px-4 py-3 rounded-xl mb-1 transition-all duration-200 ${
                activeTab === 'profile' 
                  ? 'bg-black/75 bg-opacity-15 text-white shadow-sm' 
                  : 'text-blue-100 hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <User className="h-5 w-5 mr-3" />
              <span>Mon profil</span>
            </button>
            
            <button 
              onClick={() => {
                setActiveTab('applications');
                if (isMobile) setSidebarOpen(false);
              }}
              className={`flex items-center w-full px-4 py-3 rounded-xl mb-1 transition-all duration-200 ${
                activeTab === 'applications' 
                  ? 'bg-black/75 bg-opacity-15 text-white shadow-sm' 
                  : 'text-blue-100 hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <Briefcase className="h-5 w-5 mr-3" />
              <span>Mes candidatures</span>
            </button>
            
            <button 
              onClick={() => {
                setActiveTab('settings');
                if (isMobile) setSidebarOpen(false);
              }}
              className={`flex items-center w-full px-4 py-3 rounded-xl mb-1 transition-all duration-200 ${
                activeTab === 'settings' 
                  ? 'bg-black/75 bg-opacity-15 text-white shadow-sm' 
                  : 'text-blue-100 hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <Settings className="h-5 w-5 mr-3" />
              <span>Paramètres</span>
            </button>
            
            <div className="border-t border-blue-600 mt-6 pt-6">
              <button className="flex items-center w-full px-4 py-3 rounded-xl text-blue-100 hover:bg-white hover:bg-opacity-10 transition-all duration-200">
                <LogOut className="h-5 w-5 mr-3" />
                <span>Déconnexion</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Overlay pour fermer le sidebar sur mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Contenu principal avec gestion dynamique de la marge */}
        <main className={`flex-1 w-full ${!isMobile ? 'lg:ml-72' : ''}`}>
          {/* En-tête */}
          <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="flex justify-between items-center px-4 sm:px-6 py-4">
              <div className="flex items-center">
                <button 
                  className="lg:hidden mr-4 text-gray-500"
                  onClick={toggleSidebar}
                >
                  <Menu className="h-6 w-6" />
                </button>
                <div className="lg:hidden font-bold text-xl text-blue-700">LiggeyLink</div>
                <div className="relative hidden sm:block w-full sm:w-64 lg:w-96">
                  <input 
                    type="text" 
                    placeholder="Rechercher un emploi..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200" 
                  />
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="flex items-center space-x-3 md:space-x-6">
                <button className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-200">
                  <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
                  <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="flex items-center cursor-pointer rounded-full py-1 px-2 hover:bg-gray-100 transition-all duration-200">
                  <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    ML
                  </div>
                  <div className="ml-2 mr-1 hidden sm:block">
                    <span className="font-medium text-sm">Mapate LOUM</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
                </div>
              </div>
            </div>
            {/* Barre de recherche mobile */}
            <div className="px-4 pb-3 sm:hidden">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200" 
                />
                <Search className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </header>

          {/* Contenu du tableau de bord */}
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Tableau de bord</h1>
                <p className="text-gray-500 mt-1">Bienvenue Mapate, voici un aperçu de votre activité</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center justify-center sm:justify-start space-x-2 transition-all duration-200 shadow-sm w-full sm:w-auto">
                <span className="hidden sm:inline">Nouvelle candidature</span>
                <span className="sm:hidden">Ajouter</span>
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            {/* Statistiques */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider">Candidatures totales</h3>
                    <p className="text-2xl font-bold text-gray-800 mt-2">12</p>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="mt-3 text-xs text-green-600 flex items-center">
                  <span className="font-medium">+3</span>
                  <span className="ml-1">depuis le mois dernier</span>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider">Entretiens</h3>
                    <p className="text-2xl font-bold text-indigo-600 mt-2">4</p>
                  </div>
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-600 flex items-center">
                  <span className="font-medium">Prochain:</span>
                  <span className="ml-1">Demain à 14h00</span>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider">Taux de réponse</h3>
                    <p className="text-2xl font-bold text-green-600 mt-2">75%</p>
                  </div>
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="mt-3 text-xs text-green-600 flex items-center">
                  <span className="font-medium">+15%</span>
                  <span className="ml-1">depuis le mois dernier</span>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider">Offres sauvegardées</h3>
                    <p className="text-2xl font-bold text-amber-600 mt-2">8</p>
                  </div>
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <Star className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-600 flex items-center">
                  <span className="font-medium">3 nouveaux postes</span>
                  <span className="ml-1">correspondants</span>
                </div>
              </div>
            </div>

            {/* Section des candidatures récentes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-6 py-4 border-b gap-3">
                <h2 className="text-lg font-semibold text-gray-800">Mes candidatures récentes</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className="relative w-full sm:w-auto">
                    <select className="w-full sm:w-auto pl-8 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Toutes</option>
                      <option>En attente</option>
                      <option>Entretien</option>
                      <option>Refusé</option>
                      <option>Accepté</option>
                    </select>
                    <Filter className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <Link href="/applications" className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                    Voir toutes
                  </Link>
                </div>
              </div>
              
              {/* Table responsive - avec différentes approches pour mobile/desktop */}
              <div className="overflow-x-auto">
                {/* Version desktop - tableau standard */}
                <table className="w-full hidden sm:table">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      <th className="px-4 sm:px-6 py-3">Entreprise</th>
                      <th className="px-4 sm:px-6 py-3">Poste</th>
                      <th className="px-4 sm:px-6 py-3">Date</th>
                      <th className="px-4 sm:px-6 py-3">Statut</th>
                      <th className="px-4 sm:px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {applications.map(app => {
                      const StatusIcon = statusColors[app.status].icon;
                      return (
                        <tr key={app.id} className="hover:bg-blue-50 transition-colors duration-150">
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-8 w-8 bg-gray-200 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600 mr-3">
                                {app.company.charAt(0)}
                              </div>
                              <span className="font-medium text-gray-900">{app.company}</span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-gray-700">
                            {app.position}
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-gray-500 text-sm">
                            {new Date(app.date).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className={`flex items-center ${statusColors[app.status].bg} ${statusColors[app.status].text} text-xs px-3 py-1 rounded-full inline-flex`}>
                              <StatusIcon className="h-3.5 w-3.5 mr-1.5" />
                              <span>{app.status}</span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-right">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-4 transition-colors">
                              Détails
                            </button>
                            <button className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors">
                              Modifier
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                
                {/* Version mobile - cartes */}
                <div className="sm:hidden divide-y divide-gray-100">
                  {applications.map(app => {
                    const StatusIcon = statusColors[app.status].icon;
                    return (
                      <div key={app.id} className="p-4 hover:bg-blue-50 transition-colors duration-150">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="h-8 w-8 bg-gray-200 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600 mr-3">
                              {app.company.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{app.company}</h4>
                              <p className="text-sm text-gray-700">{app.position}</p>
                            </div>
                          </div>
                          <div className={`flex items-center ${statusColors[app.status].bg} ${statusColors[app.status].text} text-xs px-2.5 py-1 rounded-full`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            <span>{app.status}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs mt-2">
                          <span className="text-gray-500">
                            {new Date(app.date).toLocaleDateString('fr-FR')}
                          </span>
                          <div className="flex space-x-3">
                            <button className="text-blue-600 font-medium">
                              Détails
                            </button>
                            <button className="text-gray-500 font-medium">
                              Modifier
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Offres d'emploi recommandées - adaptées responsive */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Offres d'emploi recommandées</h2>
                <Link href="/jobs" className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                  Explorer plus
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobListings.map(job => (
                  <div key={job.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 border border-gray-100">
                    {job.featured && (
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium px-4 py-1 flex items-center justify-center">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Offre en vedette
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600">
                          {job.company.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium text-gray-900 text-sm">{job.position}</h3>
                          <p className="text-gray-600 text-xs">{job.company}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        <div className="flex items-center text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                          <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                          <Briefcase className="h-3 w-3 mr-1 text-gray-500" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                          <Building className="h-3 w-3 mr-1 text-gray-500" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-xs text-gray-500">Publié le {new Date(job.posted).toLocaleDateString('fr-FR')}</span>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                          Postuler
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Footer avec padding pour mobile */}
            <div className="mt-6 pb-6 text-center text-xs text-gray-500">
              © 2025 LiggeyLink. Tous droits réservés.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}