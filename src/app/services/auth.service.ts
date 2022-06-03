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

	SetNewPassword(newPassword): Observable<any> {
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'text/plain',
				'Accept': 'application/json',
				'Access-Token': this.getCookie('password_token')
			})
		}
		return this.http.post<any>(
			'http://localhost:5000/user/setpassword',
			newPassword,
			httpOptions
		)
	}

	EmailResetPassword(email): Observable<any> {
		return this.http.post<any>(
			'http://localhost:5000/code/passwordreset/email',
			email,
			this.textOptions
		)
	}

	SMSResetPassword(sms): Observable<any> {
		return this.http.post<any>(
			'http://localhost:5000/code/passwordreset/sms',
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
			host = 'http://localhost:5000/code/validate/sms'
		} else if (authMethod == 'email') {
			reset['email'] = userContact
			host = 'http://localhost:5000/code/validate/email'
		}
		return this.http.post<any>(
			host,
			reset,
			this.jsonOptions
		)
	}

	SMSVerification(sms): Observable<any> {
		return this.http.post<any>(
			'http://localhost:5000/code/verify/sms',
			sms,
			this.textOptions
		)
	}

	EmailVerification(email): Observable<any> {
		return this.http.post<any>(
			'http://localhost:5000/code/verify/email',
			email,
			this.textOptions
		)
	}

	DeleteUser(): Observable<any> {
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Token': this.getCookie('access_token')
			})
		}
		return this.http.delete<any>(
			'http://localhost:5000/user/delete',
			httpOptions
		)	
	}

	UpdateUser(user): Observable<any> {
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Token': this.getCookie('access_token')
			})
		}
		return this.http.put<any>(
			'http://localhost:5000/user/update',
			user,
			httpOptions
		)
	}
}
