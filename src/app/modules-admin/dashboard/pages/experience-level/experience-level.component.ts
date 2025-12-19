import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListExperienceLevelComponent } from '../../components/experience-level/list-experience-level/list-experience-level.component';

@Component({
  selector: 'app-experience-level',
  imports: [CommonModule, ListExperienceLevelComponent],
  templateUrl: './experience-level.component.html',
  styleUrl: './experience-level.component.css'
})
export class ExperienceLevelComponent {

}
