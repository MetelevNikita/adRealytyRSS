// basic

import path from 'path'

// 

import { Server } from './module/server.js'


// 

import dotenv from 'dotenv'

// 

dotenv.config({
  path: path.join(process.cwd(), '.env')
})




const server = new Server(4000)
server.start()
server.route()


