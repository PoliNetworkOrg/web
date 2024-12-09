import Image from 'next/image'
import { MoonIcon, SunIcon, GlobeIcon } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image src="https://raw.githubusercontent.com/PoliNetworkOrg/Logo/refs/heads/master/Logo.svg" alt="PoliNetwork Logo" width={40} height={40} />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">PoliNetwork</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/admin" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
              Admin
            </Link>
            <button className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
              <MoonIcon className="h-6 w-6 hidden dark:block" />
              <SunIcon className="h-6 w-6 block dark:hidden" />
            </button>
            <button className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
              <GlobeIcon className="h-6 w-6" />
            </button>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Welcome to PoliNetwork</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          PoliNetwork is a student association dedicated to connecting and supporting students at Politecnico.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add more content sections here */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300">
              To foster a collaborative and supportive community among Politecnico students.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Upcoming Events</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Stay tuned for our exciting events and workshops!
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Get Involved</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join our community and make a difference in student life at Politecnico.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
