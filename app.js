
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Arduino requirement
var arduino = require('arduino'),
    board = arduino.connect('/dev/tty.usbserial-A800f7P3'),
    ledState = arduino.LOW,
    // Pin 13 has an LED connected on most Arduino boards:
    ledPin = 13,
    interval;

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  // initialize the digital pin as an output.
  board.pinMode(ledPin, arduino.OUTPUT);
  board.pinMode(ledPin, ledState);
    
  res.render('index', {
    title: 'Test with node.js and arduino'
  });
});

app.get('/on', function(req, res){
  clearInterval(interval);  // clear interval when led blinking
  board.digitalWrite(ledPin, ledState = arduino.HIGH); // set the LED on 
  
  console.log("LedState ON");
  res.send("Led is ON");
});

app.get('/off', function(req, res){
  clearInterval(interval);  // clear interval when led blinking
  board.digitalWrite(ledPin, ledState = arduino.LOW); // set the LED off
  
  console.log("LedState OFF");
  res.send("Led is OFF");
});

app.get('/blink', function(req, res){
  res.send("Led is blinking");
  
  // set interval
  interval = setInterval(function() {    
    // get ledState state
    board.digitalWrite(ledPin, (ledState = ledState === arduino.LOW && arduino.HIGH || arduino.LOW) );
    console.log("LedState "+ (ledState === 0 ? 'OFF' : 'ON') );

  }, 500);  // every 500 millisecond
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
