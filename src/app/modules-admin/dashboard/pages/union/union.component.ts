import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListUnionComponent } from '../../components/union/list-union/list-union.component';

@Component({
  selector: 'app-union',
  imports: [CommonModule, ListUnionComponent],
  templateUrl: './union.component.html',
  styleUrl: './union.component.css'
})
export class UnionComponent {

}
