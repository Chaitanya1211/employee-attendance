import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/js/bootstrap.bundle.min';
import {EmployeeLogin} from "./components/employee/EmployeeLogin";
import {EmployeeHome} from "./components/employee/EmployeeHome";
import { EmployeeRegister } from './components/employee/EmployeeRegister';
import { AdminHome } from './components/admin/AdminHome';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { EmployeeProfile } from './components/employee/EmployeeProfile';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<EmployeeLogin />}/>
        <Route path='/home' element={<EmployeeHome />} />
        <Route path='/profile' element={<EmployeeProfile />} />
        <Route path='/register/:urlEmail' element={<EmployeeRegister />} />
        {/* Admin Routes */}
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/home' element={<AdminHome />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
         
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
