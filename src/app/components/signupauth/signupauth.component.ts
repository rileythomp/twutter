import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signupauth',
  templateUrl: './signupauth.component.html',
  styleUrls: ['./signupauth.component.less']
})
export class SignupauthComponent implements OnInit {
	userContact: string

	constructor(private auth: AuthService, private router: Router) {
		this.userContact = this.router.getCurrentNavigation().extras.state?.userContact
		if (this.userContact == undefined) {
			this.router.navigateByUrl('signup')
		}
	}

	ngOnInit(): void {
	}

	validateCode() {
		let code = (<HTMLInputElement>document.getElementById('signup-code')).value
		this.auth.ValidateResetCode(code, 'sms', this.userContact).subscribe(
			res => {
				document.cookie = `access_token=${res['token']}; max-age=${res['max_age']}; SameSite=None; Secure`
				this.router.navigateByUrl('profile')
			},
			err => {
				alert(err.error)
			}
		)
	}

}
