import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

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

	constructor(private users: UserService, private router: Router) { }

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
			},
			error => {
				this.router.navigateByUrl('login')
			}
		)
	}

	ngAfterViewChecked(): void {
		this.bioTA = <HTMLTextAreaElement>document.getElementById('bio')
		this.bioTA.style.height = "";
		this.bioTA.style.height = this.bioTA.scrollHeight + 3 + "px"
	}

	updateProfile() {
		let email = (<HTMLInputElement>document.getElementById('email')).value
		let number = (<HTMLInputElement>document.getElementById('number')).value
		let bio = (<HTMLTextAreaElement>document.getElementById('bio')).value
		let newUserInfo = {
			username: this.name,
			email: email,
			phone_number: number,
			bio: bio
		}
		this.users.UpdateUser(newUserInfo).subscribe(
			res => {
				window.location.reload()
			},
			err => {
				alert(err.error)
			}
		)
	}

	resetPassword() {
		this.router.navigateByUrl('passwordreset')
	}

	deleteProfile() {
		let del = confirm('Are you sure you want to delete your profile? This action is unreversible');
		if (del) {
			this.users.DeleteUser().subscribe(
				res => {
					this.router.navigateByUrl('signup')
				}, 
				err => {
					alert(err.error)
				}
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
				window.location.reload()
			}, 
			err => {
				alert(err.error)
			}
		)
	}

}
