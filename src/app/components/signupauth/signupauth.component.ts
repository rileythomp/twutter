import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signupauth',
  templateUrl: './signupauth.component.html',
  styleUrls: ['./signupauth.component.less']
})
export class SignupauthComponent implements OnInit {
	userContact: string
	authMethod: string;
	codeType: string;
	pageTitle: string;
	buttonText: string;
	userUpdate: any;

	constructor(
		private auth: AuthService,
		private users: UserService,
		private router: Router
	) {
		let state = this.router.getCurrentNavigation().extras.state
		this.authMethod = state?.authMethod
		this.userContact = state?.userContact
		if (this.userContact == undefined) {
			this.router.navigateByUrl('signup')
		}
		this.codeType = state?.codeType
		if (this.codeType == 'verify') {
			this.pageTitle = 'Signup Authentication'
			this.buttonText = 'Submit signup code'
		} else if (this.codeType == 'update') {
			this.pageTitle = 'Contact Verification'
			this.buttonText = 'Submit verification code'
			this.userUpdate = state?.userUpdate
		}
	}

	ngOnInit(): void {}

	validateCode() {
		let code = (<HTMLInputElement>document.getElementById('signup-code')).value
		this.auth.ValidateAuthCode(code, this.authMethod, this.userContact, this.codeType).subscribe(
			res => {
				if (this.codeType == 'verify') {
					document.cookie = `access_token=${res['token']}; max-age=${res['max_age']}; SameSite=None; Secure`
					this.router.navigateByUrl('profile')
				}
				else if (this.codeType == 'update') {
					this.users.UpdateUser(this.userUpdate).subscribe(
						res => this.router.navigateByUrl('profile'),
						err => alert(`Error updating profile: ${err.error}`)
					)
				}
			},
			err => alert(`Error validating code: ${err.error}`)
		)
	}

}
