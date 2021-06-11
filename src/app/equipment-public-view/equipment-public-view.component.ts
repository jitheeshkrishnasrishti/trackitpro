import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router,RouterStateSnapshot } from '@angular/router';
@Component({
  selector: 'app-equipment-public-view',
  templateUrl: './equipment-public-view.component.html',
  styleUrls: ['./equipment-public-view.component.css']
})
export class EquipmentPublicViewComponent implements OnInit {
  data: any=[];
  value = 'Techiediaries';
  employeeId: string;
  imgUrl = "http://13.234.177.61/api/EmployeeProfilePics/"
  equrl = "http://13.234.177.61/api/Equipment"

  constructor(private fb: FormBuilder,private http: HttpClient ,private router: Router, private route: ActivatedRoute) {  
    const snapshot: RouterStateSnapshot = router.routerState.snapshot;
    console.log(snapshot.url);
    var getUrl = snapshot.url
    const n = 24
    console.log(getUrl.substring(getUrl.length - n));
this.employeeId = getUrl.substring(getUrl.length - n)
  }  ngOnInit(): void {
    var empData= JSON.parse(sessionStorage.getItem('EmployeeData')); //forgot to close
    if(empData){
    this.data = empData
     console.log(this.data)   
//  this.value = this.data.Emp_Fname+" "+this.data.Emp_Lname +"-"+this.data.Emp_ProfileID
 this.value = 'http://13.234.177.61/equipment-publicview/'+this.employeeId

    }
 else{
 
   var obj ={
    _id: this.employeeId
   }
   this.http.post<any>(`${this.equrl}/ListEquipmentById`,  obj   ).subscribe(data => {
     console.log(data)
     this.data = data.Data
    //  this.value = this.data.Emp_Fname+" "+this.data.Emp_Lname +"-"+this.data.Emp_ProfileID
     this.value = 'http://13.234.177.61/equipment-publicview/'+this.employeeId

 
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
  logout(){
    console.log("logout")
    this.router.navigate(['log-in']);

  }
}
