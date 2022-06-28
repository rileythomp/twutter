import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonOpts, TextOpts, ApiAddr } from './defaults';
import { getCookie } from 'src/app/helpers'

import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient) { }

	AuthenticateUser(user): Observable<any> {
		return this.http.post<any>(
			`${ApiAddr}/user/authenticate`,
			user,
			JsonOpts
		)
	}

	SetNewPassword(newPassword): Observable<any> {
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'text/plain',
				'Accept': 'application/json',
				'Access-Token': getCookie('password_token')
			})
		}
		return this.http.post<any>(
			`${ApiAddr}/user/setpassword`,
			newPassword,
			httpOptions
		)
	}

	EmailResetPassword(email): Observable<any> {
		return this.http.post<any>(
			`${ApiAddr}/code/passwordreset/email`,
			email,
			TextOpts
		)
	}

	SMSResetPassword(sms): Observable<any> {
		return this.http.post<any>(
			`${ApiAddr}/code/passwordreset/sms`,
			sms,
			TextOpts
		)
	}

	ValidateResetCode(resetCode, authMethod, userContact): Observable<any> {
		let reset = {
			'reset_code': resetCode
		}
		let host = ''
		if (authMethod == 'sms') {
			reset['phone_number'] = userContact
			host = `${ApiAddr}/code/validate/sms`
		} else if (authMethod == 'email') {
			reset['email'] = userContact
			host = `${ApiAddr}/code/validate/email`
		}
		return this.http.post<any>(
			host,
			reset,
			JsonOpts
		)
	}

	SMSVerification(sms): Observable<any> {
		return this.http.post<any>(
			`${ApiAddr}/code/verify/sms`,
			sms,
			TextOpts
		)
	}

	EmailVerification(email): Observable<any> {
		return this.http.post<any>(
			`${ApiAddr}/code/verify/email`,
			email,
			TextOpts
		)
	}
}
