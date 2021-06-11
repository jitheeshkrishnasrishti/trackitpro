import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner"; 
@Component({
  selector: 'app-manage-equipment-items',
  templateUrl: './manage-equipment-items.component.html',
  styleUrls: ['./manage-equipment-items.component.css']
})
export class ManageEquipmentItemsComponent implements OnInit {
  equrl = "http://13.234.177.61/api/Equipment"
  searchText: any = '';


  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService ,private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
   
  }
  
  manageEquipmentItems(){

  }

  addNewEquipmentItem(){
    this.router.navigate(['/add-new-equipment-item/']);

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
