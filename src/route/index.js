import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminDashboardLayout from "../layouts/AdminDashboardLayout/AdminDashboardLayout";
import Dashboard from "../pages/Dashboard";
import Login, { Authentication, ChangePassword } from "../pages/Login";
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
  SalaryComponentMultipleForm,
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
// PAYROLL
import { Salary } from "../pages/Payroll/Salary";

// Transaction
import { Attendance, AttendanceForm } from "../pages/Transaction/Attendance";
import { Additional, CreateAdditional } from "../pages/Transaction/Additional";
import { Reduction, CreateReduction } from "../pages/Transaction/Reduction";
import { LeaveForm, Leave } from "../pages/Transaction/LeaveEmployee";

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
import { ReportLeave, ReportLeaveDetail } from "../pages/Report/Leave";
import { ReportOvertime } from "../pages/Report/Overtime";
import {
  ReportAdditional,
  ReportAdditionalDetail,
} from "../pages/Report/Additional";
import {
  ReportReduction,
  ReportReductionDetail,
} from "../pages/Report/Reduction";
import { ReportCash, ReportCashDetail } from "../pages/Report/Cash";
import {
  ReportImbursement,
  ReportImbursementDetail,
} from "../pages/Report/Imbursement";
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
import { Overtime, OvertimeForm } from "../pages/Transaction/Overtime";
import { LeaveType, LeaveTypeForm } from "../pages/MasterData/LeaveType";
import {
  LeaveBallance,
  LeaveBallanceForm,
  LeaveBallanceFormEmployee,
  LeaveBallanceGenerate,
} from "../pages/MasterData/LeaveBallance";
import { RoleMenuForm } from "../pages/MasterData/RoleMenu";
import ReportOvertimeDetail from "../pages/Report/Overtime/OvertimeDetail";
import Approval from "../pages/Transaction/Approval/Approval";
import { ConfigCompanyForm } from "../pages/Config/Company";
import { Direktorat, DirektoratForm } from "../pages/MasterData/Direktorat";
import { Department, DepartmentForm } from "../pages/MasterData/Department";

const Router = () => (
  <BrowserRouter>
    <ScrollToTop />
    <ToastContainer />

    <Routes>
      <Route
        path="/authentication/:token/:uri/:protocol"
        element={<Authentication />}
      />
      <Route path="/authentication" element={<Authentication />} />
      {/* <Route path="/change_password" element={<ChangePassword />} /> */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="*" element={<NotFound />} /> */}
      <Route element={<PrivateRoute />}>
        <Route element={<AdminDashboardLayout />}>
          <Route path="*" element={<Navigate to="/dashboard" />} />

          <Route element={<Dashboard />} path="/dashboard" />
          <Route path="master-payroll">
            <Route path="component_name">
              <Route path="allowance">
                <Route path="" element={<ComponentName />} />
                <Route path="create" element={<ComponentNameForm />} />
                <Route path="detail/:id" element={<ComponentNameForm />} />
                <Route
                  path="show/:id"
                  element={<ComponentNameForm readOnly={true} />}
                />
              </Route>
              <Route path="allowance_daily">
                <Route path="" element={<ComponentNameDaily />} />
                <Route path="create" element={<ComponentNameDailyForm />} />
                <Route path="detail/:id" element={<ComponentNameDailyForm />} />
                <Route
                  path="show/:id"
                  element={<ComponentNameDailyForm readOnly={true} />}
                />
              </Route>
              <Route path="allowance_ex">
                <Route path="" element={<ComponentNameEx />} />
                <Route path="create" element={<ComponentNameExForm />} />
                <Route path="detail/:id" element={<ComponentNameExForm />} />
                <Route
                  path="show/:id"
                  element={<ComponentNameExForm readOnly={true} />}
                />
              </Route>
              <Route path="deduction">
                <Route path="" element={<ComponentNameDeduction />} />
                <Route path="create" element={<ComponentNameDeductionForm />} />
                <Route
                  path="detail/:id"
                  element={<ComponentNameDeductionForm />}
                />
                <Route
                  path="show/:id"
                  element={<ComponentNameDeductionForm readOnly={true} />}
                />
              </Route>
            </Route>
            <Route path="salary_component">
              <Route path="" element={<SalaryComponent />} />
              <Route
                path="show/:id"
                element={<SalaryComponentForm readOnly={true} />}
              />
              <Route path="detail/:id" element={<SalaryComponentForm />} />
              <Route
                path="multiple"
                element={<SalaryComponentMultipleForm />}
              />
            </Route>
          </Route>
          <Route path="master-organization">
            <Route path="organization">
              <Route path="" element={<Organization />} />
              <Route
                path="show/:id"
                element={<OrganizationForm readOnly={true} />}
              />
              <Route path="create" element={<OrganizationForm />} />
              <Route path="detail/:id" element={<OrganizationForm />} />
            </Route>
            <Route path="direktorat">
              <Route path="" element={<Direktorat />} />
              <Route
                path="show/:id"
                element={<DirektoratForm readOnly={true} />}
              />
              <Route path="create" element={<DirektoratForm />} />
              <Route path="detail/:id" element={<DirektoratForm />} />
            </Route>
            <Route path="department">
              <Route path="" element={<Department />} />
              <Route
                path="show/:id"
                element={<DepartmentForm readOnly={true} />}
              />
              <Route path="create" element={<DepartmentForm />} />
              <Route path="detail/:id" element={<DepartmentForm />} />
            </Route>
            <Route path="job_level">
              <Route path="" element={<JobLevel />} />
              <Route
                path="show/:id"
                element={<JobLevelForm readOnly={true} />}
              />
              <Route path="create" element={<JobLevelForm />} />
              <Route path="detail/:id" element={<JobLevelForm />} />
            </Route>

            <Route path="job_position">
              <Route path="" element={<JobPosition />} />
              <Route path="create" element={<JobPositionForm />} />
              <Route
                path="show/:id"
                element={<JobPositionForm readOnly={true} />}
              />

              <Route path="detail/:id" element={<JobPositionForm />} />
            </Route>
          </Route>
          <Route path="master-data">
            <Route path="company">
              <Route path="" element={<Company />} />
              <Route path="create" element={<CompanyForm />} />
              <Route
                path="show/:id"
                element={<CompanyForm readOnly={true} />}
              />

              {/* <Route path="detail/:id" element={<CompanyForm />} /> */}
            </Route>
            <Route path="branch">
              <Route path="" element={<Branch />} />
              <Route path="create" element={<CreateBranch />} />
              <Route
                path="show/:id"
                element={<CreateBranch readOnly={true} />}
              />
              <Route path="detail/:id" element={<CreateBranch />} />
            </Route>

            <Route path="employee">
              <Route path="" element={<Employee />} />
              <Route path="create" element={<CreateEmployee />} />
              <Route
                path="show/:id"
                element={<CreateEmployee readOnly={true} />}
              />

              <Route path="detail/:id" element={<CreateEmployee />} />
              <Route path="multiple" element={<EmployeeMultipleForm />} />
            </Route>

            <Route path="leave_mass">
              <Route path="" element={<LeaveMass />} />
              <Route
                path="show/:id"
                element={<LeaveMassForm readOnly={true} />}
              />
              <Route path="create" element={<LeaveMassForm />} />
              <Route path="detail/:id" element={<LeaveMassForm />} />
            </Route>

            <Route path="leave_type">
              <Route path="" element={<LeaveType />} />
              <Route path="create" element={<LeaveTypeForm />} />
              <Route
                path="show/:id"
                element={<LeaveTypeForm readOnly={true} />}
              />

              <Route path="detail/:id" element={<LeaveTypeForm />} />
            </Route>

            <Route path="leave_ballance">
              <Route path="" element={<LeaveBallance />} />
              <Route path="create" element={<LeaveBallanceForm />} />
              <Route path="generate" element={<LeaveBallanceGenerate />} />
              <Route
                path="detail/:id"
                element={<LeaveBallanceFormEmployee />}
              />
              <Route
                path="show/:id"
                element={<LeaveBallanceFormEmployee readOnly={true} />}
              />
            </Route>

            <Route path="role_menu">
              <Route path="" element={<RoleMenu />} />
              <Route
                path="show/:id"
                element={<RoleMenuForm readOnly={true} />}
              />

              <Route path="detail/:id" element={<RoleMenuForm />} />
            </Route>

            <Route path="menu">
              <Route path="" element={<Menu />} />
              <Route path="create" element={<MenuForm />} />
              <Route path="detail/:id" element={<MenuForm />} />
              <Route path="show/:id" element={<MenuForm readOnly={true} />} />
            </Route>

            <Route path="schedule">
              <Route path="" element={<Schedule />} />
              <Route path="create" element={<ScheduleForm />} />
              <Route path="detail/:id" element={<ScheduleForm />} />
              <Route
                path="show/:id"
                element={<ScheduleForm readOnly={true} />}
              />
            </Route>
          </Route>
          <Route path="transaction">
            <Route path="attendance">
              <Route path="" element={<Attendance />} />
              <Route path="detail/:id" element={<AttendanceForm />} />
              <Route path="create" element={<AttendanceForm />} />
            </Route>
            <Route path="approval">
              <Route path="" element={<Approval />} />
            </Route>

            <Route path="cash_advance">
              <Route path="" element={<CashAdvance />} />
              <Route path="create" element={<CashAdvanceForm />} />
              <Route path="detail/:id" element={<CashAdvanceForm />} />
              <Route
                path="show/:id"
                element={<CashAdvanceForm readOnly={true} />}
              />
            </Route>
            <Route path="leave">
              <Route path="" element={<Leave />} />
              <Route path="create" element={<LeaveForm />} />
            </Route>
            <Route path="reimburst">
              <Route path="" element={<Reimburst />} />
              <Route path="create" element={<ReimburstForm />} />
              <Route path="detail/:id" element={<ReimburstForm />} />
              <Route
                path="show/:id"
                element={<ReimburstForm readOnly={true} />}
              />
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
              <Route
                path="detail/:employee_id"
                element={<ReportLeaveDetail />}
              />
            </Route>
            <Route path="overtime">
              <Route path="" element={<ReportOvertime />} />
              <Route
                path="detail/:employee_id"
                element={<ReportOvertimeDetail />}
              />
            </Route>
            <Route path="additional">
              <Route path="" element={<ReportAdditional />} />
              <Route
                path="detail/:employee_id"
                element={<ReportAdditionalDetail />}
              />
            </Route>
            <Route path="reduction">
              <Route path="" element={<ReportReduction />} />
              <Route
                path="detail/:employee_id"
                element={<ReportReductionDetail />}
              />
            </Route>
            <Route path="cash">
              <Route path="" element={<ReportCash />} />
              <Route
                path="detail/:employee_id"
                element={<ReportCashDetail />}
              />
            </Route>
            <Route path="imbursement">
              <Route path="" element={<ReportImbursement />} />
              <Route
                path="detail/:employee_id"
                element={<ReportImbursementDetail />}
              />
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
            <Route path="company">
              <Route path="" element={<ConfigCompanyForm />} />
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
