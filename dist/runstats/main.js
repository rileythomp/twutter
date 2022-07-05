(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/rileythomp/github/userauth/src/main.ts */"zUnb");


/***/ }),

/***/ "2MiI":
/*!*******************************************************!*\
  !*** ./src/app/components/header/header.component.ts ***!
  \*******************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/user.service */ "qfBg");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




class HeaderComponent {
    constructor(users, router) {
        this.users = users;
        this.router = router;
    }
    ngOnInit() { }
    logoutUser() {
        document.cookie = `access_token=; max-age=0; SameSite=None; Secure`;
    }
    homePage() {
        this.users.GetUser().subscribe(user => {
            this.router.navigateByUrl(user.username);
        }, err => this.router.navigateByUrl('login'));
    }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
HeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HeaderComponent, selectors: [["app-header"]], decls: 15, vars: 0, consts: [[1, "hero-head"], [1, "navbar"], [1, "container"], ["id", "navbarMenuHeroA", 1, "navbar-menu"], [1, "navbar-end"], [1, "navbar-item", 3, "click"], ["href", "/profile", 1, "navbar-item"], ["href", "/login", 1, "navbar-item"], ["routerLink", "/signup", 1, "navbar-item"], ["href", "/login", 1, "navbar-item", 3, "click"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "nav", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HeaderComponent_Template_a_click_5_listener() { return ctx.homePage(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, " Home ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " Profile ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " Login ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Sign Up ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HeaderComponent_Template_a_click_13_listener() { return ctx.logoutUser(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " Logout ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQubGVzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HeaderComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-header',
                templateUrl: './header.component.html',
                styleUrls: ['./header.component.less']
            }]
    }], function () { return [{ type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }]; }, null); })();


/***/ }),

/***/ "2X3M":
/*!*********************************************************************!*\
  !*** ./src/app/components/passwordreset/passwordreset.component.ts ***!
  \*********************************************************************/
/*! exports provided: PasswordresetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordresetComponent", function() { return PasswordresetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/auth.service */ "lGQG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




class PasswordresetComponent {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    ngOnInit() {
    }
    resetPassword(method) {
        this.authMethod = method;
        if (this.authMethod == 'sms') {
            let smsInput = document.getElementById('sms-number');
            this.userContact = smsInput.value;
            this.auth.CreateCode(this.userContact, 'passwordreset', 'sms').subscribe(res => {
                this.displayInputs('none', 'none', 'block', 'none');
            }, err => alert(`Error resetting password: ${err.error}`));
        }
        else if (this.authMethod == 'email') {
            let emailInput = document.getElementById('email');
            this.userContact = emailInput.value;
            this.auth.CreateCode(this.userContact, 'passwordreset', 'email').subscribe(res => this.displayInputs('none', 'none', 'block', 'none'), err => alert(`Error resetting password: ${err.error}`));
        }
    }
    displayInputs(emailReset, smsReset, resetCode, setPassword) {
        document.getElementById('email-reset').style.display = emailReset;
        document.getElementById('sms-reset').style.display = smsReset;
        document.getElementById('reset-code-page').style.display = resetCode;
        document.getElementById('set-password').style.display = setPassword;
    }
    validResetCode() {
        this.resetCode = document.getElementById('reset-code').value;
        this.auth.ValidateCode(this.resetCode, this.userContact, 'passwordreset', this.authMethod).subscribe(res => {
            this.displayInputs('none', 'none', 'none', 'block');
            document.cookie = `password_token=${res['token']}; max-age=${res['max_age']}; SameSite=None; Secure;`;
        }, err => alert('reset code not valid'));
    }
    setNewPassword() {
        let newPassword = document.getElementById('new-password').value;
        this.auth.SetNewPassword(newPassword).subscribe(res => {
            document.cookie = `password_token=; max-age0; SameSite=None; Secure;`;
            alert('Password reset, redirecting to login page');
            this.router.navigateByUrl('login');
        }, err => alert(`Error resetting password: ${err.error}`));
    }
    toggleResetMethod(method) {
        document.getElementById('email').value = '';
        document.getElementById('sms-number').value = '';
        if (method == 'sms') {
            this.displayInputs('none', 'block', 'none', 'none');
        }
        else if (method == 'email') {
            this.displayInputs('block', 'none', 'none', 'none');
        }
    }
}
PasswordresetComponent.ɵfac = function PasswordresetComponent_Factory(t) { return new (t || PasswordresetComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
PasswordresetComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PasswordresetComponent, selectors: [["app-passwordreset"]], decls: 34, vars: 0, consts: [[1, "column", "is-4", "is-offset-4"], [1, "title"], [1, "box"], ["id", "email-reset", 1, "field"], [1, "control"], ["id", "email", "type", "email", "placeholder", "Email", "autofocus", "", 1, "input", "is-large"], [1, "toggle-method", 3, "click"], [1, "button", "is-block", "is-info", "is-large", "is-fullwidth", 3, "click"], ["id", "sms-reset", 1, "hidden", "field"], ["id", "sms-number", "type", "tel", "placeholder", "SMS Number", "autofocus", "", 1, "input", "is-large"], ["id", "reset-code-page", 1, "hidden", "field"], ["id", "reset-code", "type", "tel", "placeholder", "Reset code", "autofocus", "", 1, "input", "is-large"], ["id", "set-password", 1, "field"], ["id", "new-password", "type", "password", "placeholder", "New password", "autofocus", "", 1, "input", "is-large"]], template: function PasswordresetComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Password Reset");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PasswordresetComponent_Template_div_click_7_listener() { return ctx.toggleResetMethod("sms"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Use SMS to reset password");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PasswordresetComponent_Template_button_click_11_listener() { return ctx.resetPassword("email"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Send Reset Code");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PasswordresetComponent_Template_div_click_16_listener() { return ctx.toggleResetMethod("email"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Use Email to reset password");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PasswordresetComponent_Template_button_click_20_listener() { return ctx.resetPassword("sms"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Send reset code");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PasswordresetComponent_Template_button_click_26_listener() { return ctx.validResetCode(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Submit reset code");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PasswordresetComponent_Template_button_click_32_listener() { return ctx.setNewPassword(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Reset password");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".toggle-method[_ngcontent-%COMP%] {\n  margin-top: 0.5em;\n  margin-bottom: 0.5em;\n}\n#sms-reset[_ngcontent-%COMP%], #reset-code-page[_ngcontent-%COMP%], #set-password[_ngcontent-%COMP%] {\n  display: none;\n}\n#reset-code[_ngcontent-%COMP%], #new-password[_ngcontent-%COMP%] {\n  margin-bottom: 1em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JpbGV5dGhvbXAvZ2l0aHViL3VzZXJhdXRoL3NyYy9hcHAvY29tcG9uZW50cy9wYXNzd29yZHJlc2V0L3Bhc3N3b3JkcmVzZXQuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvcGFzc3dvcmRyZXNldC9wYXNzd29yZHJlc2V0LmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksaUJBQUE7RUFDQSxvQkFBQTtBQ0NKO0FERUE7OztFQUNJLGFBQUE7QUNFSjtBRENBOztFQUNJLGtCQUFBO0FDRUoiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3Bhc3N3b3JkcmVzZXQvcGFzc3dvcmRyZXNldC5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIi50b2dnbGUtbWV0aG9kIHtcbiAgICBtYXJnaW4tdG9wOiAwLjVlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAwLjVlbTtcbn1cblxuI3Ntcy1yZXNldCwgI3Jlc2V0LWNvZGUtcGFnZSwgI3NldC1wYXNzd29yZCB7XG4gICAgZGlzcGxheTogbm9uZTtcbn1cblxuI3Jlc2V0LWNvZGUsICNuZXctcGFzc3dvcmQge1xuICAgIG1hcmdpbi1ib3R0b206IDFlbTtcbn0iLCIudG9nZ2xlLW1ldGhvZCB7XG4gIG1hcmdpbi10b3A6IDAuNWVtO1xuICBtYXJnaW4tYm90dG9tOiAwLjVlbTtcbn1cbiNzbXMtcmVzZXQsXG4jcmVzZXQtY29kZS1wYWdlLFxuI3NldC1wYXNzd29yZCB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4jcmVzZXQtY29kZSxcbiNuZXctcGFzc3dvcmQge1xuICBtYXJnaW4tYm90dG9tOiAxZW07XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PasswordresetComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-passwordreset',
                templateUrl: './passwordreset.component.html',
                styleUrls: ['./passwordreset.component.less']
            }]
    }], function () { return [{ type: src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }]; }, null); })();


/***/ }),

/***/ "5Ey6":
/*!*******************************************************!*\
  !*** ./src/app/components/signup/signup.component.ts ***!
  \*******************************************************/
/*! exports provided: SignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupComponent", function() { return SignupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/auth.service */ "lGQG");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/user.service */ "qfBg");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");





class SignupComponent {
    constructor(auth, users, router) {
        this.auth = auth;
        this.users = users;
        this.router = router;
    }
    ngOnInit() {
    }
    signupUser() {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let emailInput = document.getElementById('email');
        let phoneInput = document.getElementById('phone-number');
        let isPublic = document.getElementById('is-private').checked ? 0 : 1;
        if (!emailInput.validity.valid) {
            emailInput.focus();
            return;
        }
        // remove non-numeric characters
        let phoneNum = phoneInput.value.replace(/\D/g, '');
        if (phoneNum.length != 10) {
            phoneInput.value = '';
            phoneInput.focus();
            return;
        }
        this.users.AddUser(username, password, emailInput.value, phoneNum, isPublic).subscribe(res => {
            // this.auth.CreateCode(emailInput.value, 'verify', 'email').subscribe(
            // 	res => {
            // 		this.router.navigate(
            //			['signupauth'],
            // 			{ state: { userContact: emailInput.value, authMethod: 'sms' } }) 
            // 	},
            // 	err => {
            // 		alert(err.error)
            // 	}
            // )
            this.auth.CreateCode(phoneNum, 'verify', 'sms').subscribe(res => this.router.navigate(['signupauth'], { state: { userContact: phoneNum, authMethod: 'sms' } }), err => alert(`Error verifying account: ${err.error}`));
        }, err => alert(err.error));
    }
}
SignupComponent.ɵfac = function SignupComponent_Factory(t) { return new (t || SignupComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
SignupComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SignupComponent, selectors: [["app-signup"]], decls: 22, vars: 0, consts: [[1, "column", "is-4", "is-offset-4"], [1, "title"], [1, "box"], [1, "field"], [1, "control"], ["id", "email", "type", "email", "name", "email", "placeholder", "Email", "autofocus", "", 1, "input", "is-large"], ["id", "phone-number", "type", "email", "name", "tel", "placeholder", "Phone number", "autofocus", "", 1, "input", "is-large"], ["id", "username", "type", "text", "name", "username", "placeholder", "Username", "autofocus", "", 1, "input", "is-large"], ["id", "password", "type", "password", "name", "password", "placeholder", "Password", 1, "input", "is-large"], ["id", "is-private", "type", "checkbox", "checked", "checked"], [1, "button", "is-block", "is-info", "is-large", "is-fullwidth", 3, "click"]], template: function SignupComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Sign Up");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " Private Profile ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SignupComponent_Template_button_click_20_listener() { return ctx.signupUser(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Sign Up");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2lnbnVwL3NpZ251cC5jb21wb25lbnQubGVzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SignupComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-signup',
                templateUrl: './signup.component.html',
                styleUrls: ['./signup.component.less']
            }]
    }], function () { return [{ type: src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"] }, { type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }]; }, null); })();


/***/ }),

/***/ "Afm0":
/*!****************************!*\
  !*** ./src/app/helpers.ts ***!
  \****************************/
/*! exports provided: ApiAddr, GetCookie, JsonOpts, TextOpts, GetOpts, GetJsonOpts, GetTextOpts, GetImgOpts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiAddr", function() { return ApiAddr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetCookie", function() { return GetCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonOpts", function() { return JsonOpts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextOpts", function() { return TextOpts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetOpts", function() { return GetOpts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetJsonOpts", function() { return GetJsonOpts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetTextOpts", function() { return GetTextOpts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetImgOpts", function() { return GetImgOpts; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");

const ApiAddr = 'http://localhost:5000';
function GetCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
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

const JsonOpts = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    })
};
const TextOpts = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({
        'Content-Type': 'text/plain',
    })
};
function GetOpts(contentType, accept, token) {
    return {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({
            'Content-Type': contentType,
            'Accept': accept,
            'Access-Token': GetCookie(token)
        })
    };
}

function GetJsonOpts() {
    return GetOpts('application/json', 'application/json', 'access_token');
}

function GetTextOpts() {
    return GetOpts('text/plain', 'text/plain', 'access_token');
}

function GetImgOpts() {
    return {
        headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({
            'Accept': 'text/plain ',
            'Access-Token': GetCookie('access_token')
        })
    };
}



/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "DZ0t":
/*!*********************************************************!*\
  !*** ./src/app/components/profile/profile.component.ts ***!
  \*********************************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/user.service */ "qfBg");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/auth.service */ "lGQG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _posts_posts_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./posts/posts.component */ "O67h");
/* harmony import */ var _likes_likes_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./likes/likes.component */ "LhXH");








function ProfileComponent_app_posts_39_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-posts");
} }
function ProfileComponent_app_likes_40_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-likes");
} }
class ProfileComponent {
    constructor(users, auth, router) {
        this.users = users;
        this.auth = auth;
        this.router = router;
        this.showPosts = true;
    }
    ngOnInit() {
        this.bioTA = document.getElementById('bio');
        this.users.GetUser().subscribe(user => {
            let num = user.phone_number;
            this.email = user.email;
            this.name = user.username;
            this.number = num.slice(0, 3) + '-' + num.slice(3, 6) + '-' + num.slice(6);
            this.bio = user.bio;
            this.imgUrl = user.imgUrl;
            this.isPrivate = user.is_public != '1';
        }, err => this.router.navigateByUrl('login'));
    }
    ngAfterViewChecked() {
        this.bioTA = document.getElementById('bio');
        this.bioTA.style.height = "";
        this.bioTA.style.height = this.bioTA.scrollHeight + 3 + "px";
    }
    createAuthCode(method, userContact, input) {
        let sure = confirm(`Changing your ${method == 'sms' ? 'phone number' : 'email address'} will require verifying the new one with an authentication code. Are you sure you want to continue?`);
        if (sure) {
            this.userContact = userContact;
            this.action = 'update';
            this.method = method;
            this.auth.CreateAuthCode(userContact, this.action, method).subscribe(res => this.showCodeInput(true), err => {
                alert(`Error creating verification code: ${err.error}`);
                if (err.status == 303) {
                    this.showCodeInput(true);
                }
                else {
                    input.focus();
                }
            });
        }
    }
    updateProfile() {
        let emailInput = document.getElementById('email');
        let email = emailInput.value;
        let phoneInput = document.getElementById('number');
        let phone = phoneInput.value;
        let bio = document.getElementById('bio').value;
        let isPublic = document.getElementById('is-private').checked ? 0 : 1;
        if (!emailInput.validity.valid) {
            emailInput.focus();
            return;
        }
        // remove non-numeric characters
        let phoneNum = phone.replace(/\D/g, '');
        if (phoneNum.length != 10) {
            phoneInput.focus();
            return;
        }
        if (email != this.email && phone != this.number) {
            alert('Sorry, due to 2FA requirements you must change your email and phone number separately.');
            return;
        }
        this.update = {
            name: this.name,
            email: email,
            phone: phone,
            bio: bio,
            isPublic: isPublic
        };
        if (email != this.email) {
            this.createAuthCode('email', email, emailInput);
            return;
        }
        if (phone != this.number) {
            this.createAuthCode('sms', phone, phoneInput);
            return;
        }
        this.users.UpdateUser(this.name, email, phone, bio, isPublic).subscribe(res => this.ngOnInit(), err => alert(`Error updating profile: ${err.error}`));
    }
    showCodeInput(show) {
        document.getElementById('entercode').style.display = show ? 'block' : 'none';
        document.getElementById('overlay').style.display = show ? 'block' : 'none';
        document.getElementById('update-code').value = '';
    }
    submitCode() {
        let code = document.getElementById('update-code').value;
        this.auth.ValidateAuthCode(code, this.userContact, this.action, this.method).subscribe(res => {
            this.users.UpdateUser(this.update.name, this.update.email, this.update.phone, this.update.bio, this.update.isPublic).subscribe(res => this.ngOnInit(), err => alert(`Error updating user: ${err.error}`));
        }, err => alert(`Error validating verification code: ${err.error}`));
        this.showCodeInput(false);
    }
    resetPassword() {
        this.router.navigateByUrl('passwordreset');
    }
    deleteProfile() {
        let del = confirm('Are you sure you want to delete your profile? This action is unreversible');
        if (del) {
            this.users.DeleteUser().subscribe(res => this.router.navigateByUrl('signup'), err => alert(`Error deleting profile: ${err.error}`));
        }
    }
    changePicture() {
        let file = document.getElementById('image-file').files[0];
        if (file == undefined || file == null) {
            alert('Could not find image');
            return;
        }
        var formData = new FormData();
        formData.append('file', file);
        this.users.ChangePicture(formData).subscribe(res => window.location.reload(), err => alert(`Error changing picture: ${err.error}`));
    }
}
ProfileComponent.ɵfac = function ProfileComponent_Factory(t) { return new (t || ProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
ProfileComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProfileComponent, selectors: [["app-profile"]], decls: 49, vars: 8, consts: [["id", "user-page"], ["id", "profile"], ["id", "name"], ["alt", "", 3, "src"], ["id", "image-file", "type", "file", "accept", ".png, .jpg, .jpeg", 3, "change"], [1, "profile-input"], ["oninput", "this.style.height = \"\";this.style.height = this.scrollHeight + 3 + \"px\"", "id", "bio"], ["id", "email", "type", "email", 3, "value"], ["id", "number", "type", "tel", 3, "value"], ["id", "is-private", "type", "checkbox", 3, "checked"], [3, "click"], [1, "navbar-start"], [1, "navbar-item", 3, "click"], ["id", "posts-display"], [4, "ngIf"], ["id", "overlay"], ["id", "entercode", 1, "form-popup"], [1, "form-container"], ["id", "update-code", "type", "text", "placeholder", "Enter contact verification code", "name", "authcode", "required", ""], ["type", "button", 1, "btn", 3, "click"], ["type", "button", 1, "btn", "cancel", 3, "click"]], template: function ProfileComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function ProfileComponent_Template_input_change_6_listener() { return ctx.changePicture(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " Bio: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "textarea", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Email: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " Number ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "\u00A0 Private Profile");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProfileComponent_Template_button_click_24_listener() { return ctx.updateProfile(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Update Profile");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProfileComponent_Template_button_click_27_listener() { return ctx.resetPassword(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Reset Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProfileComponent_Template_button_click_30_listener() { return ctx.deleteProfile(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Delete Profile");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProfileComponent_Template_a_click_34_listener() { return ctx.showPosts = true; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Posts");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProfileComponent_Template_a_click_36_listener() { return ctx.showPosts = false; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Likes");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](39, ProfileComponent_app_posts_39_Template, 1, 0, "app-posts", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](40, ProfileComponent_app_likes_40_Template, 1, 0, "app-likes", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](41, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "input", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "button", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProfileComponent_Template_button_click_45_listener() { return ctx.submitCode(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Submit code");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProfileComponent_Template_button_click_47_listener() { return ctx.showCodeInput(false); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "Close");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("src", ctx.imgUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.bio);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx.email);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx.number);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("checked", ctx.isPrivate);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showPosts);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.showPosts);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _posts_posts_component__WEBPACK_IMPORTED_MODULE_5__["PostsComponent"], _likes_likes_component__WEBPACK_IMPORTED_MODULE_6__["LikesComponent"]], styles: ["#profile[_ngcontent-%COMP%] {\n  margin-left: 1em;\n  width: 25em;\n  float: left;\n}\n.navbar-item[_ngcontent-%COMP%] {\n  padding-left: 0;\n  padding-right: 1em;\n}\n#name[_ngcontent-%COMP%] {\n  font-size: 2em;\n}\ntextarea[_ngcontent-%COMP%] {\n  width: 20em;\n  padding: 0.25em;\n  resize: none;\n}\ninput[type=text][_ngcontent-%COMP%], input[type=email][_ngcontent-%COMP%], input[type=tel][_ngcontent-%COMP%] {\n  width: 20em;\n}\ninput[_ngcontent-%COMP%] {\n  margin-bottom: 1em;\n}\nbutton[_ngcontent-%COMP%] {\n  margin-bottom: 1em;\n  width: 8em;\n}\nimg[_ngcontent-%COMP%] {\n  width: 10em;\n  height: 10em;\n}\n\n.form-popup[_ngcontent-%COMP%] {\n  display: none;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  border: 3px solid #f1f1f1;\n  z-index: 9;\n  \n}\n.form-popup[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%] {\n  max-width: 300px;\n  padding: 10px;\n  background-color: white;\n}\n.form-popup[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  background-color: #04AA6D;\n  color: white;\n  padding: 16px 20px;\n  border: none;\n  cursor: pointer;\n  width: 100%;\n  margin-bottom: 10px;\n  opacity: 0.8;\n}\n.form-popup[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .cancel[_ngcontent-%COMP%] {\n  background-color: red;\n}\n.form-popup[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover, .form-popup[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .open-button[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n.form-popup[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 15px;\n  margin: 5px 0 22px 0;\n  border: none;\n  background: #f1f1f1;\n}\n.form-popup[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]:focus {\n  background-color: #ddd;\n  outline: none;\n}\n#overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  display: none;\n  background-color: #000;\n  opacity: 0.5;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JpbGV5dGhvbXAvZ2l0aHViL3VzZXJhdXRoL3NyYy9hcHAvY29tcG9uZW50cy9wcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtBQ0NKO0FERUE7RUFDSSxlQUFBO0VBQ0Esa0JBQUE7QUNBSjtBREdBO0VBQ0ksY0FBQTtBQ0RKO0FESUE7RUFDSSxXQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7QUNGSjtBREtBOzs7RUFDSSxXQUFBO0FDREo7QURJQTtFQUNJLGtCQUFBO0FDRko7QURLQTtFQUNJLGtCQUFBO0VBQ0EsVUFBQTtBQ0hKO0FETUE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtBQ0pKO0FBQ0EsdUNBQXVDO0FET3ZDO0VBQ0MsYUFBQTtFQUNBLGVBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLGdDQUFBO0VBQ0EseUJBQUE7RUFDQSxVQUFBO0VDTEMscUNBQXFDO0FBQ3ZDO0FESEE7RUFXRSxnQkFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtBQ0xGO0FEUkE7RUFnQkcseUJBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUNMSDtBRGxCQTtFQTJCRyxxQkFBQTtBQ05IO0FEckJBOztFQStCRyxVQUFBO0FDTkg7QUR6QkE7RUFtQ0csV0FBQTtFQUNBLGFBQUE7RUFDQSxvQkFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtBQ1BIO0FEaENBO0VBMkNHLHNCQUFBO0VBQ0EsYUFBQTtBQ1JIO0FEYUE7RUFDQyxlQUFBO0VBQ0EsT0FBQTtFQUNBLE1BQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7QUNYRCIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiI3Byb2ZpbGUge1xuICAgIG1hcmdpbi1sZWZ0OiAxZW07XG4gICAgd2lkdGg6IDI1ZW07XG4gICAgZmxvYXQ6IGxlZnQ7XG59XG5cbi5uYXZiYXItaXRlbSB7XG4gICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgIHBhZGRpbmctcmlnaHQ6IDFlbTtcbn1cblxuI25hbWUge1xuICAgIGZvbnQtc2l6ZTogMmVtO1xufVxuXG50ZXh0YXJlYSB7XG4gICAgd2lkdGg6IDIwZW07XG4gICAgcGFkZGluZzogMC4yNWVtO1xuICAgIHJlc2l6ZTogbm9uZTtcbn1cblxuaW5wdXRbdHlwZT10ZXh0XSwgaW5wdXRbdHlwZT1lbWFpbF0sIGlucHV0W3R5cGU9dGVsXSB7XG4gICAgd2lkdGg6IDIwZW07XG59XG5cbmlucHV0IHtcbiAgICBtYXJnaW4tYm90dG9tOiAxZW07XG59XG5cbmJ1dHRvbiB7XG4gICAgbWFyZ2luLWJvdHRvbTogMWVtO1xuICAgIHdpZHRoOiA4ZW07XG59XG5cbmltZyB7XG4gICAgd2lkdGg6IDEwZW07XG4gICAgaGVpZ2h0OiAxMGVtO1xufVxuICBcbi8qIFRoZSBwb3B1cCBmb3JtIC0gaGlkZGVuIGJ5IGRlZmF1bHQgKi9cbi5mb3JtLXBvcHVwIHtcblx0ZGlzcGxheTogbm9uZTtcblx0cG9zaXRpb246IGZpeGVkO1xuXHR0b3A6IDUwJTtcblx0bGVmdDogNTAlO1xuXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcblx0Ym9yZGVyOiAzcHggc29saWQgI2YxZjFmMTtcblx0ei1pbmRleDogOTtcblxuXHQvKiBBZGQgc3R5bGVzIHRvIHRoZSBmb3JtIGNvbnRhaW5lciAqL1xuXHQuZm9ybS1jb250YWluZXIge1xuXHRcdG1heC13aWR0aDogMzAwcHg7XG5cdFx0cGFkZGluZzogMTBweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcblxuXHRcdC5idG4ge1xuXHRcdFx0YmFja2dyb3VuZC1jb2xvcjogIzA0QUE2RDtcblx0XHRcdGNvbG9yOiB3aGl0ZTtcblx0XHRcdHBhZGRpbmc6IDE2cHggMjBweDtcblx0XHRcdGJvcmRlcjogbm9uZTtcblx0XHRcdGN1cnNvcjogcG9pbnRlcjtcblx0XHRcdHdpZHRoOiAxMDAlO1xuXHRcdFx0bWFyZ2luLWJvdHRvbToxMHB4O1xuXHRcdFx0b3BhY2l0eTogMC44O1xuXHRcdH1cblxuXHRcdC5jYW5jZWwge1xuXHRcdFx0YmFja2dyb3VuZC1jb2xvcjogcmVkO1xuXHRcdH1cblxuXHRcdC5idG46aG92ZXIsIC5vcGVuLWJ1dHRvbjpob3ZlciB7XG5cdFx0XHRvcGFjaXR5OiAxO1xuXHRcdH1cblxuXHRcdGlucHV0W3R5cGU9dGV4dF0ge1xuXHRcdFx0d2lkdGg6IDEwMCU7XG5cdFx0XHRwYWRkaW5nOiAxNXB4O1xuXHRcdFx0bWFyZ2luOiA1cHggMCAyMnB4IDA7XG5cdFx0XHRib3JkZXI6IG5vbmU7XG5cdFx0XHRiYWNrZ3JvdW5kOiAjZjFmMWYxO1xuXHRcdH1cblxuXHRcdGlucHV0W3R5cGU9dGV4dF06Zm9jdXMge1xuXHRcdFx0YmFja2dyb3VuZC1jb2xvcjogI2RkZDtcblx0XHRcdG91dGxpbmU6IG5vbmU7XG5cdFx0fVxuXHR9XG59XG5cbiNvdmVybGF5IHtcblx0cG9zaXRpb246Zml4ZWQ7XG5cdGxlZnQ6MDtcblx0dG9wOjA7XG5cdHdpZHRoOjEwMHZ3O1xuXHRoZWlnaHQ6MTAwdmg7XG5cdGRpc3BsYXk6bm9uZTtcblx0YmFja2dyb3VuZC1jb2xvcjojMDAwO1xuXHRvcGFjaXR5OjAuNTtcbn0iLCIjcHJvZmlsZSB7XG4gIG1hcmdpbi1sZWZ0OiAxZW07XG4gIHdpZHRoOiAyNWVtO1xuICBmbG9hdDogbGVmdDtcbn1cbi5uYXZiYXItaXRlbSB7XG4gIHBhZGRpbmctbGVmdDogMDtcbiAgcGFkZGluZy1yaWdodDogMWVtO1xufVxuI25hbWUge1xuICBmb250LXNpemU6IDJlbTtcbn1cbnRleHRhcmVhIHtcbiAgd2lkdGg6IDIwZW07XG4gIHBhZGRpbmc6IDAuMjVlbTtcbiAgcmVzaXplOiBub25lO1xufVxuaW5wdXRbdHlwZT10ZXh0XSxcbmlucHV0W3R5cGU9ZW1haWxdLFxuaW5wdXRbdHlwZT10ZWxdIHtcbiAgd2lkdGg6IDIwZW07XG59XG5pbnB1dCB7XG4gIG1hcmdpbi1ib3R0b206IDFlbTtcbn1cbmJ1dHRvbiB7XG4gIG1hcmdpbi1ib3R0b206IDFlbTtcbiAgd2lkdGg6IDhlbTtcbn1cbmltZyB7XG4gIHdpZHRoOiAxMGVtO1xuICBoZWlnaHQ6IDEwZW07XG59XG4vKiBUaGUgcG9wdXAgZm9ybSAtIGhpZGRlbiBieSBkZWZhdWx0ICovXG4uZm9ybS1wb3B1cCB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gIGJvcmRlcjogM3B4IHNvbGlkICNmMWYxZjE7XG4gIHotaW5kZXg6IDk7XG4gIC8qIEFkZCBzdHlsZXMgdG8gdGhlIGZvcm0gY29udGFpbmVyICovXG59XG4uZm9ybS1wb3B1cCAuZm9ybS1jb250YWluZXIge1xuICBtYXgtd2lkdGg6IDMwMHB4O1xuICBwYWRkaW5nOiAxMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cbi5mb3JtLXBvcHVwIC5mb3JtLWNvbnRhaW5lciAuYnRuIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzA0QUE2RDtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiAxNnB4IDIwcHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgb3BhY2l0eTogMC44O1xufVxuLmZvcm0tcG9wdXAgLmZvcm0tY29udGFpbmVyIC5jYW5jZWwge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG4uZm9ybS1wb3B1cCAuZm9ybS1jb250YWluZXIgLmJ0bjpob3Zlcixcbi5mb3JtLXBvcHVwIC5mb3JtLWNvbnRhaW5lciAub3Blbi1idXR0b246aG92ZXIge1xuICBvcGFjaXR5OiAxO1xufVxuLmZvcm0tcG9wdXAgLmZvcm0tY29udGFpbmVyIGlucHV0W3R5cGU9dGV4dF0ge1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMTVweDtcbiAgbWFyZ2luOiA1cHggMCAyMnB4IDA7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogI2YxZjFmMTtcbn1cbi5mb3JtLXBvcHVwIC5mb3JtLWNvbnRhaW5lciBpbnB1dFt0eXBlPXRleHRdOmZvY3VzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RkZDtcbiAgb3V0bGluZTogbm9uZTtcbn1cbiNvdmVybGF5IHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIHdpZHRoOiAxMDB2dztcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgZGlzcGxheTogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbiAgb3BhY2l0eTogMC41O1xufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProfileComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-profile',
                templateUrl: './profile.component.html',
                styleUrls: ['./profile.component.less']
            }]
    }], function () { return [{ type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"] }, { type: src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }]; }, null); })();


/***/ }),

/***/ "LhXH":
/*!*************************************************************!*\
  !*** ./src/app/components/profile/likes/likes.component.ts ***!
  \*************************************************************/
/*! exports provided: LikesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LikesComponent", function() { return LikesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_posts_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/posts.service */ "jwUf");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _post_post_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../post/post.component */ "YzH7");






function LikesComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-post", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const p_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("post", p_r1);
} }
class LikesComponent {
    constructor(postsApi) {
        this.postsApi = postsApi;
        this.sortBy = 'newest';
    }
    ngOnInit() {
        this.postsApi.GetLikedPosts(this.sortBy).subscribe(res => this.posts = res, err => console.log(`Error getting posts: ${err.error}`));
    }
    getLikedPosts(ev) {
        this.sortBy = ev.target.value;
        this.postsApi.GetLikedPosts(this.sortBy).subscribe(res => this.posts = res, err => console.log(`Error getting posts: ${err.error}`));
    }
}
LikesComponent.ɵfac = function LikesComponent_Factory(t) { return new (t || LikesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_posts_service__WEBPACK_IMPORTED_MODULE_1__["PostsService"])); };
LikesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LikesComponent, selectors: [["app-likes"]], decls: 14, vars: 1, consts: [["id", "liked-posts"], ["for", "sort"], ["name", "sort", "id", "sortby", 3, "change"], ["value", "newest"], ["value", "oldest"], ["value", "liked"], ["value", "disliked"], ["class", "post", 4, "ngFor", "ngForOf"], [1, "post"], [3, "post"]], template: function LikesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Sort by:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function LikesComponent_Template_select_change_4_listener($event) { return ctx.getLikedPosts($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Newest");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "option", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Oldest");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "option", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Most Liked");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Most disliked");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, LikesComponent_div_13_Template, 2, 1, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.posts);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _post_post_component__WEBPACK_IMPORTED_MODULE_4__["PostComponent"]], styles: ["#liked-posts[_ngcontent-%COMP%] {\n  margin-left: 26em;\n  margin-right: 1em;\n  width: 40em;\n}\n.post[_ngcontent-%COMP%] {\n  margin-bottom: 1em;\n  margin-top: 1em;\n  width: 40em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JpbGV5dGhvbXAvZ2l0aHViL3VzZXJhdXRoL3NyYy9hcHAvY29tcG9uZW50cy9wcm9maWxlL2xpa2VzL2xpa2VzLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9jb21wb25lbnRzL3Byb2ZpbGUvbGlrZXMvbGlrZXMuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtBQ0NKO0FERUE7RUFDSSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0FDQUoiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3Byb2ZpbGUvbGlrZXMvbGlrZXMuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjbGlrZWQtcG9zdHMge1xuICAgIG1hcmdpbi1sZWZ0OiAyNmVtO1xuICAgIG1hcmdpbi1yaWdodDogMWVtO1xuICAgIHdpZHRoOiA0MGVtO1xufVxuXG4ucG9zdCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMWVtO1xuICAgIG1hcmdpbi10b3A6IDFlbTtcbiAgICB3aWR0aDogNDBlbTtcbn0iLCIjbGlrZWQtcG9zdHMge1xuICBtYXJnaW4tbGVmdDogMjZlbTtcbiAgbWFyZ2luLXJpZ2h0OiAxZW07XG4gIHdpZHRoOiA0MGVtO1xufVxuLnBvc3Qge1xuICBtYXJnaW4tYm90dG9tOiAxZW07XG4gIG1hcmdpbi10b3A6IDFlbTtcbiAgd2lkdGg6IDQwZW07XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LikesComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-likes',
                templateUrl: './likes.component.html',
                styleUrls: ['./likes.component.less']
            }]
    }], function () { return [{ type: src_app_services_posts_service__WEBPACK_IMPORTED_MODULE_1__["PostsService"] }]; }, null); })();


/***/ }),

/***/ "NMvn":
/*!**********************************************************************!*\
  !*** ./src/app/components/userpage/userposts/userposts.component.ts ***!
  \**********************************************************************/
/*! exports provided: UserpostsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserpostsComponent", function() { return UserpostsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_posts_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/posts.service */ "jwUf");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _post_post_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../post/post.component */ "YzH7");







function UserpostsComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-post", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const p_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("post", p_r1);
} }
class UserpostsComponent {
    constructor(route, postsApi) {
        this.route = route;
        this.postsApi = postsApi;
        this.sortBy = 'newest';
    }
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.username = params['username'];
            this.postsApi.GetPostsByUsername(this.username, this.sortBy).subscribe(res => this.posts = res, err => console.log(`Error getting posts: ${err.error}`));
        });
    }
    getPosts(ev) {
        this.sortBy = ev.target.value;
        this.postsApi.GetPostsByUsername(this.username, this.sortBy).subscribe(res => this.posts = res, err => console.log(`Error getting posts: ${err.error}`));
    }
}
UserpostsComponent.ɵfac = function UserpostsComponent_Factory(t) { return new (t || UserpostsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_posts_service__WEBPACK_IMPORTED_MODULE_2__["PostsService"])); };
UserpostsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UserpostsComponent, selectors: [["app-userposts"]], decls: 14, vars: 1, consts: [["id", "user-posts"], ["for", "sort"], ["name", "sort", "id", "sortby", 3, "change"], ["value", "newest"], ["value", "oldest"], ["value", "liked"], ["value", "disliked"], ["class", "post", 4, "ngFor", "ngForOf"], [1, "post"], [3, "post"]], template: function UserpostsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Sort by:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function UserpostsComponent_Template_select_change_4_listener($event) { return ctx.getPosts($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Newest");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "option", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Oldest");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "option", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Most Liked");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Most disliked");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, UserpostsComponent_div_13_Template, 2, 1, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.posts);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _post_post_component__WEBPACK_IMPORTED_MODULE_5__["PostComponent"]], styles: ["#user-posts[_ngcontent-%COMP%] {\n  margin-left: 26em;\n  margin-right: 1em;\n  padding-left: 1em;\n}\n.post[_ngcontent-%COMP%] {\n  margin-bottom: 1em;\n  margin-top: 1em;\n  width: 40em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JpbGV5dGhvbXAvZ2l0aHViL3VzZXJhdXRoL3NyYy9hcHAvY29tcG9uZW50cy91c2VycGFnZS91c2VycG9zdHMvdXNlcnBvc3RzLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9jb21wb25lbnRzL3VzZXJwYWdlL3VzZXJwb3N0cy91c2VycG9zdHMuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7QUNDSjtBREVBO0VBQ0ksa0JBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtBQ0FKIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy91c2VycGFnZS91c2VycG9zdHMvdXNlcnBvc3RzLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiI3VzZXItcG9zdHMge1xuICAgIG1hcmdpbi1sZWZ0OiAyNmVtO1xuICAgIG1hcmdpbi1yaWdodDogMWVtO1xuICAgIHBhZGRpbmctbGVmdDogMWVtO1xufVxuXG4ucG9zdCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMWVtO1xuICAgIG1hcmdpbi10b3A6IDFlbTtcbiAgICB3aWR0aDogNDBlbTtcbn0iLCIjdXNlci1wb3N0cyB7XG4gIG1hcmdpbi1sZWZ0OiAyNmVtO1xuICBtYXJnaW4tcmlnaHQ6IDFlbTtcbiAgcGFkZGluZy1sZWZ0OiAxZW07XG59XG4ucG9zdCB7XG4gIG1hcmdpbi1ib3R0b206IDFlbTtcbiAgbWFyZ2luLXRvcDogMWVtO1xuICB3aWR0aDogNDBlbTtcbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserpostsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-userposts',
                templateUrl: './userposts.component.html',
                styleUrls: ['./userposts.component.less']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] }, { type: src_app_services_posts_service__WEBPACK_IMPORTED_MODULE_2__["PostsService"] }]; }, null); })();


/***/ }),

/***/ "O67h":
/*!*************************************************************!*\
  !*** ./src/app/components/profile/posts/posts.component.ts ***!
  \*************************************************************/
/*! exports provided: PostsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostsComponent", function() { return PostsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var src_app_services_posts_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/posts.service */ "jwUf");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");







function PostsComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "textarea", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PostsComponent_div_21_Template_button_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const p_r1 = ctx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.deletePost(p_r1.post_id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Delete Post");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PostsComponent_div_21_Template_button_click_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const p_r1 = ctx.$implicit; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r4.editPost($event, p_r1.post_id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Edit Post");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PostsComponent_div_21_Template_button_click_13_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const p_r1 = ctx.$implicit; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.updatePost(p_r1.post_id, !p_r1.is_public); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Update Post");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function PostsComponent_div_21_Template_input_change_15_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const p_r1 = ctx.$implicit; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.changePostPrivacy($event, p_r1.post_id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "\u00A0 Private Post");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const p_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("id", p_r1.post_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", p_r1.post, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("id", "", p_r1.post_id, "-edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Published: ", p_r1.published, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Likes: ", p_r1.likes, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("id", "", p_r1.post_id, "-update");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("id", "", p_r1.post_id, "-private");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("checked", !p_r1.is_public);
} }
class PostsComponent {
    constructor(postsApi, router) {
        this.postsApi = postsApi;
        this.router = router;
        this.sortBy = 'newest';
    }
    ngOnInit() {
        this.isPrivate = true;
        this.postsApi.GetPosts(this.sortBy).subscribe(res => this.formatDates(res), err => console.log(`Error getting posts: ${err.error}`));
    }
    publishPost() {
        let textArea = document.getElementById('newpost');
        let postText = textArea.value;
        let isPublic = document.getElementById('private-post').checked ? 0 : 1;
        let newPost = {
            post_text: postText,
            is_public: isPublic
        };
        this.postsApi.PublishPost(newPost).subscribe(res => {
            this.ngOnInit();
            textArea.value = '';
        }, err => alert(`Error publishing post: ${err.error}`));
    }
    deletePost(postId) {
        let del = confirm('Are you sure you want to delete this post? This action is unreversible');
        if (del) {
            this.postsApi.DeletePost(postId).subscribe(res => this.ngOnInit(), err => alert(`Error deleting post: ${err.error}`));
        }
    }
    editPost(ev, postId) {
        let post = document.getElementById(postId);
        post.style.display = 'none';
        let postEdit = document.getElementById(postId + '-edit');
        postEdit.style.display = 'block';
        postEdit.innerHTML = post.innerHTML;
        ev.target.style.display = 'none';
        let postUpdate = document.getElementById(postId + '-update');
        postUpdate.style.display = 'inline';
    }
    updatePost(postId) {
        let postText = document.getElementById(postId + '-edit').value;
        let newPost = {
            post_id: postId,
            post_text: postText
        };
        this.postsApi.UpdatePost(newPost).subscribe(res => this.ngOnInit(), err => alert(`Error editing post: ${err.error}`));
    }
    changePostPrivacy(ev, postId) {
        let isPublic = !ev.target.checked;
        let sure = confirm(`Are you sure you want to make this post ${isPublic ? 'public' : 'private'}?`);
        if (!sure) {
            return;
        }
        let newPost = {
            post_id: postId,
            is_public: isPublic ? 1 : 0
        };
        this.postsApi.ChangePostPrivacy(newPost).subscribe(res => this.ngOnInit(), err => alert(`Error changing post privacy: ${err.error}`));
    }
    getPosts(ev) {
        this.sortBy = ev.target.value;
        this.postsApi.GetPosts(this.sortBy).subscribe(res => this.formatDates(res), err => console.log(`Error getting posts: ${err.error}`));
    }
    formatDates(res) {
        this.posts = [];
        for (let post of res) {
            let published = new Date(post.created_at * 1000);
            const datepipe = new _angular_common__WEBPACK_IMPORTED_MODULE_1__["DatePipe"]('en-US');
            post.published = datepipe.transform(published, 'MMMM dd yyyy');
            this.posts.push(post);
        }
    }
}
PostsComponent.ɵfac = function PostsComponent_Factory(t) { return new (t || PostsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_posts_service__WEBPACK_IMPORTED_MODULE_2__["PostsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
PostsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PostsComponent, selectors: [["app-posts"]], decls: 22, vars: 2, consts: [["id", "posts"], ["id", "newpost", "cols", "80", "rows", "10"], [3, "click"], ["id", "private-post", "type", "checkbox", 3, "checked"], ["id", "user-posts"], ["for", "sort"], ["name", "sort", "id", "sortby", 3, "change"], ["value", "newest"], ["value", "oldest"], ["value", "liked"], ["value", "disliked"], ["class", "post", 4, "ngFor", "ngForOf"], [1, "post"], [1, "post-text", 3, "id"], ["cols", "80", "rows", "10", 1, "post-edit", 3, "id"], [1, "post-metadata"], [1, "post-controls"], [1, "update-post", 3, "id", "click"], ["type", "checkbox", 3, "id", "checked", "change"]], template: function PostsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "textarea", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PostsComponent_Template_button_click_3_listener() { return ctx.publishPost(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Publish Post");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "\u00A0 Private Post");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Sort by:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "select", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function PostsComponent_Template_select_change_12_listener($event) { return ctx.getPosts($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "option", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Newest");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "option", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Oldest");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "option", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Most Liked");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "option", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Most disliked");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, PostsComponent_div_21_Template, 19, 8, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("checked", ctx.isPrivate);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.posts);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgForOf"]], styles: ["#posts[_ngcontent-%COMP%] {\n  margin-left: 26em;\n  margin-right: 1em;\n  width: 40em;\n}\n#posts[_ngcontent-%COMP%]   #user-posts[_ngcontent-%COMP%] {\n  margin-top: 1em;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 2em;\n}\ntextarea[_ngcontent-%COMP%] {\n  margin-top: 1em;\n}\n.post[_ngcontent-%COMP%] {\n  width: 40em;\n  margin-bottom: 1em;\n  margin-top: 1em;\n}\n.post[_ngcontent-%COMP%]   .post-text[_ngcontent-%COMP%] {\n  margin-bottom: 0.5em;\n}\n.post[_ngcontent-%COMP%]   .post-metadata[_ngcontent-%COMP%] {\n  color: grey;\n}\n.post[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%] {\n  border-top: 1px solid black;\n  margin-bottom: 0;\n}\n.post[_ngcontent-%COMP%]   .post-edit[_ngcontent-%COMP%], .post[_ngcontent-%COMP%]   .update-post[_ngcontent-%COMP%] {\n  display: none;\n}\n.post[_ngcontent-%COMP%]   .post-controls[_ngcontent-%COMP%] {\n  margin-top: 0.5em;\n}\nbutton[_ngcontent-%COMP%] {\n  margin-right: 1em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JpbGV5dGhvbXAvZ2l0aHViL3VzZXJhdXRoL3NyYy9hcHAvY29tcG9uZW50cy9wcm9maWxlL3Bvc3RzL3Bvc3RzLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9jb21wb25lbnRzL3Byb2ZpbGUvcG9zdHMvcG9zdHMuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtBQ0NKO0FESkE7RUFNUSxlQUFBO0FDQ1I7QURHQTtFQUNJLGNBQUE7QUNESjtBRElBO0VBQ0ksZUFBQTtBQ0ZKO0FES0E7RUFDSSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FDSEo7QURBQTtFQUtRLG9CQUFBO0FDRlI7QURIQTtFQVFRLFdBQUE7QUNGUjtBRE5BO0VBV1EsMkJBQUE7RUFDQSxnQkFBQTtBQ0ZSO0FEVkE7O0VBZVEsYUFBQTtBQ0RSO0FEZEE7RUFrQlEsaUJBQUE7QUNEUjtBREtBO0VBQ0ksaUJBQUE7QUNISiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvcHJvZmlsZS9wb3N0cy9wb3N0cy5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIiNwb3N0cyB7XG4gICAgbWFyZ2luLWxlZnQ6IDI2ZW07XG4gICAgbWFyZ2luLXJpZ2h0OiAxZW07XG4gICAgd2lkdGg6IDQwZW07XG5cbiAgICAjdXNlci1wb3N0cyB7XG4gICAgICAgIG1hcmdpbi10b3A6IDFlbTtcbiAgICB9XG59XG5cbmgzIHtcbiAgICBmb250LXNpemU6IDJlbTtcbn1cblxudGV4dGFyZWEge1xuICAgIG1hcmdpbi10b3A6IDFlbTtcbn1cblxuLnBvc3Qge1xuICAgIHdpZHRoOiA0MGVtO1xuICAgIG1hcmdpbi1ib3R0b206IDFlbTtcbiAgICBtYXJnaW4tdG9wOiAxZW07XG4gICAgLnBvc3QtdGV4dCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDAuNWVtO1xuICAgIH1cbiAgICAucG9zdC1tZXRhZGF0YSB7XG4gICAgICAgIGNvbG9yOiBncmV5O1xuICAgIH1cbiAgICBociB7XG4gICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCBibGFjaztcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG4gICAgLnBvc3QtZWRpdCwgLnVwZGF0ZS1wb3N0IHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gICAgLnBvc3QtY29udHJvbHMge1xuICAgICAgICBtYXJnaW4tdG9wOiAwLjVlbTtcbiAgICB9XG59XG5cbmJ1dHRvbiB7XG4gICAgbWFyZ2luLXJpZ2h0OiAxZW07XG59IiwiI3Bvc3RzIHtcbiAgbWFyZ2luLWxlZnQ6IDI2ZW07XG4gIG1hcmdpbi1yaWdodDogMWVtO1xuICB3aWR0aDogNDBlbTtcbn1cbiNwb3N0cyAjdXNlci1wb3N0cyB7XG4gIG1hcmdpbi10b3A6IDFlbTtcbn1cbmgzIHtcbiAgZm9udC1zaXplOiAyZW07XG59XG50ZXh0YXJlYSB7XG4gIG1hcmdpbi10b3A6IDFlbTtcbn1cbi5wb3N0IHtcbiAgd2lkdGg6IDQwZW07XG4gIG1hcmdpbi1ib3R0b206IDFlbTtcbiAgbWFyZ2luLXRvcDogMWVtO1xufVxuLnBvc3QgLnBvc3QtdGV4dCB7XG4gIG1hcmdpbi1ib3R0b206IDAuNWVtO1xufVxuLnBvc3QgLnBvc3QtbWV0YWRhdGEge1xuICBjb2xvcjogZ3JleTtcbn1cbi5wb3N0IGhyIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGJsYWNrO1xuICBtYXJnaW4tYm90dG9tOiAwO1xufVxuLnBvc3QgLnBvc3QtZWRpdCxcbi5wb3N0IC51cGRhdGUtcG9zdCB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4ucG9zdCAucG9zdC1jb250cm9scyB7XG4gIG1hcmdpbi10b3A6IDAuNWVtO1xufVxuYnV0dG9uIHtcbiAgbWFyZ2luLXJpZ2h0OiAxZW07XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PostsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-posts',
                templateUrl: './posts.component.html',
                styleUrls: ['./posts.component.less']
            }]
    }], function () { return [{ type: src_app_services_posts_service__WEBPACK_IMPORTED_MODULE_2__["PostsService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }]; }, null); })();


/***/ }),

/***/ "OXCg":
/*!***********************************************************!*\
  !*** ./src/app/components/comments/comments.component.ts ***!
  \***********************************************************/
/*! exports provided: CommentsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommentsComponent", function() { return CommentsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_comments_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/comments.service */ "Tvdm");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");





function CommentsComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const c_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", c_r1.author, ": ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](c_r1.comment);
} }
class CommentsComponent {
    constructor(commentsApi) {
        this.commentsApi = commentsApi;
        this.setCommentCount = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
        this.commentText = '';
        this.commentsApi.GetPostComments(this.postId).subscribe(res => {
            this.comments = res;
            this.setCommentCount.next(this.comments.length);
        }, err => alert(`Error getting comments: ${err.error}`));
    }
    postComment() {
        this.commentsApi.PublishComment(this.commentText, this.postId).subscribe(res => this.ngOnInit(), err => alert(`Error posting comment: ${err.error}`));
    }
}
CommentsComponent.ɵfac = function CommentsComponent_Factory(t) { return new (t || CommentsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_comments_service__WEBPACK_IMPORTED_MODULE_1__["CommentsService"])); };
CommentsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CommentsComponent, selectors: [["app-comments"]], inputs: { postId: "postId" }, outputs: { setCommentCount: "setCommentCount" }, decls: 6, vars: 2, consts: [[1, "post-comments"], ["cols", "60", "rows", "2", 3, "ngModel", "ngModelChange"], [3, "click"], ["class", "comment", 4, "ngFor", "ngForOf"], [1, "comment"], [1, "comment-author"]], template: function CommentsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "textarea", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function CommentsComponent_Template_textarea_ngModelChange_1_listener($event) { return ctx.commentText = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CommentsComponent_Template_button_click_3_listener() { return ctx.postComment(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Post");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, CommentsComponent_div_5_Template, 5, 2, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.commentText);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.comments);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"]], styles: [".post-comments[_ngcontent-%COMP%] {\n  margin-top: 1em;\n  width: 40em;\n}\n.post-comments[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  margin-bottom: 0.5em;\n}\n.post-comments[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%] {\n  margin-top: 1em;\n  margin-bottom: 1em;\n  width: 30em;\n  word-wrap: break-word;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JpbGV5dGhvbXAvZ2l0aHViL3VzZXJhdXRoL3NyYy9hcHAvY29tcG9uZW50cy9jb21tZW50cy9jb21tZW50cy5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvY29tcG9uZW50cy9jb21tZW50cy9jb21tZW50cy5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGVBQUE7RUFDQSxXQUFBO0FDQ0o7QURIQTtFQUlRLG9CQUFBO0FDRVI7QUROQTtFQU9RLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxxQkFBQTtBQ0VSIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9jb21tZW50cy9jb21tZW50cy5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wb3N0LWNvbW1lbnRzIHtcbiAgICBtYXJnaW4tdG9wOiAxZW07XG4gICAgd2lkdGg6IDQwZW07XG4gICAgdGV4dGFyZWEge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVlbTtcbiAgICB9XG4gICAgLmNvbW1lbnQge1xuICAgICAgICBtYXJnaW4tdG9wOiAxZW07XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDFlbTtcbiAgICAgICAgd2lkdGg6IDMwZW07XG4gICAgICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgICB9XG59IiwiLnBvc3QtY29tbWVudHMge1xuICBtYXJnaW4tdG9wOiAxZW07XG4gIHdpZHRoOiA0MGVtO1xufVxuLnBvc3QtY29tbWVudHMgdGV4dGFyZWEge1xuICBtYXJnaW4tYm90dG9tOiAwLjVlbTtcbn1cbi5wb3N0LWNvbW1lbnRzIC5jb21tZW50IHtcbiAgbWFyZ2luLXRvcDogMWVtO1xuICBtYXJnaW4tYm90dG9tOiAxZW07XG4gIHdpZHRoOiAzMGVtO1xuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CommentsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-comments',
                templateUrl: './comments.component.html',
                styleUrls: ['./comments.component.less']
            }]
    }], function () { return [{ type: src_app_services_comments_service__WEBPACK_IMPORTED_MODULE_1__["CommentsService"] }]; }, { postId: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], setCommentCount: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/header/header.component */ "2MiI");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




class AppComponent {
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_components_header_header_component__WEBPACK_IMPORTED_MODULE_1__["HeaderComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQubGVzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.less']
            }]
    }], null, null); })();


/***/ }),

/***/ "TNZB":
/*!***********************************************************!*\
  !*** ./src/app/components/userpage/userpage.component.ts ***!
  \***********************************************************/
/*! exports provided: UserpageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserpageComponent", function() { return UserpageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/user.service */ "qfBg");
/* harmony import */ var _userposts_userposts_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./userposts/userposts.component */ "NMvn");





class UserpageComponent {
    constructor(route, users) {
        this.route = route;
        this.users = users;
    }
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.username = params['username'];
            this.users.GetUserByName(this.username).subscribe(user => {
                this.email = user.email;
                this.bio = user.bio;
                this.imgUrl = user.imgUrl;
            }, err => console.log(`Error getting user: ${err.error}`));
        });
    }
}
UserpageComponent.ɵfac = function UserpageComponent_Factory(t) { return new (t || UserpageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"])); };
UserpageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UserpageComponent, selectors: [["app-userpage"]], decls: 9, vars: 4, consts: [["id", "user-info"], ["id", "username"], ["alt", "Image unavailable", 3, "src"], ["id", "bio", 1, "profile-info"], ["id", "email", 1, "profile-info"]], template: function UserpageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "app-userposts");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.username);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("src", ctx.imgUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.bio, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.email, " ");
    } }, directives: [_userposts_userposts_component__WEBPACK_IMPORTED_MODULE_3__["UserpostsComponent"]], styles: ["#user-info[_ngcontent-%COMP%] {\n  margin-left: 1em;\n  width: 25em;\n  float: left;\n}\n#user-info[_ngcontent-%COMP%]   #username[_ngcontent-%COMP%] {\n  font-size: 2em;\n}\n#user-info[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 10em;\n  height: 10em;\n  margin-bottom: 1em;\n}\n#user-info[_ngcontent-%COMP%]   #bio[_ngcontent-%COMP%] {\n  width: 25em;\n}\n#user-info[_ngcontent-%COMP%]   .profile-info[_ngcontent-%COMP%] {\n  margin-bottom: 1em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JpbGV5dGhvbXAvZ2l0aHViL3VzZXJhdXRoL3NyYy9hcHAvY29tcG9uZW50cy91c2VycGFnZS91c2VycGFnZS5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvY29tcG9uZW50cy91c2VycGFnZS91c2VycGFnZS5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7QUNDSjtBREpBO0VBS1EsY0FBQTtBQ0VSO0FEUEE7RUFTUSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FDQ1I7QURaQTtFQWVRLFdBQUE7QUNBUjtBRGZBO0VBbUJRLGtCQUFBO0FDRFIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3VzZXJwYWdlL3VzZXJwYWdlLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiI3VzZXItaW5mbyB7XG4gICAgbWFyZ2luLWxlZnQ6IDFlbTtcbiAgICB3aWR0aDogMjVlbTtcbiAgICBmbG9hdDogbGVmdDtcbiAgICAjdXNlcm5hbWUge1xuICAgICAgICBmb250LXNpemU6IDJlbTtcbiAgICB9XG4gICAgXG4gICAgaW1nIHtcbiAgICAgICAgd2lkdGg6IDEwZW07XG4gICAgICAgIGhlaWdodDogMTBlbTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMWVtO1xuICAgIH1cbiAgICBcbiAgICAjYmlvIHtcbiAgICAgICAgd2lkdGg6IDI1ZW07XG4gICAgfVxuICAgIFxuICAgIC5wcm9maWxlLWluZm8ge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxZW07XG4gICAgfVxufVxuXG5cblxuIiwiI3VzZXItaW5mbyB7XG4gIG1hcmdpbi1sZWZ0OiAxZW07XG4gIHdpZHRoOiAyNWVtO1xuICBmbG9hdDogbGVmdDtcbn1cbiN1c2VyLWluZm8gI3VzZXJuYW1lIHtcbiAgZm9udC1zaXplOiAyZW07XG59XG4jdXNlci1pbmZvIGltZyB7XG4gIHdpZHRoOiAxMGVtO1xuICBoZWlnaHQ6IDEwZW07XG4gIG1hcmdpbi1ib3R0b206IDFlbTtcbn1cbiN1c2VyLWluZm8gI2JpbyB7XG4gIHdpZHRoOiAyNWVtO1xufVxuI3VzZXItaW5mbyAucHJvZmlsZS1pbmZvIHtcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserpageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-userpage',
                templateUrl: './userpage.component.html',
                styleUrls: ['./userpage.component.less']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] }, { type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"] }]; }, null); })();


/***/ }),

/***/ "TO25":
/*!***************************************************************!*\
  !*** ./src/app/components/signupauth/signupauth.component.ts ***!
  \***************************************************************/
/*! exports provided: SignupauthComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupauthComponent", function() { return SignupauthComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/auth.service */ "lGQG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




class SignupauthComponent {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
        let state = this.router.getCurrentNavigation().extras.state;
        this.authMethod = state === null || state === void 0 ? void 0 : state.authMethod;
        this.userContact = state === null || state === void 0 ? void 0 : state.userContact;
        if (this.userContact == undefined) {
            this.router.navigateByUrl('signup');
        }
    }
    ngOnInit() { }
    validateCode() {
        let code = document.getElementById('signup-code').value;
        this.auth.ValidateCode(code, this.userContact, 'verify', this.authMethod).subscribe(res => {
            document.cookie = `access_token=${res['token']}; max-age=${res['max_age']}; SameSite=None; Secure`;
            this.router.navigateByUrl('profile');
        }, err => alert(`Error validating code: ${err.error}`));
    }
}
SignupauthComponent.ɵfac = function SignupauthComponent_Factory(t) { return new (t || SignupauthComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
SignupauthComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SignupauthComponent, selectors: [["app-signupauth"]], decls: 10, vars: 0, consts: [[1, "column", "is-4", "is-offset-4"], [1, "title"], [1, "box"], ["id", "reset-code-page", 1, "hidden", "field"], [1, "control"], ["id", "signup-code", "type", "tel", "placeholder", "Signup code", "autofocus", "", 1, "input", "is-large"], [1, "button", "is-block", "is-info", "is-large", "is-fullwidth", 3, "click"]], template: function SignupauthComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Signup Authentication");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SignupauthComponent_Template_button_click_8_listener() { return ctx.validateCode(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Submit signup code");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["#signup-code[_ngcontent-%COMP%] {\n  margin-bottom: 1em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JpbGV5dGhvbXAvZ2l0aHViL3VzZXJhdXRoL3NyYy9hcHAvY29tcG9uZW50cy9zaWdudXBhdXRoL3NpZ251cGF1dGguY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvc2lnbnVwYXV0aC9zaWdudXBhdXRoLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2lnbnVwYXV0aC9zaWdudXBhdXRoLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiI3NpZ251cC1jb2RlIHtcbiAgICBtYXJnaW4tYm90dG9tOiAxZW07XG59IiwiI3NpZ251cC1jb2RlIHtcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SignupauthComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-signupauth',
                templateUrl: './signupauth.component.html',
                styleUrls: ['./signupauth.component.less']
            }]
    }], function () { return [{ type: src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }]; }, null); })();


/***/ }),

/***/ "Tvdm":
/*!**********************************************!*\
  !*** ./src/app/services/comments.service.ts ***!
  \**********************************************/
/*! exports provided: CommentsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommentsService", function() { return CommentsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ "Afm0");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");




class CommentsService {
    constructor(http) {
        this.http = http;
    }
    PublishComment(comment, postId) {
        return this.http.post(`${_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/comments/add`, {
            'comment': comment,
            'post_id': postId
        }, Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["GetJsonOpts"])());
    }
    GetPostComments(postId) {
        return this.http.get(`${_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/comments/${postId}`, Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["GetOpts"])('text/plain', 'application/json', 'access_token'));
    }
}
CommentsService.ɵfac = function CommentsService_Factory(t) { return new (t || CommentsService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
CommentsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: CommentsService, factory: CommentsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CommentsService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "W3Zi":
/*!*****************************************************!*\
  !*** ./src/app/components/login/login.component.ts ***!
  \*****************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/helpers */ "Afm0");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/auth.service */ "lGQG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");





class LoginComponent {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    ngOnInit() {
        let savedUsername = Object(src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["GetCookie"])('username');
        if (savedUsername != '') {
            document.getElementById('username').value = savedUsername;
        }
    }
    loginUser() {
        let usernameInput = document.getElementById('username');
        let passwordInput = document.getElementById('password');
        let rememberInput = document.getElementById('remember');
        let user = {
            username: usernameInput.value,
            password: passwordInput.value,
        };
        if (rememberInput.checked) {
            document.cookie = `username=${user.username}; SameSite=None; Secure`;
        }
        else {
            document.cookie = 'username=; SameSite=None; Secure';
        }
        this.auth.AuthenticateUser(user).subscribe(res => {
            document.cookie = `access_token=${res['token']}; max-age=${res['max_age']}; SameSite=None; Secure`;
            this.router.navigateByUrl('profile');
        }, err => alert(`Error logging in: ${err.error}`));
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], decls: 18, vars: 0, consts: [[1, "column", "is-4", "is-offset-4"], [1, "title"], [1, "box"], [1, "field"], [1, "control"], ["id", "username", "type", "text", "name", "username", "placeholder", "Username", "autofocus", "", 1, "input", "is-large"], ["id", "password", "type", "password", "name", "password", "placeholder", "Password", 1, "input", "is-large"], [1, "checkbox"], ["id", "remember", "type", "checkbox", "name", "remember"], ["id", "forgot-password", "href", "/passwordreset"], [1, "button", "is-block", "is-info", "is-large", "is-fullwidth", 3, "click"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Remember me ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Forgot password?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_16_listener() { return ctx.loginUser(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["#forgot-password[_ngcontent-%COMP%] {\n  float: right;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JpbGV5dGhvbXAvZ2l0aHViL3VzZXJhdXRoL3NyYy9hcHAvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjZm9yZ290LXBhc3N3b3JkIHtcbiAgICBmbG9hdDogcmlnaHQ7XG59IiwiI2ZvcmdvdC1wYXNzd29yZCB7XG4gIGZsb2F0OiByaWdodDtcbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-login',
                templateUrl: './login.component.html',
                styleUrls: ['./login.component.less']
            }]
    }], function () { return [{ type: src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }]; }, null); })();


/***/ }),

/***/ "YzH7":
/*!***************************************************!*\
  !*** ./src/app/components/post/post.component.ts ***!
  \***************************************************/
/*! exports provided: PostComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostComponent", function() { return PostComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var src_app_services_posts_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/posts.service */ "jwUf");
/* harmony import */ var _comments_comments_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../comments/comments.component */ "OXCg");






function PostComponent_app_comments_17_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-comments", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("setCommentCount", function PostComponent_app_comments_17_Template_app_comments_setCommentCount_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1.setCommentCount($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("postId", ctx_r0.post.post_id);
} }
class PostComponent {
    constructor(postsApi) {
        this.postsApi = postsApi;
        this.showComments = false;
    }
    ngOnInit() {
        this.formatDate();
    }
    setCommentCount(count) {
        this.post.comments = count;
    }
    togglePostComments() {
        this.showComments = !this.showComments;
    }
    likePost(change) {
        this.postsApi.LikePost(this.post.post_id, change).subscribe(res => this.post.likes = res, err => alert(`Error liking post: ${err.error}`));
    }
    formatDate() {
        let published = new Date(this.post.created_at * 1000);
        const datepipe = new _angular_common__WEBPACK_IMPORTED_MODULE_1__["DatePipe"]('en-US');
        this.post.published = datepipe.transform(published, 'MMMM dd yyyy');
    }
}
PostComponent.ɵfac = function PostComponent_Factory(t) { return new (t || PostComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_posts_service__WEBPACK_IMPORTED_MODULE_2__["PostsService"])); };
PostComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PostComponent, selectors: [["app-post"]], inputs: { post: "post" }, decls: 19, vars: 7, consts: [[1, "post-author"], [1, "private-post"], [3, "click"], [3, "postId", "setCommentCount", 4, "ngIf"], [3, "postId", "setCommentCount"]], template: function PostComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PostComponent_Template_button_click_8_listener() { return ctx.likePost(1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Like Post");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PostComponent_Template_button_click_10_listener() { return ctx.likePost(-1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Dislike Post");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "\n\u00A0\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PostComponent_Template_a_click_15_listener() { return ctx.togglePostComments(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, PostComponent_app_comments_17_Template, 1, 1, "app-comments", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "hr");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.post.author);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.post.post);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Published: ", ctx.post.published, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.post.is_public ? "" : "Private Post");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.post.likes);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Comments (", ctx.post.comments, ")");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showComments);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"], _comments_comments_component__WEBPACK_IMPORTED_MODULE_3__["CommentsComponent"]], styles: ["p[_ngcontent-%COMP%] {\n  margin-bottom: 0.5em;\n}\nspan[_ngcontent-%COMP%], .private-post[_ngcontent-%COMP%] {\n  color: grey;\n}\nhr[_ngcontent-%COMP%] {\n  border-top: 1px solid black;\n  margin-bottom: 0;\n}\nbutton[_ngcontent-%COMP%] {\n  margin-right: 1em;\n}\n.post-author[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n  font-weight: bold;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JpbGV5dGhvbXAvZ2l0aHViL3VzZXJhdXRoL3NyYy9hcHAvY29tcG9uZW50cy9wb3N0L3Bvc3QuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvcG9zdC9wb3N0LmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksb0JBQUE7QUNDSjtBRENBOztFQUNJLFdBQUE7QUNFSjtBREFBO0VBQ0ksMkJBQUE7RUFDQSxnQkFBQTtBQ0VKO0FEQUE7RUFDSSxpQkFBQTtBQ0VKO0FEQUE7RUFDSSxnQkFBQTtFQUNBLGlCQUFBO0FDRUoiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3Bvc3QvcG9zdC5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbInAge1xuICAgIG1hcmdpbi1ib3R0b206IDAuNWVtO1xufVxuc3BhbiwgLnByaXZhdGUtcG9zdCB7XG4gICAgY29sb3I6IGdyZXk7XG59XG5ociB7XG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGJsYWNrO1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG59XG5idXR0b24ge1xuICAgIG1hcmdpbi1yaWdodDogMWVtO1xufVxuLnBvc3QtYXV0aG9yIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuIiwicCB7XG4gIG1hcmdpbi1ib3R0b206IDAuNWVtO1xufVxuc3Bhbixcbi5wcml2YXRlLXBvc3Qge1xuICBjb2xvcjogZ3JleTtcbn1cbmhyIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGJsYWNrO1xuICBtYXJnaW4tYm90dG9tOiAwO1xufVxuYnV0dG9uIHtcbiAgbWFyZ2luLXJpZ2h0OiAxZW07XG59XG4ucG9zdC1hdXRob3Ige1xuICBtYXJnaW4tYm90dG9tOiAwO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PostComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-post',
                templateUrl: './post.component.html',
                styleUrls: ['./post.component.less']
            }]
    }], function () { return [{ type: src_app_services_posts_service__WEBPACK_IMPORTED_MODULE_2__["PostsService"] }]; }, { post: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/header/header.component */ "2MiI");
/* harmony import */ var _components_signup_signup_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/signup/signup.component */ "5Ey6");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/login/login.component */ "W3Zi");
/* harmony import */ var _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/profile/profile.component */ "DZ0t");
/* harmony import */ var _components_passwordreset_passwordreset_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/passwordreset/passwordreset.component */ "2X3M");
/* harmony import */ var _components_signupauth_signupauth_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/signupauth/signupauth.component */ "TO25");
/* harmony import */ var _components_userpage_userpage_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/userpage/userpage.component */ "TNZB");
/* harmony import */ var _components_profile_posts_posts_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/profile/posts/posts.component */ "O67h");
/* harmony import */ var _components_userpage_userposts_userposts_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/userpage/userposts/userposts.component */ "NMvn");
/* harmony import */ var _components_profile_likes_likes_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/profile/likes/likes.component */ "LhXH");
/* harmony import */ var _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/comments/comments.component */ "OXCg");
/* harmony import */ var _components_post_post_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/post/post.component */ "YzH7");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/forms */ "3Pt+");



















class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_17__["FormsModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
        _components_header_header_component__WEBPACK_IMPORTED_MODULE_5__["HeaderComponent"],
        _components_signup_signup_component__WEBPACK_IMPORTED_MODULE_6__["SignupComponent"],
        _components_login_login_component__WEBPACK_IMPORTED_MODULE_7__["LoginComponent"],
        _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_8__["ProfileComponent"],
        _components_passwordreset_passwordreset_component__WEBPACK_IMPORTED_MODULE_9__["PasswordresetComponent"],
        _components_signupauth_signupauth_component__WEBPACK_IMPORTED_MODULE_10__["SignupauthComponent"],
        _components_userpage_userpage_component__WEBPACK_IMPORTED_MODULE_11__["UserpageComponent"],
        _components_profile_posts_posts_component__WEBPACK_IMPORTED_MODULE_12__["PostsComponent"],
        _components_userpage_userposts_userposts_component__WEBPACK_IMPORTED_MODULE_13__["UserpostsComponent"],
        _components_profile_likes_likes_component__WEBPACK_IMPORTED_MODULE_14__["LikesComponent"],
        _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_15__["CommentsComponent"],
        _components_post_post_component__WEBPACK_IMPORTED_MODULE_16__["PostComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_17__["FormsModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                    _components_header_header_component__WEBPACK_IMPORTED_MODULE_5__["HeaderComponent"],
                    _components_signup_signup_component__WEBPACK_IMPORTED_MODULE_6__["SignupComponent"],
                    _components_login_login_component__WEBPACK_IMPORTED_MODULE_7__["LoginComponent"],
                    _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_8__["ProfileComponent"],
                    _components_passwordreset_passwordreset_component__WEBPACK_IMPORTED_MODULE_9__["PasswordresetComponent"],
                    _components_signupauth_signupauth_component__WEBPACK_IMPORTED_MODULE_10__["SignupauthComponent"],
                    _components_userpage_userpage_component__WEBPACK_IMPORTED_MODULE_11__["UserpageComponent"],
                    _components_profile_posts_posts_component__WEBPACK_IMPORTED_MODULE_12__["PostsComponent"],
                    _components_userpage_userposts_userposts_component__WEBPACK_IMPORTED_MODULE_13__["UserpostsComponent"],
                    _components_profile_likes_likes_component__WEBPACK_IMPORTED_MODULE_14__["LikesComponent"],
                    _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_15__["CommentsComponent"],
                    _components_post_post_component__WEBPACK_IMPORTED_MODULE_16__["PostComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_17__["FormsModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "jwUf":
/*!*******************************************!*\
  !*** ./src/app/services/posts.service.ts ***!
  \*******************************************/
/*! exports provided: PostsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostsService", function() { return PostsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/helpers */ "Afm0");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");




class PostsService {
    constructor(http) {
        this.http = http;
    }
    PublishPost(post) {
        return this.http.post(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/posts/add`, post, Object(src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["GetJsonOpts"])());
    }
    GetPosts(sortBy) {
        return this.http.get(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/posts?sortby=${sortBy}`, Object(src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["GetJsonOpts"])());
    }
    GetLikedPosts(sortBy) {
        return this.http.get(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/posts/liked?sortby=${sortBy}`, Object(src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["GetJsonOpts"])());
    }
    GetPostsByUsername(username, sortBy) {
        return this.http.get(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/posts/${username}?sortby=${sortBy}`, Object(src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["GetJsonOpts"])());
    }
    DeletePost(postId) {
        return this.http.delete(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/posts/${postId}`, Object(src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["GetJsonOpts"])());
    }
    UpdatePost(post) {
        return this.http.put(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/posts/${post.post_id}`, post, Object(src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["GetJsonOpts"])());
    }
    ChangePostPrivacy(post) {
        return this.http.put(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/posts/privacy/${post.post_id}`, post, Object(src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["GetJsonOpts"])());
    }
    LikePost(postId, change) {
        return this.http.put(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/posts/like/${postId}`, change, Object(src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["GetTextOpts"])());
    }
}
PostsService.ɵfac = function PostsService_Factory(t) { return new (t || PostsService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
PostsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PostsService, factory: PostsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PostsService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "lGQG":
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/helpers */ "Afm0");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");




class AuthService {
    constructor(http) {
        this.http = http;
    }
    // User endpoints
    AuthenticateUser(user) {
        return this.http.post(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/user/authenticate`, user, src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["JsonOpts"]);
    }
    SetNewPassword(newPassword) {
        return this.http.put(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/user/setpassword`, newPassword, Object(src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["GetOpts"])('text/plain', 'application/json', 'password_token'));
    }
    // Codes endpoints
    // Unauthenticated codes endpoints
    ValidateCode(authCode, userContact, action, method) {
        return this.http.post(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/code/validate/${action}/${method}`, {
            'auth_code': authCode,
            'user_contact': userContact
        }, src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["JsonOpts"]);
    }
    CreateCode(userContact, action, method) {
        return this.http.post(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/code/create/${action}/${method}`, userContact, src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["TextOpts"]);
    }
    // Authenticated codes endpoints
    ValidateAuthCode(authCode, userContact, action, method) {
        return this.http.post(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/code/auth/validate/${action}/${method}`, {
            'auth_code': authCode,
            'user_contact': userContact
        }, Object(src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["GetOpts"])('application/json', 'text/plain', 'access_token'));
    }
    CreateAuthCode(userContact, action, method) {
        return this.http.post(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/code/auth/create/${action}/${method}`, userContact, Object(src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["GetTextOpts"])());
    }
}
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
AuthService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "qfBg":
/*!******************************************!*\
  !*** ./src/app/services/user.service.ts ***!
  \******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/helpers */ "Afm0");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");




class UserService {
    constructor(http) {
        this.http = http;
    }
    AddUser(username, password, email, phoneNum, isPublic) {
        return this.http.post(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/user/add`, {
            username: username,
            password: password,
            email: email,
            phone_number: phoneNum,
            is_public: isPublic
        }, src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["JsonOpts"]);
    }
    GetUserByName(username) {
        return this.http.get(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/user/${username}`, Object(src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["GetJsonOpts"])());
    }
    GetUser() {
        return this.http.get(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/user`, Object(src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["GetJsonOpts"])());
    }
    DeleteUser() {
        return this.http.delete(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/user/delete`, Object(src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["GetJsonOpts"])());
    }
    UpdateUser(username, email, phoneNum, bio, isPublic) {
        return this.http.put(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/user/update`, {
            username: username,
            email: email,
            phone_number: phoneNum,
            bio: bio,
            is_public: isPublic
        }, Object(src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["GetJsonOpts"])());
    }
    ChangePicture(formData) {
        return this.http.put(`${src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["ApiAddr"]}/user/picture`, formData, Object(src_app_helpers__WEBPACK_IMPORTED_MODULE_1__["GetImgOpts"])());
    }
}
UserService.ɵfac = function UserService_Factory(t) { return new (t || UserService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
UserService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: UserService, factory: UserService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/login/login.component */ "W3Zi");
/* harmony import */ var _components_passwordreset_passwordreset_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/passwordreset/passwordreset.component */ "2X3M");
/* harmony import */ var _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/profile/profile.component */ "DZ0t");
/* harmony import */ var _components_signup_signup_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/signup/signup.component */ "5Ey6");
/* harmony import */ var _components_signupauth_signupauth_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/signupauth/signupauth.component */ "TO25");
/* harmony import */ var _components_userpage_userpage_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/userpage/userpage.component */ "TNZB");










const routes = [
    {
        path: '',
        component: _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_4__["ProfileComponent"]
    },
    {
        path: 'signup',
        component: _components_signup_signup_component__WEBPACK_IMPORTED_MODULE_5__["SignupComponent"]
    },
    {
        path: 'signupauth',
        component: _components_signupauth_signupauth_component__WEBPACK_IMPORTED_MODULE_6__["SignupauthComponent"]
    },
    {
        path: 'login',
        component: _components_login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"]
    },
    {
        path: 'profile',
        component: _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_4__["ProfileComponent"]
    },
    {
        path: 'passwordreset',
        component: _components_passwordreset_passwordreset_component__WEBPACK_IMPORTED_MODULE_3__["PasswordresetComponent"]
    },
    {
        path: ':username',
        component: _components_userpage_userpage_component__WEBPACK_IMPORTED_MODULE_7__["UserpageComponent"]
    }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map