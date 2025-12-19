import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListGenderIdentityComponent } from '../../components/gender-identity/list-gender-identity/list-gender-identity.component';

@Component({
  selector: 'app-gender-identity',
  imports: [CommonModule, ListGenderIdentityComponent],
  templateUrl: './gender-identity.component.html',
  styleUrl: './gender-identity.component.css'
})
export class GenderIdentityComponent {

}
