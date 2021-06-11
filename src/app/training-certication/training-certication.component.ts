import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,RouterStateSnapshot } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators,FormArray} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";  

declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-training-certication',
  templateUrl: './training-certication.component.html',
  styleUrls: ['./training-certication.component.css']
})
export class TrainingCerticationComponent implements OnInit {
  form: FormGroup;
  formArr : FormArray;
  categoryDropdown = false
  showTable = false
  allGblCategory: any=[];
  url = "http://13.234.177.61/api/Gblcategory"
  urlLicense = "http://13.234.177.61/api/Insurance"

  allSubCategory: any=[];
  categoryName: any;
  dateIss:  any=[];
  dateIssExpiry: any=[];
  multiImg: any=[];
  images: any =[];
  multiFiles: any=[];
  Empdata: any=[];
  employId: any;
  resMessage: any;
  allRelatedData: any=[];
  DescriptionName: any=[];
  DescriptionNames: any=[];
  timer_Training_and_Certifications: any;
  login: any;

  constructor(private fb: FormBuilder,private http: HttpClient , private router: Router, private toastr: ToastrService,private SpinnerService: NgxSpinnerService) {
    //this.createForm();
   }
  ngOnInit(): void {


    // ...............................Stsrt.............

    var public_url = "http://13.234.177.61/api/Gblcategory/";
    var public_urlLicense = "http://13.234.177.61/api/Insurance/";

    var public_html_Training_and_Certifications = null;
    var public_html_number = 10000;
    var public_Category_Arry = [];
    var public_Category_Arry_All_Fun_Access = [];
    var public_fileUpload = [];

    $("#firstdatePiker").Zebra_DatePicker();

    $('#id-tb-body-Training-and-Certifications').html("");

    binding_Category();

    function binding_Category()
    {

      $("#select-id-Category").html("");
      $.ajax({
        url: public_url + "ListGblCategory",
        type: 'GET',
        dataType: 'json',
        success: function(datas) {

          if(datas.status == true)
          {
            var respo = datas.response;
            var htmlBinding_category = '<option value="0" selected disabled>-- Select --</option>';

            $.each(respo, function (key, val) {              
                htmlBinding_category += '<option value="'+val._id+'">'+val.Category_Name+'</option>';
                
                var obj = Object();
                obj.Id = val._id;
                obj.Name = val.Category_Name;

                public_Category_Arry_All_Fun_Access.push(obj);

            });

            $("#select-id-Category").html(htmlBinding_category);

          }

          
        }
    });

    }


    $('#btn-save-Training-and-Certifications').click(function(){

      var dataIdLists = [];
      var dataAllEnteringCollections = [];
      var Api_Sending_Data = [];
      var EmpDtas = JSON.parse(sessionStorage.getItem('EmployeeData'))
      var EmpId = EmpDtas._id;
      var errorCode = 3;
      var fd = new FormData();
      var Temp_fileUpload =[];
      var Temp_fileUpload_return =[];
     
      $('#id-tb-body-Training-and-Certifications').find('tr').each(function(){
          var getdatasId = $(this).attr('appendtr');
          var tridentifire = $(this).attr('tridentifire');
          if(typeof getdatasId === "undefined"){
          }
          else if(getdatasId.length != 0 ){

            var obj = Object();
            obj.TrId = getdatasId;
            obj.Category = tridentifire;
            dataIdLists.push(obj);
          }
            
      });

      

      $.each(dataIdLists, function (key, val) {      
        
        var getId = "id-formFiles-"+val.TrId;
        var fileTrId = val.TrId;

        var chekdata = $('#'+getId+'').val();

        if(typeof chekdata !== "undefined")
        {
          var files = $('#'+getId+'')[0].files[0];
            fd.append('files', files);        
          if(typeof files !== "undefined")
          {
            var obj = Object();
            obj.fileTrId = fileTrId;
            obj.file_Name = files.name;
            obj.file = fd;
            Temp_fileUpload.push(obj);                

          }

        }

      });

      $.ajax({
        type: "POST",
        url: "http://13.234.177.61/api/Insurance/FileUploadmany",        
        success: function (data) {          
           if(data.status == true)
           {            
             
            $.each(data.data, function (key, val) { 
              
              var obj = Object();
              obj.fileTrId = Temp_fileUpload[key].fileTrId;
              obj.file_Name = Temp_fileUpload[key].file_Name;
              obj.file_Gui_Name = val;
              Temp_fileUpload_return.push(obj);

            });

          $.each(dataIdLists, function (key, val) { 
          
            var tmp_catgory = public_Category_Arry_All_Fun_Access.find( x=> x.Id == val.Category);           

            if(typeof tmp_catgory !== "undefined")
            {

              var tmp_discrip_Id = $("#discription-"+val.TrId+" option:selected").val();
              var tmp_discrip_Name = $("#discription-"+val.TrId+" option:selected").text();

              var tmp_Certificate = $("#Id-Cert-"+val.TrId+"").val();
              var tmp_Expiry_Date = $("#Id-Expiry-"+val.TrId+"").val();
              var tmp_Issue_Date = $("#Id-Issued-"+val.TrId+"").val();

              var tmp_Licence_related_id = $("#related-"+val.TrId+" option:selected").val();
              var tmp_Licence_related_Name = $("#related-"+val.TrId+" option:selected").text();

              if(tmp_Licence_related_id == 0)
              {
                tmp_Licence_related_Name = "-";
              }

              if(typeof tmp_discrip_Id !== "undefined")
              {
                  if(tmp_discrip_Id != 0)
                  {

                    errorCode = 0;                   
                    var file_pa = Temp_fileUpload_return.find(x => x.fileTrId == val.TrId);
                    var obj = Object();
                      obj.id = key;
                      obj.collectionId = val.TrId;
                      obj.Category_Id = tmp_catgory.Id;
                      obj.Category = tmp_catgory.Name;
                      obj.Employee_Id = EmpId;
                      obj.IsActive =true;
                      obj.Licence_Certificate =tmp_Certificate;
                      obj.Licence_Description = tmp_discrip_Id;
                      obj.Licence_DescriptionName = tmp_discrip_Name;
                      obj.Licence_Expiry_Date = tmp_Expiry_Date;
                      obj.Licence_Issue_Date = tmp_Issue_Date;
                      obj.Licence_Related = tmp_Licence_related_Name;
                      
                      if(typeof file_pa === "undefined")
                      {
                        obj.file_path = "-";
                        obj.file_orginalName = "-";

                      }
                      else
                      {
                        obj.file_path = file_pa.file_Gui_Name;
                        obj.file_orginalName = file_pa.file_Name;
                      }


                      
                      obj.Status =true;
                      dataAllEnteringCollections.push(obj);

                  }
                  else
                  {
                    
                    errorCode = 1;
                    alert("select discription..");

                    return false;

                  }

              }

            }
            
          });

          if(errorCode == 0)
          {
          $.each(public_Category_Arry_All_Fun_Access, function (key, val) { 
            
            var Licence_Certificate =[];
            var Licence_Description = [];
            var Licence_DescriptionName =[];
            var Licence_Expiry_Date = [];
            var Licence_Issue_Date = [];
            var Licence_Related = [];
            var file_path = [];
            var file_orginalName = [];

            $.each(dataAllEnteringCollections, function (key2, val2) { 
              if(val2.Category_Id == val.Id )
              {
                Licence_Certificate.push(val2.Licence_Certificate);
                Licence_Description.push(val2.Licence_Description);
                Licence_DescriptionName.push(val2.Licence_DescriptionName);
                Licence_Expiry_Date.push(val2.Licence_Expiry_Date);
                Licence_Issue_Date.push(val2.Licence_Issue_Date);
                Licence_Related.push(val2.Licence_Related);
                file_path.push(val2.file_path);
                file_orginalName.push(val2.file_orginalName);
                
              }

            });


            if(Licence_DescriptionName.length !== 0)
            {
                  var obj = Object();
                obj.Category_Id = val.Id;
                obj.Category = val.Name;
                obj.Employee_Id = EmpId;
                obj.IsActive =true;
                obj.Licence_Certificate = Licence_Certificate;
                obj.Licence_Description = Licence_Description;
                obj.Licence_DescriptionName = Licence_DescriptionName;
                obj.Licence_Expiry_Date = Licence_Expiry_Date;
                obj.Licence_Issue_Date = Licence_Issue_Date;
                obj.Licence_Related = Licence_Related;
                obj.file_path = file_path;
                obj.file_orginalName = file_orginalName;
                obj.Status =true;

                Api_Sending_Data.push(obj);

            }


          });
            
            var obj_new = Object();
            obj_new.data = Api_Sending_Data;

            $.ajax({
              url: public_urlLicense + "AddNewLicence",
              type: 'POST',
              dataType: 'json', 
              data: obj_new,
              success: function(Related_datas) {

                if(Related_datas.status == true)
                {
                  alert(Related_datas.message);
                  location.reload();

                }
                else if(Related_datas.status == false)
                {
                  alert(Related_datas.message);
                }

                else
                {
                  alert("Api no responce...");

                }

                
              }
            });

          }
          else if(errorCode == 1)
          {

          }
          else
          {
            alert("No data found");

          }


           } 
           else
           {
             alert("File error.....");

           }





        },
        error: function (error) {          
          $("#responceDiv").html(error.responseText);            
        },
        async: true,
        data: fd,
        cache: false,
        contentType: false,
        processData: false,
        timeout: 60000
    });

    });


      


    $("#btn-id-Training-and-Certifications").click(function(){     
     var Category_name = $('#select-id-Category :selected').text();
     var Category_val = $('#select-id-Category :selected').val();
     if(Category_val != 0)
     {
      if(jQuery.inArray(Category_val, public_Category_Arry) == -1)
      {        
        var old_public_html_number = public_html_number;
        public_html_number = public_html_number + 1;
        var temp_htmlNumber = public_html_number + 1;

      var obj = Object();
      obj.Category_Id = Category_val;

      $.ajax({
        url: public_url + "ListGblCategoryById",
        type: 'POST',
        dataType: 'json', 
        data: obj,
        success: function(datas) {
          if(datas.status == true)
          {
            var EmpDtas = JSON.parse(sessionStorage.getItem('EmployeeData'))
            var EmpId = EmpDtas._id;
            var obj_rela = Object();            
            obj_rela.Employee_Id = EmpId;
            $.ajax({
              url: public_urlLicense + "RelatedDocs",
              type: 'POST',
              dataType: 'json', 
              data: obj_rela,
              success: function(Related_datas) {
                
                var temp_Relate = '<option value="0" selected disabled>-- Select --</option>';
                $.each(Related_datas.data, function (key, val) {                                    
                  
                  temp_Relate += '<option value="'+val+'">'+val+'</option>';
                });
                var relate = '<select class="form-control" id="related-'+public_html_number+'">'+temp_Relate+'</select>'

                var respo = datas.response;            
                var temp_discrip = '<option value="0" selected disabled>-- Select --</option>';
    
                $.each(respo, function (key, val) {              
                  temp_discrip += '<option value="'+val._id+'">'+val.GlobalCategoryItem_Name+'</option>';            
    
                });
                var discrip = '<select class="form-control" id="discription-'+public_html_number+'">'+temp_discrip+'</select>'
                
              if(public_html_Training_and_Certifications == null)
                {
                  public_html_Training_and_Certifications = '<tr class="'+Category_val+'" style="color: #f96332;"><th>Description</th><th>Date Issued</th><th>Expiry</th><th>Related</th><th>Cert#</th><th>Attach file</th><th></th></tr><tr class="'+Category_val+'   title-'+public_html_number+'" CommenDelete="'+Category_val+'"><td>'+Category_name+'</td><td><button class="row-rem hidden-btn cls-CommenDelete-button" id="'+Category_val+'"><i class="fas fa-trash-alt"></i></button><button class="row-rem hidden-btn cls-TrEdit-button" id="'+Category_val+'"><i class="far fa-edit"></i></button></td></tr>\
                  <tr trIdentifire="'+Category_val+'" class="'+Category_val+' input-form '+public_html_number+'" appendTR="'+public_html_number+'"><td><div class="form-group">\
                  '+discrip+'\
                  </div></td><td><div class="login-fields form-group">\
                  <input  type="text" class="form-control input-cls-Issued-'+public_html_number+'" id="Id-Issued-'+public_html_number+'" placeholder="Date Issued" data-zdp_readonly_element="false"></div></td><td><div class="login-fields form-group">\
                  <input  type="text" class="form-control input-cls-Expiry-'+public_html_number+'" id="Id-Expiry-'+public_html_number+'" placeholder="Expiry" data-zdp_readonly_element="false"></div></td>\
                      <td><div class="form-group">\
                      '+relate+'\
                      </div></td>\
                      <td><div class="form-group"><input type="text" class="form-control" id="Id-Cert-'+public_html_number+'" placeholder="cert"></div></td><td><div class="form-group"><input class="form-control form-control-sm cls-files-upload" id="id-formFiles-'+public_html_number+'" fileTrId="'+public_html_number+'" type="file"></div></td>\
                      <td><div class="table-buttons"><button class="row-add hidden-btn cls-Add-button" catgortId="'+Category_val+'" id="'+temp_htmlNumber+'" edingId="'+public_html_number+'"><i class="fas fa-plus-circle"></i></button><button class="row-rem hidden-btn cls-delete-button" id="'+public_html_number+'"><i class="fas fa-trash-alt"></i></button></div></td></tr>\
                      <tr trIdentifire="'+Category_val+'" class="'+Category_val+' input-form '+temp_htmlNumber+'" appendTR="'+temp_htmlNumber+'"><tr>';
    
                      $('#id-tb-body-Training-and-Certifications').html(public_html_Training_and_Certifications);
                
                }
                else
                {
    
                  //public_html_Training_and_Certifications +=
                  //$('tr[appendTR="'+getId+'"]').append
                  $('#id-tb-body-Training-and-Certifications').append('<tr class="'+Category_val+'" style="color: #f96332;"><th>Description</th><th>Date Issued</th><th>Expiry</th><th>Related</th><th>Cert#</th><th>Attach file</th><th></th></tr><tr class="'+Category_val+' title-'+public_html_number+'" CommenDelete="'+Category_val+'"><td>'+Category_name+'</td><td><button class="row-rem hidden-btn cls-CommenDelete-button" id="'+Category_val+'"><i class="fas fa-trash-alt"></i></button><button class="row-rem hidden-btn cls-TrEdit-button" id="'+Category_val+'"><i class="far fa-edit"></i></button></td></tr>\
                  <tr trIdentifire="'+Category_val+'" class="'+Category_val+' input-form '+public_html_number+'" appendTR="'+public_html_number+'"><td><div class="form-group">\
                  '+discrip+'\
                  </div></td><td><div class="login-fields form-group">\
                  <input  type="text" class="form-control input-cls-Issued-'+public_html_number+'" id="Id-Issued-'+public_html_number+'" placeholder="Date Issued" data-zdp_readonly_element="false"></div></td><td><div class="login-fields form-group">\
                  <input  type="text" class="form-control input-cls-Expiry-'+public_html_number+'" id="Id-Expiry-'+public_html_number+'" placeholder="Expiry" data-zdp_readonly_element="false"></div></td>\
                      <td><div class="form-group">\
                      '+relate+'\
                      </div></td>\
                      <td><div class="form-group"><input type="text" class="form-control" id="Id-Cert-'+public_html_number+'" placeholder="cert"></div></td><td><div class="form-group"><input class="form-control form-control-sm cls-files-upload" id="id-formFiles-'+public_html_number+'" fileTrId="'+public_html_number+'" type="file"></div></td>\
                      <td><div class="table-buttons"><button class="row-add hidden-btn cls-Add-button" catgortId="'+Category_val+'" id="'+temp_htmlNumber+'" edingId="'+public_html_number+'"><i class="fas fa-plus-circle"></i></button><button class="row-rem hidden-btn cls-delete-button" id="'+public_html_number+'"><i class="fas fa-trash-alt"></i></button></div></td></tr>\
                      <tr trIdentifire="'+Category_val+'" class="'+Category_val+' input-form '+temp_htmlNumber+'" appendTR="'+temp_htmlNumber+'"><tr>');                    
    
                }               
    
                $('.input-cls-Issued-'+public_html_number).Zebra_DatePicker();
                $('.input-cls-Expiry-'+public_html_number).Zebra_DatePicker();

                $('button[id="'+old_public_html_number+'"]').css("display", "none");               

                public_html_Training_and_Certifications = $('#id-tb-body-Training-and-Certifications').html();

                public_html_number = temp_htmlNumber;

  
                }
              });

          }
        }
      });

      public_Category_Arry.push(Category_val);

      }

     }
     else
     {
       alert("please select Item")

     }     

    });

    $(document).on("click",".cls-files-upload",function() {        

    });

    $(document).on("click",".cls-delete-button",function() {           
      var getId = $(this).attr('id'); 
      var trid = $(this).closest('tr').attr('appendtr');
      $("."+trid).remove();
      public_html_Training_and_Certifications = $('#id-tb-body-Training-and-Certifications').html();

    });

    $(document).on("click",".cls-TrEdit-button",function() {
      var getId = $(this).attr('id');
      var temparry1 = [];
      var temparry2 = [];      
      var dataloop = 1;            
      $('#id-tb-body-Training-and-Certifications').find('tr.'+getId).each(function(){
            var getdatasId = $(this).attr('appendtr');
            if(typeof getdatasId === "undefined"){

            }
            else if(getdatasId.length != 0 ){

                temparry1.push(getdatasId);
            }
                 
        });

        $('#id-tb-body-Training-and-Certifications').find('tr').each(function(){
          var getdatasId = $(this).attr('tridentifire');
          if(getdatasId == getId)
          {

            temparry2.push(dataloop);
            
          }

          dataloop = dataloop+ 1;                  
      });

        $('.cls-Add-button').css("display", "none");
        var trPosition = temparry2.pop();

        var lastEl = temparry1.pop();
        var Category_val = getId;        
        Second_Edited_Binding_category(lastEl , Category_val , trPosition);       
        
      public_html_Training_and_Certifications = $('#id-tb-body-Training-and-Certifications').html();

    });
   

    $(document).on("click",".cls-CommenDelete-button",function() {      
      var getId = $(this).attr('id');       
      $("."+getId).remove();

      public_Category_Arry = jQuery.grep(public_Category_Arry, function(value) {
        return value != getId;
      });
      public_html_Training_and_Certifications = $('#id-tb-body-Training-and-Certifications').html();
    });


    function Second_Edited_Binding_category(getId , Category_val , dataloop){ 
      if(Category_val != 0)
      {
        var old_public_html_number = public_html_number;
        public_html_number = public_html_number + 1;
        var temp_htmlNumber = public_html_number + 1;  
 
       var obj = Object();
       obj.Category_Id = Category_val;
 
       $.ajax({
         url: public_url + "ListGblCategoryById",
         type: 'POST',
         dataType: 'json', 
         data: obj,
         success: function(datas) { 
           if(datas.status == true)
           { 
             var EmpDtas = JSON.parse(sessionStorage.getItem('EmployeeData'))
             var EmpId = EmpDtas._id;
             var obj_rela = Object();             
             obj_rela.Employee_Id = EmpId;
 
             $.ajax({
               url: public_urlLicense + "RelatedDocs",
               type: 'POST',
               dataType: 'json', 
               data: obj_rela,
               success: function(Related_datas) {
                 var temp_Relate = '<option value="0" selected disabled>-- Select --</option>';
                 $.each(Related_datas.data, function (key, val) {                                   
                  
                   temp_Relate += '<option value="'+val+'">'+val+'</option>';
                 });
                 var relate = '<select class="form-control" id="related-'+old_public_html_number+'">'+temp_Relate+'</select>'
 
                 var respo = datas.response;            
                 var temp_discrip = '<option value="0" selected disabled>-- Select --</option>';
     
                 $.each(respo, function (key, val) {              
                   temp_discrip += '<option value="'+val._id+'">'+val.GlobalCategoryItem_Name+'</option>';            
     
                 });
                 var discrip = '<select class="form-control" id="discription-'+old_public_html_number+'">'+temp_discrip+'</select>'

                 $('.cls-Add-button').css("display", "none");
                 

                  $('tr[appendTR="'+getId+'"]').append('<td><div class="form-group">\
                  '+discrip+'\
                  </div></td><td><div class="login-fields form-group">\
                  <input  type="text" class="form-control input-cls-Issued-'+public_html_number+'" id="Id-Issued-'+old_public_html_number+'" placeholder="Date Issued" data-zdp_readonly_element="false"></div></td><td><div class="login-fields form-group">\
                  <input  type="text" class="form-control input-cls-Expiry-'+public_html_number+'" id="Id-Expiry-'+old_public_html_number+'" placeholder="Expiry" data-zdp_readonly_element="false"></div></td>\
                      <td><div class="form-group">\
                      '+relate+'\
                      </div></td>\
                      <td><div class="form-group"><input type="text" class="form-control" id="Id-Cert-'+old_public_html_number+'" placeholder="cert"></div></td><td><div class="form-group"><input class="form-control form-control-sm cls-files-upload" id="id-formFiles-'+old_public_html_number+'" fileTrId="'+old_public_html_number+'" type="file"></div></td>\
                      <td><div class="table-buttons"><button class="row-add hidden-btn cls-Add-button" catgortId="'+Category_val+'" id="'+temp_htmlNumber+'" edingId="'+old_public_html_number+'"><i class="fas fa-plus-circle"></i></button><button class="row-rem hidden-btn cls-delete-button" id="'+old_public_html_number+'"><i class="fas fa-trash-alt"></i></button></div></td>');
                
                      $('#id-tb-body-Training-and-Certifications > tr').eq( dataloop ).after('<tr trIdentifire="'+Category_val+'" class="'+Category_val+' input-form '+temp_htmlNumber+'" appendTR="'+temp_htmlNumber+'"><tr>');
                      
                      $('.cls-Add-button').css("display", "none");

                      $('.input-cls-Issued-'+public_html_number).Zebra_DatePicker();
                      $('.input-cls-Expiry-'+public_html_number).Zebra_DatePicker();                      
                      
                      public_html_Training_and_Certifications = $('#id-tb-body-Training-and-Certifications').html();                      

                      public_html_number = temp_htmlNumber;
   
                 }
               });
 
 
 
           }
         }
       });
 
      }
      else
      {
        alert("please select Item")
 
      }

    }



    
    $(document).on("click",".cls-Add-button",function() {      
      var getId = $(this).attr('id');     
        
      var Category_val = $(this).attr('catgortId');
 
      if(Category_val != 0)
      {
        var old_public_html_number = public_html_number;

        public_html_number = public_html_number + 1;
        var temp_htmlNumber = public_html_number + 1;  
 
       var obj = Object();
       obj.Category_Id = Category_val;
 
       $.ajax({
         url: public_url + "ListGblCategoryById",
         type: 'POST',
         dataType: 'json', 
         data: obj,
         success: function(datas) { 
           if(datas.status == true)
           { 
             var EmpDtas = JSON.parse(sessionStorage.getItem('EmployeeData'))
             var EmpId = EmpDtas._id;
             var obj_rela = Object();             
             obj_rela.Employee_Id = EmpId;
 
             $.ajax({
               url: public_urlLicense + "RelatedDocs",
               type: 'POST',
               dataType: 'json', 
               data: obj_rela,
               success: function(Related_datas) {
                 var temp_Relate = '<option value="0" selected disabled>-- Select --</option>';
                 $.each(Related_datas.data, function (key, val) {                                   
                  
                   temp_Relate += '<option value="'+val+'">'+val+'</option>';
                 });
                 var relate = '<select class="form-control" id="related-'+old_public_html_number+'">'+temp_Relate+'</select>'
 
                 var respo = datas.response;            
                 var temp_discrip = '<option value="0" selected disabled>-- Select --</option>';
     
                 $.each(respo, function (key, val) {              
                   temp_discrip += '<option value="'+val._id+'">'+val.GlobalCategoryItem_Name+'</option>';            
     
                 });
                 var discrip = '<select class="form-control" id="discription-'+old_public_html_number+'">'+temp_discrip+'</select>'

                 $('button[id="'+old_public_html_number+'"]').css("display", "none");
                 

                  $('tr[appendTR="'+getId+'"]').append('<td><div class="form-group">\
                  '+discrip+'\
                  </div></td><td><div class="login-fields form-group">\
                  <input  type="text" class="form-control input-cls-Issued-'+public_html_number+'" id="Id-Issued-'+old_public_html_number+'" placeholder="Date Issued" data-zdp_readonly_element="false"></div></td><td><div class="login-fields form-group">\
                  <input  type="text" class="form-control input-cls-Expiry-'+public_html_number+'" id="Id-Expiry-'+old_public_html_number+'" placeholder="Expiry" data-zdp_readonly_element="false"></div></td>\
                      <td><div class="form-group">\
                      '+relate+'\
                      </div></td>\
                      <td><div class="form-group"><input type="text" class="form-control" id="Id-Cert-'+old_public_html_number+'" placeholder="cert"></div></td><td><div class="form-group"><input class="form-control form-control-sm cls-files-upload" id="id-formFiles-'+old_public_html_number+'" fileTrId="'+old_public_html_number+'" type="file"></div></td>\
                      <td><div class="table-buttons"><button class="row-add hidden-btn cls-Add-button" catgortId="'+Category_val+'" id="'+temp_htmlNumber+'" edingId="'+old_public_html_number+'"><i class="fas fa-plus-circle"></i></button><button class="row-rem hidden-btn cls-delete-button" id="'+old_public_html_number+'"><i class="fas fa-trash-alt"></i></button></div></td>');
                
                      $('#id-tb-body-Training-and-Certifications').append('<tr trIdentifire="'+Category_val+'" class="'+Category_val+' input-form '+temp_htmlNumber+'" appendTR="'+temp_htmlNumber+'"><tr>');

                      public_html_Training_and_Certifications = $('#id-tb-body-Training-and-Certifications').html();

                      $('.input-cls-Issued-'+public_html_number).Zebra_DatePicker();
                      $('.input-cls-Expiry-'+public_html_number).Zebra_DatePicker();

                      public_html_number = temp_htmlNumber;

   
                 }
               });
 
 
 
           }
         }
       });
 
      }
      else
      {
        alert("please select Item")
 
      }



    });


    //});

    //.....................sibi...........End..............




    this.login = JSON.parse(sessionStorage.getItem('log-in')); //forgot to close
    if(this.login!=true){
      this.router.navigate(['/log-in/']);
    }
    this.Empdata = JSON.parse(sessionStorage.getItem('EmployeeData')); //forgot to close
this.employId = this.Empdata._id
    this.getAllGblCategory()
this.getRelated()
  }
  get f() { return this.form.controls; }
  getAllGblCategory(){
   
    this.http.get<any>(`${this.url}/ListGblCategory`).subscribe(data => {
  this.allGblCategory = data['response']
  console.log(this.allGblCategory)
   }, err => {
   })
  }

  getRelated(){
    var obj={
      Employee_Id:this.Empdata._id
    }
    this.http.post<any>(`${this.urlLicense}/RelatedDocs`, obj  ).subscribe(data => {
      console.log(data)
      this.allRelatedData = data['data']
  console.log(this.allRelatedData)
   }, err => {
   })
  }

  // createForm() {
 
  //   this.form = this.fb.group({
  //     Licence_Description: new FormArray([new FormControl('')]),
  //     Licence_DescriptionName: new FormArray([new FormControl('')]),

  //     Licence_Issue_Date: new FormArray([new FormControl('')]),
  //     Licence_Expiry_Date: new FormArray([new FormControl('')]),
  //     Licence_Related: new FormArray([new FormControl('')]),
  //     Licence_Certificate: new FormArray([new FormControl('')]),
  //     Attachfile: new FormArray([new FormControl('')]),
  //     file_path: new FormArray([new FormControl('')]),
  //     Employee_Id: new FormControl('', [Validators.required,]),
  //     Category: new FormControl('', [Validators.required,]),
  //     Status: new FormControl('', [Validators.required,]),
  //     IsActive: new FormControl('', [Validators.required,]),

  //   });
  // }

  showDropdown(){
$("#showTable").css('display','block');
$('.datePic').each(function(){
  $(this).Zebra_DatePicker();
});
$('.dateExpiryPic').each(function(){
  $(this).Zebra_DatePicker();
});
  }
  
onFileChange(event, imageFor){

  if (event.target.files && event.target.files[0]) {
    var filesAmount = event.target.files.length;
    for (let i = 0; i < filesAmount; i++) {
            var reader = new FileReader();

            reader.onload = (event:any) => {
            }
       this.multiImg.push(event.target.files[i]);  
    }
   console.log(this.multiImg) 
}


}
  
  focusOutDOB($event){
    if($event.target.value){
    var getDob = $event.target.value;
    console.log(getDob)
    var preLS = new Date( getDob);
    // var dob = (preLS.getFullYear()+'-' + (preLS.getMonth()+1)) + '-'+(preLS.getDate());
    var dob = (preLS.getMonth()+1)+'/' + (preLS.getDate()) + '/'+(preLS.getFullYear());

    this.dateIss.push(dob)
    this.form.get('Licence_Issue_Date').setValue(this.dateIss);
    }
  }
  focusOutExpiry($event){
    if($event.target.value){
    var getDob = $event.target.value;
    var preLS = new Date( getDob);
    // var dob = (preLS.getFullYear()+'-' + (preLS.getMonth()+1)) + '-'+(preLS.getDate());
    var dob = (preLS.getMonth()+1)+'/' + (preLS.getDate()) + '/'+(preLS.getFullYear());

    this.dateIssExpiry.push(dob)
    this.form.get('Licence_Expiry_Date').setValue(this.dateIssExpiry);
    }
  }
  getCategoryId(subId){
      var obj={
        Category_Id:subId
      }     
          this.http.post<any>(`${this.url}/ListGblCategoryById`, obj  ).subscribe(data => {
            console.log(data)
            if(data.status==false){
            alert(data.message)
            }
            else if(data.status==true){
              this.allSubCategory = data['response']
      this.categoryName = this.allSubCategory[0].CategoryDetails[0].Category_Name
              console.log(this.categoryName)
            }
            }, err => {
              console.log(err);
            })
        

  }

  get Licence_Certificate(): FormArray {
    return this.form.get('Licence_Certificate') as FormArray;
  }
  get Licence_Issue_Date(): FormArray {
   
    return this.form.get('Licence_Issue_Date') as FormArray;
  }
  get Licence_Description(): FormArray {
    return this.form.get('Licence_Description') as FormArray;
  }
  get Licence_Expiry_Date(): FormArray {
    return this.form.get('Licence_Expiry_Date') as FormArray;
  }
  get Licence_Related(): FormArray {
    return this.form.get('Licence_Related') as FormArray;
  }
  get Attachfile(): FormArray {
    return this.form.get('Attachfile') as FormArray;
  }
  getDatePic(){
      $('.datePic').each(function(){
          $(this).Zebra_DatePicker();
      });
  }
  getExpiryDatePic(){
    $('.dateExpiryPic').each(function(){
        $(this).Zebra_DatePicker();
    });
}
onDescriptionChange(id){
console.log(id)
// if (event.target.files && event.target.files[0]) {
  for (let i = 0; i < this.allSubCategory.length; i++) {
    if(this.allSubCategory[i]._id == id){     
this.DescriptionName.push(this.allSubCategory[i].GlobalCategoryItem_Name)

console.log(this.DescriptionName)
    }
   } 
// }
}
addField(){

  this.addField_processing();
  
  this.timer_Training_and_Certifications = setInterval(() => {
    this.addField_processing();
    this.removeField();
    this.stopTimer();
  }, 50);

}

stopTimer() {
  if (this.timer_Training_and_Certifications) {
    
    clearInterval(this.timer_Training_and_Certifications);
    
  }
}
addField_processing() {
    this.getDatePic()
    this.getExpiryDatePic()

    
    // $('#first tr:last').
    this.Licence_Certificate.push(new FormControl());
    this.Licence_Description.push(new FormControl());
    this.Licence_Issue_Date.push(new FormControl());
    this.Licence_Expiry_Date.push(new FormControl());
    this.Licence_Related.push(new FormControl());
    this.Attachfile.push(new FormControl());
    $('#tablelist tr .datePic').each(function(){
      $(this).Zebra_DatePicker();
  });
  }
  removeField() {
    this.Licence_Certificate.controls.pop();
    this.Licence_Description.controls.pop();
    this.Licence_Issue_Date.controls.pop();
    this.Licence_Expiry_Date.controls.pop();
    this.Licence_Related.controls.pop();
    this.Attachfile.controls.pop();

    this.Licence_Certificate.value.pop();
    this.Licence_Description.value.pop();
    this.Licence_Issue_Date.value.pop();
    this.Licence_Expiry_Date.value.pop();
    this.Licence_Related.value.pop();
    this.Attachfile.value.pop();
  }
  onSubmit() {
    if(this.multiImg!=''){
      this.SpinnerService.show();  

      const fd = new FormData();  
      for (let i = 0; i < this.multiImg.length; i++) {
        
        this.images.push(this.multiImg[i].name)
      fd.append("files",this.multiImg[i]);
      }   
      this.http.post<any>(`${this.urlLicense}/FileUploadmany`, fd).subscribe(data => {
        console.log(data.data)
        this.multiFiles.push(data.data)
        this.DescriptionNames.push(this.DescriptionName)
        console.log(this.multiFiles)
        console.log(this.DescriptionName)
        this.form.get('file_path').setValue(this.multiFiles);
        this.form.get('Category').setValue(this.categoryName);
        this.form.get('Employee_Id').setValue(this.employId);
        this.form.get('Status').setValue("Active");
        this.form.get('IsActive').setValue(true);
        this.form.get('Licence_DescriptionName').setValue(this.DescriptionNames);

        console.log(this.form.value); 
        this.http.post<any>(`${this.urlLicense}/AddNewLicence`, this.form.value).subscribe(res => {
          console.log(res)
          if(res.status==false){
            this.SpinnerService.hide();  
            this.resMessage = res.message
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
          }else if(res.status==true){
            this.SpinnerService.hide();  
            this.form.reset()
            this.resMessage = res.message
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
  
        }, err => {
          console.log(err);
        })

      }, err => {
        console.log(err);
      })
    }else{
      this.SpinnerService.show();  

      this.DescriptionNames.push(this.DescriptionName)

      this.form.get('Employee_Id').setValue(this.employId);
      this.form.get('Category').setValue(this.categoryName);
      this.form.get('Status').setValue("Active");
      this.form.get('IsActive').setValue(true);
      this.form.get('Licence_DescriptionName').setValue(this.DescriptionNames);

      this.http.post<any>(`${this.urlLicense}/AddNewLicence`, this.form.value).subscribe(res => {
        console.log(res)
        if(res.status==false){
          this.SpinnerService.hide();  
          this.resMessage = res.message
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
        }else if(res.status==true){
          this.form.reset()
          this.SpinnerService.hide();  
          this.resMessage = res.message
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

      }, err => {
        console.log(err);
      })
    }
  }

  resetForm(){
    this.form.reset()
  }
  
}
