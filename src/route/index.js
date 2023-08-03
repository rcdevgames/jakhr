import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminDashboardLayout from "../layouts/AdminDashboardLayout/AdminDashboardLayout";
import Dashboard from "../pages/Dashboard";
import Login, { Authentication } from "../pages/Login";
// master data
import { Company, CompanyForm } from "../pages/MasterData/Company";
import { Branch, CreateBranch } from "../pages/MasterData/Branch";
import {
  Employee,
  CreateEmployee,
  EmployeeMultipleForm,
} from "../pages/MasterData/Employee";
import {
  SalaryComponent,
  SalaryComponentForm,
} from "../pages/MasterData/SalaryComponent";
import { Organization, OrganizationForm } from "../pages/MasterData/Organisasi";
import { LeaveMass, LeaveMassForm } from "../pages/MasterData/LeaveMass";
import { JobLevel, JobLevelForm } from "../pages/MasterData/JobLevel";
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
import { Additional, CreateAdditional } from "../pages/Transaction/Additional";
import { Reduction, CreateReduction } from "../pages/Transaction/Reduction";
import { LeaveForm,Leave } from "../pages/Transaction/LeaveEmployee";

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
// import { OvertimeForm } from "../pages/Config/Overtime";
// import { SystemLog } from "../pages/Tool/SystemLog";

import PrivateRoute from "./PrivateRoute";
import ScrollToTop from "./ScrollToTop";
import {
  ComponentName,
  ComponentNameDaily,
  ComponentNameDeduction,
  ComponentNameForm,
  ComponentNameDailyForm,
  ComponentNameDeductionForm,
} from "../pages/MasterData/ComponentName";
import SalaryForm from "../pages/Payroll/Salary/SalaryForm";
import PayrollPdf from "../pages/PDF/payroll_pdf";
import Unauthorized from "../pages/Unauthorized";
import NotFound from "../pages/NotFound";
import RoleMenu from "../pages/MasterData/RoleMenu/RoleMenu";
import { Menu, MenuForm } from "../pages/MasterData/Menu";
import ComponentNameEx from "../pages/MasterData/ComponentName/ComponentNameEx";
import ComponentNameExForm from "../pages/MasterData/ComponentName/ComponentNameExForm";
import { Schedule, ScheduleForm } from "../pages/MasterData/Schedule";
import { CashAdvance, CashAdvanceForm } from "../pages/Transaction/CashAdvance";
import { Reimburst, ReimburstForm } from "../pages/Transaction/Reimburst";
import { Overtime,OvertimeForm } from "../pages/Transaction/Overtime";

const Router = () => (
  <BrowserRouter>
    <ScrollToTop />
    <ToastContainer />

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/authentication/:token" element={<Authentication />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      {/* <Route path="*" element={<NotFound />} /> */}
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

            <Route path="component_name">
              <Route path="allowance">
                <Route path="" element={<ComponentName />} />
                <Route path="create" element={<ComponentNameForm />} />
                <Route path="detail/:id" element={<ComponentNameForm />} />
              </Route>
              <Route path="allowance_daily">
                <Route path="" element={<ComponentNameDaily />} />
                <Route path="create" element={<ComponentNameDailyForm />} />
                <Route path="detail/:id" element={<ComponentNameDailyForm />} />
              </Route>
              <Route path="allowance_ex">
                <Route path="" element={<ComponentNameEx />} />
                <Route path="create" element={<ComponentNameExForm />} />
                <Route path="detail/:id" element={<ComponentNameExForm />} />
              </Route>
              <Route path="deduction">
                <Route path="" element={<ComponentNameDeduction />} />
                <Route path="create" element={<ComponentNameDeductionForm />} />
                <Route
                  path="detail/:id"
                  element={<ComponentNameDeductionForm />}
                />
              </Route>
            </Route>
            <Route path="salary_component">
              <Route path="" element={<SalaryComponent />} />
              <Route path="detail/:id" element={<SalaryComponentForm />} />
            </Route>

            <Route path="role_menu">
              <Route path="" element={<RoleMenu />} />
            </Route>

            <Route path="menu">
              <Route path="" element={<Menu />} />
              <Route path="create" element={<MenuForm />} />
              <Route path="detail/:id" element={<MenuForm />} />
            </Route>

            <Route path="schedule">
              <Route path="" element={<Schedule />} />
              <Route path="create" element={<ScheduleForm />} />
              <Route path="detail/:id" element={<ScheduleForm />} />
            </Route>
          </Route>
          <Route path="transaction">
            <Route path="attendance">
              <Route path="" element={<Attendance />} />
            </Route>
            
            <Route path="cash_advance">
              <Route path="" element={<CashAdvance />} />
              <Route path="create" element={<CashAdvanceForm />} />
              <Route path="detail/:id" element={<CashAdvanceForm />} />
            </Route>
            <Route path="leave">
              <Route path="" element={<Leave />} />
              <Route path="create" element={<LeaveForm />} />
            </Route>
            <Route path="reimburst">
              <Route path="" element={<Reimburst />} />
              <Route path="create" element={<ReimburstForm />} />
              <Route path="detail/:id" element={<ReimburstForm />} />
            </Route>
            
            <Route path="overtime">
              <Route path="" element={<Overtime />} />
              <Route path="create" element={<OvertimeForm />} />
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
            {/* <Route path="late">
              <Route path="" element={<LateForm />} />
            </Route>
            <Route path="overtime">
              <Route path="" element={<OvertimeForm />} />
            </Route> */}
          </Route>
          <Route path="payroll">
            <Route path="salary">
              <Route path="" element={<Salary />} />
              <Route path="generate" element={<SalaryForm />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
