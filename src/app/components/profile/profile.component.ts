import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { timeStamp } from 'console';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.GetUser().subscribe(
      user => {
        document.getElementById('name').innerHTML = user.username
      },
      error => {
        this.router.navigateByUrl('login')
      }
    )
  }

  deleteProfile() {
    this.auth.DeleteUser().subscribe(
      res => {
        this.router.navigateByUrl('login')
      }, 
      err => {
        alert(err.error)
      }
    )
  }

}
