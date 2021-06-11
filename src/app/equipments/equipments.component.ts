import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";  

declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {
  login: any;
  equrl = "http://13.234.177.61/api/Equipment"
  allEquipment: any=[];
  searchText: any = '';
  resMessage: any;
  value = 'Techiediaries';
  elementType = 'url';
  publicLink: string;
  EquipmentId: any;

  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService ,private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.login = JSON.parse(sessionStorage.getItem('log-in')); //forgot to close
    if(this.login!=true){
      this.router.navigate(['/log-in/']);
    }
    this.getAllEquipment()
  }
  getAllEquipment(){
    this.SpinnerService.show();  

    this.http.get<any>(`${this.equrl}/ListEquipment`).subscribe(data => {
     console.log(data)
  this.allEquipment = data['response']
  this.SpinnerService.hide();  

  console.log(this.allEquipment)
   }, err => {
   })
  }
  addEquipment(){
    this.router.navigate(['/add-equipments/']);

  }
  deletePopUp(data){
    this.EquipmentId = data._id
    $('#removeEmp').trigger('click');  
  }
  editEmployee(data){
    console.log(data)
    sessionStorage.setItem('equipmentData', JSON.stringify(data));   // if it's object
    this.router.navigate(['/edit-equipments/']);

  }
  viewEquipment(data){
    console.log(data)
    sessionStorage.setItem('equipmentData', JSON.stringify(data));   // if it's object
    this.router.navigate(['/view-equipments/',data._id]);
  }
  deleteEquipments(){
    var obj={
      _id:this.EquipmentId
    }
    this.http.post<any>(`${this.equrl}/DeleteEquipment`, obj ).subscribe(data => {
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
        this.getAllEquipment()
      }
      }, err => {
        console.log(err);
      })

  }
}
