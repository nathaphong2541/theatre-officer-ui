import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListWorkLocationComponent } from '../../components/work-location/list-work-location/list-work-location.component';

@Component({
  selector: 'app-work-location',
  imports: [CommonModule, ListWorkLocationComponent],
  templateUrl: './work-location.component.html',
  styleUrl: './work-location.component.css'
})
export class WorkLocationComponent {

}
