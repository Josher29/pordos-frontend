function Logo({ width, height }) {
    return (
      <a href="/">
      <img
        className={`${width || "w-20"} ${height || "h-20"}`}
        alt="Logo"
        src="https://i.postimg.cc/dtWksR5V/Logo-Pordos.png"
      />
      </a>
    );
  }
  
  export default Logo;
  