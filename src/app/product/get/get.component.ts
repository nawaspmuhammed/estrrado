import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';


@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class ProductGetComponent implements OnInit {

  products: [];
	response : any = {};
	responseDelete : any = {};
	constructor(private us: ProductService) { }

	ngOnInit() {
		this.getProducts();
	}

	getProducts() {
		this.us.getProducts().subscribe((res) => {
			this.response = res;
			if (this.response.status == 'success'){
				this.products = this.response.products;
			} else {
			}
		});
	}

	deleteProduct(id) {
		this.us.deleteProduct(id).subscribe(res => {
			this.responseDelete = res;
			if (this.responseDelete.status == 'success'){
				this.us.alert('Product deleted successfully!','success');
				this.getProducts();
			} else {
				this.us.alert('Error deleting product!','error');
			}
		});
	}
}
