import path from 'path'


// 

import { google } from "googleapis";


const credential = path.join(process.cwd(), 'credential.json')


export async function readSheet () {

  try {

    console.log('READ SHEET')

    const auth = new google.auth.GoogleAuth({
      keyFile: credential,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    
    const sheets = google.sheets({
      version: 'v4',
      auth
    })


    const responce = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'DATA'
    })

    const obj = responce.data.values.map((item, index) => {

      return {
        id: index+1,
        title: item[0],
        description: item[1]
      }
    })

    return (responce.data.values.length < 1) ? [] : obj
    
  } catch (error) {
    console.log(error)
    return []
  }

}