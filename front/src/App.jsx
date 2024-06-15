import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/js/bootstrap.bundle.min';
import {EmployeeLogin} from "./components/employee/EmployeeLogin";
import {EmployeeHome} from "./components/employee/EmployeeHome";
import { EmployeeRegister } from './components/employee/EmployeeRegister';
import { AdminHome } from './components/admin/AdminHome';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminEmployee } from './components/admin/AdminEmployee';
import { EmployeeProfile } from './components/employee/EmployeeProfile';
import { EmployeeDetails } from './components/admin/EmployeeDetails';
import { AdminProjects } from './components/admin/AdminProjects';
import { NewProject } from './components/admin/NewProject';
import { EmployeeProjects } from './components/employee/EmployeeProjects';
import { SingleProject } from './components/employee/EmployeeSingleProject';
import { RaiseBug } from './components/employee/RaiseBug';
import { BugAction } from './components/employee/BugAction';
import { AdminSingleProject } from './components/admin/AdminSingleProject';
import { SingleBugDetails } from './components/admin/SingleBugDetails';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* Employee Routes */}
        <Route path='/login' element={<EmployeeLogin />}/>
        <Route path='/home' element={<EmployeeHome />} />
        <Route path='/profile' element={<EmployeeProfile />} />
        <Route path='/projects' element={<EmployeeProjects />} />
        <Route path='/projects/:projectId' element={<SingleProject />} />
        <Route path='/raiseBug/:projectId' element={<RaiseBug />} />
        <Route path='/bug/:bugId' element={<BugAction />} />
        {/* Admin Routes */}
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/home' element={<AdminHome />} />
        <Route path='/admin/employees' element={<AdminEmployee />} />
        <Route path='/register/:inviteData' element={<EmployeeRegister />} />
        <Route path='/admin/employee/:email' element={<EmployeeDetails />} />
        <Route path='/admin/projects' element={<AdminProjects />} />
        <Route path='/admin/newproject' element={<NewProject />} />
        <Route path='/admin/project/:projectId' element={<AdminSingleProject/>} />
        <Route path='/admin/bug/:bugId' element={<SingleBugDetails/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
