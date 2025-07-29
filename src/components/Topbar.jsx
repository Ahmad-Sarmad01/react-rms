const Topbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow px-4 py-3 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
      <h1 className="text-xl font-semibold">InvexTech Portal</h1>
      <button
        className="text-2xl hover:transform hover:scale-120 transition-transform hover:cursor-pointer"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>
    </header>
  );
};

export default Topbar;
