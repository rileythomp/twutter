import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
        alert('error authenticating user')
        this.router.navigateByUrl('login')
      }
    )
  }

}
