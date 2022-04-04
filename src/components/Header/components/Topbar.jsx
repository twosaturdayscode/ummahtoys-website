const Topbar = ({ children }) => (
  <div className="w-full h-9 bg-white text-xs grid place-content-center border-b-2 border-gray-100">
    <span>{children}</span>
  </div>
);

export default Topbar;
