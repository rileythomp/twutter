import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { getCookie } from 'src/app/helpers'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

	constructor(private auth: AuthService, private router: Router) {}

	ngOnInit(): void {
		let savedUsername = getCookie('username')
		if (savedUsername != '') {
			(<HTMLInputElement>document.getElementById('username')).value = savedUsername
		}
	}

  loginUser() {
		let usernameInput = <HTMLInputElement>document.getElementById('username')
		let passwordInput = <HTMLInputElement>document.getElementById('password')
		let rememberInput = <HTMLInputElement>document.getElementById('remember')

		let user = {
			username: usernameInput.value,
			password: passwordInput.value,
		}

		if (rememberInput.checked) {
			document.cookie = `username=${user.username}; SameSite=None; Secure`
		} else {
			document.cookie = 'username=; SameSite=None; Secure'
		}

		this.auth.AuthenticateUser(user).subscribe(
			res => {
				document.cookie = `access_token=${res['token']}; max-age=${res['max_age']}; SameSite=None; Secure`
				this.router.navigateByUrl('profile')
			},
			err => alert(`Error logging in: ${err.error}`)
		);
	}
}
