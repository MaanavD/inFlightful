
// Trigger navbar
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC_NIOePCL-HYNUKUynOimw11coeNwoghA",
  authDomain: "inflightful-ed037.firebaseapp.com",
  databaseURL: "https://inflightful-ed037.firebaseio.com",
  projectId: "inflightful-ed037",
  storageBucket: "inflightful-ed037.appspot.com",
  messagingSenderId: "724859666808",
  appId: "1:724859666808:web:b0419e84ce71e4d50d088d",
  measurementId: "G-K8YGV4H3HY"
};
var jetblueCounter = [0, 0, 0];
var westjetCounter = [0, 0, 0];
var aircanadaCounter = [0, 0, 0];
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// Reference messages collection
var tweetsRef = firebase.database().ref('tweets');
tweetsRef.on('value', gotData, errData);
function gotData(data) {
  var tweets = data.val();
  var keys = Object.keys(tweets);
  var element = document.getElementById("tweetList");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  jetblueCounter = [0, 0, 0];
  westjetCounter = [0, 0, 0];
  aircanadaCounter = [0, 0, 0];
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var screen_name = tweets[k].screen_name;
    var tweet = tweets[k].tweet;
    var user_name = tweets[k].user_name;
    var date = tweets[k].date;
    var link = tweets[k].url;
    var sentiment = tweets[k].analysis.sentiment;
    console.log(tweets[k].airline);
    var tweetElement = createElementHtml(screen_name, tweet, user_name, date, link, sentiment);
    if (tweets[k].airline == 'jetblue') {
      switch (tweets[k].analysis.sentiment) {
        case 1:
          jetblueCounter[0]++;
          break;
        case 2:
          jetblueCounter[1]++;
          break;
        case 3:
          jetblueCounter[2]++;
          break;
        default:
          break;
      }
    }
    else if (tweets[k].airline == 'westjet') {
      switch (tweets[k].analysis.sentiment) {
        case 1:
          westjetCounter[0]++;
          break;
        case 2:
          westjetCounter[1]++;
          break;
        case 3:
          westjetCounter[2]++;
          break;
        default:
          break;
      }
    }
    else if (tweets[k].airline == 'aircanada') {
      switch (tweets[k].analysis.sentiment) {
        case 1:
          aircanadaCounter[0]++;
          break;
        case 2:
          aircanadaCounter[1]++;
          break;
        case 3:
          aircanadaCounter[2]++;
          break;
        default:
          break;
      }
    }


    console.log(jetblueCounter + ":" + westjetCounter + ":" + aircanadaCounter);
    element.appendChild(tweetElement);
  }
}
function errData(err) {
  console.log("error");
}
function createElementHtml(screen_name, tweet, user_name, date, link, sentiment) {
  newdiv = document.createElement('div');
  newdiv.className = "box";
  var article = document.createElement("article");
  article.className = "media";
  var mediaContent = document.createElement("div");
  mediaContent.className = "media-content";
  var content = document.createElement("content");
  content.className = "content";
  var p = document.createElement("p");
  var strong = document.createElement("strong");
  var textNode = document.createTextNode(user_name);
  strong.appendChild(textNode);
  var small = document.createElement("small");
  textNode = document.createTextNode(" " + screen_name);
  small.appendChild(textNode);
  p.appendChild(strong);
  p.appendChild(small);
  var br1 = document.createElement("br");
  p.appendChild(br1);
  textNode = document.createTextNode(tweet);
  p.appendChild(textNode);
  var br2 = document.createElement("br");
  p.appendChild(br2);
  textNode = document.createTextNode(date);
  small = document.createElement("small");
  small.appendChild(textNode);
  p.appendChild(small);
  content.appendChild(p);

  // Nav 
  var nav = document.createElement("nav");
  nav.classList = "level is-mobile";
  var levelLeft = document.createElement("div");
  levelLeft.className = "level-left";
  var levelItem1 = document.createElement("a");
  levelItem1.className = "level-item";
  textNode = document.createTextNode(link);
  levelItem1.appendChild(textNode);
  var levelItem2 = document.createElement("p");
  levelItem2.className = "level-item";
  if (sentiment == 1) {
    textNode = document.createTextNode("Bad 🤢");
  }
  else if (sentiment == 2) {
    textNode = document.createTextNode("Neutral 😐");
  }
  else if (sentiment == 3) {
    textNode = document.createTextNode("Good 😊");
  }
  else {
    textNode = document.createTextNode("Undetermined ❓");
  }
  levelItem2.appendChild(textNode);
  levelLeft.appendChild(levelItem1);
  levelLeft.appendChild(levelItem2);
  nav.appendChild(levelLeft);
  mediaContent.appendChild(content);
  var br3 = document.createElement("br");
  mediaContent.appendChild(br3);
  mediaContent.appendChild(nav);
  article.appendChild(mediaContent);
  newdiv.appendChild(article);
  return newdiv;
}
// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);
// Submitform
function submitForm(e) {
  e.preventDefault();
  // Get all form values

  var tweet = getInputVal('tweet');
  var screen_name = getInputVal('screen_name');
  var user_name = getInputVal('user_name');
  var date = getInputVal('date');
  var url = getInputVal('link');
  sendTweet(tweet)
    .then(data => saveTweet(tweet, screen_name, user_name, date, url, data, "jetblue"));
  // var obj = JSON.parse(analysis);
  // 

  updateChart();
}
document.getElementById('Jetblue').addEventListener('submit', submitBtnJet);
// Submit Jet
async function submitBtnJet(e) {
  e.preventDefault();
  const response = await fetch('https://hackathons-1569045593351.appspot.com/jetblue');
  await response.json().then(data => saveTweet(data.tweet, data.screen_name, data.user_name, data.date, data.url, data.analysis, data.airline));

  updateChart();
}
document.getElementById('WestJet').addEventListener('submit', submitBtnWest);
// Submit Jet
async function submitBtnWest(e) {
  e.preventDefault();
  const response = await fetch('https://hackathons-1569045593351.appspot.com/westjet');
  await response.json().then(data => saveTweet(data.tweet, data.screen_name, data.user_name, data.date, data.url, data.analysis, data.airline));

  updateChart();
}
document.getElementById('AirCanada').addEventListener('submit', submitBtnAir);
// Submit Jet
async function submitBtnAir(e) {
  e.preventDefault();
  const response = await fetch('https://hackathons-1569045593351.appspot.com/aircanada');
  await response.json().then(data => saveTweet(data.tweet, data.screen_name, data.user_name, data.date, data.url, data.analysis, data.airline));

  updateChart();
}

// Get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
function saveTweet(tweet, screen_name, user_name, date, url, analysis, airline) {
  var newTweetRef = tweetsRef.push();
  newTweetRef.set({
    tweet: tweet,
    screen_name: screen_name,
    user_name: user_name,
    date: date,
    url: url,
    analysis: analysis,
    airline: airline
  });
}


async function sendTweet(tweet) {
  const url = "https://hackathons-1569045593351.appspot.com/sentiment";
  var jsonTweet = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "tweet": tweet,
      "screen_name": "jay mody",
      "user_name": "jaymody",
      "date": "11:59AM 11-09-2019",
      "url": "https://twitter.com/url/to/tweet"
    }
    )
  };
  let response = await fetch(url, jsonTweet);
  let data = await response.json()
  return data;
}

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
  type: 'bar',

  // The data for our dataset
  data: {
    labels: ['Bad', 'Neutral', 'Good'],
    datasets: [{
      label: 'Jetblue',
      borderColor: 'rgb(50, 115, 220)',
      data: [jetblueCounter[0], jetblueCounter[1], jetblueCounter[2]],
      backgroundColor: 'rgb(50, 115, 220)'
    }, {
      label: 'WestJet',
      borderColor: 'rgb(0,139,139)',
      data: [westjetCounter[0], westjetCounter[1], westjetCounter[2]],
      backgroundColor: 'rgb(0,209,178)'
    }, {
      label: 'Air Canada',
      borderColor: 'rgb(255, 56, 96)',
      data: [aircanadaCounter[0], aircanadaCounter[1], aircanadaCounter[2]],
      backgroundColor: 'rgb(255, 56, 96)'
    }]
  },

  // Configuration options go here
  options: {
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          stepValue: 5
        }
      }]
    }
  }
});
window.onload = my_function();
async function my_function(){
  const response = await fetch('https://hackathons-1569045593351.appspot.com/jetblue');
  await response.json().then(data => saveTweet(data.tweet, data.screen_name, data.user_name, data.date, data.url, data.analysis, data.airline));

  updateChart();
}
function updateChart() {
  chart.data.datasets[0].data[0] = jetblueCounter[0];
  chart.data.datasets[0].data[1] = jetblueCounter[1];
  chart.data.datasets[0].data[2] = jetblueCounter[2];
  chart.data.datasets[1].data[0] = westjetCounter[0];
  chart.data.datasets[1].data[1] = westjetCounter[1];
  chart.data.datasets[1].data[2] = westjetCounter[2];
  chart.data.datasets[2].data[0] = aircanadaCounter[0];
  chart.data.datasets[2].data[1] = aircanadaCounter[1];
  chart.data.datasets[2].data[2] = aircanadaCounter[2];
  chart.update();
}