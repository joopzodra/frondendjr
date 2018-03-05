var db = window.indexedDB;

if (!db) {
  giveAlert();
} else {
  var request = db.open("MyTestDatabase");
  request.onerror = giveAlert;
}

function giveAlert() {
  window.alert("De MijnUitgaven app wil de demo-uitgaven opslaan in je browser maar krijgt geen toegang tot de data-opslag in de browser. Je ziet nu dus geen uitgaven.\n\nDit komt door je browserinstellingen.\n\nGebruik je in Firefox een privévenster? Probeer dan de MijnUitgaven app eens te bekijken in een normaal venster.\n\nGebruik je in Internet Explorer de InPrivate navigatie? Schakel deze dan uit.\n\n");
}
