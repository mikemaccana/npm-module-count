var express = require('express')
  , routes = require('./routes')
  , http = require('http')

var app = express()

app.configure(function(){
  app.set('views', __dirname + '/views')
  app.set('view engine', 'ejs')
  app.set('jsonp callback', true )
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(require('stylus').middleware({ src: __dirname + '/public' }))
  app.use(express.static(__dirname + '/public'))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)
})

app.configure('development', function(){
  app.use(express.errorHandler())
})

app.get('/', routes.index)
app.get('/get_npm_count', routes.get_npm_count)

http.createServer(app).listen(3333)

console.log("Express - port 3333")