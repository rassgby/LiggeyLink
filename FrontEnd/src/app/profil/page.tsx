// pages/profile.js
'use client';
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export const handleLogout = async () => {
  try {
    await signOut({ callbackUrl: "/connexion" });
    // La redirection est automatiquement gérée par next-auth
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
  }
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [user] = useState({
    name: 'Korka Diallo',
    email: 'korka.diallo@gmail.com',
    phone: '77 888 99 00',
    location: 'Dakar, Senegal',
    currentPosition: 'Développeur Frontend Senior',
    about: 'Développeur passionné avec plus de 5 ans d expérience en développement web, spécialisé en React et Next.js.',
    skills: ['JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Node.js', 'TypeScript', 'GraphQL'],
    experience: [
      {
        id: 1,
        title: 'Développeur Frontend Senior',
        company: 'WebTech Solutions',
        period: 'Jan 2023 - Présent',
        description: 'Développement d\'applications web avec React et Next.js. Chef d\'équipe technique pour les projets frontend.'
      },
      {
        id: 2,
        title: 'Développeur Frontend',
        company: 'Digital Agency',
        period: 'Juin 2020 - Déc 2022',
        description: 'Création d\'interfaces utilisateur réactives et développement de fonctionnalités frontend pour divers clients.'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Master en Informatique',
        institution: 'Université de Paris',
        year: '2020'
      },
      {
        id: 2,
        degree: 'Licence en Informatique',
        institution: 'Université de Marrakech',
        year: '2018'
      }
    ]
  });

  const [applications] = useState([
    {
      id: 1,
      jobTitle: 'Développeur Frontend',
      company: 'TechCorp',
      date: '2 avril 2025',
      status: 'En cours',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 2,
      jobTitle: 'Développeur Fullstack',
      company: 'InnoSoft',
      date: '28 mars 2025',
      status: 'Entretien',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 3,
      jobTitle: 'Ingénieur Frontend',
      company: 'DigiWorks',
      date: '15 mars 2025',
      status: 'Refusé',
      statusColor: 'bg-red-100 text-red-800'
    }
  ]);

  const [savedJobs] = useState([
    {
      id: 1,
      title: 'Développeur React Senior',
      company: 'FutureTech',
      location: 'Paris, France',
      type: 'CDI',
      salary: '60 000€ - 75 000€',
      date: '1 avril 2025'
    },
    {
      id: 2,
      title: 'Lead Developer Frontend',
      company: 'Creative Agency',
      location: 'Lyon, France',
      type: 'CDI',
      salary: '65 000€ - 80 000€',
      date: '30 mars 2025'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Mon Profil | LiggeyLink</title>
      </Head>

      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">LiggeyLink</h1>
            <nav>
              <ul className="flex space-x-6">
                {/* <li><Link href="/" className="hover:underline">Accueil</Link></li> */}
                
                <li><Link href="/jobs" className="inline-block bg-white text-blue-600 py-2 px-4 rounded hover:bg-blue-50 transition">Offres</Link></li>
                <button
                  
                  className="inline-block bg-white text-red-600 py-2 px-4 rounded hover:bg-blue-50 transition"
                >
                  Se déconnecter
                </button>
                {/* <li><Link href="/profile" className="inline-block bg-white text-blue-600 py-2 px-4 rounded hover:bg-blue-50 transition">Profil</Link></li> */}
                {/* <li><Link href="/login" className="inline-block bg-white text-red-600 py-2 px-4 rounded hover:bg-blue-50 transition">Deconnexion</Link></li> */}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-600 p-6">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold">
                    {user.name.split(' ').map(name => name[0]).join('')}
                  </div>
                </div>
                <div className="text-white">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-blue-100">{user.currentPosition}</p>
                  <p className="text-blue-100">{user.location}</p>
                </div>
                <div className="mt-4 md:mt-0 md:ml-auto">
                  <Link href="/profile/edit" className="inline-block bg-white text-blue-600 py-2 px-4 rounded hover:bg-blue-50 transition">
                    Modifier le profil
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-b">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-4 px-6 text-gray-700 hover:text-blue-600 font-medium ${activeTab === 'profile' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
                >
                  Mon profil
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`py-4 px-6 text-gray-700 hover:text-blue-600 font-medium ${activeTab === 'applications' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
                >
                  Mes candidatures
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`py-4 px-6 text-gray-700 hover:text-blue-600 font-medium ${activeTab === 'saved' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
                >
                  Offres sauvegardées
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'profile' && (
                <div>
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">À propos de moi</h3>
                    <p className="text-gray-700">{user.about}</p>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Coordonnées</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-500 block">Email:</span>
                        <span className="font-medium">{user.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Téléphone:</span>
                        <span className="font-medium">{user.phone}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Localisation:</span>
                        <span className="font-medium">{user.location}</span>
                      </div>
                    </div>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Compétences</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Expérience professionnelle</h3>
                    {user.experience.map(exp => (
                      <div key={exp.id} className="mb-4 pb-4 border-b last:border-b-0 last:pb-0">
                        <h4 className="text-lg font-medium text-gray-800">{exp.title}</h4>
                        <div className="text-gray-600">{exp.company}</div>
                        <div className="text-gray-500 text-sm mb-2">{exp.period}</div>
                        <p className="text-gray-700">{exp.description}</p>
                      </div>
                    ))}
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Formation</h3>
                    {user.education.map(edu => (
                      <div key={edu.id} className="mb-4 pb-4 border-b last:border-b-0 last:pb-0">
                        <h4 className="text-lg font-medium text-gray-800">{edu.degree}</h4>
                        <div className="text-gray-600">{edu.institution}</div>
                        <div className="text-gray-500 text-sm">{edu.year}</div>
                      </div>
                    ))}
                  </section>
                </div>
              )}

              {activeTab === 'applications' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Mes candidatures</h3>
                  {applications.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="py-3 px-4 text-left text-gray-600 font-medium">Poste</th>
                            <th className="py-3 px-4 text-left text-gray-600 font-medium">Entreprise</th>
                            <th className="py-3 px-4 text-left text-gray-600 font-medium">Date</th>
                            <th className="py-3 px-4 text-left text-gray-600 font-medium">Statut</th>
                            <th className="py-3 px-4 text-left text-gray-600 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applications.map(app => (
                            <tr key={app.id} className="border-t hover:bg-gray-50">
                              <td className="py-3 px-4 font-medium">{app.jobTitle}</td>
                              <td className="py-3 px-4">{app.company}</td>
                              <td className="py-3 px-4">{app.date}</td>
                              <td className="py-3 px-4">
                                <span className={`inline-block py-1 px-2 rounded-full text-xs font-medium ${app.statusColor}`}>
                                  {app.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <Link href={`/applications/${app.id}`} className="text-blue-600 hover:underline">
                                  Détails
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">Vous n'avez pas encore de candidatures.</p>
                      <Link href="/jobs" className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition">
                        Découvrir les offres
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'saved' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Offres sauvegardées</h3>
                  {savedJobs.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {savedJobs.map(job => (
                        <div key={job.id} className="border rounded-lg overflow-hidden hover:shadow-md transition">
                          <div className="p-4">
                            <h4 className="text-lg font-medium text-gray-800 mb-1">{job.title}</h4>
                            <div className="text-gray-600 mb-2">{job.company}</div>
                            <div className="flex flex-wrap text-sm text-gray-500 mb-3">
                              <span className="mr-3">{job.location}</span>
                              <span className="mr-3">{job.type}</span>
                              <span>{job.salary}</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-3">Ajouté le {job.date}</div>
                            <div className="flex justify-between items-center">
                              <Link href={`/jobs/${job.id}`} className="text-blue-600 hover:underline">
                                Voir l'offre
                              </Link>
                              <button className="text-gray-500 hover:text-red-600">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">Vous n'avez pas encore sauvegardé d'offres.</p>
                      <Link href="/jobs" className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition">
                        Découvrir les offres
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">LiggeyLink</h4>
              <p className="text-gray-400">Votre plateforme de recherche d'emploi.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">À propos</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Ressources</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link href="/guides" className="text-gray-400 hover:text-white">Guides</Link></li>
                <li><Link href="/tutorials" className="text-gray-400 hover:text-white">Tutoriels</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">Twitter</Link>
                <Link href="#" className="text-gray-400 hover:text-white">LinkedIn</Link>
                <Link href="#" className="text-gray-400 hover:text-white">Facebook</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} LiggeyLink. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


function signOut(arg0: { callbackUrl: string; }) {
  throw new Error('Function not implemented.');
}
// function signOut(arg0: { callbackUrl: string; }) {
//   throw new Error('Function not implemented.');
// }
