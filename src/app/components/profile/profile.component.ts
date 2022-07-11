import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
	email: string;
	name: string;
	number: string;
	bio: string;
	imgUrl: string;
	bioTA: HTMLTextAreaElement;
	isPrivate: boolean;
	showPosts: boolean = true;
	user: any

	showFollows: boolean = false;
	followType: string;

	userContact: string;
	action: string;
	method: string;
	update: any;

	constructor(
		private users: UserService,
		private auth: AuthService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.bioTA = <HTMLTextAreaElement>document.getElementById('bio')
		this.users.GetUser().subscribe(
			user => {
				this.user = user;
				let num = user.phone_number
				this.email = user.email
				this.name = user.username
				this.number = num.slice(0, 3) + '-' + num.slice(3, 6) + '-' + num.slice(6)
				this.bio = user.bio
				this.imgUrl = user.imgUrl
				this.isPrivate = user.is_public != '1'
			},
			err => this.router.navigateByUrl('login')
		)
	}

	ngAfterViewChecked(): void {
		this.bioTA = <HTMLTextAreaElement>document.getElementById('bio')
		this.bioTA.style.height = "";
		this.bioTA.style.height = this.bioTA.scrollHeight + 3 + "px"
	}

	createAuthCode(method: string, userContact: string, input: HTMLInputElement) {
		let sure = confirm(`Changing your ${method == 'sms' ? 'phone number' : 'email address'} will require verifying the new one with an authentication code. Are you sure you want to continue?`)
		if (sure) {
			this.userContact = userContact
			this.action = 'update'
			this.method = method
			this.auth.CreateAuthCode(userContact, this.action, method).subscribe(
				res => this.showCodeInput(true),
				err => {
					if (err.status == 303) {
						alert(`There is an existing code for this user`)
						this.showCodeInput(true)
					} else {
						alert(`Error creating verification code: ${err.error}`)
						input.focus()
					}
				}
			)
		}
	}

	changeUserPrivacy(ev: any) {
		let sure = confirm(`Are you sure you want to make your account ${ev.target.checked ? 'private': 'public'}?`)
		if (sure) {
			this.users.UpdateUser(
				this.user.username,
				this.user.email,
				this.user.phone_number,
				this.user.bio,
				ev.target.checked ? 0 : 1
			).subscribe(
				res => {},
				err => alert(`Error changing account privacy: ${err.error}`)
			)
		}
	}

	updateProfile() {
		let emailInput = <HTMLInputElement>document.getElementById('email')
		let email = emailInput.value
		let phoneInput = <HTMLInputElement>document.getElementById('number')
		let phone = phoneInput.value
		let bio = (<HTMLTextAreaElement>document.getElementById('bio')).value
		let isPublic = (<HTMLInputElement>document.getElementById('is-private')).checked ? 0 : 1
		if (!emailInput.validity.valid){
			emailInput.focus()
			return
		}

		// remove non-numeric characters
		let phoneNum = phone.replace(/\D/g,'');
		if (phoneNum.length != 10) {
			phoneInput.focus()
			return
		}

		if (email != this.email && phone != this.number) {
			alert('Sorry, due to 2FA requirements you must change your email and phone number separately.')
			return
		}

		this.update = {
			name: this.name,
			email: email,
			phone: phone,
			bio: bio,
			isPublic: isPublic
		}

		if (email != this.email) {
			this.createAuthCode('email', email, emailInput)
			return
		}
		if (phone != this.number) {
			this.createAuthCode('sms', phone, phoneInput)
			return
		}
		
		this.users.UpdateUser(this.name, email, phone, bio, isPublic).subscribe(
			res => window.location.reload(),
			err => alert(`Error updating profile: ${err.error}`)
		)
	}

	showCodeInput(show: boolean) {
		document.getElementById('overlay').style.display = show ? 'block' : 'none';
		document.getElementById('entercode').style.display = show ? 'block': 'none';
		(<HTMLInputElement>document.getElementById('update-code')).value = '';
	}
	  
	submitCode() {
		let code = (<HTMLInputElement>document.getElementById('update-code')).value
		this.auth.ValidateAuthCode(code, this.userContact, this.action, this.method).subscribe(
			res => {
				this.users.UpdateUser(
					this.update.name,
					this.update.email,
					this.update.phone,
					this.update.bio,
					this.update.isPublic
				).subscribe(
					res => window.location.reload(),
					err => alert(`Error updating user: ${err.error}`)
				)	
			},
			err => alert(`Error validating verification code: ${err.error}`)
		)
		this.showCodeInput(false)
	}

	resetPassword() {
		this.router.navigateByUrl('passwordreset')
	}

	deleteProfile() {
		let del = confirm('Are you sure you want to delete your profile? This action is irreversible');
		if (del) {
			this.users.DeleteUser().subscribe(
				res => this.router.navigateByUrl('signup'), 
				err => alert(`Error deleting profile: ${err.error}`)
			)
		}

	}

	changePicture() {
		let file = (<HTMLInputElement>document.getElementById('image-file')).files[0];
		if (file == undefined || file == null) {
			alert('Could not find image')
			return
		}
		var formData = new FormData();
		formData.append('file', file);
		this.users.ChangePicture(formData).subscribe(
			res => {
				alert('You may need to empty your browser cache to see image changes.')
				window.location.reload()
			}, 
			err => alert(`Error changing picture: ${err.error}`)
		)
	}

	toggleFollowList(show: boolean, followType: string) {
		document.getElementById('overlay').style.display = show ? 'block' : 'none';
		this.showFollows = show
		this.followType = followType
	}
}
