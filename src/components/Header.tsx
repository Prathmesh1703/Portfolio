
const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 p-6">
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
        <img
          src= "/images/Logo_Square.png"
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </div>
    </header>
  );
};

export default Header;
