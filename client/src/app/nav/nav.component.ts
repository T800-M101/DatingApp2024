import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent  {

  accountService = inject(AccountService);
  model: any = {};
  username = input.required<string>();

  login(): void {
    if (!this.isValidModel(this.model)) return;
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response)
      },
      error: error => console.log(error),
      complete: () => console.log('login complete')
    });
  }

  logout(): void {
    this.accountService.logout();
  }
  
  isValidModel(model: { username: string; password: string }): boolean {
    // !!model verifies if the model is not undefined or null and then converts it to boolean
    return !!model.username && model.username.trim().length > 0 && !!model.password && model.password.trim().length > 0
  }

}
