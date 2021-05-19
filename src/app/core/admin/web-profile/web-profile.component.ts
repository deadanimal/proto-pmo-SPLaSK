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
  selector: 'app-web-profile',
  templateUrl: './web-profile.component.html',
  styleUrls: ['./web-profile.component.scss']
})
export class WebProfileComponent implements OnInit, OnDestroy {

  // Modal
  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

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
      url: "www.test-1.com"
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
      url: "www.test-2.com"
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
      url: "www.test-3.com"
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
      url: "www.test-4.com"
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
      url: "www.test-5.com"
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
      url: "www.test-1.com"
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
      url: "www.test-2.com"
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
      url: "www.test-3.com"
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
      url: "www.test-4.com"
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
      url: "www.test-5.com"
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
      url: "www.test-1.com"
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
      url: "www.test-2.com"
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
      url: "www.test-3.com"
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
      url: "www.test-4.com"
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
      url: "www.test-5.com"
    },
  ];
  SelectionType = SelectionType;

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
    //this.getCharts();
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
  onActivate(event) {
    this.activeRow = event.row;
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modalRef, this.modalConfig);
  }

  delete() {
    swal
      .fire({
        title: "Confirmation",
        text: "Are you sure want to delete this data?",
        type: "info",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info",
        confirmButtonText: "Confirm",
        showCancelButton: true,
        cancelButtonClass: "btn btn-danger",
        cancelButtonText: "Cancel",
      })
      .then((result) => {
        if (result.value) {
          this.doneDelete();
        }
      });
  }

  doneDelete() {
    swal.fire({
      title: "Success",
      text: "The data has been deleted!",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Close",
    });
  }
}
