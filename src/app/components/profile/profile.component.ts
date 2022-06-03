import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  email: string;
  name: string;
  number: string;

	constructor(private auth: AuthService, private router: Router) { }

	ngOnInit(): void {
		this.auth.GetUser().subscribe(
			user => {
				let num = user.phone_number
				this.email = user.email
				this.name = user.username
				this.number = num.slice(0, 3) + '-' + num.slice(3, 6) + '-' + num.slice(6)
			},
			error => {
				this.router.navigateByUrl('login')
			}
		)
	}

	deleteProfile() {
		let del = confirm('Are you sure you want to delete your profile? This action is unreversible');
		if (del) {
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

}
