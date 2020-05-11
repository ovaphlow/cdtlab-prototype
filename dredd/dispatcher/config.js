const os = require('os')

const config = {
  env: 'development',  
  app: {
    port: 5000,
    numChildProcesses: os.cpus().length
  },
  postgres: {
    user: 'hengda',
    password: 'srd@HD.1123',
    host: '192.168.1.246',
    port: 5432,
    database: 'ovaphlow'
  }
}

module.exports = config
