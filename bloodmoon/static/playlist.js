const Playlist = () => {
  const [item, setItem] = React.useState(0)
  const [fileList, setFileList] = React.useState([])

  React.useEffect(() => {
    fetch(`/api/playlist/${getQueryString('id')}`)
      .then(response => response.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
          return
        }
        setItem(res.content)
      })
  }, [])

  React.useEffect(() => {
    fetch(`/api/playlist/${getQueryString('id')}/file/`)
      .then(response => response.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
          return
        }
        setFileList(res.content)
      })
      .catch(err => window.console.error(err))
  }, [])

  const handleChange = e => {
    const { value, name } = e.target;
    setItem(prev => ({ ...prev, [name]: value }))
  }

  const handleFileLevelUp = event => {
    console.info('up', event.target.getAttribute('data-id'))
  }

  const handleFileLevelDown = event => {
    console.info('down', event.target.getAttribute('data-id'))
  }

  const handleFileRemove = event => {
    console.info('remove', event.target.getAttribute('data-id'))
  }

  const handleRemove = () => {
    if (!!!window.confirm('确定要删除当前数据？')) return
    fetch(`/api/playlist/${item.id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
          return
        }
        window.location = 'index.html'
      })
      .catch(err => window.console.error(err))
  }

  const handleUpdate = () => {
    fetch(`/api/playlist/${item.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
          return
        }
        window.location = 'index.html'
      })
      .catch(err => window.console.error(err))
  }

  return (
    <div rol="main" className="col-sm-9 ml-sm-auto col-md-10 px-4">
      <h3>投放主题文件</h3>
      <hr />

      <div className="card shadow">
        <div className="card-header">
          上传文件
        </div>

        <div className="card-body">
          <form action={`/api/playlist/${item.id}/upload`} method="POST" encType="multipart/form-data">
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="file" />
              <label className="custom-file-label" htmlFor="validatedCustomFile">选择文件</label>
            </div>

            <div className="btn-group pull-right mt-3">
              <button type="button" className="btn btn-secondary">
                <i className="fa fa-fw fa-upload"></i>
                上传
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow mt-3">
        <div className="card-header">
          文件列表
        </div>

        <div className="card-body">
          {
            fileList.map(it => (
              <ul className="list-group">
                <li className="list-group-item">
                  <h5>
                    {it.path}

                    <small className="pull-right">
                      <em className="text-secondary">
                        {it.datime}
                      </em>
                    </small>
                  </h5>

                  <div className="btn-group pull-right">
                    <button type="button" className="btn btn-sm btn-light"
                        onClick={handleFileLevelUp}
                    >
                      <i className="fa fa-fw fa-level-up" data-id={it.id}></i>
                    </button>

                    <button type="button" className="btn btn-sm btn-light"
                        onClick={handleFileLevelDown}
                    >
                      <i className="fa fa-fw fa-level-down" data-id={it.id}></i>
                    </button>

                    <button type="button" className="btn btn-sm btn-light"
                        onClick={handleFileRemove}
                    >
                      <i className="fa fa-fw fa-trash" data-id={it.id}></i>
                    </button>
                  </div>
                </li>
              </ul>
            ))
          }
        </div>
      </div>

      <div className="card shadow mt-3">
        <div className="card-header">
          编辑主题
        </div>

        <div className="card-body" role="form">
          <div className="form-group">
            <label>名称</label>
            <input type="text" name="name" value={item.name}
                className="form-control"
                onChange={handleChange}
            />
          </div>
        </div>

        <div className="card-footer">
          <div className="btn-group">
            <button type="button" className="btn btn-danger" onClick={handleRemove}>
              删除
            </button>
          </div>

          <div className="btn-group pull-right">
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
              <i className="fa fa-fw fa-check"></i>
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<Playlist />, document.getElementById('app'))