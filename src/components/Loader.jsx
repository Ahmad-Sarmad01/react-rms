const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-400 drop-shadow-md animate-pulse mb-10">
        InvexTech
      </h1>

      <div className="flex space-x-4 mb-6">
        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 animate-bounce shadow-md [animation-delay:-0.3s]" />
        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-sky-400 to-blue-500 animate-bounce shadow-md [animation-delay:-0.15s]" />
        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-white to-blue-400 animate-bounce shadow-md" />
      </div>

      <p className="text-gray-600 text-base sm:text-lg font-medium animate-pulse tracking-wide">
        Loading your convenience...
      </p>
    </div>
  );
};

export default Loader;