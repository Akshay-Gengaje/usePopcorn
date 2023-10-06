import SearchBar from "../SearchBar/SearchBar";
import Logo from "./Logo";

function NavBar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <SearchBar />
      <p className="num-results">
        Found <strong>X</strong> results
      </p>
    </nav>
  );
}

export default NavBar;
