from flask import Flask, redirect, url_for, request
from sqlalchemy.orm import sessionmaker
import json

from . import globalvars

app = Flask(__name__)

Session = sessionmaker(bind=globalvars.engine)


@app.route('/')
def home():
    return redirect('/static/index.html')


@app.route('/api/recent/', methods=['GET'])
def recent():
    session = Session()
    sql = '''
        select * from playlist
    '''
    result = session.execute(sql).fetchall()
    session.close()

    _list = []
    for row in result:
        _list.append(dict(row))
    return json.dumps({
        'message': '',
        'content': _list
    })


@app.route('/api/playlist/', methods=['POST'])
def playlist_list():
    session = Session()

    if request.method == 'POST':
        body = json.loads(request.get_data())
        sql = '''
            insert into
                playlist (id, name)
            values
                ((select max(id) from playlist) + 1, :name)
        '''
        session.execute(sql, body)
        session.commit()
        session.close()
        return json.dumps({
            'message': '',
            'content': ''
        })


@app.route('/api/playlist/<id>', methods=['GET', 'PUT', 'DELETE'])
def playlist_spec(id):
    session = Session()

    if request.method == 'PUT':
        body = json.loads(request.get_data())
        sql = '''
            update playlist set name = :name where id = :id
        '''
        session.execute(sql, body)
        session.commit()
        session.close()
        return json.dumps({
            'message': '',
            'content': ''
        })

    elif request.method == 'DELETE':
        sql = '''
            delete from playlist where id = :id
        '''
        session.execute(sql, { 'id': id })
        session.commit()
        session.close()
        return json.dumps({
            'message': '',
            'content': ''
        })

    sql = '''
        select * from playlist where id = :id limit 1
    '''
    result = session.execute(sql, { 'id': id }).fetchone()
    session.close()
    return json.dumps({
        'message': '',
        'content': dict(result)
    })


@app.route('/api/playlist/<id>/file/', methods=['GET'])
def file_list(id):
    session = Session()
    sql = '''
        select * from file where master_id = :id order by idx
    '''
    result = session.execute(sql, { 'id': id }).fetchall()
    session.close()

    _list = []
    for row in result:
        _list.append(dict(row))
    return json.dumps({
        'message': '',
        'content': _list
    })


@app.route('/api/file/<id>', methods=['DELETE'])
def file_spec(id):
    session = Session()
    sql = '''
        delete from file where id = :id
    '''
    session.execute(sql, { 'id': id })
    session.commit()
    session.close()
    return json.dumps({
        'message': '',
        'content': ''
    })