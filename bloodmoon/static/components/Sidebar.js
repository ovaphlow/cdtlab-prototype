const Sidebar = () => {
  const [list, setList] = React.useState([])

  React.useEffect(() => {
    fetch(`/api/recent/`)
      .then(response => response.json())
      .then(res => {
        if (res.message) {
          window.alert(res.message)
          return
        }
        setList(res.content)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <nav className="col-sm-3 col-md-2 d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <p className="lead text-center mb-0">
          <strong>
            <em className="text-secondary">投放主题文件列表</em>
          </strong>
        </p>

        <ul className="nav flex-column">
          {
            list.length > 0 && 
            list.map(it => (
              <li className="nav-item" key={it.id}>
                <a href={`playlist.html?id=${it.id}`} className="nav-link">
                  <i className="fa fa-fw fa-file-powerpoint-o"></i>
                  {it.name}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    </nav>
  )
}

ReactDOM.render(<Sidebar />, document.getElementById('sidebar'))