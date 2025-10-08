export interface SuggestedProduct {
  banerimage: string;
  category: Category;
}

export interface NavigationItem {
  category: string;
  subcategories: string[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  mobile: string;
  password: string;
  createdAt: string;
  modifiedAt: string;
  userOrganizationName: string;
  userOrganizationEmailId: string;
  userOrganizationAddress: string;
  userOrganizationLegalStatus: string;
  userOrganizationNatureBusiness: string;
  userOrganizationDetails: string;
  userGSTNo: string;
  userMobileNoSec: string;
  userBankName: string;
  userBankAccountNo: string;
  userReEnterBankAccNo: string;
  userIFSCCode: string;
  userId: number;
}

export interface AIReq {
  id: number;
  title: string;
  description: string;
  mobileNo: string;
}

export interface UserOrg {
  email: string;
  userOrganizationName: string;
  userGSTNo: string;
  userMobileNoSec: string;
}

export interface UserBank {
  email: string;
  userBankName: string;
  userBankAccountNo: string;
  userReEnterBankAccNo: string;
  userIFSCCode: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  mobile: string;
  password: string;
  createdAt: string;
  modifiedAt: string;
  userOrganizationName: string;
  userGSTNo: string;
  userMobileNoSec: string;
  userBankName: string;
  userBankAccountNo: string;
  userReEnterBankAccNo: string;
  userIFSCCode: string;
  userId: number;
}

export interface Category {
  id: number;
  category: string;
  subCategory: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  productCategory?: Category;
  productCategoryId: number;
  price: number;
  quantity: number;
  imageName: string;
  hsnCode: string; 
  uom: string;
  manufacturerName: string;
  manufacturerDate: Date;
  lastQualityTested: Date;
  expiryDate: Date;
  labTested : string
  totalAmount: number;
  createdAt: Date;
  modifiedAt: Date;
  orderedQty: number;
  toAddress: string;
  toPinCode: number;
  fromPinCode: string;
  toMobileNo: string;
  fromCity: string;
  fromOrganizationName: string;
  fromAddress: string;
  fromState: string;
  sellingPrice: number;
  gstNumber: string;
  grnNumber: string;
  materialType: string;
  grade: string;
  diameter: string;
  length: string;
  size: string;
  shape: string;
  productContactNo: string;
  bidPrice: number;
  userId: number;
  approvalStatus?: 'pending' | 'approved' | 'rejected';

}

export interface Review {
  id: number;
  userId: number;
  productId: number;
  content: string;
  createdAt: string;
}

export interface OrderedQty {
  qty: number;
}

export interface CartItem {
  id: number;
  product: Product;
  orderedQty: number;
  fromPinCode: number;
  toPinCode: number;
  bidPrice: number;
}

export interface CartIt {
  id: number;
  orderedQty: number;
  bidPrice: number;
}

export interface Cart {
  id: number;
  user: User;
  cartItems: CartItem[];
  ordered: boolean;
  orderedOn: string;
  //fromPinCode: number;
  //toPinCode: number;
}

export interface PaymentMethod {
  id: number;
  type: string;
  provider: string;
  available: boolean;
  reason: string;
}

export interface Payment {
  id: number;
  user: User;
  paymentMethod: PaymentMethod;
  totalAmount: number;
  shipingCharges: number;
  amountReduced: number;
  amountPaid: number;
  createdAt: string;
}

export interface Order {
  id: number;
  user: User;
  cart: Cart;
  createdAt: string;
}

export interface Complaint {
  id: number;
  userId: number;
  title: string;
  description: string;
  status: string; // e.g., 'open', 'resolved'
  createdAt: Date;
}

export interface Quotation {
  id : number;
  title: string;
  description: string;
  buttonText: string;
  quotationFromMobileNo: string;
  status?: string;  // optional field for status
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
}
// #endregion
