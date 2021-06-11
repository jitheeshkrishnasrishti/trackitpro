import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";  
declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-addequipments',
  templateUrl: './addequipments.component.html',
  styleUrls: ['./addequipments.component.css']
})
export class AddequipmentsComponent implements OnInit {
  public settings = {};
  form: FormGroup;
  allProjectSite: any=[];
  url = "http://13.234.177.61/api/Employee"
  equrl = "http://13.234.177.61/api/Equipment"

  projectName: any=[];
  projectId: any=[];
  formSubmitted = false;
  profilePic: File;
  resMessage: any;
  Project_Site_Name: any;
  login: any;

  constructor(private fb: FormBuilder,private http: HttpClient , private router: Router,
    private toastr: ToastrService,private SpinnerService: NgxSpinnerService) {  
    this.createForm();

  }
  ngOnInit(): void {
    this.login = JSON.parse(sessionStorage.getItem('log-in')); //forgot to close
    if(this.login!=true){
      this.router.navigate(['/log-in/']);
    }
    var readURL = function(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
              $('.profile-pic').attr('src', e.target.result);
          }
  
          reader.readAsDataURL(input.files[0]);
      }
  }
 
  $(".file-upload").on('change', function(){
      readURL(this);
  });
  
  $(".upload-button").on('click', function() {
     $(".file-upload").click();
  });

$("input[type='image']").click(function() {
  $("input[id='my_file']").click();
});
// ***-------multi selete------****
this.settings = {
  singleSelection: false,
  idField: '_id',
  textField: 'Project_Site_Name',
  enableCheckAll: true,
  allowSearchFilter: false,
  limitSelection: -1,
  clearSearchFilter: true,
  maxHeight: 197,
  itemsShowLimit: 2,
  searchPlaceholderText: 'search',
  noDataAvailablePlaceholderText: 'No data',
  closeDropDownOnSelection: false,
  showSelectedItemsAtTop: false,
  defaultOpen: false
};
// ***-------multi selete------****
this.getAlProjectSite()
this.form.get('Equip_Status').setValue("Active");

  }
  getAlProjectSite(){
    this.http.get<any>(`${this.url}/GetProjectSiteName`).subscribe(data => {
     console.log(data)
  this.allProjectSite = data['response']
  console.log(this.allProjectSite)
   }, err => {
   })
  }
  get f() { return this.form.controls; }

  createForm() {
    this.form = this.fb.group({
      Equip_Name: new FormControl('', [Validators.required,]),
      Equip_Make: new FormControl('', [Validators.required,]),
      Equip_Model: new FormControl('', [Validators.required,]),
      Equip_Serial: new FormControl('', [Validators.required,]),
      Equip_Status: new FormControl('', [Validators.required,]),
      Equip_Photo: new FormControl('', ),
      Equip_Tag_info: new FormControl('', [Validators.required,]),
      Project_Site_Id: new FormControl('', [Validators.required,]),
      Project_Site_Name: new FormControl('', [Validators.required,]),
      IsActive: new FormControl('',),
    });
  }
  public onFilterChange(item: any) {
    console.log(item);
  }
   onDropDownClose(item: any) {
    console.log(item);
   
  }

  public onItemSelect(item: any) {
    this.projectName.push(item.Project_Site_Name)
    this.projectId.push(item._id)
  }
  public onDeSelect(item: any) {
    console.log(item);
    this.projectId.splice(this.projectId.indexOf(item._id), 1);
    this.projectName.splice(this.projectName.indexOf(item.Project_Site_Name), 1);

  } 

  public onSelectAll(items: any) {
    console.log(items);
    for (let i = 0; i < items.length; i++) {
      this.projectName.push(items[i].Project_Site_Name)
      this.projectId.push(items[i]._id)

    }
  }
  public onDeSelectAll(items: any) {
    console.log(items);
    this.projectName =[]
    this.projectId =[]
  }
  singleImage(event, imageFor)
{  
  console.log("jjj")
  this.profilePic = <File>event.target.files[0]; 
  console.log(this.profilePic)
}

  resetForm(){
    this.form.reset()

  }
  addEquipment(){
    this.form.get('Project_Site_Name').setValue(this.projectName);
    
        this.formSubmitted = true;
            if (this.form.invalid) 
            {
             
              return;
            }
    
        if(this.profilePic){
          this.SpinnerService.show();  
          const fd = new FormData();  
          fd.append("file",this.profilePic);     
          this.http.post<any>(`${this.equrl}/EquipmentUpload`, fd).subscribe(data => {  
            console.log(data)   
            this.form.get('Equip_Photo').setValue(data.response);
        
        this.form.get('IsActive').setValue(true);
        this.form.get('Project_Site_Id').setValue(this.projectId);
        this.form.get('Project_Site_Name').setValue(this.projectName);
    
        console.log(this.form.value)
        this.http.post<any>(`${this.equrl}/AddNewEquipment`,  this.form.value   ).subscribe(data => {
          console.log(data)
          if(data.status==false){
            this.SpinnerService.hide();  
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
            this.SpinnerService.hide();  
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
               this.router.navigate(['/all-equipments/']);
            this.form.reset()
          }
          }, err => {
            console.log(err);
          })
        })
      }else{
        this.form.get('IsActive').setValue(true);
        this.form.get('Project_Site_Id').setValue(this.projectId);
        this.form.get('Project_Site_Name').setValue(this.projectName);
        console.log(this.form.value)
        this.SpinnerService.show();  
        this.http.post<any>(`${this.equrl}/AddNewEquipment`,  this.form.value   ).subscribe(data => {
          console.log(data)
          if(data.status==false){
            this.SpinnerService.hide();  
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
            this.SpinnerService.hide();  
            this.form.reset()
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
            this.router.navigate(['/all-equipments/']);
          }
          }, err => {
            console.log(err);
          })
       
      }
      }
}
