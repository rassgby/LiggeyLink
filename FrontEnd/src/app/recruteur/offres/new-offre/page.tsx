'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Calendar, Users, FileText, MessageSquare, Bell, Settings, LogOut, ArrowLeft, Save, Briefcase, MapPin, Clock, DollarSign, Calendar as CalendarIcon, Hash, Menu, X } from 'lucide-react';

export default function NouvelleOffre() {
  const [formData, setFormData] = useState({
    titre: '',
    departement: '',
    lieu: '',
    type: 'CDI',
    description: '',
    salaire: '',
    competences: '',
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

interface FormData {
    titre: string;
    departement: string;
    lieu: string;
    type: string;
    description: string;
    salaire: string;
    competences: string;
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Logique pour enregistrer l'offre
    console.log('Offre soumise:', formData);
    // Redirection vers la page des offres
    // router.push('/offres');
};

const toggleSidebar = () => {
  setSidebarOpen(!sidebarOpen);
};

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>LiggeyLink - Nouvelle offre d'emploi</title>
        <meta name="description" content="Créer une nouvelle offre d'emploi" />
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

        {/* Sidebar - avec responsive */}
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

        {/* Main Content - responsif */}
        <div className="flex-1 overflow-auto w-full">
          <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="px-4 md:px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-2 md:space-x-4 ml-10 lg:ml-0">
                <Link href="/recruteur/offres" className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all">
                  <ArrowLeft size={20} />
                </Link>
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">Créer une offre</h2>
              </div>
              <div className="flex items-center">
                <button className="p-2 mr-2 relative hover:bg-gray-100 rounded-full transition-all">
                  <Bell size={22} className="text-gray-500" />
                  <span className="absolute top-1 right-1 bg-indigo-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span>
                </button>
                <div className="ml-2 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
                  JD
                </div>
              </div>
            </div>
          </header>

          <main className="p-4 md:p-6 max-w-6xl mx-auto">
            <div className="mb-4 md:mb-6 bg-gradient-to-r from-indigo-600 to-blue-500 p-4 md:p-6 rounded-lg text-white shadow-lg">
              <h1 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Création d'une nouvelle offre</h1>
              <p className="text-sm md:text-base text-indigo-100">Complétez le formulaire ci-dessous pour publier votre offre</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-4 md:px-6 py-3 md:py-4">
                <h3 className="text-base md:text-lg font-medium text-gray-800">Informations générales</h3>
                <p className="text-xs md:text-sm text-gray-500">Les champs marqués d'un astérisque (*) sont obligatoires</p>
              </div>
              
              <div className="p-4 md:p-6">
                <div className="mb-6 md:mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-1 md:space-y-2">
                    <label htmlFor="titre" className="flex items-center text-sm font-medium text-gray-700">
                      <Briefcase size={16} className="mr-2 text-indigo-500" />
                      Titre du poste *
                    </label>
                    <input
                      type="text"
                      id="titre"
                      name="titre"
                      value={formData.titre}
                      onChange={handleChange}
                      placeholder="Ex: Développeur React Senior"
                      className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1 md:space-y-2">
                    <label htmlFor="departement" className="flex items-center text-sm font-medium text-gray-700">
                      <Hash size={16} className="mr-2 text-indigo-500" />
                      Département *
                    </label>
                    <input
                      type="text"
                      id="departement"
                      name="departement"
                      value={formData.departement}
                      onChange={handleChange}
                      placeholder="Ex: Informatique"
                      className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1 md:space-y-2">
                    <label htmlFor="lieu" className="flex items-center text-sm font-medium text-gray-700">
                      <MapPin size={16} className="mr-2 text-indigo-500" />
                      Lieu *
                    </label>
                    <input
                      type="text"
                      id="lieu"
                      name="lieu"
                      value={formData.lieu}
                      onChange={handleChange}
                      placeholder="Ex: Dakar, Sénégal"
                      className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1 md:space-y-2">
                    <label htmlFor="type" className="flex items-center text-sm font-medium text-gray-700">
                      <Clock size={16} className="mr-2 text-indigo-500" />
                      Type de contrat *
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                      required
                    >
                      <option value="CDI">CDI</option>
                      <option value="CDD">CDD</option>
                      <option value="Stage">Stage</option>
                      <option value="Alternance">Alternance</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1 md:space-y-2">
                    <label htmlFor="salaire" className="flex items-center text-sm font-medium text-gray-700">
                      <DollarSign size={16} className="mr-2 text-indigo-500" />
                      Fourchette salariale
                    </label>
                    <input
                      type="text"
                      id="salaire"
                      name="salaire"
                      value={formData.salaire}
                      onChange={handleChange}
                      placeholder="Ex: 45 000€ - 55 000€ brut annuel"
                      className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>
                  
                  <div className="space-y-1 md:space-y-2">
                    <label htmlFor="datePubli" className="flex items-center text-sm font-medium text-gray-700">
                      <CalendarIcon size={16} className="mr-2 text-indigo-500" />
                      Date de publication
                    </label>
                    <input
                      type="date"
                      id="datePubli"
                      name="datePubli"
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 md:pt-6">
                  <div className="mb-4 md:mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Description du poste *
                    </label>
                    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                      <div className="bg-gray-50 border-b border-gray-200 px-3 md:px-4 py-2 flex items-center">
                        <span className="text-xs md:text-sm text-gray-500">Soyez précis et concis pour attirer les meilleurs candidats</span>
                      </div>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={6}
                        className="w-full p-3 md:p-4 border-0 focus:ring-0"
                        required
                        placeholder="Décrivez les responsabilités, missions et objectifs du poste..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <label htmlFor="competences" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Compétences requises *
                    </label>
                    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                      <div className="bg-gray-50 border-b border-gray-200 px-3 md:px-4 py-2 flex items-center">
                        <span className="text-xs md:text-sm text-gray-500">Saisissez les compétences séparées par des virgules</span>
                      </div>
                      <textarea
                        id="competences"
                        name="competences"
                        value={formData.competences}
                        onChange={handleChange}
                        rows={3}
                        className="w-full p-3 md:p-4 border-0 focus:ring-0"
                        required
                        placeholder="Ex: React, TypeScript, Node.js, Gestion de projet..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4 border-t border-gray-100 pt-4 md:pt-6">
                  <Link href="/offres" className="px-4 md:px-6 py-2 md:py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium flex items-center justify-center">
                    Annuler
                  </Link>
                  <button
                    type="submit"
                    className="px-4 md:px-6 py-2 md:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg font-medium flex items-center justify-center"
                  >
                    <Save size={18} className="mr-2" />
                    Enregistrer l'offre
                  </button>
                </div>
              </div>
            </form>
            
            <div className="mt-4 md:mt-6 bg-white p-3 md:p-4 rounded-lg shadow-md border-l-4 border-indigo-500">
              <div className="flex items-start">
                <div className="bg-indigo-100 rounded-full p-2 mr-3 md:mr-4 flex-shrink-0">
                  <Bell size={16} className="text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">Conseil pour votre offre</h4>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">Une offre d'emploi précise et attrayante a 80% plus de chances d'attirer les candidats qualifiés. N'hésitez pas à fournir suffisamment de détails.</p>
                </div>
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