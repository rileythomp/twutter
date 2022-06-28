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

	private readonly ApiAddr = 'http://localhost:5000'

	constructor(private http: HttpClient) { }

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

	AuthenticateUser(user): Observable<any> {
		return this.http.post<any>(
			`${this.ApiAddr}/user/authenticate`,
			user,
			this.jsonOptions
		)
	}

	SetNewPassword(newPassword): Observable<any> {
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'text/plain',
				'Accept': 'application/json',
				'Access-Token': this.getCookie('password_token')
			})
		}
		return this.http.post<any>(
			`${this.ApiAddr}/user/setpassword`,
			newPassword,
			httpOptions
		)
	}

	EmailResetPassword(email): Observable<any> {
		return this.http.post<any>(
			`${this.ApiAddr}/code/passwordreset/email`,
			email,
			this.textOptions
		)
	}

	SMSResetPassword(sms): Observable<any> {
		return this.http.post<any>(
			`${this.ApiAddr}/code/passwordreset/sms`,
			sms,
			this.textOptions
		)
	}

	ValidateResetCode(resetCode, authMethod, userContact): Observable<any> {
		let reset = {
			'reset_code': resetCode
		}
		let host = ''
		if (authMethod == 'sms') {
			reset['phone_number'] = userContact
			host = `${this.ApiAddr}/code/validate/sms`
		} else if (authMethod == 'email') {
			reset['email'] = userContact
			host = `${this.ApiAddr}/code/validate/email`
		}
		return this.http.post<any>(
			host,
			reset,
			this.jsonOptions
		)
	}

	SMSVerification(sms): Observable<any> {
		return this.http.post<any>(
			`${this.ApiAddr}/code/verify/sms`,
			sms,
			this.textOptions
		)
	}

	EmailVerification(email): Observable<any> {
		return this.http.post<any>(
			`${this.ApiAddr}/code/verify/email`,
			email,
			this.textOptions
		)
	}
}
