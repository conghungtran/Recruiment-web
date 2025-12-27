import https from 'https'
import fs from 'fs'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// Đọc certificate/key từ thư mục ssl trong project
const options = {
  key: fs.readFileSync('./ssl/private.key'),
  cert: fs.readFileSync('./ssl/certificate.crt'),
  ca: fs.readFileSync('./ssl/ca_bundle.crt'),
}

const PORT = 3443

app.prepare().then(() => {
  https
    .createServer(options, (req, res) => {
      handle(req, res)
    })
    .listen(PORT, err => {
      if (err) throw err
      console.log(`> Ready on https://localhost:${PORT}`)
    })
})
