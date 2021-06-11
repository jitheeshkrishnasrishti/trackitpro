import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router,RouterStateSnapshot } from '@angular/router';
import jsPDF from 'jspdf';
// declare var jsPDF: any;

// declare var jsPDF: any;
@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  url = "http://13.234.177.61/api/Employee"
  imgUrl = "http://13.234.177.61/api/EmployeeProfilePics/"
  data: any=[];
  title = 'app';
  elementType = 'url';
  value = 'Techiediaries';
  employeeId: string;
  login: any;
  allGblCategory: any=[];
  gblimgUrl ="http://13.234.177.61/api/Gblcategory"
  licUrl ="http://13.234.177.61/api/Insurance"
  allLicenceData: any=[];

  constructor(private fb: FormBuilder,private http: HttpClient ,private router: Router, private route: ActivatedRoute) {  
    const snapshot: RouterStateSnapshot = router.routerState.snapshot;
    console.log(snapshot.url);
    var getUrl = snapshot.url
    const n = 24
    console.log(getUrl.substring(getUrl.length - n));
this.employeeId = getUrl.substring(getUrl.length - n)
  }
  ngOnInit(): void {
    this.login = JSON.parse(sessionStorage.getItem('log-in')); //forgot to close
    if(this.login!=true){
      this.router.navigate(['/log-in/']);
    }
    var empData= JSON.parse(sessionStorage.getItem('EmployeeData')); //forgot to close
    if(empData){
    this.data = empData
     console.log(this.data)   
 this.value = 'http://13.234.177.61/public-view/'+this.employeeId

    }
 else{
 
   var obj ={
     Emp_Id: this.employeeId
   }
   this.http.post<any>(`${this.url}/ListEmployeeByEmpId`,  obj   ).subscribe(data => {
     console.log(data)
     this.data = data.Data
     this.value = 'http://13.234.177.61/public-view/'+this.employeeId

 
     // if(data.status==false){
     // alert(data.message)
     // }
     // else{
     // }
     }, err => {
       console.log(err);
     })
 }
 this.getAllGblCategory()
 this.getLicenceData()
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
  getAllGblCategory(){
   
    this.http.get<any>(`${this.gblimgUrl}/ListGblCategory`).subscribe(data => {
  this.allGblCategory = data['response']
  console.log(this.allGblCategory)
   }, err => {
   })
  }
  getLicenceData(){
    var obj={
      Emp_Id:this.data._id
    }
    this.http.post<any>(`${this.licUrl}/ListEquipmentByEmpid`, obj  ).subscribe(data => {
      console.log(data)
      this.allLicenceData = data['Data']
  console.log(this.allLicenceData)
   }, err => {
   })
  }
 
}
