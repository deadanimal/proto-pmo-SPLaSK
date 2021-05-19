import { Component, OnInit, NgZone, OnDestroy } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Router } from "@angular/router";
import swal from "sweetalert2";

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Chart
  private chart: any;
  private chart1: any;
  private chart2: any;
  private clicked: any = true;
  private clicked1: any = false;

  //table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
  {
    name: "John Cena",
    username: "john_cena",
    firstname: "John",
    lastname: "Cena",
    email: "john_cena123@try.com",
    logId: "6165",
    activityTime: "2011/04/25 2.00 PM",
    activityLog: "login",
    ipaddress: "192.169.9.012"
  },
  {
    name: "Under Taker",
    username: "under_taker",
    firstname: "Under",
    lastname: "Taker",
    email: "under_taker93@try.com",
    logId: "6385",
    activityTime: "2011/07/25 2.00 PM",
    activityLog: "edit profile",
    ipaddress: "192.169.9.012"
  },
  {
    name: "Kane Boseman",
    username: "kane_boseman",
    firstname: "Kane",
    lastname: "Boseman",
    email: "john_cena75@try.com",
    logId: "6634",
    activityTime: "2009/01/12 2.00 PM",
    activityLog: "change billing info",
    ipaddress: "192.169.9.012"
  },
  {
    name: "Harry Kane",
    username: "harry_kane",
    firstname: "Harry",
    lastname: "Kane",
    email: "kane_boseman23@try.com",
    logId: "2230",
    activityTime: "2012/03/29 2.00 PM",
    activityLog: "delete profile picture",
    ipaddress: "192.169.9.012"
  },
  {
    name: "Zlatan Ibrahimovic",
    username: "ibra_himovic",
    firstname: "Zlatan",
    lastname: "Ibrahimovic",
    email: "ibra_himovic56@try.com",
    logId: "3368",
    activityTime: "2008/11/28 2.00 PM",
    activityLog: "change username",
    ipaddress: "192.169.9.012"
  },
  {
    name: "Cristiano Ronaldo",
    username: "c_ronaldo",
    firstname: "Cristiano",
    lastname: "Ronaldo",
    email: "c_ronaldo07@try.com",
    logId: "6179",
    activityTime: "2012/12/02 2.00 PM",
    activityLog: "update status",
    ipaddress: "192.169.9.012"
  },
  {
    name: "William Martin",
    username: "william_martin",
    firstname: "William",
    lastname: "Martin",
    email: "william_martin34@try.com",
    logId: "5913",
    activityTime: "2012/08/06 2.00 PM",
    activityLog: "login",
    ipaddress: "192.169.9.012"
  },
  {
    name: "Laila Majnun",
    username: "laila_majnun",
    firstname: "Laila",
    lastname: "Majnun",
    email: "laila_majnun467@try.com",
    logId: "5556",
    activityTime: "2010/10/14 2.00 PM",
    activityLog: "login",
    ipaddress: "192.169.9.012"
  },
  {
    name: "Maslinda Rahim",
    username: "maslinda_rahim",
    firstname: "Maslinda",
    lastname: "Rahim",
    email: "maslinda_rahim579@try.com",
    logId: "3957",
    activityTime: "2009/09/15 2.00 PM",
    activityLog: "login",
    ipaddress: "192.169.9.012"
  },
  {
    name: "Ahmad Ali",
    username: "ahmad_ali",
    firstname: "Ahmad",
    lastname: "Ali",
    email: "ahmad_ali94@try.com",
    logId: "2374",
    activityTime: "2008/12/13 2.00 PM",
    activityLog: "login",
    ipaddress: "192.169.9.012"
  },
  {
    name: "Chew Min",
    username: "chew_min",
    firstname: "Chew",
    lastname: "Min",
    email: "chew_min19@try.com",
    logId: "3062",
    activityTime: "2008/12/19 2.00 PM",
    activityLog: "login",
    ipaddress: "192.169.9.012"
  },
  {
    name: "Arumugam Krish",
    username: "arumugam_krish",
    firstname: "Arumugam",
    lastname: "Krish",
    email: "arumugam_krish76@try.com",
    logId: "2259",
    activityTime: "2013/03/03 2.00 PM",
    activityLog: "login",
    ipaddress: "192.169.9.012"
  },
  {
    name: "Chan Sow Lin",
    username: "chan_sow",
    firstname: "Chan Sow",
    lastname: "Lin",
    email: "chan_sow03@try.com",
    logId: "3651",
    activityTime: "2008/10/16 2.00 PM",
    activityLog: "login",
    ipaddress: "192.169.9.012"
  },
  {
    name: "Kim Jong Kok",
    username: "kim_jong",
    firstname: "Kim",
    lastname: "Jong Kok",
    email: "kim_jong87@try.com",
    logId: "4314",
    activityTime: "2012/12/18 2.00 PM",
    activityLog: "login",
    ipaddress: "192.169.9.012"
  },
  {
    name: "Khairi Jamal",
    username: "k_jamal",
    firstname: "Khairi",
    lastname: "Jamal",
    email: "john_cena123@try.com",
    logId: "1949",
    activityTime: "2010/03/17 2.00 PM",
    activityLog: "login",
    ipaddress: "192.169.9.012"
  },
  ];
  SelectionType = SelectionType;

  constructor(
    private zone: NgZone
  ) { 
    this.temp = this.rows.map((prop,key)=>{
      return {
        ...prop,
        id: key
      };

    });
  }

  ngOnInit() {
    this.getCharts()
  }

  entriesChange($event){
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function(d) {

      for(var key in d){
        if(d[key].toLowerCase().indexOf(val) !== -1){
          return true;
        }
      }
      return false;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart2) {
        console.log("Chart disposed");
        this.chart2.dispose();
      }
      if (this.chart1) {
        console.log("Chart disposed");
        this.chart1.dispose();
      }
    });
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChartDash1();
      this.getChartDash2();
    });
  }

  getChartDash1() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let yearData = {};
    let firstYear = 1950;
    let lastYear = 2020;

    for (var year = firstYear; year < lastYear; year++) {
      let data = [];
      yearData[year] = data;

      for (var i = 0; i < 50; i++) {
        if (year == firstYear) {
          data.push({
            x: Math.round(Math.random() * 180 - 90),
            y: Math.round(Math.random() * 140 - 70),
            radius: Math.round(Math.random() * 1000),
          });
        } else {
          let previous = yearData[year - 1][i];
          data.push({
            x: previous.x + Math.round(Math.random() * 8 - 4),
            y: previous.y + Math.round(Math.random() * 8 - 4),
            radius: Math.abs(
              previous.radius + Math.round(Math.random() * 200 - 100)
            ),
          });
        }
      }
    }

    // Create chart instance
    let chart = am4core.create("chartDashXY1", am4charts.XYChart);
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomXY";

    // Create axes
    let xAxis = chart.xAxes.push(new am4charts.ValueAxis());
    xAxis.min = -100;
    xAxis.max = 100;
    xAxis.keepSelection = true;
    xAxis.renderer.grid.template.above = true;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = -100;
    yAxis.max = 100;
    yAxis.keepSelection = true;
    yAxis.renderer.grid.template.above = true;

    // Create color series
    // top left
    let series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueX = "ax";
    series1.dataFields.valueY = "ay";
    series1.strokeOpacity = 0;
    series1.fillOpacity = 1;
    series1.ignoreMinMax = true;
    series1.fill = am4core.color("#e3853c");
    series1.data = [
      {
        ax: -1000,
        ay: 0,
      },
      {
        ax: 0,
        ay: 0,
      },
      {
        ax: 0,
        ay: 1000,
      },
      {
        ax: -1000,
        ay: 1000,
      },
    ];

    // bottom left
    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueX = "ax";
    series2.dataFields.valueY = "ay";
    series2.strokeOpacity = 0;
    series2.ignoreMinMax = true;
    series2.fill = am4core.color("#48b2b7");
    series2.fillOpacity = 0.9;
    series2.data = [
      {
        ax: -1000,
        ay: 0,
      },
      {
        ax: 0,
        ay: 0,
      },
      {
        ax: 0,
        ay: -1000,
      },
      {
        ax: -1000,
        ay: -1000,
      },
    ];

    // bottom right
    let series3 = chart.series.push(new am4charts.LineSeries());
    series3.dataFields.valueX = "ax";
    series3.dataFields.valueY = "ay";
    series3.strokeOpacity = 0;
    series3.fill = am4core.color("#91d1da");
    series3.ignoreMinMax = true;
    series3.fillOpacity = 0.9;
    series3.data = [
      {
        ax: 1000,
        ay: 0,
      },
      {
        ax: 0,
        ay: 0,
      },
      {
        ax: 0,
        ay: -1000,
      },
      {
        ax: 1000,
        ay: -1000,
      },
    ];

    // top right
    let series4 = chart.series.push(new am4charts.LineSeries());
    series4.dataFields.valueX = "ax";
    series4.dataFields.valueY = "ay";
    series4.strokeOpacity = 0;
    series4.fill = am4core.color("#e8c634");
    series4.ignoreMinMax = true;
    series4.fillOpacity = 0.9;
    series4.data = [
      {
        ax: 1000,
        ay: 0,
      },
      {
        ax: 0,
        ay: 0,
      },
      {
        ax: 0,
        ay: 1000,
      },
      {
        ax: 1000,
        ay: 1000,
      },
    ];

    // bubble series

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueX = "x";
    series.dataFields.valueY = "y";
    series.dataFields.value = "radius";
    series.strokeOpacity = 0;

    let bullet = series.bullets.push(new am4core.Circle());
    bullet.fill = am4core.color("#000000");
    bullet.strokeOpacity = 0;
    bullet.strokeWidth = 2;
    bullet.fillOpacity = 0.5;
    bullet.stroke = am4core.color("#ffffff");
    bullet.hiddenState.properties.opacity = 0;
    bullet.tooltipText =
      "value:{value.value} x:{valueX.value} y:{valueY.value}";

    bullet.events.on("over", function (event) {
      let target = event.target;
      chart.cursor.triggerMove({ x: target.pixelX, y: target.pixelY }, "hard");
      chart.cursor.lineX.y = target.pixelY;
      chart.cursor.lineY.x = target.pixelX - chart.plotContainer.pixelWidth;
      xAxis.tooltip.disabled = false;
      yAxis.tooltip.disabled = false;
    });

    bullet.events.on("out", function (event) {
      chart.cursor.triggerMove(event.pointer.point, "none");
      chart.cursor.lineX.y = 0;
      chart.cursor.lineY.x = 0;
      xAxis.tooltip.disabled = true;
      yAxis.tooltip.disabled = true;
    });

    series.heatRules.push({
      target: bullet,
      min: 2,
      max: 30,
      property: "radius",
    });
    series.data = yearData[firstYear];

    // Scrollbars
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    let label = chart.plotContainer.createChild(am4core.Label);
    label.fontSize = 60;
    label.fillOpacity = 0.4;
    label.align = "center";
    label.zIndex = 1000;

    let sliderContainer = chart.bottomAxesContainer.createChild(
      am4core.Container
    );
    sliderContainer.width = am4core.percent(100);
    sliderContainer.layout = "horizontal";

    let playButton = sliderContainer.createChild(am4core.PlayButton);
    playButton.valign = "middle";
    playButton.events.on("toggled", function (event) {
      if (event.target.isActive) {
        playSlider();
      } else {
        stopSlider();
      }
    });

    let slider = sliderContainer.createChild(am4core.Slider);
    slider.valign = "middle";
    slider.margin(0, 0, 0, 0);
    slider.marginLeft = 30;
    slider.height = 15;

    slider.startGrip.events.on("drag", stop);

    let sliderAnimation = slider
      .animate({ property: "start", to: 1 }, 80000, am4core.ease.linear)
      .pause();
    sliderAnimation.events.on("animationended", function () {
      playButton.isActive = false;
    });

    slider.events.on("rangechanged", function () {
      let year =
        firstYear + Math.round(slider.start * (lastYear - firstYear - 1));
      let data = yearData[year];
      for (var i = 0; i < series.data.length; i++) {
        let dataContext = series.data[i];
        dataContext.x = data[i].x;
        dataContext.y = data[i].y;
        dataContext.radius = data[i].radius;
      }

      chart.invalidateRawData();

      label.text = year.toString();
    });

    function playSlider() {
      if (slider) {
        if (slider.start >= 1) {
          slider.start = 0;
          sliderAnimation.start();
        }

        sliderAnimation.setProgress(slider.start);

        sliderAnimation.resume();
        playButton.isActive = true;
      }
    }

    function stopSlider() {
      sliderAnimation.pause();
      playButton.isActive = false;
    }

    setTimeout(function () {
      playSlider();
    }, 2000);

    this.chart1 = chart;
  }

  getChartDash2() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let yearData = {};
    let firstYear = 1950;
    let lastYear = 2020;

    for (var year = firstYear; year < lastYear; year++) {
      let data = [];
      yearData[year] = data;

      for (var i = 0; i < 50; i++) {
        if (year == firstYear) {
          data.push({
            x: Math.round(Math.random() * 180 - 90),
            y: Math.round(Math.random() * 140 - 70),
            radius: Math.round(Math.random() * 1000),
          });
        } else {
          let previous = yearData[year - 1][i];
          data.push({
            x: previous.x + Math.round(Math.random() * 8 - 4),
            y: previous.y + Math.round(Math.random() * 8 - 4),
            radius: Math.abs(
              previous.radius + Math.round(Math.random() * 200 - 100)
            ),
          });
        }
      }
    }

    // Create chart instance
    let chart = am4core.create("chartDashXY2", am4charts.XYChart);
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomXY";

    // Create axes
    let xAxis = chart.xAxes.push(new am4charts.ValueAxis());
    xAxis.min = -100;
    xAxis.max = 100;
    xAxis.keepSelection = true;
    xAxis.renderer.grid.template.above = true;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = -100;
    yAxis.max = 100;
    yAxis.keepSelection = true;
    yAxis.renderer.grid.template.above = true;

    // Create color series
    // top left
    let series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueX = "ax";
    series1.dataFields.valueY = "ay";
    series1.strokeOpacity = 0;
    series1.fillOpacity = 1;
    series1.ignoreMinMax = true;
    series1.fill = am4core.color("#e3853c");
    series1.data = [
      {
        ax: -1000,
        ay: 0,
      },
      {
        ax: 0,
        ay: 0,
      },
      {
        ax: 0,
        ay: 1000,
      },
      {
        ax: -1000,
        ay: 1000,
      },
    ];

    // bottom left
    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueX = "ax";
    series2.dataFields.valueY = "ay";
    series2.strokeOpacity = 0;
    series2.ignoreMinMax = true;
    series2.fill = am4core.color("#48b2b7");
    series2.fillOpacity = 0.9;
    series2.data = [
      {
        ax: -1000,
        ay: 0,
      },
      {
        ax: 0,
        ay: 0,
      },
      {
        ax: 0,
        ay: -1000,
      },
      {
        ax: -1000,
        ay: -1000,
      },
    ];

    // bottom right
    let series3 = chart.series.push(new am4charts.LineSeries());
    series3.dataFields.valueX = "ax";
    series3.dataFields.valueY = "ay";
    series3.strokeOpacity = 0;
    series3.fill = am4core.color("#91d1da");
    series3.ignoreMinMax = true;
    series3.fillOpacity = 0.9;
    series3.data = [
      {
        ax: 1000,
        ay: 0,
      },
      {
        ax: 0,
        ay: 0,
      },
      {
        ax: 0,
        ay: -1000,
      },
      {
        ax: 1000,
        ay: -1000,
      },
    ];

    // top right
    let series4 = chart.series.push(new am4charts.LineSeries());
    series4.dataFields.valueX = "ax";
    series4.dataFields.valueY = "ay";
    series4.strokeOpacity = 0;
    series4.fill = am4core.color("#e8c634");
    series4.ignoreMinMax = true;
    series4.fillOpacity = 0.9;
    series4.data = [
      {
        ax: 1000,
        ay: 0,
      },
      {
        ax: 0,
        ay: 0,
      },
      {
        ax: 0,
        ay: 1000,
      },
      {
        ax: 1000,
        ay: 1000,
      },
    ];

    // bubble series

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueX = "x";
    series.dataFields.valueY = "y";
    series.dataFields.value = "radius";
    series.strokeOpacity = 0;

    let bullet = series.bullets.push(new am4core.Circle());
    bullet.fill = am4core.color("#000000");
    bullet.strokeOpacity = 0;
    bullet.strokeWidth = 2;
    bullet.fillOpacity = 0.5;
    bullet.stroke = am4core.color("#ffffff");
    bullet.hiddenState.properties.opacity = 0;
    bullet.tooltipText =
      "value:{value.value} x:{valueX.value} y:{valueY.value}";

    bullet.events.on("over", function (event) {
      let target = event.target;
      chart.cursor.triggerMove({ x: target.pixelX, y: target.pixelY }, "hard");
      chart.cursor.lineX.y = target.pixelY;
      chart.cursor.lineY.x = target.pixelX - chart.plotContainer.pixelWidth;
      xAxis.tooltip.disabled = false;
      yAxis.tooltip.disabled = false;
    });

    bullet.events.on("out", function (event) {
      chart.cursor.triggerMove(event.pointer.point, "none");
      chart.cursor.lineX.y = 0;
      chart.cursor.lineY.x = 0;
      xAxis.tooltip.disabled = true;
      yAxis.tooltip.disabled = true;
    });

    series.heatRules.push({
      target: bullet,
      min: 2,
      max: 30,
      property: "radius",
    });
    series.data = yearData[firstYear];

    // Scrollbars
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    let label = chart.plotContainer.createChild(am4core.Label);
    label.fontSize = 60;
    label.fillOpacity = 0.4;
    label.align = "center";
    label.zIndex = 1000;

    let sliderContainer = chart.bottomAxesContainer.createChild(
      am4core.Container
    );
    sliderContainer.width = am4core.percent(100);
    sliderContainer.layout = "horizontal";

    let playButton = sliderContainer.createChild(am4core.PlayButton);
    playButton.valign = "middle";
    playButton.events.on("toggled", function (event) {
      if (event.target.isActive) {
        playSlider();
      } else {
        stopSlider();
      }
    });

    let slider = sliderContainer.createChild(am4core.Slider);
    slider.valign = "middle";
    slider.margin(0, 0, 0, 0);
    slider.marginLeft = 30;
    slider.height = 15;

    slider.startGrip.events.on("drag", stop);

    let sliderAnimation = slider
      .animate({ property: "start", to: 1 }, 80000, am4core.ease.linear)
      .pause();
    sliderAnimation.events.on("animationended", function () {
      playButton.isActive = false;
    });

    slider.events.on("rangechanged", function () {
      let year =
        firstYear + Math.round(slider.start * (lastYear - firstYear - 1));
      let data = yearData[year];
      for (var i = 0; i < series.data.length; i++) {
        let dataContext = series.data[i];
        dataContext.x = data[i].x;
        dataContext.y = data[i].y;
        dataContext.radius = data[i].radius;
      }

      chart.invalidateRawData();

      label.text = year.toString();
    });

    function playSlider() {
      if (slider) {
        if (slider.start >= 1) {
          slider.start = 0;
          sliderAnimation.start();
        }

        sliderAnimation.setProgress(slider.start);

        sliderAnimation.resume();
        playButton.isActive = true;
      }
    }

    function stopSlider() {
      sliderAnimation.pause();
      playButton.isActive = false;
    }

    setTimeout(function () {
      playSlider();
    }, 2000);

    this.chart2 = chart;
  }

  successSwal(task) {
    swal.fire({
      title: "Success",
      text: "Successfully " + task + "!",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
    });
  }
}
