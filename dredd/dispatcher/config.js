const os = require('os')

const config = {
  env: 'development',  
  app: {
    port: 8900,
    numChildProcesses: os.cpus().length,
    salt: '89ufjio239oikwef8023r90i'
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
