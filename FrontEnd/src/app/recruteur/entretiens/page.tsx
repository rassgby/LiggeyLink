'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Calendar, Users, FileText, MessageSquare, Bell, Settings, LogOut, Search, Plus, Filter, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

export default function Entretiens() {
  const [entretiens, setEntretiens] = useState([
    { 
      id: 1, 
      candidat: "Amadou Korka DIALLO", 
      poste: "Ingénieur DevOps", 
      date: "18 avril 2025", 
      heure: "14:00", 
      duree: "1h",
      interviewers: ["Diomaye FAYE", "Aïssatou SOW"],
      statut: "à venir" 
    },
    { 
      id: 2, 
      candidat: "Mame Diarra AÏDARA", 
      poste: "Développeur Frontend", 
      date: "19 avril 2025", 
      heure: "10:30", 
      duree: "45min",
      interviewers: ["Ibrahima FALL", "Diomaye FAYE"],
      statut: "à venir" 
    },
    { 
      id: 3, 
      candidat: "Ndeye Astou DIENG", 
      poste: "UI/UX Designer", 
      date: "20 avril 2025", 
      heure: "15:45", 
      duree: "1h",
      interviewers: ["Mamadou Lamine BA"],
      statut: "à venir" 
    },
    { 
      id: 4, 
      candidat: "Fatou NGOM", 
      poste: "Chef de Projet", 
      date: "16 avril 2025", 
      heure: "11:00", 
      duree: "1h30",
      interviewers: ["Oumar FALL", "Fallou DIOP"],
      statut: "terminé" 
    },
    { 
      id: 5, 
      candidat: "Mandicou BA", 
      poste: "Responsable Marketing", 
      date: "15 avril 2025", 
      heure: "14:30", 
      duree: "1h",
      interviewers: ["Ibrahima FALL"],
      statut: "terminé" 
    }
  ]);

  const [vue, setVue] = useState("liste");
  const [semaine, setSemaine] = useState("17-23 avril 2025");
  const [filtreStatut, setFiltreStatut] = useState("tous");
  const [recherche, setRecherche] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const entretiensFiltres = entretiens.filter(entretien => {
    const matchStatut = filtreStatut === "tous" || entretien.statut === filtreStatut;
    const matchRecherche = entretien.candidat.toLowerCase().includes(recherche.toLowerCase()) || 
                          entretien.poste.toLowerCase().includes(recherche.toLowerCase());
    return matchStatut && matchRecherche;
  });
  
  // Jours de la semaine pour la vue calendrier
  const jours = ["Lun", "Mar", "Mer", "Jeu", "Ven"];
  const joursLongs = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
  const heures = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>LiggeyLink - Entretiens</title>
        <meta name="description" content="Gestion des entretiens" />
      </Head>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - responsive */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 transform md:relative md:translate-x-0 z-30 transition duration-200 ease-in-out w-64 bg-gradient-to-b from-blue-700 to-indigo-800 text-white md:flex flex-col`}>
          <div className="p-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center">
              <span className="bg-white text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center mr-2">L</span>
              LiggeyLink
            </h1>
            <button className="md:hidden" onClick={toggleSidebar}>
              <X size={24} className="text-white" />
            </button>
          </div>
          <nav className="mt-8 px-2 flex-grow">
            <Link href="/recruteur" className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 mb-1 group">
              <FileText className="mr-3 text-indigo-300 group-hover:text-white" size={20} />
              <span className="group-hover:translate-x-1 transition-transform duration-200">Tableau de bord</span>
            </Link>
            <Link href="/recruteur/offres" className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 mb-1 group">
              <FileText className="mr-3 text-indigo-300 group-hover:text-white" size={20} />
              <span className="group-hover:translate-x-1 transition-transform duration-200">Offres d'emploi</span>
            </Link>
            <Link href="/recruteur/candidatures" className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 mb-1 group">
              <FileText className="mr-3 text-indigo-300 group-hover:text-white" size={20} />
              <span className="group-hover:translate-x-1 transition-transform duration-200">Candidatures</span>
            </Link>
            <div className="px-4 py-3 bg-indigo-900 rounded-lg mb-1">
              <Link href="/recruteur/entretiens" className="flex items-center">
                <Users className="mr-3 text-white" size={20} />
                <span>Entretien</span>
              </Link>
            </div>
          </nav>
          
          <div className="p-4 border-t border-indigo-700">
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

        {/* Overlay pour mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow">
            <div className="px-4 sm:px-6 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <button 
                  className="mr-2 md:hidden" 
                  onClick={toggleSidebar}
                >
                  <Menu size={24} className="text-gray-700" />
                </button>
                <h2 className="text-xl font-semibold text-gray-800">Entretiens</h2>
              </div>
              <div className="flex items-center">
                <button className="p-2 mr-2 sm:mr-4 relative">
                  <Bell size={22} className="text-gray-500" />
                  <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span>
                </button>
                <Link href="/recruteur/entretiens/new-entretien" className="bg-blue-600 hover:bg-indigo-700 text-white px-2 sm:px-4 py-2 rounded-md flex items-center">
                  <Plus size={20} className="sm:mr-1" />
                  <span className="hidden sm:inline">Planifier un entretien</span>
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4 sm:p-6">
            {/* Options de vue et filtres - Responsive */}
            <div className="mb-6 flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setVue("liste")} 
                    className={`px-4 py-2 rounded-md ${vue === "liste" ? "bg-indigo-600 text-white" : "bg-white text-gray-700"}`}
                  >
                    Liste
                  </button>
                  <button 
                    onClick={() => setVue("calendrier")} 
                    className={`px-4 py-2 rounded-md ${vue === "calendrier" ? "bg-indigo-600 text-white" : "bg-white text-gray-700"}`}
                  >
                    Calendrier
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setFiltreStatut("tous")} 
                    className={`px-4 py-2 rounded-md ${filtreStatut === "tous" ? "bg-indigo-600 text-white" : "bg-white text-gray-700"}`}
                  >
                    Tous
                  </button>
                  <button 
                    onClick={() => setFiltreStatut("à venir")} 
                    className={`px-4 py-2 rounded-md ${filtreStatut === "à venir" ? "bg-indigo-600 text-white" : "bg-white text-gray-700"}`}
                  >
                    À venir
                  </button>
                  <button 
                    onClick={() => setFiltreStatut("terminé")} 
                    className={`px-4 py-2 rounded-md ${filtreStatut === "terminé" ? "bg-indigo-600 text-white" : "bg-white text-gray-700"}`}
                  >
                    Terminés
                  </button>
                </div>
              </div>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Rechercher un entretien..."
                  className="pl-10 pr-4 py-2 bg-white border rounded-md w-full"
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                />
                <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>

            {/* Vue Liste - Responsive */}
            {vue === "liste" && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Candidat
                        </th>
                        <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                          Poste
                        </th>
                        <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Heure
                        </th>
                        <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                          Durée
                        </th>
                        <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                          Interviewers
                        </th>
                        <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th scope="col" className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {entretiensFiltres.map((entretien) => (
                        <tr key={entretien.id}>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">{entretien.candidat}</div>
                            </div>
                            <div className="text-sm text-gray-500 sm:hidden">{entretien.poste}</div>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                            <div className="text-sm text-gray-900">{entretien.poste}</div>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{entretien.date}</div>
                            <div className="text-sm text-gray-500">{entretien.heure}</div>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                            <div className="text-sm text-gray-900">{entretien.duree}</div>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                            <div className="text-sm text-gray-900">
                              {entretien.interviewers.join(", ")}
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              entretien.statut === 'à venir' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {entretien.statut === 'à venir' ? 'À venir' : 'Terminé'}
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Link href={`/entretiens/${entretien.id}`} className="text-indigo-600 hover:text-indigo-900">
                                Voir
                              </Link>
                              {entretien.statut === 'à venir' && (
                                <Link href={`/entretiens/${entretien.id}/edit`} className="text-blue-600 hover:text-blue-900">
                                  Modifier
                                </Link>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Vue Calendrier - Responsive */}
            {vue === "calendrier" && (
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <ChevronLeft size={20} className="text-gray-700" />
                    </button>
                    <h3 className="text-base sm:text-lg font-semibold mx-2 sm:mx-4">{semaine}</h3>
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <ChevronRight size={20} className="text-gray-700" />
                    </button>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm sm:text-base">
                    Aujourd'hui
                  </button>
                </div>
                
                {/* Calendrier pour mobile */}
                <div className="md:hidden">
                  <div className="grid grid-cols-1 gap-4">
                    {jours.map((jour, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="font-semibold flex justify-between items-center border-b pb-2 mb-2">
                          <span>{joursLongs[index]}</span>
                          <span>{17 + index} avril</span>
                        </div>
                        
                        {/* Événements du jour */}
                        {index === 0 && (
                          <div className="mt-2 bg-blue-100 text-blue-800 border-l-4 border-blue-600 p-2 rounded">
                            <div className="font-semibold">Marion Dubois</div>
                            <div className="text-sm">14:00 - 15:00</div>
                            <div className="text-sm">Ingénieur DevOps</div>
                          </div>
                        )}
                        
                        {index === 1 && (
                          <div className="mt-2 bg-indigo-100 text-indigo-800 border-l-4 border-indigo-600 p-2 rounded">
                            <div className="font-semibold">Thomas Martin</div>
                            <div className="text-sm">10:30 - 11:15</div>
                            <div className="text-sm">Développeur Frontend</div>
                          </div>
                        )}
                        
                        {index !== 0 && index !== 1 && (
                          <div className="text-gray-500 text-center py-4">
                            Aucun entretien prévu
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Calendrier pour tablette et desktop */}
                <div className="hidden md:block overflow-x-auto">
                  <div className="min-w-max grid grid-cols-6 gap-2">
                    {/* En-têtes de colonnes */}
                    <div className="p-2 font-semibold text-gray-500"></div>
                    {joursLongs.map((jour, index) => (
                      <div key={index} className="p-2 font-semibold text-center border-b">
                        {jour}
                        <div className="text-lg font-bold">{17 + index}</div>
                      </div>
                    ))}
                    
                    {/* Lignes d'heures */}
                    {heures.map((heure, indexHeure) => (
                      <React.Fragment key={heure}>
                        <div className="p-2 border-t text-right text-sm text-gray-500">
                          {heure}
                        </div>
                        {jours.map((jour, indexJour) => (
                          <div 
                            key={`${indexHeure}-${indexJour}`} 
                            className="p-2 border-t border-l min-h-16 relative"
                          >
                            {/* Exemple d'entretien programmé */}
                            {indexHeure === 3 && indexJour === 1 && (
                              <div className="absolute top-0 left-0 right-0 bg-indigo-100 text-indigo-800 border-l-4 border-indigo-600 p-2 rounded-r m-1 h-16 overflow-hidden">
                                <div className="text-xs font-semibold">Thomas Martin</div>
                                <div className="text-xs">10:30 - 11:15</div>
                                <div className="text-xs truncate">Développeur Frontend</div>
                              </div>
                            )}
                            {indexHeure === 5 && indexJour === 0 && (
                              <div className="absolute top-0 left-0 right-0 bg-blue-100 text-blue-800 border-l-4 border-blue-600 p-2 rounded-r m-1 h-16 overflow-hidden">
                                <div className="text-xs font-semibold">Marion Dubois</div>
                                <div className="text-xs">14:00 - 15:00</div>
                                <div className="text-xs truncate">Ingénieur DevOps</div>
                              </div>
                            )}
                          </div>
                        ))}
                      </React.Fragment>
                    ))}
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