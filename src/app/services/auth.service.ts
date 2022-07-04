import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonOpts, TextOpts, ApiAddr, GetOpts, GetTextOpts, GetJsonOpts } from 'src/app/helpers';
import { HttpClient } from '@angular/common/http'

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
		let httpOptions = GetOpts('text/plain', 'application/json', 'password_token')
		return this.http.post<any>(
			`${ApiAddr}/user/setpassword`,
			newPassword,
			httpOptions
		)
	}

	ValidateAuthCode(authCode, authMethod, userContact, codeType): Observable<any> {
		let reset = {
			'auth_code': authCode,
			'code_type': codeType
		}
		if (authMethod == 'sms') {
			reset['phone_number'] = userContact
		} else if (authMethod == 'email') {
			reset['email'] = userContact
		}
		return this.http.post<any>(
			`${ApiAddr}/code/validate/${authMethod}`,
			reset,
			JsonOpts
		)
	}

	ValidateUpdateCode(authCode, authMethod, userContact, codeType): Observable<any> {
		let code = {
			'auth_code': authCode,
			'code_type': codeType
		}
		if (authMethod == 'sms') {
			code['phone_number'] = userContact
		} else if (authMethod == 'email') {
			code['email'] = userContact
		}
		return this.http.post<any>(
			`${ApiAddr}/code/update/${authMethod}/validate`,
			code,
			GetOpts('application/json', 'text/plain', 'access_token')
		)
	}

	UpdateEmail(email): Observable<any> {
		let httpOptions = GetTextOpts()
		return this.http.post<any>(
			`${ApiAddr}/code/update/email`,
			email,
			httpOptions
		)
	}

	UpdateSMS(sms): Observable<any> {
		let httpOptions = GetTextOpts()
		return this.http.post<any>(
			`${ApiAddr}/code/update/sms`,
			sms,
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

	EmailVerification(email): Observable<any> {
		return this.http.post<any>(
			`${ApiAddr}/code/verify/email`,
			email,
			TextOpts
		)
	}

	SMSVerification(sms): Observable<any> {
		return this.http.post<any>(
			`${ApiAddr}/code/verify/sms`,
			sms,
			TextOpts
		)
	}
}
