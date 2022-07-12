import os
import boto3 as aws
import sys

S3_ADDR = os.getenv('S3_ADDRESS')
S3_BUCKET = os.getenv('S3_BUCKET')

if __name__ == '__main__':
    if len(sys.argv) > 1:
        name = sys.argv[1]
        i = 0
        try:
            s3 = aws.client('s3')
            for i, f in enumerate(os.listdir(f'imgs/{name}')):
                img_path = f'imgs/{name}/{f}'
                if os.path.isfile(img_path):
                    s3.upload_file(img_path, S3_BUCKET, f'{name}/{i}.jpg', ExtraArgs={'ACL': 'public-read'})
                    print(f'uploaded {img_path} to {S3_ADDR}/{name}/{i}.jpg')
                    i += 1
                else:
                    print('='*25)
                    print(f'error uploading bot image {i}:')
                    print(e)
                    print('='*25)
        except Exception as e:
            print('='*25)
            print(f'error uploading bot image {i}:')
            print(e)
            print('='*25)
    else:
        print('='*25)
        print('must run botupload with a name')
        print('='*25)
