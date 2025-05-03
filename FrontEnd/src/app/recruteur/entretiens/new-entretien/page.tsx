'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Calendar, Users, FileText, Bell, LogOut, ArrowLeft, X, Menu } from 'lucide-react';

export default function NouvelEntretien() {
  const [selectedCandidature, setSelectedCandidature] = useState<{ id: number; nom: string; poste: string } | null>(null);
  const [selectedInterviewers, setSelectedInterviewers] = useState<Interviewer[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    heureDebut: '',
    heureFin: '',
    typeEntretien: 'présentiel',
    lieu: '',
    lienVisio: '',
    notes: '',
  });

  // Listes fictives pour le formulaire
  const candidatures = [
    { id: 1, nom: "Alexandre Petit", poste: "Chef de projet" },
    { id: 2, nom: "Emma Laurent", poste: "Data Scientist" },
    { id: 3, nom: "Lucas Moreau", poste: "Développeur Backend" },
    { id: 4, nom: "Clara Dubois", poste: "UI/UX Designer" }
  ];

  const interviewers = [
    { id: 1, nom: "Jean Dupont", poste: "Responsable RH" },
    { id: 2, nom: "Marie Bernard", poste: "Responsable technique" },
    { id: 3, nom: "Luc Martin", poste: "Directeur technique" },
    { id: 4, nom: "Sarah Morel", poste: "Product Manager" },
    { id: 5, nom: "Pierre Lemoine", poste: "Designer Lead" }
  ];

  interface FormData {
    date: string;
    heureDebut: string;
    heureFin: string;
    typeEntretien: string;
    lieu: string;
    lienVisio: string;
    notes: string;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  interface Interviewer {
    id: number;
    nom: string;
    poste: string;
  }

  const addInterviewer = (interviewer: Interviewer): void => {
    if (!selectedInterviewers.some((i: Interviewer) => i.id === interviewer.id)) {
      setSelectedInterviewers([...selectedInterviewers, interviewer]);
    }
  };

  const removeInterviewer = (interviewerId: number): void => {
    setSelectedInterviewers(selectedInterviewers.filter((i: Interviewer) => i.id !== interviewerId));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Logique pour enregistrer l'entretien
    console.log('Entretien soumis:', {
      candidature: selectedCandidature,
      interviewers: selectedInterviewers,
      ...formData
    });
    // Redirection vers la page des entretiens
    // router.push('/entretiens');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>LiggeyLink - Planifier un entretien</title>
        <meta name="description" content="Planifier un nouvel entretien" />
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
                <Link href="/recruteur/entretiens" className="mr-4 text-gray-500 hover:text-indigo-600">
                  <ArrowLeft size={20} />
                </Link>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Planifier un entretien</h2>
              </div>
              <div className="flex items-center">
                <button className="p-2 relative">
                  <Bell size={22} className="text-gray-500" />
                  <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span>
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 sm:p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">1. Sélectionner un candidat</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {candidatures.map((candidature) => (
                    <div 
                      key={candidature.id}
                      onClick={() => setSelectedCandidature(candidature)}
                      className={`p-4 border rounded-lg cursor-pointer ${
                        selectedCandidature && selectedCandidature.id === candidature.id 
                          ? 'border-indigo-500 bg-indigo-50' 
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                          <span className="font-medium text-gray-600">{candidature.nom.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{candidature.nom}</h4>
                          <p className="text-sm text-gray-500">{candidature.poste}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">2. Sélectionner des interviewers</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedInterviewers.map((interviewer) => (
                    <div key={interviewer.id} className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                      <span className="text-sm">{interviewer.nom}</span>
                      <button 
                        type="button" 
                        onClick={() => removeInterviewer(interviewer.id)}
                        className="ml-2 text-indigo-500 hover:text-indigo-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {interviewers.map((interviewer) => (
                    <div 
                      key={interviewer.id}
                      onClick={() => addInterviewer(interviewer)}
                      className={`p-4 border rounded-lg cursor-pointer ${
                        selectedInterviewers.some(i => i.id === interviewer.id)
                          ? 'border-indigo-500 bg-indigo-50' 
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                          <span className="font-medium text-gray-600">{interviewer.nom.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{interviewer.nom}</h4>
                          <p className="text-sm text-gray-500">{interviewer.poste}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">3. Détails de l'entretien</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                    <div className="flex-1">
                      <label htmlFor="heureDebut" className="block text-sm font-medium text-gray-700 mb-1">
                        Heure de début *
                      </label>
                      <input
                        type="time"
                        id="heureDebut"
                        name="heureDebut"
                        value={formData.heureDebut}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="heureFin" className="block text-sm font-medium text-gray-700 mb-1">
                        Heure de fin *
                      </label>
                      <input
                        type="time"
                        id="heureFin"
                        name="heureFin"
                        value={formData.heureFin}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="typeEntretien" className="block text-sm font-medium text-gray-700 mb-1">
                      Type d'entretien *
                    </label>
                    <select
                      id="typeEntretien"
                      name="typeEntretien"
                      value={formData.typeEntretien}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="présentiel">Présentiel</option>
                      <option value="visioconférence">Visioconférence</option>
                      <option value="téléphonique">Téléphonique</option>
                    </select>
                  </div>
                  {formData.typeEntretien === 'présentiel' && (
                    <div>
                      <label htmlFor="lieu" className="block text-sm font-medium text-gray-700 mb-1">
                        Lieu *
                      </label>
                      <input
                        type="text"
                        id="lieu"
                        name="lieu"
                        value={formData.lieu}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        required={formData.typeEntretien === 'présentiel'}
                      />
                    </div>
                  )}
                  {formData.typeEntretien === 'visioconférence' && (
                    <div>
                      <label htmlFor="lienVisio" className="block text-sm font-medium text-gray-700 mb-1">
                        Lien de visioconférence *
                      </label>
                      <input
                        type="url"
                        id="lienVisio"
                        name="lienVisio"
                        value={formData.lienVisio}
                        onChange={handleChange}
                        placeholder="https://..."
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        required={formData.typeEntretien === 'visioconférence'}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes pour l'entretien (optionnel)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Ajoutez des notes ou des instructions pour cet entretien..."
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                <Link href="/entretiens" className="px-4 py-2 bg-gray-100 text-center text-gray-800 rounded-md hover:bg-gray-200 w-full sm:w-auto">
                  Annuler
                </Link>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center w-full sm:w-auto"
                  disabled={!selectedCandidature || selectedInterviewers.length === 0}
                >
                  <Calendar size={18} className="mr-2" />
                  Planifier l'entretien
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}