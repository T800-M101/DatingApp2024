import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  accountService = inject(AccountService);
  registerMode = false;
  users: any;
  registerToggle(): void {
    this.registerMode = !this.registerMode;
  }
  
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.accountService.getUsers().subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed.')
    });
  }
 
  cancelRegisterMode(event: boolean): void {
    this.registerMode = event;
  }

}
