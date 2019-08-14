const PlaylistSave = () => {
  const [item, setItem] = React.useState({
    name: ''
  })

  const handleChange = e => {
    const { value, name } = e.target;
    setItem(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    fetch(`/api/playlist/`, {
      method: 'POST',
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
      <h3>新增投放主题</h3>
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
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              <i className="fa fa-fw fa-check"></i>
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<PlaylistSave />, document.getElementById('app'))