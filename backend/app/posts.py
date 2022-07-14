from uuid import uuid4
from os import getenv
import jsonpickle as jp
from flask import Blueprint, make_response, jsonify, request
from db import PostsRepo, UserRepo
from time import time
from usertoken import GetUserIdFromJwt
import boto3 as aws

S3_BUCKET = getenv('S3_BUCKET')
S3_ADDR = getenv('S3_ADDRESS')

posts = Blueprint('posts', __name__)

@posts.route('/posts/add', methods=['POST'])
def add_post():
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token in [None, '']:
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = GetUserIdFromJwt(access_token)

    req = request.get_json()
    try:
        post = req['post_text']
        is_public = req['is_public']
    except KeyError:
        return make_response(jsonify('error adding post'), 400)

    cur_time = int(time())

    try:
        db = PostsRepo()
        db.add_post(user_id, post, cur_time, cur_time, is_public, 0)
        db.close()
    except Exception:
        return make_response(jsonify('error adding post'), 500)

    return make_response(jsonify('added post'), 201)

@posts.route('/posts/add/image', methods=['POST'])
def add_image_post():
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token in [None, '']:
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = GetUserIdFromJwt(access_token)

    is_public = request.form.get('is_public')

    img = request.files.get('file')
    img_id = str(uuid4())

    try:
        s3 = aws.client('s3')
        s3.upload_fileobj(img, S3_BUCKET, img_id, ExtraArgs={'ACL': 'public-read'})
    except Exception:
        return make_response(jsonify('error saving picture'), 500)
    
    img_url = f'{S3_ADDR}/{img_id}'

    cur_time = int(time())

    try:
        db = PostsRepo()
        db.add_post(user_id, img_url, cur_time, cur_time, is_public, 1)
        db.close()
    except Exception:
        return make_response(jsonify('error adding image post'), 500)

    return make_response(jsonify('added image post'), 201)

@posts.route('/posts/<id>', methods=['DELETE'])
def delete_post(id):
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token in [None, '']:
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = GetUserIdFromJwt(access_token)

    try:
        db = PostsRepo()
        is_image = db.post_is_image(id)
        if is_image:
            post = db.get_post(id)
            s3_key = '/'.join(post.split('/')[3:])
            s3 = aws.client('s3')
            s3.delete_object(Bucket=S3_BUCKET, Key=s3_key)
        db.delete_post(id, user_id)
        db.close()
    except Exception:
        return make_response(jsonify('error deleting post'), 500)

    return make_response(jsonify('post deleted'), 200)

@posts.route('/posts/<id>', methods=['PUT'])
def edit_post(id):
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token in [None, '']:
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = GetUserIdFromJwt(access_token)

    req = request.get_json()
    try:
        post = req['post_text']
    except KeyError:
        return make_response(jsonify('error adding post'),400)

    updated_at = int(time())

    try:
        db = PostsRepo()
        db.edit_post(id, user_id, post, updated_at)
        db.close()
    except Exception:
        return make_response(jsonify('error updating post'), 500)

    return make_response(jsonify('post deleted'), 200)

@posts.route('/posts/privacy/<id>', methods=['PUT'])
def change_privacy(id):
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token in [None, '']:
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = GetUserIdFromJwt(access_token)

    req = request.get_json()
    try:
        is_public = req['is_public']
    except KeyError:
        return make_response(jsonify('error adding post'), 400)

    try:
        db = PostsRepo()
        db.change_privacy(id, user_id, is_public)
        db.close()
    except:
        return make_response(jsonify('error changing privacy'), 500)

    return make_response(jsonify('post deleted'), 200)

@posts.route('/posts/like/<post_id>', methods=['PUT'])
def like_post(post_id):
    change = 1 if request.get_data().decode('utf-8') == '1' else -1
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token in [None, '']:
        return make_response(jsonify('unable to authenticate user'), 401)
    user_id = GetUserIdFromJwt(access_token)

    try:
        db = PostsRepo()
        like = db.get_like(post_id, user_id)
        if like is not None and like.change == change:
            db.unlike_post(post_id, user_id)
        else:
            db.like_post(post_id, user_id, change)
        likes = db.count_likes(post_id)
        db.close()
    except Exception:
        return make_response(jsonify('error liking post'), 500)

    return make_response(jsonify(likes), 200)

@posts.route('/posts', methods=['GET'])
def get_posts():
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token in [None, '']:
        return make_response(jsonify('unable to authenticate user'), 401)    
    user_id = GetUserIdFromJwt(access_token)

    sort_by = request.args.get('sortby')

    try:
        db = PostsRepo()
        posts = db.get_posts(user_id, sort_by)
        for i, post in enumerate(posts):
            liked, disliked = db.post_is_liked(user_id, post.post_id)
            posts[i].liked = liked
            posts[i].disliked = disliked
        db.close()
    except Exception:
        return make_response(jsonify('error getting posts'), 500)

    return make_response(jp.encode(posts), 200)

@posts.route('/posts/liked', methods=['GET'])
def get_liked_posts():
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token in [None, '']:
        return make_response(jsonify('unable to authenticate user'), 401)    
    user_id = GetUserIdFromJwt(access_token)

    sort_by = request.args.get('sortby')

    try:
        db = PostsRepo()
        posts = db.get_liked_posts(user_id, sort_by)
        for i, post in enumerate(posts):
            liked, disliked = db.post_is_liked(user_id, post.post_id)
            posts[i].liked = liked
            posts[i].disliked = disliked
        db.close()
    except Exception:
        return make_response(jsonify('error getting liked posts'), 500)

    return make_response(jp.encode(posts), 200)

@posts.route('/posts/<username>', methods=['GET'])
def get_posts_by_user(username):  
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        user_id = ''
    if access_token in [None, '']:
        user_id = ''
    else:
        user_id = GetUserIdFromJwt(access_token)

    sort_by = request.args.get('sortby')

    try:
        db = UserRepo()
        username_id = db.get_user_id_from_name(username)
        user = db.get_user(username_id)
        db.close()

        db = PostsRepo()

        if username_id == user_id:
            posts = db.get_posts(user_id, sort_by)
            if user_id != '':
                for i, post in enumerate(posts):
                    liked, disliked = db.post_is_liked(user_id, post.post_id)
                    posts[i].liked = liked
                    posts[i].disliked = disliked
            db.close()
            return make_response(jp.encode(posts), 200)

        if not user.is_public:
            db.close()
            return make_response(jsonify('user is private'), 403)

        posts = db.get_public_posts(username_id, sort_by)
        if user_id != '':
            for i, post in enumerate(posts):
                liked, disliked = db.post_is_liked(user_id, post.post_id)
                posts[i].liked = liked
                posts[i].disliked = disliked
        db.close()
        
        return make_response(jp.encode(posts), 200)
    except Exception:
        return make_response(jsonify(f'error getting {username}\'s posts'), 500)

@posts.route('/posts/feed', methods=['GET'])
def get_user_feed():
    try:
        access_token = request.headers['Access-Token']
    except Exception:
        return make_response(jsonify('unable to authenticate user'), 401)
    if access_token in [None, '']:
        return make_response(jsonify('unable to authenticate user'), 401)    
    user_id = GetUserIdFromJwt(access_token)

    sort_by = request.args.get('sortby')

    try:
        db = PostsRepo()
        if 'all' in sort_by:
            posts = db.get_all_feed(sort_by)
        else:
            posts = db.get_user_feed(user_id, sort_by)
        for i, post in enumerate(posts):
            liked, disliked = db.post_is_liked(user_id, post.post_id)
            posts[i].liked = liked
            posts[i].disliked = disliked
        db.close()
    except Exception:
        return make_response(jsonify('error getting user feed'), 500)
    
    return make_response(jp.encode(posts), 200)

@posts.route('/posts/feed/all', methods=['GET'])
def get_all_feed():
    sort_by = request.args.get('sortby')
    try:
        db = PostsRepo()
        posts = db.get_all_feed(sort_by)
        for i in range(len(posts)):
            posts[i].liked = False
            posts[i].disliked = False
        db.close()
    except Exception:
        return make_response(jsonify('error getting user feed'), 500)
    return make_response(jp.encode(posts), 200)