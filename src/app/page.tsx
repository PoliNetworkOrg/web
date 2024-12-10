export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white">
        Welcome to PoliNetwork
      </h2>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        PoliNetwork is a student association dedicated to connecting and
        supporting students at Politecnico.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Add more content sections here */}
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
            Our Mission
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            To foster a collaborative and supportive community among Politecnico
            students.
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
            Upcoming Events
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Stay tuned for our exciting events and workshops!
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
            Get Involved
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Join our community and make a difference in student life at
            Politecnico.
          </p>
        </div>
      </div>
    </main>
  );
}
