import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import ModelsList from './ModelsList';
import ModelForm from './ModelForm';
import AutomobilesList from './AutomobilesList';
import AutomobileForm from './AutomobileForm';
import SalespersonForm from './SalespersonForm';
import CustomerForm from './CustomerForm';
import TechnicianForm from './TechnicianForm';
import SaleForm from './SaleForm';
import AppointmentForm from './AppointmentForm';
import TestAppointmentsList from './TestAppointmentsList';
import SaleHistory from './SaleHistory';
import SaleList from './SaleList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route path="" element={<ManufacturersList />} />
            <Route path="new-manufacturer" element={<ManufacturerForm />} />
          </Route>
          <Route path="models">
            <Route path="" element={<ModelsList />} />
            <Route path="new-model" element={<ModelForm />} />
          </Route>
          <Route path="automobiles">
            <Route path="" element={<AutomobilesList />} />
            <Route path="new-automobile" element={<AutomobileForm />} />
          </Route>
          <Route path="customers">
            <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="salespeople">
            <Route path="new" element={<SalespersonForm />} />
          </Route>
          <Route path="sales">
            <Route path="" element={<SaleList />} />
            <Route path="new" element={<SaleForm />} />
            <Route path="history" element={<SaleHistory />} />
          </Route>
          <Route path="technicians">
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route path="" element={<TestAppointmentsList />} />
          </Route>
          <Route path="appointments">
            <Route path="new" element={<AppointmentForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
