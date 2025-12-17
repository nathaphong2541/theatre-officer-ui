import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListDepartmentComponent } from '../../components/department/list-department/list-department.component';

@Component({
  selector: 'app-department',
  imports: [CommonModule, ListDepartmentComponent],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {

}
