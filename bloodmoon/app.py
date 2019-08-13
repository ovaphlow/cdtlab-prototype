from flask import Flask, redirect, url_for, request
from sqlalchemy.orm import sessionmaker
import json

from . import globalvars

app = Flask(__name__)


@app.route('/')
def home():
    return redirect('/static/index.html')


@app.route('/api/recent/', methods=['GET'])
def recent():
    Session = sessionmaker(bind=globalvars.engine)
    session = Session()
    sql = '''
        select * from playlist
    '''
    result = session.execute(sql).fetchall()

    _list = []
    for row in result:
        _list.append(dict(row))
    return json.dumps({
        'message': '',
        'content': _list
    })


@app.route('/api/playlist/<id>', methods=['GET', 'PUT'])
def playlist(id):
    Session = sessionmaker(bind=globalvars.engine)
    session = Session()

    if request.method == 'PUT':
        body = json.loads(request.get_data())
        sql = '''
            update playlist set name = :name where id = :id
        '''
        result = session.execute(sql, body)
        session.commit()
        return json.dumps({
            'message': '',
            'content': ''
        })

    sql = '''
        select * from playlist where id = :id limit 1
    '''
    result = session.execute(sql, { 'id': id }).fetchone()
    print(dict(result))
    return json.dumps({
        'message': '',
        'content': dict(result)
    })
