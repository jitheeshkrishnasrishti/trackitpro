import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";  
declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit-equipment.component.html',
  styleUrls: ['./edit-equipment.component.css']
})
export class EditEquipmentComponent implements OnInit {

  public settings = {};
  form: FormGroup;
  allProjectSite: any=[];
  url = "http://13.234.177.61/api/Employee"
  equrl = "http://13.234.177.61/api/Equipment"
  imgUrl = "http://13.234.177.61/api/EmployeeProfilePics/"

  projectName: any=[];
  projectId: any=[];
  formSubmitted = false;
  profilePic: File;
  resMessage: any;
  Project_Site_Name: any;
  login: any;
  data: any=[];

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
  itemsShowLimit: 3,
  searchPlaceholderText: 'search',
  noDataAvailablePlaceholderText: 'No data',
  closeDropDownOnSelection: false,
  showSelectedItemsAtTop: false,
  defaultOpen: false
};
// ***-------multi selete------****
this.data = JSON.parse(sessionStorage.getItem('equipmentData')); //forgot to close
console.log(this.data)
this.getAlProjectSite()
this.setInputValue()
  }
  setInputValue(){
    this.form.get('_id').setValue(this.data._id);
    this.form.get('Equip_Name').setValue(this.data.Equip_Name);
    this.form.get('Equip_Make').setValue(this.data.Equip_Make);
    this.form.get('Equip_Model').setValue(this.data.Equip_Model);
    this.form.get('Equip_Serial').setValue(this.data.Equip_Serial);
    this.form.get('Equip_Status').setValue(this.data.Equip_Status);
    this.form.get('Equip_Photo').setValue(this.data.Equip_Photo);
    this.form.get('Equip_Tag_info').setValue(this.data.Equip_Tag_info);
    this.form.get('Project_Site_Id').setValue(this.data.Project_Site_Name);
    this.form.get('Project_Site_Name').setValue(this.data.Project_Site_Name);

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
      _id: new FormControl('', [Validators.required,]),

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
  editEquipment(){
    console.log(this.projectId)
    console.log(this.projectName)
    this.form.get('IsActive').setValue(true);
    this.form.get('Project_Site_Id').setValue(this.data.Project_Site_Id);
    console.log(this.form.value)
    if(this.projectId!=''){
      console.log("jjjj")
      this.form.get('Project_Site_Id').setValue(this.projectId);
      this.form.get('Project_Site_Name').setValue(this.projectName);
      }
    this.formSubmitted = true;
        if (this.form.invalid) 
        {    
          return;
        }
        console.log(this.form.value)


if(this.profilePic){
  this.SpinnerService.show();  

  const fd = new FormData();  
      fd.append("file",this.profilePic);     
      this.http.post<any>(`${this.equrl}/EquipmentUpload`, fd).subscribe(data => {  
        console.log(data)   
        this.form.get('Equip_Photo').setValue(data.response);
        this.SpinnerService.hide();  

        this.SpinnerService.show();  

        this.http.post<any>(`${this.equrl}/EditEquipment`,  this.form.value   ).subscribe(data => {
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
            this.data=""
            this.form.reset()
            this.router.navigate(['/all-equipments/']);
          }
          }, err => {
            console.log(err);
          })
      })
}else{
  this.SpinnerService.show();  

    console.log("2222")
    if(this.projectId!=''){
      this.form.get('Project_Site_Id').setValue(this.projectId);
    this.form.get('Project_Site_Name').setValue(this.projectName);
    }
    this.http.post<any>(`${this.equrl}/EditEquipment`,  this.form.value   ).subscribe(data => {
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

        // $('#error-disp-btns').trigger('click');
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
        this.data=""
        this.form.reset()
        this.router.navigate(['/all-equipments/']);
      }
      }, err => {
        console.log(err);
      })
    }
  }
}
