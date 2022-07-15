FROM python:3.10.5

RUN apt-get update -y && apt-get install -y libpq-dev python3-pip python-dev

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

ENTRYPOINT [ "python" ]

CMD [ "wsgi.py" ]
