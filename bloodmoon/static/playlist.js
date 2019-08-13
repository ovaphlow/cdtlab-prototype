const Playlist = () => {
  const [item, setItem] = React.useState(0)

  React.useEffect(() => {
    console.info(getQueryString('id'))
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

  const handleChange = e => {
    const { value, name } = e.target;
    setItem(prev => ({ ...prev, [name]: value }))
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