import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";  

declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  @ViewChild('multiSelect') multiSelect;

  form: FormGroup;
  url = "http://13.234.177.61/api/Employee"
  allDivision: any=[];
  allProjectSite: any=[];
  DivisionName: any;
  profilePic: File;
  Project_Site_Name: any;
  formSubmitted = false;
  public settings = {};
  projectName: any=[];
  projectId: any=[];
  resMessage: any;
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



    $('#datepicker').Zebra_DatePicker();
    $('#datepicker-2').Zebra_DatePicker()
  

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

this.form.get('Status').setValue("Active");

    this.getAlDivision()
    this.getAlProjectSite()
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
  createForm() {
    this.form = this.fb.group({
      Emp_Fname: new FormControl('', [Validators.required,]),
      Emp_Lname: new FormControl('', [Validators.required,]),
      Emp_Position: new FormControl('', [Validators.required,]),
      Div_id: new FormControl('', [Validators.required,]),
      Div_Name: new FormControl('', [Validators.required,]),

      Emp_Number: new FormControl('',[Validators.required,] ),
      Emp_DOB: new FormControl('', [Validators.required,]),
      Emp_Email: new FormControl('', [Validators.required,Validators.email]),
      Emp_HireDate: new FormControl('', [Validators.required,]),
      Emp_ProfilePhoto: new FormControl('', ),
      Emp_TagInfo: new FormControl('', [Validators.required,]),
      Emp_ProjectSites: new FormControl('', [Validators.required,]),
      Emp_ProjectSiteName: new FormControl('',),    
      Status: new FormControl('', [Validators.required,]),
      IsActive: new FormControl('',),



    });
  }
  resetForm(){
    this.form.reset()

  }
  getAlDivision(){
    this.http.get<any>(`${this.url}/GetDivision`).subscribe(data => {
     console.log(data)
  this.allDivision = data['response']
  console.log(this.allDivision)
   }, err => {
   })
  }
  focusOutDOB($event){
    var getDob = $event.target.value;
    var preLS = new Date( getDob);
    var dob = (preLS.getFullYear()+'-' + (preLS.getMonth()+1)) + '-'+(preLS.getDate());
    this.form.get('Emp_DOB').setValue(dob);
  }

    focusOutHireDate($event){
      var getHairDate = $event.target.value;
      var preLS = new Date( getHairDate);
      var HairDate = (preLS.getFullYear()+'-' + (preLS.getMonth()+1)) + '-'+(preLS.getDate());
      this.form.get('Emp_HireDate').setValue(HairDate);
    }

  getAlProjectSite(){
    this.http.get<any>(`${this.url}/GetProjectSiteName`).subscribe(data => {
     console.log(data)
  this.allProjectSite = data['response']
  console.log(this.allProjectSite)
   }, err => {
   })
  }

  getDivisionId(_id){
    for (let i = 0; i < this.allDivision.length; i++) {
     if(this.allDivision[i]._id == _id){     
this.DivisionName = this.allDivision[i].Div_name
this.form.get('Div_Name').setValue(this.DivisionName);

     }
    } 
}

getProjectSiteId(_id){
  for (let i = 0; i < this.allProjectSite.length; i++) {
   if(this.allProjectSite[i]._id == _id){     
this.Project_Site_Name = this.allProjectSite[i].Project_Site_Name
this.form.get('Emp_ProjectSiteName').setValue(this.Project_Site_Name);

   }
  } 
}
singleImage(event, imageFor)
{  
  console.log("jjj")
  this.profilePic = <File>event.target.files[0]; 
  console.log(this.profilePic)
}
get f() { return this.form.controls; }

  addEmployee(){
console.log(this.projectId)
console.log(this.projectName)

    this.formSubmitted = true;
        if (this.form.invalid) 
        {
         
          return;
        }

    if(this.profilePic){
      const fd = new FormData();  
      fd.append("file",this.profilePic);     
      this.http.post<any>(`${this.url}/EmployeeProfileUpload`, fd).subscribe(data => {  
        console.log(data)   
        this.form.get('Emp_ProfilePhoto').setValue(data.response);
    
    this.form.get('IsActive').setValue(true);
    this.form.get('Emp_ProjectSites').setValue(this.projectId);
    this.form.get('Emp_ProjectSiteName').setValue(this.projectName);

    console.log(this.form.value)
    this.http.post<any>(`${this.url}/AddNewEmployee`,  this.form.value   ).subscribe(data => {
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
           this.router.navigate(['/all-employee/']);
        this.form.reset()
      }
      }, err => {
        console.log(err);
      })
    })
  }else{
    this.form.get('IsActive').setValue(true);
    this.form.get('Emp_ProjectSites').setValue(this.projectId);
    this.form.get('Emp_ProjectSiteName').setValue(this.projectName);
    console.log(this.form.value)

    this.http.post<any>(`${this.url}/AddNewEmployee`,  this.form.value   ).subscribe(data => {
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
        this.router.navigate(['/all-employee/']);
      }
      }, err => {
        console.log(err);
      })
   
  }
  }

}
