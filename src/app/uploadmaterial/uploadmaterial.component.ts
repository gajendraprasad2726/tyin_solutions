import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '../services/navigation.service';
import { Category, NavigationItem, Product } from '../models/models';
import { UtilityService } from '../services/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploadmaterial',
  templateUrl: './uploadmaterial.component.html',
  styleUrls: ['./uploadmaterial.component.css']
})

export class UploadmaterialComponent implements OnInit
{
  productForm!: FormGroup;
  invaildRPWD: boolean = false;
  message = '';
  totalAmount: number | undefined;
  selectedFile: File | null = null;
  product!: Product; 
  currentDate: string;
  navigationList: NavigationItem[] = [];
  buyFlag: any = false;
  errorMessage: string = '';
  showErrorPopup = false;  // Controls the visibility of the error popup
  selectedCategory = 'Products'; // default

  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService,
    public utilityService: UtilityService,
    private router: Router,
  ) {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: ['Products', [Validators.required]],
      productCategoryId: [1, [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      hsnCode: [''],
      uom: ['', [Validators.required]],
      totalAmount: [''],
      manufacturerName: [''],
      manufacturerDate: [''],
      lastQualityTested: [''],
      expiryDate: [''],
      labTested: [''],
      fromAddress: ['', [Validators.required]],
      fromPinCode: ['', [Validators.required, Validators.pattern('^\\d{6}$')]],
      fromOrganizationName: [''],
      fromCity: ['', [Validators.required]],
      fromState: ['', [Validators.required]],
      gstNumber: [''],
      grnNumber: [''],
      brandName: [''],
      materialType: [''],
      grade: [''],
      diameter: [''],
      length: [''],
      size: [''],
      shape: [''],
      productContactNo: [
        '',
        [
          Validators.required,
          Validators.pattern('^[6-9]\\d{9}$')  // Indian 10-digit mobile number
        ],
      ],
      userId: this.utilityService.getUser().id
    });

    this.productForm.get('quantity')?.valueChanges.subscribe(() => this.totalAmountCalc());
    this.productForm.get('price')?.valueChanges.subscribe(() => this.totalAmountCalc());

    this.productForm.get('categoryId')?.valueChanges.subscribe(val => {
      this.selectedCategory = val;

      // Auto-update subCategoryId when category changes
      if (val === 'Quality Materials') {
        this.productForm.get('productCategoryId')?.setValue(1);  // Reinforcement Steel
      } else if (val === 'Scrap Market') {
        this.productForm.get('productCategoryId')?.setValue(39);  // Plastic
      } else if (val === 'Overstock Deals') {
        this.productForm.get('productCategoryId')?.setValue(20);  
      } else {
        this.productForm.get('productCategoryId')?.reset();      // Optional fallback
      }
    });

    this.navigationService.getCategoryList().subscribe((list: Category[]) => {
      for (let item of list) {
        let present = false;
        for (let navItem of this.navigationList) {
          if (navItem.category === item.category) {
            navItem.subcategories.push(item.subCategory);
            present = true;
          }
        }
        if (!present) {
          this.navigationList.push({
            category: item.category,
            subcategories: [item.subCategory],
          });
        }
      }
    });

    this.productForm.get('categoryid')?.valueChanges.subscribe(value => {
      this.selectedCategory = value;
    });
  }

  upload() {
    let product: Product = {
        id: 0,
        title: this.Title.value,
        description: this.Description.value,
        productCategoryId: this.ProductCategoryId.value,
        price: this.Price.value,
        quantity: this.Quantity.value,
        totalAmount: this.Price.value * this.Quantity.value,
        createdAt: new Date(),
        modifiedAt: new Date(),
        hsnCode: this.HSNCode.value,
        uom: this.UOM.value,
        manufacturerName: this.ManufacturerName.value,
        manufacturerDate: this.ManufacturerDate.value ? this.ManufacturerDate.value : '1900-01-01',
        expiryDate: this.ExpiryDate.value ? this.ExpiryDate.value : '1900-01-01',
        lastQualityTested: this.LastQualityTested.value ? this.LastQualityTested.value : '1900-01-01',
        labTested: this.LabTested.value,
        fromAddress: this.FromAddress.value,
        fromPinCode: String(this.FromPinCode.value),
        fromOrganizationName: this.FromOrganizationName.value,
        fromCity: this.FromCity.value,
        fromState: this.FromState.value,
        userId: this.utilityService.getUser().id,
        gstNumber: this.GSTNumber.value,
        grnNumber: this.GRNNumber.value,
        materialType: this.MaterialType.value,
        grade: this.Grade.value,
        diameter: this.Diameter.value,
        length: this.Length.value,
        size: this.Size.value,
        shape: this.Shape.value,
        productContactNo: '+91 ' + this.ProductContactNo.value,
        imageName: '',
        orderedQty: 0,
        toAddress: '',
        toPinCode: 0,
        toMobileNo: '',
        sellingPrice: 0,
        bidPrice: 0
    };

    if (this.productForm.invalid) {
      this.markFormGroupTouched(this.productForm);
      this.errorMessage = 'Please fill out all fields correctly!';
      this.showErrorPopup = true;  // Show the error popup
      return;
    } else { 

    this.navigationService.uploadMaterial(product).subscribe((res: any) => {
      this.message = res.toString();
      this.callLastProduct();
     
    });
    }
  }

  closeErrorPopup() {
    this.showErrorPopup = false;  // Close the error popup
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  callLastProduct() {
    this.navigationService.getCurrentUploadProduct(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.product = res;
        
        this.router.navigate(['/product-details'], {
          queryParams: {
            id: this.product.id,
            buyFlag: this.buyFlag
          },
        });
      });
  }

  totalAmountCalc() {
    const quantity = this.productForm.get('quantity')?.value || 0;
    const price = this.productForm.get('price')?.value || 0;
    const total = quantity * price;
    this.productForm.get('totalAmount')?.setValue(total, { emitEvent: false }); // prevent infinite loop

    // You can assign total to a form control or a component property here
  }

  //#region Getters
  get Title(): FormControl {
    return this.productForm.get('title') as FormControl;
  }
  get Description(): FormControl {
    return this.productForm.get('description') as FormControl;
  }
  get CategoryId(): FormControl {
    return this.productForm.get('categoryId') as FormControl;
  }
  get ProductCategoryId(): FormControl {
    return this.productForm.get('productCategoryId') as FormControl;
  }
  get Quantity(): FormControl {
    return this.productForm.get('quantity') as FormControl;
  }
  get Price(): FormControl {
    return this.productForm.get('price') as FormControl;
  }
  get HSNCode(): FormControl {
    return this.productForm.get('hsnCode') as FormControl;
  }
  get UOM(): FormControl {
    return this.productForm.get('uom') as FormControl;
  }
  get ManufacturerName(): FormControl {
    return this.productForm.get('manufacturerName') as FormControl;
  }
  get ExpiryDate(): FormControl {
    return this.productForm.get('expiryDate') as FormControl;
  }
  get ManufacturerDate(): FormControl {
    return this.productForm.get('manufacturerDate') as FormControl;
  }
  get LastQualityTested(): FormControl {
    return this.productForm.get('lastQualityTested') as FormControl;
  }
  get LabTested(): FormControl {
    return this.productForm.get('labTested') as FormControl;
  }
  get TotalAmount(): FormControl {
    return this.productForm .get('totalAmount') as FormControl;
  }
  get FromAddress(): FormControl {
    return this.productForm.get('fromAddress') as FormControl;
  }
  get FromPinCode() {
    return this.productForm.get('fromPinCode') as FormControl;
  }
  get FromOrganizationName() {
    return this.productForm.get('fromOrganizationName') as FormControl;
  }
  get FromCity() {
    return this.productForm.get('fromCity') as FormControl;
  }
  get FromState() {
    return this.productForm.get('fromState') as FormControl;
  }
  get GSTNumber() {
    return this.productForm.get('gstNumber') as FormControl;
  }
  get MaterialType() {
    return this.productForm.get('materialType') as FormControl;
  }
  get BrandName() {
    return this.productForm.get('brandName') as FormControl;
  }
  get GRNNumber() {
    return this.productForm.get('grnNumber') as FormControl;
  }
  get Grade() {
    return this.productForm.get('grade') as FormControl;
  }
  get Diameter() {
    return this.productForm.get('diameter') as FormControl;
  }
  get Length() {
    return this.productForm.get('length') as FormControl;
  }
  get Size() {
    return this.productForm.get('size') as FormControl;
  }
  get Shape() {
    return this.productForm.get('shape') as FormControl;
  }
  get ProductContactNo(): FormControl {
    return this.productForm.get('productContactNo') as FormControl;
  }

  onClose() {
    this.router.navigate(['/home']);
  };
}
