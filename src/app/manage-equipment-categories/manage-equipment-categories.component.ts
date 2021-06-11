import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";  

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-manage-equipment-categories',
  templateUrl: './manage-equipment-categories.component.html',
  styleUrls: ['./manage-equipment-categories.component.css']
})
export class ManageEquipmentCategoriesComponent implements OnInit {

  equrl = "http://13.234.177.61/api/Equipment"
  caturl = "http://13.234.177.61/api/EquipmentCategory"
  searchText: any = '';
  form: FormGroup;
  resMessage: any=[];
  allCategory: any=[];


  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService ,
    private fb: FormBuilder ,private SpinnerService: NgxSpinnerService) {
    this.createForm();

   }

  ngOnInit(): void {
    this.form.get('Status').setValue("Active");
    this.getAllCategory()
  }
  getAllCategory(){
    this.SpinnerService.show();  

    this.http.get<any>(`${this.caturl}/ListEquipmentCategory`).subscribe(data => {
     console.log(data)
  this.allCategory = data['response']
  this.SpinnerService.hide();  

  console.log(this.allCategory)
   }, err => {
   })
  }
  createForm() {
    this.form = this.fb.group({
      Equipment_Cat_Name: new FormControl('', [Validators.required,]),
      Status: new FormControl('', [Validators.required,]),
      IsActive: new FormControl('', [Validators.required,]),
    });
  }
  
  manageEquipmentItems(){
    this.router.navigate(['/manage-equipment-items/']);

  }
  addequpmentCategory(){
    this.form.get('IsActive').setValue(true);
    console.log(this.form.value)
    this.http.post<any>(`${this.caturl}/AddNewEquipmentCategory`,  this.form.value   ).subscribe(data => {
      console.log(data)
      if(data.status==false){
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
     }
      else if(data.status==true){
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
     $('#addEqupBtn').trigger('click');   
        this.form.reset()
      }
      }, err => {
        console.log(err);
      })
  }
 
  viewEquipment(){
   
  }
  deletePopUp(){

  }
  deleteEquipments(){
    
  }

  editEquipment(){
    
  }

}
