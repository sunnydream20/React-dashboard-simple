import { ApexOptions } from "apexcharts";

interface ChartSeries {
  name: string;
  data: number[];
}
export interface ChartConfig {
  series: ChartSeries[];
  options: ApexOptions;
}

export const eChartMonthly: ChartConfig = {
  options: {
    chart: {
      id: "basic-area-chart",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false // Disables zooming capability
      },
    },
    
    fill: {
      colors: ['#f00', '#0f0', '#00f'], // Customize the fill colors here
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.0,
        opacityTo: 0.0,
        stops: [0, 90, 100]
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["var(--color-text)"],
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        show: true,
        style: {
          colors: "var(--color-text)",
        },
      },
    },
    yaxis: {
      labels: {
        show: false,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: "var(--color-text)",
        },
      },
      min: 0
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
      marker: {
        show: false,
      },
    },
  },
  series: [
    {
      name: "Series 1",
      data: Array.from({ length: 12 }, () => Math.floor((Math.random() + 0.5) * 100))
    }
  ]
};

export const eChartDaily: ChartConfig = {
  options: {
    chart: {
      id: "daily analyistic",
      toolbar: {
        show: false,
      },
    },
    
    fill: {
      colors: ['#f00', '#0f0', '#00f'], // Customize the fill colors here
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.0,
        opacityTo: 0.0,
        stops: [0, 90, 100]
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["var(--color-text)"],
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: Array.from({ length: 30 }, (item : unknown, index : number) => index + 1),
      labels: {
        show: true,
        style: {
          colors: "var(--color-text)",
        },
      },
    },
    yaxis: {
      labels: {
        show: false,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: "var(--color-text)",
        },
      },
      min: 0
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val;
        },
      },
      marker: {
        show: false,
      },
    },
  },
  series: [
    {
      name: "Series 1",
      data: Array.from({ length: 30 }, () => Math.floor((Math.random() + 0.5) * 100))
    }
  ]
};

export const eChartWeekly: ChartConfig = {
  options: {
    chart: {
      id: "basic-area-chart",
      toolbar: {
        show: false,
      },
    },
    
    fill: {
      colors: ['#f00', '#0f0', '#00f'], // Customize the fill colors here
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.0,
        opacityTo: 0.0,
        stops: [0, 90, 100]
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["var(--color-text)"],
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: Array.from({ length: 4 }, (item : unknown, index : number) => index + 1),
      labels: {
        show: true,
        style: {
          colors: "var(--color-text)",
        },
      },
    },
    yaxis: {
      labels: {
        show: false,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: "var(--color-text)",
        },
      },
      min: 0
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
      marker: {
        show: false,
      },
    },
  },
  series: [
    {
      name: "Series 1",
      data: Array.from({ length: 4 }, () => Math.floor((Math.random() + 0.5) * 100))
    }
  ]
};