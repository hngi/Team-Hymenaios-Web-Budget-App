// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("Important");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Important", "remaining"],
    datasets: [{
      data: [71, 29],
      backgroundColor: ['#19BDEA', '#C4C4C4'],
      hoverBackgroundColor: ['#AF39E7', '#C4C4C4'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 90,
  },
});

// Medium Priority
var ctx = document.getElementById("Medium");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Medium", "remaining"],
    datasets: [{
      data: [18, 82],
      backgroundColor: ['#19BDEA', '#C4C4C4'],
      hoverBackgroundColor: ['#AF39E7', '#C4C4C4'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 90,
  },
});

// Low Priority
var ctx = document.getElementById("Low");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Low", "remaining"],
    datasets: [{
      data: [11, 89],
      backgroundColor: ['#F2994A', '#C4C4C4'],
      hoverBackgroundColor: ['#AF39E7', '#C4C4C4'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 90,
  },
});
