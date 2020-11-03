import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class ProductAddComponent implements OnInit {

  response : any = {};
  angForm : FormGroup;
  constructor(private fb : FormBuilder, private us: ProductService) { 
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      price: ['', Validators.required ],
      
    });
  }

  ngOnInit() {
  }
  addProduct() {
    this.us.addProduct(this.angForm.value).subscribe(res => {
      this.response = res;
      if (this.response.status == 'success'){
        this.us.alert('Product added successfully!','success');
        this.angForm.reset();
        
      } else {
        this.us.alert('Error saving user!','error');
      }
    })
  }
}
