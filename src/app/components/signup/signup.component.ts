import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

	constructor(private auth: AuthService, private users: UserService, private router: Router) { }

	ngOnInit(): void {
	}

	signupUser() {
		let usernameInput = <HTMLInputElement>document.getElementById('username')
		let passwordInput = <HTMLInputElement>document.getElementById('password')
		let emailInput = <HTMLInputElement>document.getElementById('email');
		let phoneInput = <HTMLInputElement>document.getElementById('phone-number')
		let isPrivateInput = <HTMLInputElement>document.getElementById('is-private')

		if (!emailInput.validity.valid){
			emailInput.focus()
			return
		}

		let phoneNum = phoneInput.value.replace(/\D/g,'');
		if (phoneNum.length != 10) {
			phoneInput.value = ''
			phoneInput.focus()
			return
		}

		let user = {
			username: usernameInput.value,
			password: passwordInput.value,
			email: emailInput.value,
			phone_number: phoneInput.value,
			is_public: isPrivateInput.checked ? 0 : 1
		}

		this.users.AddUser(user).subscribe(
			res => {
				// this.auth.EmailVerification(user.email).subscribe(
				// 	res => {
				// 		this.router.navigate(['signupauth'], { state: { userContact: user.email } })
				// 	},
				// 	err => {
				// 		alert(err.error)
				// 	}
				// )
				this.auth.SMSVerification(user.phone_number).subscribe(
					res => {
						this.router.navigate(['signupauth'], { state: { userContact: user.phone_number } })
					},
					err => {
						alert(`Error verifying account: ${err.error}`)
					}
				)
			},
			error => {
				alert(error.error)
			}
		)
	}
}
