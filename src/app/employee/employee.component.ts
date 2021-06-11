import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";  

declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  url = "http://13.234.177.61/api/Employee"
  allEmployees: any=[];
  searchText: any = '';
  employeeId: any;
  resMessage: any;
  employee: any=[];
  value = 'Techiediaries';
  publicLink: string;
  elementType = 'url';
  login: any;

  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService ,private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.login = JSON.parse(sessionStorage.getItem('log-in')); //forgot to close
    if(this.login!=true){
      this.router.navigate(['/log-in/']);
    }
    this.getAllEmployees()
  }
  getAllEmployees(){
    this.SpinnerService.show();  

    this.http.get<any>(`${this.url}/ListEmployee`).subscribe(data => {
     console.log(data)
  this.allEmployees = data['response']
  this.SpinnerService.hide();  

  console.log(this.allEmployees)
   }, err => {
   })
  }
  editEmployee(data){
    console.log(data)
    sessionStorage.setItem('EmployeeData', JSON.stringify(data));   // if it's object
    this.router.navigate(['/edit-employee/']);

  }
  viewEmployee(data){
    console.log(data)
    sessionStorage.setItem('EmployeeData', JSON.stringify(data));   // if it's object
    this.router.navigate(['/view-employee/',data._id]);
  }
deletePopUp(data){
  this.employeeId = data._id
  $('#removeEmp').trigger('click');  
}
goTraining(data){
  console.log(data)
  sessionStorage.setItem('EmployeeData', JSON.stringify(data));   // if it's object
  this.router.navigate(['/training-certication/']);
}
  deleteEmployee(){
    var obj={
      _id:this.employeeId
    }
    this.http.post<any>(`${this.url}/DeleteEmployee`, obj ).subscribe(data => {
      console.log(data)
      if(data.status==false){
      this.resMessage = data.message
      $('#removeEmp').trigger('click');  
      // $('#messagePopUp').trigger('click');  
      }
      else if(data.status==true){
        this.resMessage = data.message
        $('#removeEmp').trigger('click');  
        // $('#messagePopUp').trigger('click');  
        this.resMessage = data.message
        var from = 'bottom'
        var align = 'right'     
     this.toastr.show(
      this.resMessage, '', {
       timeOut: 8000,
       closeButton: true,
       enableHtml: true,
       toastClass: "alert alert-primary alert-with-icon",
       positionClass: 'toast-' + from + '-' +  align
     });
        this.getAllEmployees()
      }
      }, err => {
        console.log(err);
      })

  }
  printQRCode(data){
this.employee = data
this.value = 'http://13.234.177.61/public-view/'+this.employee._id

$('#QRCodePrint').trigger('click');  
  }

  publicProfile(data){
    this.employee = data
    $('#publicPro').trigger('click');  

this.publicLink = 'http://13.234.177.61/public-view/'+this.employee._id
  }
  download() {
    const qrcode = document.getElementById('qrcode');
    let doc = new jsPDF();

    let imageData= this.getBase64Image(qrcode.firstChild.firstChild);
    doc.addImage(imageData, "JPG", 90, 30,0,0);
    doc.save('TrackitPro-EmployeeQRCode.pdf');
  }
  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }
  addEmployee(){
    this.router.navigate(['/add-employee/']);

  }
  bulkQrcode(){
    this.router.navigate(['/bulk-qrcode/']);

  }
  listAtoZ(){
    this.http.get<any>(`${this.url}/GetempoyeeNameAtoZ`).subscribe(data => {
      console.log(data)
   this.allEmployees = data['response']
   console.log(this.allEmployees)
    }, err => {
    })
  }
  listZtoA(){
    this.http.get<any>(`${this.url}/GetempoyeeNameZtoA`).subscribe(data => {
      console.log(data)
   this.allEmployees = data['response']
   console.log(this.allEmployees)
    }, err => {
    })
  }
}
