const express = require('express')
const app = express()
const port = 9000
const pm2 = require('pm2')


app.get('/', (req, res) => {
  pm2.connect(function(err) {
    if (err) {
      console.error(err)
      process.exit(2)
    }

    pm2.list((err, list) => {
      console.log(err, list)

      pm2.disconnect()

      res.send(list.map(p => {
        return {
	  name: p.name,
          pid: p.pid,
          monit: p.monit,
          args: p.pm2_env.args,
          discord_username: p.pm2_env.env.ZENBOT_DISCORD_USERNAME,
          port: p.pm2_env.env.ZENBOT_API_PORT,
        }
      }))
    })
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
