import {
  Component,
  OnInit,
  NgZone,
  OnDestroy,
  TemplateRef,
} from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_moonrisekingdom from "@amcharts/amcharts4/themes/moonrisekingdom";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-api",
  templateUrl: "./api.component.html",
  styleUrls: ["./api.component.scss"],
})
export class ApiComponent implements OnInit, OnDestroy {
  //table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
    {
      name: "Tiger Nixon",
      typeDoc: "System Architect",
      office: "Edinburgh",
      clientId: "61",
      date: "2011/04/25",
      salary: "$320,800",
      status: "success",
      apiName: "/account_user/",
      apiVersion: "1.0.3",
      totalCall: "123",
    },
    {
      name: "Garrett Winters",
      typeDoc: "Accountant",
      office: "Tokyo",
      clientId: "63",
      date: "2011/07/25",
      salary: "$170,750",
      status: "cancel",
      apiName: "/profix_fpx/",
      apiVersion: "2.9.8",
      totalCall: "764",
    },
    {
      name: "Ashton Cox",
      typeDoc: "Junior Technical Author",
      office: "San Francisco",
      clientId: "66",
      date: "2009/01/12",
      salary: "$86,000",
      status: "success",
      apiName: "/exchange_rate/",
      apiVersion: "3.0.1",
      totalCall: "342",
    },
    {
      name: "Cedric Kelly",
      typeDoc: "Senior Javascript Developer",
      office: "Edinburgh",
      clientId: "22",
      date: "2012/03/29",
      salary: "$433,060",
      status: "cancel",
      apiName: "/account_user/",
      apiVersion: "1.1.0",
      totalCall: "466",
    },
    {
      name: "Airi Satou",
      typeDoc: "Accountant",
      office: "Tokyo",
      clientId: "33",
      date: "2008/11/28",
      salary: "$162,700",
      status: "success",
      apiName: "/profix_fpx/",
      apiVersion: "2.6.5",
      totalCall: "468",
    },
    {
      name: "Brielle Williamson",
      typeDoc: "Integration Specialist",
      office: "New York",
      clientId: "61",
      date: "2012/12/02",
      salary: "$372,000",
      status: "cancel",
      apiName: "/exchange_rate/",
      apiVersion: "2.2.2",
      totalCall: "981",
    },
    {
      name: "Herrod Chandler",
      typeDoc: "Sales Assistant",
      office: "San Francisco",
      clientId: "59",
      date: "2012/08/06",
      salary: "$137,500",
      status: "cancel",
      apiName: "/account_user/",
      apiVersion: "1.9.5",
      totalCall: "246",
    },
    {
      name: "Rhona Davidson",
      typeDoc: "Integration Specialist",
      office: "Tokyo",
      clientId: "55",
      date: "2010/10/14",
      salary: "$327,900",
      status: "success",
      apiName: "/profix_fpx/",
      apiVersion: "1.0.3",
      totalCall: "468",
    },
    {
      name: "Colleen Hurst",
      typeDoc: "Javascript Developer",
      office: "San Francisco",
      clientId: "39",
      date: "2009/09/15",
      salary: "$205,500",
      status: "cancel",
      apiName: "/exchange_rate/",
      apiVersion: "3.4.5",
      totalCall: "853",
    },
    {
      name: "Sonya Frost",
      typeDoc: "Software Engineer",
      office: "Edinburgh",
      clientId: "23",
      date: "2008/12/13",
      salary: "$103,600",
      status: "success",
      apiName: "/account_user/",
      apiVersion: "2.2.5",
      totalCall: "212",
    },
    {
      name: "Jena Gaines",
      typeDoc: "Office ManclientIdr",
      office: "London",
      clientId: "30",
      date: "2008/12/19",
      salary: "$90,560",
      status: "success",
      apiName: "/profix_fpx/",
      apiVersion: "1.1.1",
      totalCall: "578",
    },
    {
      name: "Quinn Flynn",
      typeDoc: "Support Lead",
      office: "Edinburgh",
      clientId: "22",
      date: "2013/03/03",
      salary: "$342,000",
      status: "cancel",
      apiName: "/exchange_rate/",
      apiVersion: "1.0.3",
      totalCall: "789",
    },
    {
      name: "Charde Marshall",
      typeDoc: "Regional Director",
      office: "San Francisco",
      clientId: "36",
      date: "2008/10/16",
      salary: "$470,600",
      status: "success",
      apiName: "/account_user/",
      apiVersion: "1.0.3",
      totalCall: "346",
    },
    {
      name: "Haley Kennedy",
      typeDoc: "Senior Marketing Designer",
      office: "London",
      clientId: "43",
      date: "2012/12/18",
      salary: "$313,500",
      status: "success",
      apiName: "/profix_fpx/",
      apiVersion: "1.0.3",
      totalCall: "578",
    },
    {
      name: "Tatyana Fitzpatrick",
      typeDoc: "Regional Director",
      office: "London",
      clientId: "19",
      date: "2010/03/17",
      salary: "$385,750",
      status: "cancel",
      apiName: "/exchange_rate/",
      apiVersion: "1.0.3",
      totalCall: "234",
    },
  ];
  SelectionType = SelectionType;

  //modal
  modalRef: BsModalRef;

  // Chart
  private chart1: any;
  private chart2: any;
  private chart3: any;

  constructor(
    private zone: NgZone,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key,
      };
    });
  }

  ngOnInit() {
    this.getCharts();
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart1) {
        console.log("Chart disposed");
        this.chart1.dispose();
      }
      if (this.chart2) {
        console.log("Chart disposed");
        this.chart2.dispose();
      }
      if (this.chart3) {
        console.log("Chart disposed");
        this.chart3.dispose();
      }
    });
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChartAPIManagementLine1();
      this.getChartAPIManagementDonut1();
      this.getChartAPIManagementStacked1();
    });
  }

  getChartAPIManagementLine1() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_moonrisekingdom);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartAPImanagementline1", am4charts.XYChart);

    // Add data
    chart.data = [
      {
        month: "2020-01",
        price: 20,
      },
      {
        month: "2020-02",
        price: 75,
      },
      {
        month: "2020-03",
        price: 15,
      },
      {
        month: "2020-04",
        price: 75,
      },
      {
        month: "2020-05",
        price: 158,
      },
      {
        month: "2020-06",
        price: 57,
      },
      {
        month: "2020-07",
        price: 107,
      },
      {
        month: "2020-08",
        price: 89,
      },
      {
        month: "2020-09",
        price: 75,
      },
      {
        month: "2020-10",
        price: 132,
      },
      {
        month: "2020-11",
        price: 380,
      },
      {
        month: "2020-12",
        price: 56,
      },
    ];

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis()) as any;
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.logarithmic = true;
    valueAxis.renderer.minGridDistance = 20;

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "price";
    series.dataFields.dateX = "month";
    series.tensionX = 0.8;
    series.strokeWidth = 3;

    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.fill = am4core.color("#fff");
    bullet.circle.strokeWidth = 3;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.fullWidthLineX = true;
    chart.cursor.xAxis = dateAxis;
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.fill = am4core.color("#000");
    chart.cursor.lineX.fillOpacity = 0.1;

    // Add scrollbar
    chart.scrollbarX = new am4core.Scrollbar();

    // Add a guide
    let range = valueAxis.axisRanges.create();
    range.value = 90.4;
    range.grid.stroke = am4core.color("#396478");
    range.grid.strokeWidth = 1;
    range.grid.strokeOpacity = 1;
    range.grid.strokeDasharray = "3,3";
    //range.label.inside = true;
    //range.label.text = "Average";
    //range.label.fill = range.grid.stroke;
    //range.label.verticalCenter = "bottom";

    this.chart1 = chart;
  }

  getChartAPIManagementDonut1() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_spiritedaway);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartAPImanagementdonut1", am4charts.PieChart);

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    // change the cursor on hover to make it apparent the object can be interacted with
    pieSeries.slices.template.cursorOverStyle = [
      {
        property: "cursor",
        value: "pointer",
      },
    ];

    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    let shadow = pieSeries.slices.template.filters.push(
      new am4core.DropShadowFilter()
    );
    shadow.opacity = 0;

    // Create hover state
    let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();

    chart.data = [
      {
        country: "Get",
        litres: 501.9,
      },
      {
        country: "Post",
        litres: 165.8,
      },
      {
        country: "Put",
        litres: 139.9,
      },
      {
        country: "Delete",
        litres: 128.3,
      },
    ];

    this.chart2 = chart;
  }

  getChartAPIManagementStacked1() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartAPImanagementstacked1", am4charts.XYChart);

    // Add data
    chart.data = [
      {
        year: "Jan",
        europe: 2.5,
        namerica: 2.5,
        asia: 2.1,
        lamerica: 0.3,
      },
      {
        year: "Feb",
        europe: 2.6,
        namerica: 2.7,
        asia: 2.2,
        lamerica: 0.3,
      },
      {
        year: "Mar",
        europe: 2.8,
        namerica: 2.9,
        asia: 2.4,
        lamerica: 0.3,
      },
      {
        year: "Apr",
        europe: 2.5,
        namerica: 2.5,
        asia: 2.1,
        lamerica: 0.3,
        meast: 0.2,
        africa: 0.1,
      },
      {
        year: "May",
        europe: 2.6,
        namerica: 2.7,
        asia: 2.2,
        lamerica: 0.3,
      },
      {
        year: "June",
        europe: 2.8,
        namerica: 2.9,
        asia: 2.4,
        lamerica: 0.3,
      },
      {
        year: "July",
        europe: 2.5,
        namerica: 2.5,
        asia: 2.1,
        lamerica: 0.3,
      },
      {
        year: "Aug",
        europe: 2.6,
        namerica: 2.7,
        asia: 2.2,
        lamerica: 0.3,
      },
      {
        year: "Sep",
        europe: 2.8,
        namerica: 2.9,
        asia: 2.4,
        lamerica: 0.3,
      },
      {
        year: "Oct",
        europe: 2.5,
        namerica: 2.5,
        asia: 2.1,
        lamerica: 0.3,
      },
      {
        year: "Nov",
        europe: 2.6,
        namerica: 2.7,
        asia: 2.2,
        lamerica: 0.3,
      },
      {
        year: "Dec",
        europe: 2.8,
        namerica: 2.9,
        asia: 2.4,
        lamerica: 0.3,
      },
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;

    // Create series
    function createSeries(field, name) {
      // Set up series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.name = name;
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "year";
      series.sequencedInterpolation = true;

      // Make it stacked
      series.stacked = true;

      // Configure columns
      series.columns.template.width = am4core.percent(60);
      series.columns.template.tooltipText =
        "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";

      // Add label
      let labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.text = "{valueY}";
      labelBullet.locationY = 0.5;
      labelBullet.label.hideOversized = true;

      return series;
    }

    createSeries("europe", "Get");
    createSeries("namerica", "Post");
    createSeries("asia", "Delete");
    createSeries("lamerica", "Put");

    // Legend
    chart.legend = new am4charts.Legend();

    this.chart3 = chart;
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  successSwal(task) {
    swal.fire({
      title: "Success",
      text: "Successfully " + task + "!",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
    });
    this.modalRef.hide();
  }

  showNotification() {
    const color = Math.floor(Math.random() * 5 + 1);
    this.toastr.show(
      '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Successful</span> <span data-notify="message">Successfully subscribe API</span></div>',
      "",
      {
        timeOut: 3000,
        closeButton: true,
        enableHtml: true,
        tapToDismiss: false,
        titleClass: "alert-title",
        positionClass: "toast-top-center",
        toastClass:
          "ngx-toastr alert alert-dismissible alert-success alert-notify bg-success",
      }
    );
  }
}
