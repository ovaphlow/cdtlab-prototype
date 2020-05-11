import React from 'react'
import ReactDOM from 'react-dom'

function Index() {
  return (
    <>
      <h1>首页</h1>
      <a href="customer.html">CUSTOMER</a>
    </>
  )
}

ReactDOM.render(<Index />, document.getElementById('app'))
