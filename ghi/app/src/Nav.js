import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " id="manufacturers" aria-current="page" to="manufacturers">Manufacturers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " id="models" aria-current="page" to="models">Models</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " id="automobiles" aria-current="page" to="automobiles">Automobiles</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " id="salespeople/new" aria-current="page" to="salespeople/new">Add a salesperson</NavLink>
            </li>
<<<<<<< HEAD
=======
            <li className="nav-item">
              <NavLink className="nav-link " id="technicians/new" aria-current="page" to="technicians/new">Add a technician</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " id="customers/new" aria-current="page" to="customers/new">Add a potential customer</NavLink>
            </li>
>>>>>>> main
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
