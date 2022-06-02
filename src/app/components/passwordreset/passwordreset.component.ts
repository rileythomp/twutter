import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-passwordreset',
	templateUrl: './passwordreset.component.html',
	styleUrls: ['./passwordreset.component.less']
})
export class PasswordresetComponent implements OnInit {

	constructor(private auth: AuthService, private router: Router) { }

	ngOnInit(): void {
	}

	resetPassword(method: string) {
		if (method == 'sms') {
			let smsInput = <HTMLInputElement>document.getElementById('sms-number')
			let sms = smsInput.value
			this.auth.SMSResetPassword(sms).subscribe(
				res => {
					console.log(res)
					this.displayInputs('none', 'none', 'block', 'none')
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
					alert('password reset link sent')
				},
				err => {
					console.log(err)
				}
			)
		}
	}

	displayInputs(emailReset, smsReset, resetCode, setPassword) {
		document.getElementById('email-reset').style.display = emailReset;
		document.getElementById('sms-reset').style.display = smsReset;
		document.getElementById('reset-code-page').style.display = resetCode
		document.getElementById('set-password').style.display = setPassword;
	}

	validResetCode() {
		let resetCode = (<HTMLInputElement>document.getElementById('reset-code')).value
		this.auth.ValidateResetCode(resetCode).subscribe(
			res => {
				console.log(res)
				this.displayInputs('none', 'none', 'none', 'block')
			}, 
			err => {
				console.log(err)
				alert('reset code not valid')
			}
		)
	}

	setNewPassword() {
		let newPassword = (<HTMLInputElement>document.getElementById('new-password')).value
		this.auth.SetNewPassword(newPassword).subscribe(
			res => {
				console.log(res)
				alert('Password reset, redirecting to login page')
				this.router.navigateByUrl('login')
			},
			err => {
				console.log(err)
				alert(err)
			}
		)
	}

	toggleResetMethod(method: string) {
		(<HTMLInputElement>document.getElementById('email')).value = '';
		(<HTMLInputElement>document.getElementById('sms-number')).value = '';
		if (method == 'sms') {
			this.displayInputs('none', 'block', 'none', 'none')
		} else if (method == 'email') {
			this.displayInputs('block', 'none', 'none', 'none')
		}
	}

}
