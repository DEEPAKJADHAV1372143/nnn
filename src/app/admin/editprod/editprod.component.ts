import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servie/api.service';

@Component({
  selector: 'app-editprod',
  templateUrl: './editprod.component.html',
  styleUrls: ['./editprod.component.css']
})
export class EditprodComponent implements OnInit , OnChanges {
  @Input() itemid :any;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api:ApiService
  ) { }
  
 logedUserId:any;
 logedUserData:any;
 productData:FormGroup|any;
 submitted:any;
 editProdData:any;
 prodId:any;

 
  ngOnInit(): void {
  
    
   
   // this.logedUserId=localStorage.getItem('logId');
    this.prodId=localStorage.getItem('prodId');
    

    this.api.registrationUser(this.logedUserId).subscribe((res)=>{
      this.logedUserData=res;
    })
    this.productData= this.formBuilder.group({
      prod_name:['',Validators.required],
      prod_img:['',Validators.required],
      prod_dis:['',Validators.required],
      prod_prise:['',Validators.required],
      prodType:['',Validators.required],	
      userId:[this.logedUserId]
      
  });

    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.api.productEdit(this.itemid).subscribe((res)=>{
      //alert(this.itemid);
      this.editProdData=res;
     // alert(this.editProdData[0].prod_name)
      this.productData= this.formBuilder.group({
        prod_name:[this.editProdData[0].prod_name,Validators.required],
        prod_img:[this.editProdData[0].prod_img,Validators.required],
        prod_dis:[this.editProdData[0].prod_dis,Validators.required],
        prod_prise:[this.editProdData[0].prod_prise,Validators.required],
        prodType:[this.editProdData[0].prodType,Validators.required],	
        id:[this.editProdData[0].id],
        prod_quantity:[this.editProdData[0].prod_quantity],
        userId:[this.editProdData[0].userId]
        // userId:[this.logedUserId]
        
    });

    })
   
 // this.productData.patchValue(MyOBJ);
  }

  get f() { return this.productData.controls; }
  addProduct() {
    this.submitted = true;
    if (this.productData.invalid) {
        return;
    }
    this.api.UpdateProd(this.productData.value).subscribe((res)=>{
      console.log(res);
    })
    alert('Product Added successfullay');
    location.reload();
  }

}
