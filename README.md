# userauth

Full user login and authentication system. Includes login/logout, sign up, and password reset.

Backend done in Python with Flask and SQLite. Passwords and reset codes are salted and hashed. JWTs used for authentication with frontend. Used Python's `smtplib` and Twilio APIs for sending one time passwords through email and SMS.

Frontend done in Angular and TypeScript. Uses JWTs for authentication with backend. Browser cookies are used for session management. 


