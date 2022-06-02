import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-passwordreset',
	templateUrl: './passwordreset.component.html',
	styleUrls: ['./passwordreset.component.less']
})
export class PasswordresetComponent implements OnInit {

	constructor(private auth: AuthService) { }

	ngOnInit(): void {
	}

	resetPassword(method: string) {
		if (method == 'sms') {
			let smsInput = <HTMLInputElement>document.getElementById('sms')
			let sms = smsInput.value
			this.auth.SMSResetPassword(sms).subscribe(
				res => {
					console.log(res)
				},
				err => {
					console.log(err)
				}
			)
		} else if (method == 'email') {
			let emailInput = <HTMLInputElement>document.getElementById('email')
			let email = emailInput.value
			this.auth.EmailResetPassword(email).subscribe(
				res => {
					console.log(res)
				},
				err => {
					console.log(err)
				}
			)
		}
	}

	toggleResetMethod(method: string) {
		if (method == 'sms') {
			document.getElementById('email-reset').style.display = 'none'
			document.getElementById('sms-reset').style.display = 'block'
		} else if (method == 'email') {
			document.getElementById('email-reset').style.display = 'block'
			document.getElementById('sms-reset').style.display = 'none'
		}
	}

}
