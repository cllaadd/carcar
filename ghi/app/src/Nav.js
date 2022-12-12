import { Link, NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success"
          style={{ marginBottom: '1rem' }}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <div className="dropdown mx-1">
              <button
                className="btn btn-success dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >Inventory</button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <Link className="dropdown-item" to="manufacturers">Manufacturers</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="models">Models</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="automobiles">Cars</Link>
                </li>
              </ul>
            </div>
            <div className="dropdown mx-1">
              <button
                className="btn btn-success dropdown-toggle"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >Sales</button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                <li>
                    <Link className="dropdown-item" to="sales">All Sales</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="sales/history">Sales History</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="sales/new">Record Sale</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="salespeople/new">New Salesperson</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="customers/new">New Customer</Link>
                  </li>
                </ul>
              </div>
            <div className="dropdown mx-1">
              <button
                className="btn btn-success dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >Service</button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <Link className="dropdown-item" to="appointments">Current Appointments</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="appointments/all">All Appointments</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="technicians/new">New Technician</Link>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
