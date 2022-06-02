from app.server import app
import os
 
if __name__ == "__main__":
    heroku = os.getenv('HEROKU')
    if heroku != None:
        app.run(debug=False, port=int(os.environ.get('PORT', 17995)))
    else:
        app.run(debug=True, port=5000)
