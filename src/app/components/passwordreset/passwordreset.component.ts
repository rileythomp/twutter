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
	userContact: string
	resetCode: string

	constructor(private auth: AuthService, private router: Router) { }

	ngOnInit(): void {
	}

	resetPassword(method: string) {
		this.authMethod = method
		if (this.authMethod == 'sms') {
			let smsInput = <HTMLInputElement>document.getElementById('sms-number')
			this.userContact = smsInput.value
			this.auth.CreateCode(this.userContact, 'passwordreset', 'sms').subscribe(
				res => {
					this.displayInputs('none', 'none', 'block', 'none')
				},
				err => alert(`Error resetting password: ${err.error}`)
			)
		} else if (this.authMethod == 'email') {
			let emailInput = <HTMLInputElement>document.getElementById('email')
			this.userContact = emailInput.value
			this.auth.CreateCode(this.userContact, 'passwordreset', 'email').subscribe(
				res => this.displayInputs('none', 'none', 'block', 'none'),
				err => alert(`Error resetting password: ${err.error}`)
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
		this.resetCode = (<HTMLInputElement>document.getElementById('reset-code')).value
		this.auth.ValidateCode(this.resetCode, this.userContact, 'passwordreset', this.authMethod).subscribe(
			res => {
				this.displayInputs('none', 'none', 'none', 'block')
				document.cookie = `password_token=${res['token']}; max-age=${res['max_age']}; SameSite=None; Secure;`
			}, 
			err => alert('reset code not valid')
		)
	}

	setNewPassword() {
		let newPassword = (<HTMLInputElement>document.getElementById('new-password')).value
		this.auth.SetNewPassword(newPassword).subscribe(
			res => {
				document.cookie = `password_token=; max-age0; SameSite=None; Secure;`
				alert('Password reset, redirecting to login page')
				this.router.navigateByUrl('login')
			},
			err => alert(`Error resetting password: ${err.error}`)
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
