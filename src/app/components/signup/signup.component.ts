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
		let username = (<HTMLInputElement>document.getElementById('username')).value
		let password = (<HTMLInputElement>document.getElementById('password')).value
		let emailInput = <HTMLInputElement>document.getElementById('email');
		let phoneInput = <HTMLInputElement>document.getElementById('phone-number')
		let isPublic = (<HTMLInputElement>document.getElementById('is-private')).checked ? 0 : 1

		if (!emailInput.validity.valid){
			emailInput.focus()
			return
		}

		// remove non-numeric characters
		let phoneNum = phoneInput.value.replace(/\D/g,'');
		if (phoneNum.length != 10) {
			phoneInput.value = ''
			phoneInput.focus()
			return
		}

		this.users.AddUser(username, password, emailInput.value, phoneNum, isPublic).subscribe(
			res => {
				// this.auth.CreateCode(emailInput.value, 'verify', 'email').subscribe(
				// 	res => {
				// 		this.router.navigate(
				//			['signupauth'],
				// 			{ state: { userContact: emailInput.value, authMethod: 'sms' } }) 
				// 	},
				// 	err => {
				// 		alert(err.error)
				// 	}
				// )
				this.auth.CreateCode(phoneNum, 'verify', 'sms').subscribe(
					res => this.router.navigate(
						['signupauth'],
						{ state: { userContact: phoneNum, authMethod: 'sms' } }
					),
					err => alert(`Error verifying account: ${err.error}`)
				)
			},
			err => alert(err.error)
		)
	}
}
