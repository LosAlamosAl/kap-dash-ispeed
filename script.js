var hourlyData = rawData.map(arr => {
  var narr = [];
  var speed = parseInt(arr["s"].split(" ")[0]);
  if (isNaN(speed))
    speed = null;
  narr.push(Date.parse(arr["d"]), speed);
  return narr;
});


var sdData = [];      // date in short format YYY-MM-DD
for (let i in hourlyData) {
  let ld = new Date(hourlyData[i][0]);
  let sd = new Date(ld.getFullYear(), ld.getMonth(), ld.getDate());
  sdData.push([sd, hourlyData[i][1]]);
}


var dailyData = [];
var lo = 0;
var hi = 0;
for (var i=0; i<sdData.length; i++) {
  let speeds = [];
  let tDate = sdData[i][0].getDate();        // day of month (1-31)
  while (i<sdData.length && sdData[i][0].getDate() == tDate) {
    if (sdData[i][1] !== null)      // null indicated missing data
      speeds.push(sdData[i][1]);
    i++;
  }
  i--;       //  back up to avoid double increment of i (while and for)
  if (speeds.length != 0) {
    lo = Math.min(...speeds);
    hi = Math.max(...speeds);
  } else {                        // entire day is missing data
    lo = null;
    hi = null;
  }
  dailyData.push([Date.parse(sdData[i][0]), lo, hi]);
}




Highcharts.stockChart('hourly', {

  rangeSelector: {
    selected: 1
  },

  plotOptions: {
    line: {
      connectNulls: false
    }
  },
  
  title: {
    text: 'Hourly fast.com Download Speed'
  },

  navigator: {
    yAxis: {
      min: 0
    }
  },

  xAxis: {
    plotBands: [{
      from: Date.UTC(2018, 05, 23, 13, 0),
      to: Date.UTC(2018, 05, 24, 21, 0),
      color: '#FCF2F2',
      label: {
        text: 'Pi disk full',
        style: {
          color: '#999999'
        }
      }
    }]
  },

  yAxis: {
    min: 0
  },
  
  series: [{
    name: 'Mbps',
    data: hourlyData,
    id: 'dlspeed',
    tooltip: {
      valueDecimals: 2
    }
  }]
});


Highcharts.stockChart('daily', {

  rangeSelector: {
    selected: 1
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
  
  xAxis: {
    type: 'datetime'
  },
  
  tooltip: {
    valueSuffix: 'Mbps',
    valueDecimals: 0
  },

  series: [{
    name: 'Mbps',
    data: dailyData
  }]
});
