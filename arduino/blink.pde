int incomingByte;      // a variable to read incoming serial data into
const int ledPin = 13; // the pin that the LED is attached to

void setup() { 
  Serial.begin(9600); 
  pinMode(ledPin,OUTPUT); 
} 

void loop() { 
	while (Serial.available()) {
    // read the oldest byte in the serial buffer:
    incomingByte = Serial.read();
    // if it's a 1, turn on the LED:
    if (incomingByte == 1) {
      digitalWrite(ledPin, HIGH);
    } 
    // if it's a 0 turn off the LED:
    if (incomingByte == 0) {
      digitalWrite(ledPin, LOW);
    }
 }
}