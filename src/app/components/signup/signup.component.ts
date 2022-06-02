import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

	constructor(private authService: AuthService, private router: Router) { }

	ngOnInit(): void {
	}

	signupUser() {
		let usernameInput = <HTMLInputElement>document.getElementById('username')
		let passwordInput = <HTMLInputElement>document.getElementById('password')
		let emailInput = <HTMLInputElement>document.getElementById('email');
		if (!emailInput.validity.valid){
			emailInput.focus()
			return
		}

		let user = {
			username: usernameInput.value,
			password: passwordInput.value,
			email: emailInput.value,
		}

		this.authService.AddUser(user).subscribe(
			res => {
				document.cookie = `access_token=${res['access_token']}; Max-Age=${res['expires_in']}; SameSite=None; Secure`
				this.router.navigateByUrl('profile')
			},
			error => {
				alert(error.error)
			}
		);
	}
}
