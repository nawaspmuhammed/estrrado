import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: any = {};
	angForm: FormGroup;
	response: any = {};
	constructor(private route: ActivatedRoute, 
		private fb: FormBuilder,
		private router: Router, 
		private us: ProductService) {
		this.angForm = this.fb.group({
			name: ['', Validators.required ],
			price: ['', Validators.required ],
			
		});
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.us.editProduct(params['id']).subscribe(res => {
        
        this.product = res;
        this.product = this.product.product;
        
			});
		});
	}

	updateProduct() {
		this.route.params.subscribe(params => {
			this.us.updateProduct(params['id'], this.angForm.value).subscribe(res => {
				this.response = res;
				if (this.response.status == 'success'){
					this.us.alert('Product updated successfully!','success');
					this.router.navigate(['product']);
				} else {
					this.us.alert('Error updating user!','error');
				}
			});
		});
	}
}
