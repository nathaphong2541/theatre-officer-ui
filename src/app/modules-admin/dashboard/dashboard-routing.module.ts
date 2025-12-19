import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DepartmentComponent } from './pages/department/department.component';
import { PositionComponent } from './pages/position/position.component';
import { ListPositionByDeptComponent } from './components/department/list-position-by-dept/list-position-by-dept.component';
import { WorkLocationComponent } from './pages/work-location/work-location.component';
import { UnionComponent } from './pages/union/union.component';
import { ExperienceLevelComponent } from './pages/experience-level/experience-level.component';
import { PartnerDirectoryComponent } from './pages/partner-directory/partner-directory.component';
import { GenderIdentityComponent } from './pages/gender-identity/gender-identity.component';
import { PersonalIdentityComponent } from './pages/personal-identity/personal-identity.component';
import { RacialIdentityComponent } from './pages/racial-identity/racial-identity.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'departments', pathMatch: 'full' },
      { path: 'departments', component: DepartmentComponent },
      { path: 'list-position-by-dept/:deptId', component: ListPositionByDeptComponent },
      { path: 'positions', component: PositionComponent },
      { path: 'work-locations', component: WorkLocationComponent },
      { path: 'unions', component: UnionComponent },
      { path: 'experience-levels', component: ExperienceLevelComponent },
      { path: 'partner-directories', component: PartnerDirectoryComponent },
      { path: 'gender-identities', component: GenderIdentityComponent },
      { path: 'personal-identities', component: PersonalIdentityComponent },
      { path: 'racial-identities', component: RacialIdentityComponent },

      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
