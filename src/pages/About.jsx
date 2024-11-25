
function About() {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-12 px-6 md:px-12">
      <div className="max-w-screen-lg mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">
          About Us
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Welcome to <span className="font-semibold text-blue-500">AwesomeApp</span>, 
          where creativity meets functionality! We are dedicated to delivering 
          high-quality solutions that make your life easier and more exciting. 
          Our mission is to innovate, inspire, and improve the digital world 
          with cutting-edge technology and user-centered design.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Our Vision
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              To become a leading platform for delivering intuitive and innovative digital experiences.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Empower users through accessible, engaging, and efficient solutions.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Our Values
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Innovation, integrity, and a relentless focus on user satisfaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
