import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListPersonalIdentityComponent } from '../../components/personal-identity/list-personal-identity/list-personal-identity.component';

@Component({
  selector: 'app-personal-identity',
  imports: [CommonModule, ListPersonalIdentityComponent],
  templateUrl: './personal-identity.component.html',
  styleUrl: './personal-identity.component.css'
})
export class PersonalIdentityComponent {

}
