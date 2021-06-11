import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-bulk-qrcode',
  templateUrl: './bulk-qrcode.component.html',
  styleUrls: ['./bulk-qrcode.component.css']
})
export class BulkQrcodeComponent implements OnInit {
  url = "http://13.234.177.61/api/Employee"
  imgUrl = "http://13.234.177.61/api/EmployeeProfilePics/"
  data: any=[];
  title = 'app';
  elementType = 'url';
  value = 'Techiediaries';
  allEmployees: any=[];
  constructor(private http: HttpClient, private router: Router, ) { }

  ngOnInit(): void {
this.getAllEmployees()
  }
  getAllEmployees(){
    this.http.get<any>(`${this.url}/ListEmployee`).subscribe(data => {
     console.log(data)
  this.allEmployees = data['response']
  console.log(this.allEmployees)
   }, err => {
   })
  }
}
