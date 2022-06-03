import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

	constructor(private auth: AuthService, private router: Router) { }

	ngOnInit(): void {
	}

	signupUser() {
		let usernameInput = <HTMLInputElement>document.getElementById('username')
		let passwordInput = <HTMLInputElement>document.getElementById('password')
		let emailInput = <HTMLInputElement>document.getElementById('email');
		let phoneInput = <HTMLInputElement>document.getElementById('phone-number')

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
			phone_number: phoneInput.value
		}

		this.auth.AddUser(user).subscribe(
			res => {
				this.auth.SMSVerification(user.phone_number).subscribe(
					res => {
						this.router.navigate(['signupauth'], { state: { userContact: user.phone_number } })
					},
					err => {
						alert(err.error)
					}
				)
			},
			error => {
				alert(error.error)
			}
		)
	}
}
