import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListPartnerDirectoryComponent } from '../../components/partner-directory/list-partner-directory/list-partner-directory.component';

@Component({
  selector: 'app-partner-directory',
  imports: [CommonModule, ListPartnerDirectoryComponent],
  templateUrl: './partner-directory.component.html',
  styleUrl: './partner-directory.component.css'
})
export class PartnerDirectoryComponent {

}
