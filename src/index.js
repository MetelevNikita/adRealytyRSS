// basic

import path from 'path'

// 

import { Server } from './module/server.js'


// googls

import { readSheet } from './module/googleSheet.js'

import dotenv from 'dotenv'

dotenv.config({
  path: path.join(process.cwd(), '.env')
})

// googls 

let data = await readSheet()

setInterval(async () => {
  console.log('Обновил список')
  data = await readSheet()
}, 3600000)


// 



const server = new Server(4000)
server.start()
server.route(data)


