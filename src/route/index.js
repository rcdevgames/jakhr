import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminDashboardLayout from "../layouts/AdminDashboardLayout/AdminDashboardLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
// master data
import { Company, CompanyForm } from "../pages/MasterData/Company";
import { Branch, CreateBranch } from "../pages/MasterData/Branch";
import { Employee, CreateEmployee, EmployeeMultipleForm } from "../pages/MasterData/Employee";
import { SalaryComponent, SalaryComponentForm } from "../pages/MasterData/SalaryComponent";
import { Organization, OrganizationForm } from "../pages/MasterData/Organisasi";
import { LeaveMass,LeaveMassForm } from "../pages/MasterData/LeaveMass";
import { JobLevel,JobLevelForm } from "../pages/MasterData/JobLevel";
import { JobPosition, JobPositionForm } from "../pages/MasterData/JobPosition";
import {
  Announcement,
  CreateAnnouncement,
} from "../pages/MasterData/Announcement";
import {
  Applicant,
  CreateApplicant,
  MultipleApplicant,
} from "../pages/MasterData/Applicant";
import LeaveBalance from "../pages/MasterData/LeaveBalance";
// PAYROLL
import { Salary } from "../pages/Payroll/Salary";

// Transaction
import { Attendance } from "../pages/Transaction/Attendance";
import { Leave, CreateLeave } from "../pages/Transaction/Leave";
import { Additional, CreateAdditional } from "../pages/Transaction/Additional";
import { Reduction, CreateReduction } from "../pages/Transaction/Reduction";
import { Cash, CreateCash } from "../pages/Transaction/Cash";
import {
  Imbursement,
  CreateImbursement,
} from "../pages/Transaction/Imbursement";
import {
  TransactionKpi,
  TransactionCreateKpi,
} from "../pages/Transaction/TransactionKpi";
// Report
import { ReportEmployee } from "../pages/Report/Employee";
import { ReportApplicant } from "../pages/Report/Applicant";
import { ReportAttendance } from "../pages/Report/Attendance";
import { ReportLeave } from "../pages/Report/Leave";
import { ReportOvertime } from "../pages/Report/Overtime";
import { ReportAdditional } from "../pages/Report/Additional";
import { ReportReduction } from "../pages/Report/Reduction";
import { ReportCash } from "../pages/Report/Cash";
import { ReportImbursement } from "../pages/Report/Imbursement";
import { ReportKpi } from "../pages/Report/Kpi";
import { ReportTax } from "../pages/Report/Tax";
import { ReportSalary } from "../pages/Report/Salary";

// Tools or CONFIG
import { Setting } from "../pages/Tool/Setting";
import { BpjsForm } from "../pages/Config/Bpjs";
import { LateForm } from "../pages/Config/Late";
import { OvertimeForm } from "../pages/Config/Overtime";
// import { SystemLog } from "../pages/Tool/SystemLog";

import PrivateRoute from "./PrivateRoute";
import ScrollToTop from "./ScrollToTop";

const Router = () => (
  <BrowserRouter>
    <ScrollToTop />
    <ToastContainer />
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<AdminDashboardLayout />}>
          <Route path="*" element={<Navigate to="/dashboard" />} />

          <Route element={<Dashboard />} path="/dashboard" />

          <Route path="master-data">
            <Route path="company">
              <Route path="" element={<Company />} />
              <Route path="create" element={<CompanyForm />} />
              <Route path="detail/:id" element={<CompanyForm />} />
            </Route>
            <Route path="branch">
              <Route path="" element={<Branch />} />
              <Route path="create" element={<CreateBranch />} />
              <Route path="detail/:id" element={<CreateBranch />} />
            </Route>

            <Route path="employee">
              <Route path="" element={<Employee />} />
              <Route path="create" element={<CreateEmployee />} />
              <Route path="detail/:id" element={<CreateEmployee />} />
              <Route path="multiple" element={<EmployeeMultipleForm />} />
            </Route>
            
            <Route path="organization">
              <Route path="" element={<Organization />} />
              <Route path="create" element={<OrganizationForm />} />
              <Route path="detail/:id" element={<OrganizationForm />} />
            </Route>
            
            <Route path="leave_mass">
              <Route path="" element={<LeaveMass />} />
              <Route path="create" element={<LeaveMassForm />} />
              <Route path="detail/:id" element={<LeaveMassForm />} />

            </Route>
            
            <Route path="job_level">
              <Route path="" element={<JobLevel />} />
              <Route path="create" element={<JobLevelForm />} />
              <Route path="detail/:id" element={<JobLevelForm />} />
            </Route>
            
            <Route path="job_position">
              <Route path="" element={<JobPosition />} />
              <Route path="create" element={<JobPositionForm />} />
              <Route path="detail/:id" element={<JobPositionForm />} />
            </Route>
            
            <Route path="salary_component">
              <Route path="" element={<SalaryComponent />} />
              <Route path="detail/:id" element={<SalaryComponentForm />} />
            </Route>
          </Route>
          <Route path="transaction">
            <Route path="attendance">
              <Route path="" element={<Attendance />} />
            </Route>
            <Route path="leave">
              <Route path="" element={<Leave />} />
              <Route path="create" element={<CreateLeave />} />
            </Route>
            <Route path="additional">
              <Route path="" element={<Additional />} />
              <Route path="create" element={<CreateAdditional />} />
            </Route>
            <Route path="reduction">
              <Route path="" element={<Reduction />} />
              <Route path="create" element={<CreateReduction />} />
            </Route>
          </Route>

          <Route path="report">
            <Route path="employee">
              <Route path="" element={<ReportEmployee />} />
            </Route>
            <Route path="applicant">
              <Route path="" element={<ReportApplicant />} />
            </Route>
            <Route path="attendance">
              <Route path="" element={<ReportAttendance />} />
            </Route>

            <Route path="leave">
              <Route path="" element={<ReportLeave />} />
            </Route>
            <Route path="overtime">
              <Route path="" element={<ReportOvertime />} />
            </Route>
            <Route path="additional">
              <Route path="" element={<ReportAdditional />} />
            </Route>
            <Route path="reduction">
              <Route path="" element={<ReportReduction />} />
            </Route>
            <Route path="cash">
              <Route path="" element={<ReportCash />} />
            </Route>
            <Route path="imbursement">
              <Route path="" element={<ReportImbursement />} />
            </Route>
            <Route path="kpi">
              <Route path="" element={<ReportKpi />} />
            </Route>
            <Route path="tax">
              <Route path="" element={<ReportTax />} />
            </Route>
            <Route path="salary">
              <Route path="" element={<ReportSalary />} />
            </Route>
          </Route>
          <Route path="tool">
            <Route path="bpjs">
              <Route path="" element={<BpjsForm />} />
            </Route>
            <Route path="late">
              <Route path="" element={<LateForm />} />
            </Route>
            <Route path="overtime">
              <Route path="" element={<OvertimeForm />} />
            </Route>
          </Route>
          <Route path="payroll">
            <Route path="salary">
              <Route path="" element={<Salary />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
