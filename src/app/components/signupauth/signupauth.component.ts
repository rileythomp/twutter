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

	constructor(
		private auth: AuthService,
		private router: Router
	) {
		let state = this.router.getCurrentNavigation().extras.state
		this.authMethod = state?.authMethod
		this.userContact = state?.userContact
		if (this.userContact == undefined) {
			this.router.navigateByUrl('signup')
		}
	}

	ngOnInit(): void {}

	validateCode() {
		let code = (<HTMLInputElement>document.getElementById('signup-code')).value
		this.auth.ValidateCode(code, this.userContact, 'verify', this.authMethod).subscribe(
			res => {
				document.cookie = `access_token=${res['token']}; max-age=${res['max_age']}; SameSite=None; Secure`
				this.router.navigateByUrl('profile')
			},
			err => alert(`Error validating code: ${err.error}`)
		)
	}

}
