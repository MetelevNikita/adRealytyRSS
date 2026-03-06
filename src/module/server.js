import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import session from 'express-session'




// 


export class Server {
  constructor(port) {
    this.app = express()
    this.port = port
  }



  start () {
    try {

      // use

      this.app.use(bodyParser.json())
      this.app.use(express.urlencoded({extended: true}))
      this.app.use(express.json())
      this.app.use(cors())
      this.app.use(morgan('tiny'))
      this.app.use(helmet())
      this.app.use(session({
        secret: 'my-tv-rss',
        resave: false,
        saveUninitialized: true
      }))

      // 

      http.createServer(this.app).listen(this.port, () => {
        console.log(`Server start on port ${this.port}`)
      })
      
    } catch (error) {

      console.error(`Server not running ${this.port} - ${error}`)
      return error

    }
  }

  route (data = []) {
    this.app.get('/', (req, res) => {
      return res.status(200).send({
        data: data
      })
    })


    this.app.get('/data', (req, res) => {


    if (!req.session.data) {
          req.session.data = 2
        }
        
        // Увеличиваем счетчик
        req.session.data++
        console.log('Session data:', req.session.data)

        if (req.session.data === data.length) {
          req.session.data = 2
        }

        const currentNews = data.find((item) => item.id === req.session.data)
        console.log(currentNews)

        res.status(200).json(currentNews)

      })
    }
}