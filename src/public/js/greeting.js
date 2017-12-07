var date = new Date();
var hour = date.getHours();
var greeting;

if (hour < 6) {
  greeting = 'Goedenacht';
} else if (hour < 12) {
  greeting = 'Goedemorgen';
} else if (hour < 18) {
  greeting = 'Goedemiddag';
} else {
  greeting = 'Goedenavond';
}

var greetingSpan = document.getElementById('greeting');
greetingSpan.innerHTML = greeting;
