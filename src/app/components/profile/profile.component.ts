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

	constructor(
		private users: UserService,
		private auth: AuthService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.bioTA = <HTMLTextAreaElement>document.getElementById('bio')
		this.users.GetUser().subscribe(
			user => {
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

		let user = {
			name: this.name,
			email: email,
			phone: phone,
			bio: bio,
			isPublic: isPublic
		}

		let sure = false;
		if (email != this.email) {
			sure = confirm('Changing your email address will require verifying the new one with an authentication code. Are you sure you want to continue?')
		}
		if (sure) {
			this.auth.UpdateEmail(email).subscribe(
				res => {
					// this.router.navigate(['signupauth'], { state: { userContact: email, authMethod: 'email', codeType: 'update', userUpdate: user } })
					let code = prompt('Enter contact verification code')
					this.auth.ValidateAuthCode(code, 'email', email, 'update').subscribe(
						res => console.log(res),
						err => alert(`Error validating verification code: ${err.error}`)
					)
				},
				err => alert(`Error verifying new email address: ${err.error}`)
			)
		}

		sure = false;
		if (phone != this.number) {
			sure = confirm('Changing your phone number will require verifying the new one with an authentication code. Are you sure you want to continue?')
		}
		if (sure) {
			this.auth.UpdateSMS(phone).subscribe(
				res => {
					// this.router.navigate(['signupauth'], { state: { userContact: phone, authMethod: 'sms', codeType: 'update',  userUpdate: user } })
					let code = prompt('Enter contact verification code')
					this.auth.ValidateAuthCode(code, 'sms', phone, 'update').subscribe(
						res => console.log(res),
						err => alert(`Error validating verification code: ${err.error}`)
					)
				},
				err => alert(`Error verifying new phone number: ${err.error}`)
			)
		}



		// this.users.UpdateUser(this.name, emailInput.value, phoneInput.value, bio, isPublic).subscribe(
		// 	res => window.location.reload(),
		// 	err => alert(`Error updating profile: ${err.error}`)
		// )
	}

	resetPassword() {
		this.router.navigateByUrl('passwordreset')
	}

	deleteProfile() {
		let del = confirm('Are you sure you want to delete your profile? This action is unreversible');
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
			res => window.location.reload(), 
			err => alert(`Error changing picture: ${err.error}`)
		)
	}
}
