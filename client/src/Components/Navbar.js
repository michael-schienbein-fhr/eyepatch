import { NavLink } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="Navbar">
      <NavLink exact to="/">Home</NavLink>
      <NavLink exact to="/chat/hellochat">Test Room</NavLink>
    </nav>
  );
};

export default Navbar;