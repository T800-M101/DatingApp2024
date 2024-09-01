import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: any = {};
  accountService = inject(AccountService);
  cancelRegister = output<boolean>();

  register(): void {
    this.accountService.register(this.model).subscribe({
      next: response => {
        this.cancel();
      },
      error: error => console.log(error),
      complete: () => {
        console.log('Register complete');
        this.model = null;
      }
    });
  }

  cancel(): void {
    this.cancelRegister.emit(false);
  }

}
