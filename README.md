# userauth

Full user login and authentication system with user profiles. Has the following features:
* Sign up with email/sms verification
* Login/logout
* Password reset
* Update user info
* Account deletion

Backend done in Python with Flask and SQLite. Passwords and reset codes are salted and hashed. JWTs used for encrypted authentication with frontend. Used Python's `smtplib` and Twilio APIs for sending one time passwords through email and SMS.

Frontend done in Angular and TypeScript. Uses JWTs for encrypted authentication with backend. Browser cookies are used for session management. 


