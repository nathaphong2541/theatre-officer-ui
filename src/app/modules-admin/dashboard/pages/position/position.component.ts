import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListPositionComponent } from '../../components/position/list-position/list-position.component';

@Component({
  selector: 'app-position',
  imports: [CommonModule, ListPositionComponent],
  templateUrl: './position.component.html',
  styleUrl: './position.component.css'
})
export class PositionComponent {

}
