import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly jsonOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		})
	}

	private readonly textOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'text/plain',
		})
	}

	constructor(private http: HttpClient) { }

	AddUser(user): Observable<any> {
		return this.http.post<any>(
			'http://localhost:5000/user/add',
			user,
			this.jsonOptions,
		)
	}

	AuthenticateUser(user): Observable<any> {
		return this.http.post<any>(
			'http://localhost:5000/user/authenticate',
			user,
			this.jsonOptions
		)
	}

	getCookie(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
		  let c = ca[i];
		  while (c.charAt(0) == ' ') {
			c = c.substring(1);
		  }
		  if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		  }
		}
		return "";
	}

	GetUser(): Observable<any> {
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Token': this.getCookie('access_token')
			})
		}
		return this.http.get<any>(
			'http://localhost:5000/user',
			httpOptions
		)
	}

	EmailResetPassword(email): Observable<any> {
		return this.http.post<any>(
			'http://localhost:5000/user/passwordreset/email',
			email,
			this.textOptions
		)
	}

	SMSResetPassword(sms): Observable<any> {
		return this.http.post<any>(
			'http://localhost:5000/user/passwordreset/sms',
			sms,
			this.textOptions
		)
	}

	ValidateResetCode(resetCode): Observable<any> {
		return this.http.post<any>(
			'http://localhost:5000/user/validatecode',
			resetCode,
			this.textOptions
		)
	}

	SetNewPassword(newPassword): Observable<any> {
		return this.http.post<any>(
			'http://localhost:5000/user/setpassword',
			newPassword,
			this.textOptions
		)
	}
}
