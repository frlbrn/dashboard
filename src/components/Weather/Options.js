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

  const weatherHumidityOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        min: 0,
        title: {
          text:"Humidité (%)",
          display:true,
        },
        position: 'left',
        ticks: {
          color: "#9f9f9f",
          beginAtZero: true,
          maxTicksLimit: 5,
        },
        grid: {
          drawBorder: true,
          display: true,
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

  const weatherWindOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      ySpeed: {
        min: 0,
        title: {
          text:"Vitesse (km/h)",
          display:true,
        },
        position: 'left',
        ticks: {
          color: "#9f9f9f",
          beginAtZero: true,
          maxTicksLimit: 5,
        },
        grid: {
          drawBorder: true,
          display: true,
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
    weatherOptions, weatherHumidityOptions, weatherWindOptions
  };
