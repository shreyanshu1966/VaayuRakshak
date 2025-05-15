#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <HardwareSerial.h>

// WiFi credentials
const char* ssid = "Airtel_Salunke_5G";     
const char* password = "9922981667

// API endpoint - replace with your actual backend server IP or domain and port
const char* serverName = "http://localhost:3001/api/upload";  // Example: local backend server

// Pins
const int gasSensorPin = 36;  // GPIO36 for MQ135
const int buzzerPin = 25;     // Buzzer pin
const int ledPin = 26;        // LED pin

// Threshold
const int gasThreshold = 2000; // Adjust based on calibration

// LCD (I2C address 0x27, 16x2)
LiquidCrystal_I2C lcd(0x27, 16, 2);

// GPS (UART2: RX = GPIO16, TX = GPIO17)
HardwareSerial GPS(2);
const int gpsRxPin = 16;
const int gpsTxPin = 17;

// Variables
float latitude = 0.0;
float longitude = 0.0;

void setup() {
  Serial.begin(115200);
  delay(1000);

  pinMode(buzzerPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  digitalWrite(buzzerPin, LOW);
  digitalWrite(ledPin, LOW);

  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Connecting...");

  // Start GPS
  GPS.begin(9600, SERIAL_8N1, gpsRxPin, gpsTxPin);

  // Connect WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("WiFi Connected");
}

void loop() {
  int gasValue = analogRead(gasSensorPin);
  Serial.print("Gas Value: ");
  Serial.println(gasValue);

  readGPS();

  if (gasValue > gasThreshold) {
    digitalWrite(buzzerPin, HIGH);
    digitalWrite(ledPin, HIGH);

    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Gas: ");
    lcd.print(gasValue);
    lcd.setCursor(0, 1);
    lcd.print("Sending alert...");

    sendGasData(gasValue, latitude, longitude);
  } else {
    digitalWrite(buzzerPin, LOW);
    digitalWrite(ledPin, LOW);
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Gas Normal: ");
    lcd.print(gasValue);
  }

  delay(3000);
}

void readGPS() {
  // Simple NMEA parsing
  while (GPS.available()) {
    String line = GPS.readStringUntil('\n');
    if (line.startsWith("$GPGGA")) {
      int latStart = line.indexOf(',') + 1;
      int latEnd = line.indexOf(',', latStart);
      String rawLat = line.substring(latStart, latEnd);

      int lonStart = line.indexOf(',', latEnd + 1) + 1;
      int lonEnd = line.indexOf(',', lonStart);
      String rawLon = line.substring(lonStart, lonEnd);

      latitude = rawLat.toFloat() / 100.0;
      longitude = rawLon.toFloat() / 100.0;
      break;
    }
  }
}

void sendGasData(int gasValue, float lat, float lng) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");

    StaticJsonDocument<256> jsonDoc;
    jsonDoc["gasLevel"] = gasValue;
    jsonDoc["latitude"] = lat;
    jsonDoc["longitude"] = lng;

    // Optional: add real timestamp here
    jsonDoc["timestamp"] = "2025-05-14T10:32:00Z";

    String requestBody;
    serializeJson(jsonDoc, requestBody);

    int httpResponseCode = http.POST(requestBody);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Response code: " + String(httpResponseCode));
      Serial.println("Response: " + response);
    } else {
      Serial.println("POST failed, error: " + String(httpResponseCode));
    }

    http.end();
  } else {
    Serial.println("WiFi not connected.");
  }
}
