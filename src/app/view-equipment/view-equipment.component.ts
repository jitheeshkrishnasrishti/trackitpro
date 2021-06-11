import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router,RouterStateSnapshot } from '@angular/router';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-view-equipment',
  templateUrl: './view-equipment.component.html',
  styleUrls: ['./view-equipment.component.css']
})
export class ViewEquipmentComponent implements OnInit {
  url = "http://13.234.177.61/api/Employee"
  imgUrl = "http://13.234.177.61/api/EmployeeProfilePics/"
  data: any=[];
  title = 'app';
  elementType = 'url';
  value = 'Techiediaries';
  equipmentId: string;
  login: any;
  constructor(private fb: FormBuilder,private http: HttpClient ,private router: Router, private route: ActivatedRoute) {  
    const snapshot: RouterStateSnapshot = router.routerState.snapshot;
    var getUrl = snapshot.url
    const n = 24
this.equipmentId = getUrl.substring(getUrl.length - n)
  }
  ngOnInit(): void {
    this.login = JSON.parse(sessionStorage.getItem('log-in')); //forgot to close
    if(this.login!=true){
      this.router.navigate(['/log-in/']);
    }
    var empData= JSON.parse(sessionStorage.getItem('equipmentData')); //forgot to close
    if(empData){
    this.data = empData
     console.log(this.data)   
 this.value = 'http://13.234.177.61/equipment-publicview/'+this.equipmentId

    }
 else{
 
   var obj ={
     Emp_Id: this.equipmentId
   }
   this.http.post<any>(`${this.url}/ListEmployeeByEmpId`,  obj   ).subscribe(data => {
     console.log(data)
     this.data = data.Data
     this.value = 'http://13.234.177.61/equipment-publicview/'+this.equipmentId

 
     // if(data.status==false){
     // alert(data.message)
     // }
     // else{
     // }
     }, err => {
       console.log(err);
     })
 }
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
}
