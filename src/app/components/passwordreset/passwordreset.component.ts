import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-passwordreset',
	templateUrl: './passwordreset.component.html',
	styleUrls: ['./passwordreset.component.less']
})
export class PasswordresetComponent implements OnInit {
	authMethod: string
	smsNumber: string
	email: string

	constructor(private auth: AuthService, private router: Router) { }

	ngOnInit(): void {
	}

	resetPassword(method: string) {
		this.authMethod = method
		if (this.authMethod == 'sms') {
			let smsInput = <HTMLInputElement>document.getElementById('sms-number')
			this.smsNumber = smsInput.value
			this.auth.SMSResetPassword(this.smsNumber).subscribe(
				res => {
					console.log(res)
					this.displayInputs('none', 'none', 'block', 'none')
				},
				err => {
					console.log(err)
					alert(err.error)
				}
			)
		} else if (this.authMethod == 'email') {
			let emailInput = <HTMLInputElement>document.getElementById('email')
			this.email = emailInput.value
			this.auth.EmailResetPassword(this.email).subscribe(
				res => {
					console.log(res)
					alert('password reset link sent')
				},
				err => {
					console.log(err)
					alert(err.error)
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
		let userContact;
		if (this.authMethod == 'sms') {
			userContact = this.smsNumber
		} else if (this.authMethod == 'email') {
			userContact = this.email
		}
		this.auth.ValidateResetCode(resetCode, this.authMethod, userContact).subscribe(
			res => {
				console.log(res)
				this.displayInputs('none', 'none', 'none', 'block')
				document.cookie = `access_token=${res['access_token']}; max-age=${res['expires_in']}; SameSite=None; Secure;`
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
				alert(err.error)
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
