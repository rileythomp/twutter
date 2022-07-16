# twutter

It's like Twitter but worse.

https://twutter.netlify.app

---

This is a social media site that implements many of the basic features and functionality in other sites like Twitter, Facebook, Instragram etc.

These include:
*  Authentication
    * Sign up with SMS/email verification
    * Login/logout
    * Reset password with SMS/email verification
    * Update contact info with SMS/email verification
* User accounts
    * Profile picture and bio
    * Private and public accounts
    * Account deletion
* Posts
    * Text and image posts
    * Private and public posts
    * Like and comment on posts
    * Edit and delete your own posts
* Following
    * Follow and unfollow users
    * See following and followers lists of users
* Feeds
    * See feed of posts from accounts you follow
    * See posts you've made on your profile
    * See posts from a user on their home page
    * See posts you've liked
    * These feeds can be sorted by
        * Current popularity (using the [Hacker News algorithm](https://news.ycombinator.com/item?id=1781417))
        * Currently discussed (same algorithm as above but with comments instead of likes)
        * Most/least liked
        * Most/least commented
        * Newest and oldest
* Search
    * Search for accounts by their username
* Themed bots
    * There are 14 themed bot accounts that make an automated post related to their theme each day at noon. For example, there is a cat bot that posts a cat image each day, and a fact bot that posts an interesting fact each day.

---

Below is the stack and some implementation details.

Backend
* The backend is done in **Python** with **Flask** and **PostgreSQL**.
* It's hosted on **Heroku**. 
* Passwords and reset codes are **salted** and **hashed** with **SHA256**.
* **JWTs** are used for encrypted authentication with the frontend.
* Used Python's `smtplib` and the **Twilio** API for senidng one time passwords (**OTPs**) through SMS and email.
* Used **AWS's S3** for image storage.
* Used **Heroku Scheduler** to automate themed bot account posts.

Frontend
* The frontend is done with **Angular** and **TypeScript**.
* It's hosted on **Netlify**.
* Frontend makes HTTP API requests to the backend and uses **JWTs** for encrypted authentication.
* Browser cookies are used for sesion management.

---

To run the backend:
* Must set required environment variables (see env.sh).
* Must have a PostgreSQL database with the schema in `backend/sql/setup.sql`.
* Must have Python 3 installed (currently using 3.10.5).
```
$ source env.sh
$ pip install -r requirements.txt
$ python3 wsgi.py
```

To run the frontend:
* Must have npm and the Angular CLI installed (currently using npm 8.11.0, Angular 10.1.6 and node 16.15.1).
```
$ npm i
$ ng serve
```

---
