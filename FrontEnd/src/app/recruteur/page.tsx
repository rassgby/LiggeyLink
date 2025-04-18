'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Calendar, Users, FileText, MessageSquare, Bell, Settings, LogOut, Clock, CheckCircle, AlertCircle, Menu, X, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    offresActives: 12,
    candidaturesPendantes: 24,
    entretiensPlanifies: 8,
    candidatsRetenus: 5
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768);
      
      // Auto-close sidebar on larger screens
      if (width >= 768) {
        setSidebarOpen(false);
      }
    };

    // Set initial values
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const recentsEntretiens = [
    { id: 1, nom: "Amadou Korka DIALLO", poste: "Ingénieur DevOps", date: "18 avril 2025", heure: "14:00", statut: "à venir" },
    { id: 2, nom: "Mame Diarra AÏDARA", poste: "Développeur Frontend", date: "19 avril 2025", heure: "10:30", statut: "à venir" },
    { id: 3, nom: "Papa Mapate LOUM", poste: "UI/UX Designer", date: "20 avril 2025", heure: "15:45", statut: "à venir" }
  ];

  const recentesCandidatures = [
    { id: 1, nom: "Ndeye Astou DIENG", poste: "Chef de projet", date: "15 avril 2025", statut: "En attente" },
    { id: 2, nom: "Fatou FALL", poste: "Data Scientist", date: "16 avril 2025", statut: "Reçue" },
    { id: 3, nom: "Seydina GOUDIABY", poste: "Développeur Backend", date: "17 avril 2025", statut: "En cours d'analyse" }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>LiggeyLink - Tableau de bord</title>
        <meta name="description" content="Plateforme de recrutement LiggeyLink" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="theme-color" content="#3B82F6" />
      </Head>

      <div className="flex h-screen overflow-hidden">
        {/* Mobile Menu Button - Fixed position */}
        <button 
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-700 text-white rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          aria-label={sidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar - responsive with backdrop on mobile */}
        <aside 
          className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed md:relative md:translate-x-0 z-40 w-72 lg:w-64 h-full bg-gradient-to-b from-blue-700 to-indigo-800 text-white transition-transform duration-300 ease-in-out flex flex-col shadow-lg`}
        >
          {/* Logo and site name */}
          <div className="p-6 flex items-center justify-between">
            <h1 className="text-xl lg:text-2xl font-bold flex items-center">
              <span className="bg-white text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center mr-2">L</span>
              LiggeyLink
            </h1>
            {/* Close button - Mobile only */}
            <button onClick={closeSidebar} className="md:hidden text-white hover:text-gray-200">
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 mt-4 overflow-y-auto">
            <div className="space-y-1">
              <div className="px-4 py-3 bg-indigo-900 rounded-lg mb-1 transition-all hover:bg-indigo-800">
                <Link href="/recruteur" className="flex items-center" onClick={closeSidebar}>
                  <Users className="mr-3 text-white" size={20} />
                  <span>Tableau de bord</span>
                </Link>
              </div>
              <Link href="/recruteur/offres" onClick={closeSidebar} className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 mb-1 group">
                <FileText className="mr-3 text-indigo-300 group-hover:text-white" size={20} />
                <span className="flex-1 group-hover:translate-x-1 transition-transform duration-200">Offres d'emploi</span>
                <ChevronRight size={16} className="text-indigo-400 opacity-70" />
              </Link>
              <Link href="/recruteur/candidatures" onClick={closeSidebar} className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 mb-1 group">
                <FileText className="mr-3 text-indigo-300 group-hover:text-white" size={20} />
                <span className="flex-1 group-hover:translate-x-1 transition-transform duration-200">Candidatures</span>
                <ChevronRight size={16} className="text-indigo-400 opacity-70" />
              </Link>
              <Link href="/recruteur/entretiens" onClick={closeSidebar} className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 mb-1 group">
                <Calendar className="mr-3 text-indigo-300 group-hover:text-white" size={20} />
                <span className="flex-1 group-hover:translate-x-1 transition-transform duration-200">Entretiens</span>
                <ChevronRight size={16} className="text-indigo-400 opacity-70" />
              </Link>
            </div>
          </nav>
          
          {/* User profile section */}
          <div className="p-4 border-t border-indigo-800">
            <div className="flex items-center">
              <div className="bg-blue-800 w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-inner">
                <span className="text-white font-bold">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">Jean Dupont</p>
                <p className="text-sm text-indigo-200 truncate">Responsable RH</p>
              </div>
            </div>
            <button className="mt-4 flex items-center text-indigo-200 hover:text-white w-full rounded-md hover:bg-indigo-700 px-2 py-1.5 transition-all">
              <LogOut size={18} className="mr-2" />
              <span>Déconnexion</span>
            </button>
          </div>
        </aside>

        {/* Overlay when sidebar is open on mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity duration-300"
            onClick={closeSidebar}
            aria-hidden="true"
          ></div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden w-full">
          {/* Header */}
          <header className="bg-white shadow-md z-10">
            <div className="px-4 md:px-6 h-16 flex justify-between items-center">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 ml-10 md:ml-0">Tableau de bord</h2>
              <div className="flex items-center space-x-4">
                <button className="relative text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full p-1">
                  <span className="sr-only">Notifications</span>
                  <Bell size={22} />
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span>
                </button>
                <Link 
                  href="/recruteur/offres/nouvelle" 
                  className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-md font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Nouvelle offre
                </Link>
              </div>
            </div>
          </header>

          {/* Content Area with Scrolling */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border-l-4 border-indigo-500">
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-2 sm:p-3 rounded-full mr-3">
                    <FileText size={windowWidth < 640 ? 18 : 22} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-gray-600 font-medium">Offres actives</p>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{stats.offresActives}</h3>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border-l-4 border-green-500">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 sm:p-3 rounded-full mr-3">
                    <Users size={windowWidth < 640 ? 18 : 22} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-gray-600 font-medium">Candidatures</p>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{stats.candidaturesPendantes}</h3>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border-l-4 border-blue-500">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-full mr-3">
                    <Calendar size={windowWidth < 640 ? 18 : 22} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-gray-600 font-medium">Entretiens planifiés</p>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{stats.entretiensPlanifies}</h3>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border-l-4 border-purple-500">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 sm:p-3 rounded-full mr-3">
                    <CheckCircle size={windowWidth < 640 ? 18 : 22} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-gray-600 font-medium">Candidats retenus</p>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{stats.candidatsRetenus}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Entretiens à venir */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border-t-4 border-blue-500">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-black font-semibold flex items-center text-base md:text-lg">
                    <Calendar className="mr-2.5 text-blue-600" size={windowWidth < 640 ? 18 : 20} />
                    Entretiens à venir
                    <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      {recentsEntretiens.length}
                    </span>
                  </h3>
                  <Link 
                    href="/recruteur/entretiens" 
                    className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium flex items-center"
                  >
                    Voir tous
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
                
                <div className="space-y-3">
                  {recentsEntretiens.map((entretien) => (
                    <div 
                      key={entretien.id} 
                      className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between p-3 border rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
                        <div className="bg-blue-200 w-10 h-10 rounded-full flex items-center justify-center mr-3 text-blue-700 font-bold text-sm">
                          {entretien.nom.split(' ').map(name => name[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-medium text-gray-800 text-sm truncate">{entretien.nom}</h4>
                          <p className="text-xs text-gray-600">{entretien.poste}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full sm:w-auto ml-12 sm:ml-0">
                        <div className="sm:text-right flex flex-row sm:flex-col items-center sm:items-end">
                          <div className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center mr-2 sm:mr-0 sm:mb-1">
                            <Clock size={12} className="mr-1" />
                            {entretien.heure}
                          </div>
                          <p className="text-xs font-medium text-gray-700">{entretien.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Candidatures récentes */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border-t-4 border-green-500">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-black font-semibold flex items-center text-base md:text-lg">
                    <Users className="mr-2.5 text-green-600" size={windowWidth < 640 ? 18 : 20} />
                    Candidatures récentes
                    <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      {recentesCandidatures.length}
                    </span>
                  </h3>
                  <Link 
                    href="/recruteur/candidatures" 
                    className="text-green-600 hover:text-green-800 text-xs sm:text-sm font-medium flex items-center"
                  >
                    Voir toutes
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
                
                <div className="space-y-3">
                  {recentesCandidatures.map((candidature) => {
                    let statusColor = '';
                    let StatusIcon = AlertCircle;
                    
                    if (candidature.statut === 'Reçue') {
                      statusColor = 'bg-green-500 text-white';
                      StatusIcon = CheckCircle;
                    } else if (candidature.statut === 'En attente') {
                      statusColor = 'bg-yellow-500 text-white';
                      StatusIcon = Clock;
                    } else {
                      statusColor = 'bg-blue-500 text-white';
                      StatusIcon = AlertCircle;
                    }
                    
                    return (
                      <div 
                        key={candidature.id} 
                        className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between p-3 border rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                      >
                        <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
                          <div className="bg-green-200 w-10 h-10 rounded-full flex items-center justify-center mr-3 text-green-700 font-bold text-sm">
                            {candidature.nom.split(' ').map(name => name[0]).join('')}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-medium text-gray-800 text-sm truncate">{candidature.nom}</h4>
                            <p className="text-xs text-gray-600">{candidature.poste}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between w-full sm:w-auto ml-12 sm:ml-0">
                          <div className="sm:text-right flex flex-row sm:flex-col items-center sm:items-end">
                            <div className={`${statusColor} px-2 py-0.5 rounded-full text-xs font-medium flex items-center mr-2 sm:mr-0 sm:mb-1`}>
                              <StatusIcon size={12} className="mr-1" />
                              {candidature.statut}
                            </div>
                            <p className="text-xs font-medium text-gray-700">{candidature.date}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}