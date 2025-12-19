import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListRacialIdentityComponent } from '../../components/racial-identity/list-racial-identity/list-racial-identity.component';

@Component({
  selector: 'app-racial-identity',
  imports: [CommonModule, ListRacialIdentityComponent],
  templateUrl: './racial-identity.component.html',
  styleUrl: './racial-identity.component.css'
})
export class RacialIdentityComponent {

}
