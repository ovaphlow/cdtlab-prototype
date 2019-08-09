const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light mb-3">
      <a className="navbar-brand" href="#">#TITLE#</a>

      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="index.html">首页</a>
        </li>

        <li className="nav-item active">
          <a className="nav-link" href="test.html">首页</a>
        </li>
      </ul>
    </nav>
  )
}

ReactDOM.render(<Navbar />, document.getElementById('nav'))