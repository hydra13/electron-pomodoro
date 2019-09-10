'use strict'

const path = require('path')
const { app } = require('electron')

const Window = require('./Window')

require('electron-reload')(__dirname)

function main() {
  let mainWindow = new Window({
    file: path.join('renderer', 'index.html')
  })
}

app.on('ready', main)

app.on('window-all-closed', function () {
  app.quit()
})
