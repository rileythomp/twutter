import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

	constructor(private auth: AuthService, private router: Router) {
	}

	getCookie(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
			c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	ngOnInit(): void {
		let savedUsername = this.getCookie('username')
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
				document.cookie = `access_token=${res['access_token']}; max-age=${res['expires_in']}; SameSite=None; Secure`
				this.router.navigateByUrl('profile')
				console.log(res)
			},
			error => {
				alert(error.error)
			}
		);
	}
}
