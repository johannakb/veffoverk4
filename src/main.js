var url = 'http://apis.is/flight?language=en&type=departures';

var arrivals   = 'http://apis.is/flight?language=en&type=arrivals';
var departures = 'http://apis.is/flight?language=en&type=departures';

document.addEventListener('DOMContentLoaded', getData());

function getData() {
    var container = document.querySelector('.data');

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var results = document.createElement('div');

            JSON.parse(request.response).results.forEach(function (item) {
            var heading = document.createElement('h3');
            if(url === departures)
            {
                heading.appendChild(document.createTextNode('Flight from: ' + item.to));
            }
            else
            {
                heading.appendChild(document.createTextNode('Flight to: ' + item.from));
            }

            results.appendChild(heading);

            var listi = document.createElement('ul');

            var text = document.createElement('li');
            text.appendChild(document.createTextNode('Flight number: ' + item.flightNumber));
            listi.appendChild(text);

            text = document.createElement('li');
            text.appendChild(document.createTextNode('Date: ' + item.date));
            listi.appendChild(text);

            text = document.createElement('li');
            text.appendChild(document.createTextNode('Airline: ' + item.airline));
            listi.appendChild(text);

            text = document.createElement('li');
            text.appendChild(document.createTextNode('Planned arrival: ' + item.plannedArrival));
            listi.appendChild(text);

            text = document.createElement('li');
            text.appendChild(document.createTextNode(item.realArrival));
            listi.appendChild(text);

            if (item.status)
            {
                text = document.createElement('li');
                text.appendChild(document.createTextNode(item.status));
                listi.appendChild(text);
            }

            results.appendChild(listi);
            });

            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            container.appendChild(results);

        } else {
            container.textContent = request.status + ' villa!';
        }
    };

    request.onerror = function() {
    container.textContent = 'Villa í tengingu!';
    };
    request.send();
}

function skipta () {
    
    if(url === arrivals)
    {
        url = departures;
    }
    else
    {
        url = arrivals;
    }
    getData();
}