const weatherOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      yTemp: {
        title: {
          text:"Températures (°C)",
          display:true,
        },
        position: 'left',
        ticks: {
          color: "#9f9f9f",
          beginAtZero: false,
          maxTicksLimit: 5,
        },
        grid: {
          drawBorder: true,
          display: true,
        },
      },
      yRain: {
        title: {
          text:"Précipitations (mm)",
          display:true,
        },
        max: 5,
        min: 0,
        position: 'right',
        ticks: {
          color: "#9f9f9f",
          beginAtZero: true,
          maxTicksLimit: 5,
        },
        grid: {
          drawBorder: true,
          display: false,
        },
      },
      x: {
        grid: {
          drawBorder: true,
          display: true,
        },
        ticks: {
          padding: 20,
          color: "#9f9f9f",
        },
      },
    },
  }

  module.exports = {
    weatherOptions
  };
