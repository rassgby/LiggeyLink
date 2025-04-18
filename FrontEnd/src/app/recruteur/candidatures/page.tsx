'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Calendar, Users, FileText, MessageSquare, Bell, Settings, LogOut, 
  Search, Filter, ChevronDown, Mail, Eye, ThumbsUp, ThumbsDown, 
  PlusCircle, ArrowUpDown, RefreshCw, CircleUser, Menu, X
} from 'lucide-react';

export default function Candidatures() {
  const [candidatures, setCandidatures] = useState([
    { 
      id: 1, 
      nom: "Amadou Korka DIALLO", 
      poste: "Chef de projet", 
      source: "LinkedIn",
      dateReception: "15 avril 2025",
      statut: "En attente",
      experience: "8 ans",
      tags: ["Management", "Agile"]
    },
    { 
      id: 2, 
      nom: "Mapate LOUM", 
      poste: "Data Scientist", 
      source: "Site web",
      dateReception: "16 avril 2025",
      statut: "Reçue",
      experience: "5 ans",
      tags: ["Python", "ML"]
    },
    { 
      id: 3, 
      nom: "Mame Diarra AÏDARA", 
      poste: "Développeur Backend", 
      source: "Indeed",
      dateReception: "17 avril 2025",
      statut: "En cours d'analyse",
      experience: "3 ans",
      tags: ["Java", "Spring"]
    },
    { 
      id: 4, 
      nom: "Ndeye Astou DIENG", 
      poste: "UI/UX Designer", 
      source: "Recommandation",
      dateReception: "14 avril 2025",
      statut: "Entretien planifié",
      experience: "6 ans",
      tags: ["Figma", "UX Research"]
    },
    { 
      id: 5, 
      nom: "El hadji TOURE", 
      poste: "Développeur Frontend", 
      source: "Welcome to the Jungle",
      dateReception: "13 avril 2025",
      statut: "Refusée",
      experience: "2 ans",
      tags: ["React", "JavaScript"]
    }
  ]);

  const [filtreStatut, setFiltreStatut] = useState("tous");
  const [filtrePoste, setFiltrePoste] = useState("tous");
  const [recherche, setRecherche] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState<keyof typeof candidatures[0]>("dateReception");
  const [sortDirection, setSortDirection] = useState("desc");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [sidebarOpen]);

  const postes = [...new Set(candidatures.map(c => c.poste))];

  const candidaturesFiltrees = candidatures
    .filter(candidature => {
      const matchStatut = filtreStatut === "tous" || candidature.statut === filtreStatut;
      const matchPoste = filtrePoste === "tous" || candidature.poste === filtrePoste;
      const matchRecherche = candidature.nom.toLowerCase().includes(recherche.toLowerCase()) || 
                            candidature.poste.toLowerCase().includes(recherche.toLowerCase()) ||
                            candidature.tags.some(tag => tag.toLowerCase().includes(recherche.toLowerCase()));
      return matchStatut && matchPoste && matchRecherche;
    })
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

  interface Candidature {
    id: number;
    nom: string;
    poste: string;
    source: string;
    dateReception: string;
    statut: string;
    experience: string;
    tags: string[];
  }

  type SortDirection = "asc" | "desc";

  const handleSort = (field: keyof Candidature): void => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Couleurs selon le statut
  interface StatusColorMap {
    [key: string]: string;
  }

  const getStatusColor = (statut: string): string => {
    const statusColorMap: StatusColorMap = {
      'Reçue': 'bg-blue-100 text-blue-800 border border-blue-200',
      'En attente': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      'En cours d\'analyse': 'bg-purple-100 text-purple-800 border border-purple-200',
      'Entretien planifié': 'bg-green-100 text-green-800 border border-green-200',
      'Refusée': 'bg-red-100 text-red-800 border border-red-200',
    };

    return statusColorMap[statut] || 'bg-gray-100 text-gray-800 border border-gray-200';
  };

  const getStatusIcon = (statut: string) => {
    switch(statut) {
      case 'Reçue': return <Mail size={14} className="mr-1" />;
      case 'En attente': return <CircleUser size={14} className="mr-1" />;
      case 'En cours d\'analyse': return <FileText size={14} className="mr-1" />;
      case 'Entretien planifié': return <Calendar size={14} className="mr-1" />;
      case 'Refusée': return <ThumbsDown size={14} className="mr-1" />;
      default: return null;
    }
  };

  // Composant pour les Cards mobiles
  const CandidatureCard = ({ candidature }: { candidature: Candidature }) => (
    <div className="bg-white rounded-lg shadow p-4 mb-4 border-l-4 hover:shadow-md transition-shadow" 
      style={{ borderLeftColor: getBorderColor(candidature.statut) }}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-900">{candidature.nom}</h3>
        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(candidature.statut)}`}>
          {getStatusIcon(candidature.statut)}
          {candidature.statut}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
        <div>
          <p className="text-gray-500">Poste</p>
          <p className="font-medium">{candidature.poste}</p>
        </div>
        <div>
          <p className="text-gray-500">Source</p>
          <p>{candidature.source}</p>
        </div>
        <div>
          <p className="text-gray-500">Date</p>
          <p>{candidature.dateReception}</p>
        </div>
        <div>
          <p className="text-gray-500">Expérience</p>
          <p>{candidature.experience}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {candidature.tags.map((tag, index) => (
            <span key={index} className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full border border-indigo-100">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 border-t pt-3">
        <button className="text-gray-500 hover:text-indigo-600 transition-colors">
          <Mail size={18} />
        </button>
        <Link href={`/recruteur/candidatures/${candidature.id}`} className="text-gray-500 hover:text-indigo-600 transition-colors">
          <Eye size={18} />
        </Link>
        <button className="text-gray-500 hover:text-green-600 transition-colors">
          <ThumbsUp size={18} />
        </button>
        <button className="text-gray-500 hover:text-red-600 transition-colors">
          <ThumbsDown size={18} />
        </button>
      </div>
    </div>
  );

  const getBorderColor = (statut: string) => {
    switch(statut) {
      case 'Reçue': return '#3b82f6';
      case 'En attente': return '#f59e0b';
      case 'En cours d\'analyse': return '#8b5cf6';
      case 'Entretien planifié': return '#10b981';
      case 'Refusée': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  // Sidebar pour mobile et desktop
  const Sidebar = () => (
    <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out w-64' : 'w-64'} ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'} bg-gradient-to-b from-blue-700 to-indigo-800 text-white h-screen`}>
      {isMobile && (
        <button 
          className="absolute top-4 right-4 text-white" 
          onClick={() => setSidebarOpen(false)}
        >
          <X size={24} />
        </button>
      )}
      
      <div className="p-6">
        <h1 className="text-2xl font-bold flex items-center">
          <span className="bg-white text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center mr-2">L</span>
          LiggeyLink
        </h1>
      </div>
      
      <nav className="mt-8 px-2">
        <Link href="/recruteur" className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 mb-1 group">
          <FileText className="mr-3 text-indigo-300 group-hover:text-white" size={20} />
          <span className="group-hover:translate-x-1 transition-transform duration-200">Tableau de bord</span>
        </Link>
        <Link href="/recruteur/offres" className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 mb-1 group">
          <FileText className="mr-3 text-indigo-300 group-hover:text-white" size={20} />
          <span className="group-hover:translate-x-1 transition-transform duration-200">Offres d'emploi</span>
        </Link>
        <div className="px-4 py-3 bg-indigo-900 rounded-lg mb-1">
          <Link href="/recruteur/candidatures" className="flex items-center">
            <Users className="mr-3 text-white" size={20} />
            <span>Candidatures</span>
          </Link>
        </div>
        <Link href="/recruteur/entretiens" className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 mb-1 group">
          <Calendar className="mr-3 text-indigo-300 group-hover:text-white" size={20} />
          <span className="group-hover:translate-x-1 transition-transform duration-200">Entretiens</span>
        </Link>
      </nav>
      
      <div className="absolute bottom-0 w-64 p-4">
        <div className="flex items-center">
          <div className="bg-blue-800 w-10 h-10 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold">JD</span>
          </div>
          <div>
            <p className="font-semibold">Jean Dupont</p>
            <p className="text-sm text-indigo-200">Responsable RH</p>
          </div>
        </div>
        <button className="mt-4 flex items-center text-indigo-200 hover:text-white">
          <LogOut size={18} className="mr-2" />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>LiggeyLink - Candidatures</title>
        <meta name="description" content="Gestion des candidatures" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Overlay pour fermer le sidebar sur mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex h-screen">
        {/* Sidebar - montré sur desktop ou quand ouvert sur mobile */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="px-4 md:px-6 py-4 flex justify-between items-center">
              {isMobile && (
                <button onClick={() => setSidebarOpen(true)} className="mr-2">
                  <Menu size={24} />
                </button>
              )}
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Candidatures</h2>
            </div>
          </header>

          <main className="p-4 md:p-6">
            {/* Recherche et filtres */}
            <div className="mb-6 flex flex-col space-y-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Rechercher un candidat, un poste, une compétence..."
                  className="pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                />
                <Search size={20} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => setShowFilters(!showFilters)} 
                  className="bg-white px-4 py-2.5 border border-gray-200 rounded-lg flex items-center hover:border-indigo-300 transition-all duration-200"
                >
                  <Filter size={16} className="mr-2 text-gray-600" />
                  <span>Filtres</span>
                  <ChevronDown size={16} className={`ml-2 text-gray-600 transition-transform duration-200 ${showFilters ? 'transform rotate-180' : ''}`} />
                </button>
                <button 
                  onClick={() => {
                    setFiltreStatut("tous");
                    setFiltrePoste("tous");
                    setRecherche("");
                  }} 
                  className="text-indigo-600 hover:text-indigo-800 flex items-center"
                >
                  <RefreshCw size={16} className="mr-1" />
                  Réinitialiser
                </button>
              </div>
            </div>

            {/* Filtre avancés avec animation */}
            <div className={`mb-6 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                    <select 
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={filtreStatut}
                      onChange={(e) => setFiltreStatut(e.target.value)}
                    >
                      <option value="tous">Tous les statuts</option>
                      <option value="Reçue">Reçue</option>
                      <option value="En attente">En attente</option>
                      <option value="En cours d'analyse">En cours d'analyse</option>
                      <option value="Entretien planifié">Entretien planifié</option>
                      <option value="Refusée">Refusée</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Poste</label>
                    <select 
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={filtrePoste}
                      onChange={(e) => setFiltrePoste(e.target.value)}
                    >
                      <option value="tous">Tous les postes</option>
                      {postes.map((poste, index) => (
                        <option key={index} value={poste}>{poste}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="tous">Toutes les sources</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Site web">Site web</option>
                      <option value="Indeed">Indeed</option>
                      <option value="Recommandation">Recommandation</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicateur de résultats */}
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                {candidaturesFiltrees.length} candidature{candidaturesFiltrees.length > 1 ? 's' : ''} trouvée{candidaturesFiltrees.length > 1 ? 's' : ''}
              </p>
            </div>

            {/* Liste des candidatures - Vue mobile en cards */}
            {isMobile && (
              <div className="space-y-4">
                {candidaturesFiltrees.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-lg shadow-sm">
                    <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                      <Users size={32} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500">Aucune candidature ne correspond aux critères de recherche.</p>
                    <button 
                      onClick={() => {
                        setFiltreStatut("tous");
                        setFiltrePoste("tous");
                        setRecherche("");
                      }}
                      className="mt-4 text-indigo-600 hover:text-indigo-800"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                ) : (
                  candidaturesFiltrees.map(candidature => (
                    <CandidatureCard key={candidature.id} candidature={candidature} />
                  ))
                )}
              </div>
            )}

            {/* Liste des candidatures - Vue desktop en tableau */}
            {!isMobile && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                {candidaturesFiltrees.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                      <Users size={40} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">Aucune candidature ne correspond aux critères de recherche.</p>
                    <button 
                      onClick={() => {
                        setFiltreStatut("tous");
                        setFiltrePoste("tous");
                        setRecherche("");
                      }}
                      className="mt-4 text-indigo-600 hover:text-indigo-800"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <button 
                              className="flex items-center cursor-pointer" 
                              onClick={() => handleSort('nom')}
                            >
                              Candidat
                              <ArrowUpDown size={14} className="ml-1" />
                            </button>
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <button 
                              className="flex items-center cursor-pointer" 
                              onClick={() => handleSort('poste')}
                            >
                              Poste
                              <ArrowUpDown size={14} className="ml-1" />
                            </button>
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Source
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <button 
                              className="flex items-center cursor-pointer" 
                              onClick={() => handleSort('dateReception')}
                            >
                              Date
                              <ArrowUpDown size={14} className="ml-1" />
                            </button>
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <button 
                              className="flex items-center cursor-pointer" 
                              onClick={() => handleSort('statut')}
                            >
                              Statut
                              <ArrowUpDown size={14} className="ml-1" />
                            </button>
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tags
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {candidaturesFiltrees.map((candidature) => (
                          <tr key={candidature.id} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-0">
                                  <div className="text-sm font-medium text-gray-900">{candidature.nom}</div>
                                  <div className="text-sm text-gray-500">{candidature.experience} d'expérience</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 font-medium">{candidature.poste}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600">{candidature.source}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600">{candidature.dateReception}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-full ${getStatusColor(candidature.statut)}`}>
                                {getStatusIcon(candidature.statut)}
                                {candidature.statut}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1.5">
                                {candidature.tags.map((tag, index) => (
                                  <span key={index} className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-full border border-indigo-100">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                              <div className="flex justify-end space-x-3">
                                <button className="text-gray-500 hover:text-indigo-600 transition-colors duration-150">
                                  <Mail size={18} />
                                </button>
                                <Link href={`/recruteur/candidatures/${candidature.id}`} className="text-gray-500 hover:text-indigo-600 transition-colors duration-150">
                                  <Eye size={18} />
                                </Link>
                                <button className="text-gray-500 hover:text-green-600 transition-colors duration-150">
                                  <ThumbsUp size={18} />
                                </button>
                                <button className="text-gray-500 hover:text-red-600 transition-colors duration-150">
                                  <ThumbsDown size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            
            {/* Pagination - Simplifiée pour mobile */}
            {candidaturesFiltrees.length > 0 && (
              <div className="mt-5 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow-sm">
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-sm text-gray-700">
                      {!isMobile ? (
                        <>Affichage de <span className="font-medium">1</span> à <span className="font-medium">{candidaturesFiltrees.length}</span> sur <span className="font-medium">{candidaturesFiltrees.length}</span> résultats</>
                      ) : (
                        <>Page 1 sur 1</>
                      )}
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <span className="sr-only">Précédent</span>
                        <ChevronDown className="h-5 w-5 rotate-90" aria-hidden="true" />
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
                      >
                        1
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <span className="sr-only">Suivant</span>
                        <ChevronDown className="h-5 w-5 -rotate-90" aria-hidden="true" />
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}