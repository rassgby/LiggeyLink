'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Calendar, Users, FileText, MessageSquare, Bell, Settings, LogOut, Search, Plus, Eye, Edit, Trash2, Briefcase, MapPin, Clock, Calendar as CalendarIcon, Menu, X } from 'lucide-react';

export default function Offres() {
  const [offres, setOffres] = useState([
    { 
      id: 1, 
      titre: "Développeur Full Stack", 
      departement: "Développement", 
      lieu: "Paris",
      type: "CDI",
      datePublication: "01/04/2025",
      candidatures: 18,
      statut: "active"
    },
    { 
      id: 2, 
      titre: "UI/UX Designer", 
      departement: "Design", 
      lieu: "Lyon",
      type: "CDI",
      datePublication: "05/04/2025",
      candidatures: 12,
      statut: "active"
    },
    { 
      id: 3, 
      titre: "Product Manager", 
      departement: "Produit", 
      lieu: "Télétravail",
      type: "CDI",
      datePublication: "10/04/2025",
      candidatures: 8,
      statut: "active"
    },
    { 
      id: 4, 
      titre: "Data Scientist", 
      departement: "Data", 
      lieu: "Paris",
      type: "CDI",
      datePublication: "12/04/2025",
      candidatures: 6,
      statut: "active"
    },
    { 
      id: 5, 
      titre: "DevOps Engineer", 
      departement: "Infrastructure", 
      lieu: "Bordeaux",
      type: "CDD",
      datePublication: "15/04/2025",
      candidatures: 4,
      statut: "active"
    }
  ]);

  const [filtreStatut, setFiltreStatut] = useState("tous");
  const [recherche, setRecherche] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const offresFiltrees = offres.filter(offre => {
    const matchStatut = filtreStatut === "tous" || offre.statut === filtreStatut;
    const matchRecherche = offre.titre.toLowerCase().includes(recherche.toLowerCase()) || 
                          offre.departement.toLowerCase().includes(recherche.toLowerCase()) ||
                          offre.lieu.toLowerCase().includes(recherche.toLowerCase());
    return matchStatut && matchRecherche;
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>LiggeyLink - Offres d'emploi</title>
        <meta name="description" content="Gestion des offres d'emploi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex h-screen relative">
        {/* Mobile menu button */}
        <button 
          onClick={toggleSidebar} 
          className="lg:hidden fixed top-4 left-4 z-30 bg-indigo-700 text-white p-2 rounded-md shadow-md"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar - with responsive behavior */}
        <div className={`fixed lg:relative lg:block z-20 w-64 bg-gradient-to-b from-blue-700 to-indigo-800 text-white h-full transition-all duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
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
            <div className="px-4 py-3 bg-indigo-900 rounded-lg mb-1">
              <Link href="/recruteur/entretiens" className="flex items-center">
                <Users className="mr-3 text-white" size={20} />
                <span>Offres d'emploi</span>
              </Link>
            </div>
            <Link href="/recruteur/candidatures" className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 mb-1 group">
              <FileText className="mr-3 text-indigo-300 group-hover:text-white" size={20} />
              <span className="group-hover:translate-x-1 transition-transform duration-200">Candidatures</span>
            </Link>
            <Link href="/recruteur/candidatures" className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 mb-1 group">
              <FileText className="mr-3 text-indigo-300 group-hover:text-white" size={20} />
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

        {/* Main Content */}
        <div className="flex-1 overflow-auto w-full">
          <header className="bg-white shadow-md">
            <div className="px-4 lg:px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-800 flex items-center ml-10 lg:ml-0">
                <Briefcase className="mr-2 text-blue-600 hidden sm:inline" />
                Offres d'emploi
                <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{offresFiltrees.length}</span>
              </h2>
              <div className="flex items-center">
                <button className="p-2 mr-2 lg:mr-4 relative">
                  <Bell size={22} className="text-gray-500" />
                  <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span>
                </button>
                <Link href="/recruteur/offres/new-offre" className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 py-2 rounded-md flex items-center shadow-md transition-all">
                  <Plus size={20} className="sm:mr-1" />
                  <span className="hidden sm:inline">Créer une offre</span>
                </Link>
              </div>
            </div>
          </header>

          <main className="p-4 lg:p-6">
            {/* Filtres et recherche - responsive */}
            <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 bg-white p-3 lg:p-4 rounded-lg shadow-md">
              <div className="flex w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <button 
                  onClick={() => setFiltreStatut("tous")} 
                  className={`px-3 lg:px-4 py-2 rounded-l-md font-medium transition-colors whitespace-nowrap flex-shrink-0 ${filtreStatut === "tous" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-300"}`}
                >
                  Toutes
                </button>
                <button 
                  onClick={() => setFiltreStatut("active")} 
                  className={`px-3 lg:px-4 py-2 font-medium transition-colors whitespace-nowrap flex-shrink-0 ${filtreStatut === "active" ? "bg-green-600 text-white" : "bg-white text-gray-700 border-t border-b border-gray-300"}`}
                >
                  Actives
                </button>
                <button 
                  onClick={() => setFiltreStatut("fermee")} 
                  className={`px-3 lg:px-4 py-2 rounded-r-md font-medium transition-colors whitespace-nowrap flex-shrink-0 ${filtreStatut === "fermee" ? "bg-gray-600 text-white" : "bg-white text-gray-700 border border-gray-300"}`}
                >
                  Fermées
                </button>
              </div>
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Rechercher une offre..."
                  className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                />
                <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>

            {/* Tableau des offres - avec scroll horizontal sur mobile */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Titre
                      </th>
                      <th scope="col" className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                        Département
                      </th>
                      <th scope="col" className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider hidden md:table-cell">
                        Lieu
                      </th>
                      <th scope="col" className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                        Type
                      </th>
                      <th scope="col" className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                        Publiée le
                      </th>
                      <th scope="col" className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Candidatures
                      </th>
                      <th scope="col" className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Statut
                      </th>
                      <th scope="col" className="px-3 lg:px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {offresFiltrees.map((offre) => (
                      <tr key={offre.id} className="hover:bg-blue-50 transition-colors">
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-blue-600">{offre.titre}</div>
                          <div className="text-xs text-gray-500 md:hidden mt-1 flex items-center">
                            <MapPin size={12} className="mr-1" />
                            {offre.lieu}
                          </div>
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Briefcase size={16} className="mr-2 text-gray-500 hidden lg:inline" />
                            {offre.departement}
                          </div>
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="text-sm text-gray-900 flex items-center">
                            <MapPin size={16} className="mr-2 text-gray-500 hidden lg:inline" />
                            {offre.lieu}
                          </div>
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            offre.type === 'CDI' ? 'bg-purple-100 text-purple-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {offre.type}
                          </span>
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                          <div className="text-sm text-gray-900 flex items-center">
                            <CalendarIcon size={16} className="mr-2 text-gray-500" />
                            {offre.datePublication}
                          </div>
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                              <Users size={14} className="mr-1" />
                              {offre.candidatures}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 lg:px-3 py-1 lg:py-1.5 text-xs font-medium rounded-full flex items-center w-fit ${
                            offre.statut === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            <span className={`w-2 h-2 rounded-full mr-1 lg:mr-1.5 ${
                              offre.statut === 'active' ? 'bg-green-500' : 'bg-gray-500'
                            }`}></span>
                            {offre.statut === 'active' ? 'Active' : 'Fermée'}
                          </span>
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-1 lg:space-x-2">
                            <Link href={`/offres/${offre.id}`} className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-1.5 rounded-full transition-colors">
                              <Eye size={18} />
                            </Link>
                            <Link href={`/offres/${offre.id}/edit`} className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 p-1.5 rounded-full transition-colors hidden sm:flex">
                              <Edit size={18} />
                            </Link>
                            <button className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-1.5 rounded-full transition-colors hidden sm:flex">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination pour mobile */}
            <div className="mt-4 flex justify-center md:justify-end">
              <div className="inline-flex items-center">
                <button className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Précédent
                </button>
                <button className="px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium text-blue-600">
                  1
                </button>
                <button className="px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Suivant
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}