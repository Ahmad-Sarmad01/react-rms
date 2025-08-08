const Loadertwo = () => {
  return (
    <div className="flex flex-col justify-baseline mt-40 items-center h-screen">
      
      <div className="relative w-[100px] h-[100px] mb-6">
        <div className="loader" />

        <div className="absolute top-6/10 left-6/10 w-[45px] h-[45px] bg-white rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 z-10">
          <span className="text-blue-500 font-extrabold text-xl">{`< >`}</span>
        </div>
      </div>

      <style>{`
        .loader {
          width: 120px;
          height: 120px;
          display: grid;
          border: 6px solid transparent;
          border-radius: 50%;
          border-color: #357df2 transparent;
          animation: spin 1s linear infinite;
          position: relative;
          aspect-ratio: 1;
        }
        .loader::before {
          content: "";
          grid-area: 1/1;
          margin: 10px;
          border: inherit;
          border-radius: 50%;
          border-color: #619dff transparent;
          animation: spin 300s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(1turn); }
        }
      `}</style>
    </div>
  );
};

export default Loadertwo;
