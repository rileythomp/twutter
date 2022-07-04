from os import environ
from smtplib import SMTP
from email.mime.text import MIMEText
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException

OutlookSMTPServer = 'smtp-mail.outlook.com'
outlook_email = environ['OUTLOOK_EMAIL']
outlook_pwd = environ['OUTLOOK_PASSWORD']
twilio_account_sid = environ['TWILIO_ACCOUNT_SID']
twilio_auth_token = environ['TWILIO_AUTH_TOKEN']
twilio_number = environ['TWILIO_NUMBER']

def sendEmail(user_email: str, subject: str, content: str):
    msg = MIMEText(content)
    msg['From'] = outlook_email
    msg['To'] = user_email
    msg['Subject'] = subject

    try:
        mailServer = SMTP(OutlookSMTPServer, 587)
        mailServer.ehlo()
        mailServer.starttls()
        mailServer.ehlo()
        mailServer.login(outlook_email, outlook_pwd)
        mailServer.sendmail(outlook_email, user_email, msg.as_string())
        mailServer.close()
        return None
    except Exception as e:
        return e

def sendSMS(user_number: str, content: str):
    client = Client(twilio_account_sid, twilio_auth_token)
    try: 
        client.messages.create(
            body = content,
            from_= twilio_number,
            to = f'+1{user_number}'
        )
        return None
    except TwilioRestException as e:
        return e
        

def sendPasswordResetEmail(user_email: str, reset_code: str):
    content = 'UserAuth Password Reset\n'
    content += 'Here is your password reset code:\n'
    content += reset_code
    return sendEmail(user_email, 'UserAuth Password Reset', content)

def sendPasswordResetSMS(user_number: str, reset_code: str):
    content = 'UserAuth Password Reset\n'
    content += 'Here is your password reset code:\n'
    content += reset_code
    return sendSMS(user_number, content)

def sendVerifyEmail(user_email: str, reset_code: str):
    content = 'UserAuth Email Verification\n'
    content += 'Here is your Email verification code:\n'
    content += reset_code
    return sendEmail(user_email, 'UserAuth Email Verification', content)

def sendVerifySMS(user_number: str, reset_code: str):
    content = 'UserAuth SMS Verification\n'
    content += 'Here is your SMS verification code:\n'
    content += reset_code
    return sendSMS(user_number, content)