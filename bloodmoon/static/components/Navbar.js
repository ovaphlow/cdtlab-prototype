const Navbar = () => {
  return (
    <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark p-0 shadow">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0 text-center" href="#">屏控系统</a>

      <ul className="navbar-nav px-3">
        <li className="nav-item active text-nowrap">
          <a className="nav-link" href="index.html">
            <i className="fa fa-fw fa-home"></i>
            首页
          </a>
        </li>

        <li className="nav-item active">
          <a className="nav-link" href="test.html">首页</a>
        </li>
      </ul>
    </nav>
  )
}

ReactDOM.render(<Navbar />, document.getElementById('nav'))