/*
let hourlyData = [];

for (var i in rawData) {
  hourlyData.push([Date.parse(rawData[i]["d"]),
                  parseInt(rawData[i]["s"].split(" ")[0])]);
}
*/

var hourlyData = rawData.map(arr => {
    var narr = [];
    narr.push(Date.parse(arr["d"]), parseInt(arr["s"].split(" ")[0]));
    return narr;
});

/*
var dailyData = [];
var sdData = [];      // date in short format YYY-MM-DD

for (var i in rawData) {
  let ld = new Date(rawData[i]["d"]);      // date in long format
  let sd = new Date(ld.getFullYear(), ld.getMonth(), ld.getDate());
  sdData.push([Date.parse(sd), parseInt(rawData[i]["s"].split(" ")[0])]);
}
console.log(sdData);

var groupByArray(xs, key) {
  return xs.reduce(function (rv, x) {
    let v = key instanceof Function ? key(x) : x[key];
    let el = rv.find((r) => r && r.key === v);
    if (el) {
      el.values.push(x);
    } else {
      rv.push({ key: v, values: [x] });
    } return rv;
  }, []);
}

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}
*/





/*
let dailyData = [];
let daySpeeds = [];

for (i=0; i<rawData.length; i++) {
  var curDate = new Date(rawData[0]["d"]).getDate();
  var minSpeed = paresInt(rawData[0]["s"].split(" ")[0]);
  var maxSpeed = minSpeed;
  while (var nextDate = new Date(rawData[i].getDate() == curDate) {
    var nextSpeed = parseInt(rawData[i]["s"].split(" ")[0]);
    if (nextSpeed < minSpeed) {
      minSpeed = nextSpeed;
    }
    if (nextSpeed > maxSpeed) {
      maxSpeed = nextSpeed;
    }
    i++;
  }
  hourlyData.push([Date.parse(rawData[i]["d"]),
                  parseInt(rawData[i]["s"].split(" ")[0])]);
}
*/



Highcharts.stockChart('hourly', {

  rangeSelector: {
    selected: 1
  },

  title: {
    text: 'Hourly fast.com Download Speed'
  },

  navigator: {
    yAxis: {
      min: 0
    }
  },
  
  yAxis: {
    min: 0
  },
  
  series: [{
    name: 'Mbps',
    data: hourlyData,
    tooltip: {
      valueDecimals: 2
    }
  }]
});


Highcharts.stockChart('daily', {

  rangeSelector: {
    selected: 2
  },

  chart: {
      type: 'columnrange'
  },

  title: {
    text: 'Daily fast.com Download Speed'
  },

  navigator: {
    yAxis: {
      min: 0
    }
  },
  
  yAxis: {
    min: 0
  },
  
  series: [{
    name: 'Mbps',
    data: dailyData,
    tooltip: {
      valueSuffix: 'Mbps',
      valueDecimals: 0
    }
  }]
});
