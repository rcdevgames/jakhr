import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AdminDashboardLayout from '../layouts/AdminDashboardLayout/AdminDashboardLayout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
// master data
import {Branch, CreateBranch} from '../pages/MasterData/Branch';
import {Employee, CreateEmployee} from '../pages/MasterData/Employee';
import {Salary, CreateSalary} from '../pages/MasterData/Salary';
import {Record, CreateRecord} from '../pages/MasterData/TrackRecord';
import {Kpi, CreateKpi} from '../pages/MasterData/Kpi';
import {Schedule, CreateSchedule} from '../pages/MasterData/Schedule';
import {Overtime, CreateOvertime} from '../pages/MasterData/Overtime';
import {Vacancy, CreateVacancy} from '../pages/MasterData/Vacancy';
import {Announcement, CreateAnnouncement} from '../pages/MasterData/Announcement';
import {Applicant, CreateApplicant, MultipleApplicant} from '../pages/MasterData/Applicant';
import LeaveBalance from '../pages/MasterData/LeaveBalance';
// Transaction
import {Attendance, CreateAttendance} from '../pages/Transaction/Attendance';
import {Leave, CreateLeave} from '../pages/Transaction/Leave';
import {Additional, CreateAdditional} from '../pages/Transaction/Additional';
import {Reduction, CreateReduction} from '../pages/Transaction/Reduction';
import {Cash, CreateCash} from '../pages/Transaction/Cash';
import {Imbursement, CreateImbursement} from '../pages/Transaction/Imbursement';
import {TransactionKpi, TransactionCreateKpi} from '../pages/Transaction/TransactionKpi';
// Report
import { ReportEmployee } from '../pages/Report/Employee';
import { ReportApplicant } from '../pages/Report/Applicant';
import { ReportAttendance } from '../pages/Report/Attendance';
import { ReportLeave } from '../pages/Report/Leave';
import { ReportOvertime } from '../pages/Report/Overtime';
import { ReportAdditional } from '../pages/Report/Additional';
import { ReportReduction } from '../pages/Report/Reduction';
import { ReportCash } from '../pages/Report/Cash';
import { ReportImbursement } from '../pages/Report/Imbursement';
import { ReportKpi } from '../pages/Report/Kpi';
import { ReportTax } from '../pages/Report/Tax';
import { ReportSalary } from '../pages/Report/Salary';

// Tools
import { Setting } from '../pages/Tool/Setting';
import { SystemLog } from '../pages/Tool/SystemLog';

import PrivateRoute from './PrivateRoute';
import ScrollToTop from './ScrollToTop';

const Router = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route  element={<AdminDashboardLayout />} >
          <Route path="*" element={<Navigate to="/dashboard" />} />

          <Route element={<Dashboard/>} path="/dashboard" />
         
            <Route path="master-data">
              <Route path="branch">
                <Route path="" element={<Branch/>} />
                <Route path="create" element={<CreateBranch />}/>
              </Route>
             
              <Route path="employee">
                <Route path="" element={<Employee />} />
                <Route path="create" element={<CreateEmployee />}/>
              </Route>
              <Route path="salary">
                <Route path="" element={<Salary />} />
                <Route path="create" element={<CreateSalary />}/>
              </Route>
              <Route path="record">
                <Route path="" element={<Record/>} />
                <Route path="create" element={<CreateRecord />}/>
              </Route>
              <Route path="kpi">
                <Route path="" element={<Kpi/>} />
                <Route path="create" element={<CreateKpi />}/>
              </Route>

              <Route path="schedule">
                <Route path="" element={<Schedule/>} />
                <Route path="create" element={<CreateSchedule />}/>
              </Route>
              <Route path="overtime">
                <Route path="" element={<Overtime/>} />
                <Route path="create" element={<CreateOvertime />}/>
              </Route>
              <Route path="leave-balance" element={<LeaveBalance/>} />
               
              <Route path="announcement">
                <Route path="" element={<Announcement/>} />
                <Route path="create" element={<CreateAnnouncement />}/>
              </Route>
              <Route path="vacancy">
                <Route path="" element={<Vacancy/>} />
                <Route path="create" element={<CreateVacancy />}/>
              </Route>
              <Route path="applicant">
                <Route path="" element={<Applicant/>} />
                <Route path="create" element={<CreateApplicant />}/>
                <Route path="multiple-create" element={<MultipleApplicant />}/>
              </Route>
            </Route>
            <Route path="transaction">
              <Route path="attendance">
                <Route path="" element={<Attendance/>} />
                <Route path="create" element={<CreateAttendance />}/>
              </Route>
              <Route path="leave">
                <Route path="" element={<Leave/>} />
                <Route path="create" element={<CreateLeave />}/>
              </Route>
              <Route path="additional">
                <Route path="" element={<Additional/>} />
                <Route path="create" element={<CreateAdditional />}/>
              </Route>
              <Route path="reduction">
                <Route path="" element={<Reduction/>} />
                <Route path="create" element={<CreateReduction />}/>
              </Route>
              
              <Route path="cash">
                <Route path="" element={<Cash/>} />
                <Route path="create" element={<CreateCash />}/>
              </Route>
              
              <Route path="imbursement">
                <Route path="" element={<Imbursement/>} />
                <Route path="create" element={<CreateImbursement />}/>
              </Route>

              <Route path="kpi">
                <Route path="" element={<TransactionKpi/>} />
                <Route path="create" element={<TransactionCreateKpi />}/>
              </Route>
              
            </Route>

            <Route path="report">
              <Route path="employee">
                <Route path="" element={<ReportEmployee/>} />
              </Route>
              <Route path="applicant">
                <Route path="" element={<ReportApplicant/>} />
              </Route>
              <Route path="attendance">
                <Route path="" element={<ReportAttendance/>} />
              </Route>

              <Route path="leave">
                <Route path="" element={<ReportLeave/>} />
              </Route>
              <Route path="overtime">
                <Route path="" element={<ReportOvertime/>} />
              </Route>
              <Route path="additional">
                <Route path="" element={<ReportAdditional/>} />
              </Route>
              <Route path="reduction">
                <Route path="" element={<ReportReduction/>} />
              </Route>
              <Route path="cash">
                <Route path="" element={<ReportCash/>} />
              </Route>
              <Route path="imbursement">
                <Route path="" element={<ReportImbursement/>} />
              </Route>
              <Route path="kpi">
                <Route path="" element={<ReportKpi/>} />
              </Route>
              <Route path="tax">
                <Route path="" element={<ReportTax/>} />
              </Route>
              <Route path="salary">
                <Route path="" element={<ReportSalary/>} />
              </Route>
          
            </Route>
            <Route path="tool">
              <Route path="setting">
                <Route path="" element={<Setting/>} />
              </Route>
              <Route path="system-log">
                <Route path="" element={<SystemLog/>} />
              </Route>
            </Route>
          </Route>
      </Route>  
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default Router;