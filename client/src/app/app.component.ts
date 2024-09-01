import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private accountService = inject(AccountService);
  currentUser!:string;
  username!:string;

  ngOnInit(): void {
    this.setCurrentUser();
  }

  // Verify persistency of user in localStorge, if it exists it is set in Singal to notify everywhere about it.
  setCurrentUser(): void {
    const userString = localStorage.getItem('user');
    if ( !userString ) return;
    const user = JSON.parse(userString); 
    this.accountService.currentUser.set(user);
    
    // Pass the name of the user as an input to show it in the navbar
    this.username = user.username.charAt(0).toUpperCase() + user.username.slice(1); 
  }
  
}
