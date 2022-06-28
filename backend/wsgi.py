from app.server import app
from os import getenv, environ
 
if __name__ == "__main__":
    heroku = getenv('HEROKU')
    if heroku != None:
        app.run(debug=False, port=int(environ.get('PORT', 17995)))
    else:
        app.run(debug=True, port=5000)
