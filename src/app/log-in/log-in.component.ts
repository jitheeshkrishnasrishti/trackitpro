import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,RouterStateSnapshot } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  formSubmitted = false;
  flag =false
  forgotPasswordflag = false 
  loginflag =true
  form: FormGroup;
  url = "http://13.234.177.61/api/Company"
  resMessage: any;

  constructor(private fb: FormBuilder,private http: HttpClient , private router: Router, private toastr: ToastrService) {
    const snapshot: RouterStateSnapshot = router.routerState.snapshot;
    console.log(snapshot.url); 
    var getUrl = snapshot.url
    var res = getUrl.substring(0, 10);
console.log(res)
    this.createForm();
  
  }
    ngOnInit(): void {
    }
    createForm() {
      this.form = this.fb.group({
        C_Email: new FormControl('', [Validators.required,]),
        C_Password: new FormControl('', [Validators.required,]),
      });
    }
     logout(){
    console.log("mmmm")
    this.flag =false
    this.loginflag =true
    this.forgotPasswordflag = false
    this.router.navigate(['log-in']);
    sessionStorage.setItem('log-in', JSON.stringify(false));   // if it's object

    console.log(this.flag)
console.log("mmm")

   }
   forgotPassword(){
    this.flag =false
    this.loginflag =false
    this.forgotPasswordflag = true

   }
   get f() { return this.form.controls; }

    login(){
  //     this.flag =true
  // this.loginflag =false
  // this.forgotPasswordflag = false
  //     this.router.navigate(['/all-employee']);

      this.formSubmitted = true;
      if (this.form.invalid) 
      {
        return;
      }
      console.log(this.form.value)
  
  this.http.post<any>(`${this.url}/CompanyLogin`,  this.form.value   ).subscribe(data => {
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
      this.router.navigate(['/all-employee/']);
      this.form.reset()
      sessionStorage.setItem('log-in', JSON.stringify(true));   // if it's object

           this.flag =true
  this.loginflag =false
    }
    }, err => {
      console.log(err);
    })
    }

}
