import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {AIReq, Category, Complaint, Order, Payment, PaymentMethod, Product, Review, User, UserBank, UserOrg} from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class NavigationService {
  private baseurl = environment.apiUrl
  //baseurl = 'http://localhost:7149/api/Shopping/';
 //  baseurl = 'https://trade-your-inventory-be-hja6cfdhapf5ccfu.centralindia-01.azurewebsites.net/api/Shopping/';

  constructor(private http: HttpClient) { }

  verifyEmail(token: any) {
    const endpoint = 'VerifyEmail';
    const fullUrl = `${this.baseurl}${endpoint}?token=${token}`;
    return this.http.get(fullUrl, { responseType: 'text' });
  }

  getCategoryList() {
    let url = this.baseurl + 'GetCategoryList';
    return this.http.get<any[]>(url).pipe(
      map((categories) =>
        categories.map((category) => {
          let mappedCategory: Category = {
            id: category.id,
            category: category.category,
            subCategory: category.subCategory,
          };
          return mappedCategory;
        }), { withCredentials: true }
      )
    );
  }

  getProducts(category: string, subcategory: string, count: number) {
    return this.http.get<any[]>(this.baseurl + 'GetProducts', {
      params: new HttpParams()
        .set('category', category)
        .set('subcategory', subcategory)
        .set('count', count),
    });
  }

  getSuggestedProducts() {
    return this.http.get<any[]>(this.baseurl + 'GetSuggestedProducts');
  }

  getProduct(id: number) {
    let url = this.baseurl + 'GetProduct/' + id;
    return this.http.get(url);
  }

  orderedQty(id: number) {
    let url = this.baseurl + 'OrderedQty/' + id;
    return this.http.get(url);
  }

  getSellerUserDetails(id: number) {
    let url = this.baseurl + 'GetSellerUserDetails/' + id;
    return this.http.get(url);
  }

  registerUser(user: User): Observable<any> {
    let url = this.baseurl + 'RegisterUser';
    return this.http.post(url, user, {
      responseType: 'json' // changed from 'text'
    });
  }

  uploadMaterial(product: Product) {
    let url = this.baseurl + 'UploadMaterial';
    return this.http.post(url, product, { responseType: 'text' });
  }

  updateToUser(user: User) {
    let url = this.baseurl + 'UpdateToUser';
    return this.http.post(url, user, { responseType: 'text' });
  }

  loginUser(email: string, password: string) {
    let url = this.baseurl + 'LoginUser';
    return this.http.post(
      url,
      { Email: email, Password: password },
      { responseType: 'text' }
    );
  }

  submitReview(userId: number, productId: number, content: string) {
    return this.http.post(this.baseurl + 'InsertReview', {
      userId,
      productId,
      content
    }, { responseType: 'text' });
  }

  getReviews(productId: number) {
    return this.http.get<Review[]>(this.baseurl + 'GetReviews/' + productId);
  }

  addToCart(userid: number, productid: number, orderedQty: number, toAddress:string, toPinCode:number, toMobileNo:string, bidPrice:number) {
    let url = this.baseurl + 'InsertCartItem/' + userid + '/' + productid + '/' + orderedQty + '/' + toAddress + '/' + toPinCode + '/' + toMobileNo + '/' + bidPrice ;
    return this.http.post(url, null, { responseType: 'text' });
  }

  getActiveUser(userid:number){
    let url = this.baseurl + 'GetActiveUser/' + userid;
    return this.http.get(url);
  }

  getUserUploadedProducts(userid: number) {
    let url = this.baseurl + 'GetUserUploadedProducts/' + userid;
    return this.http.get(url);
  }

  getActiveCartOfUser(userid: number) {
    let url = this.baseurl + 'GetActiveCartOfUser/' + userid;
    return this.http.get(url);
  }

  getAllPreviousCarts(userid: number) {
    let url = this.baseurl + 'GetAllPreviousCartsOfUser/' + userid;
    return this.http.get(url);
  }

  downloadFile(): Observable<Blob> {
    // Replace 'your_backend_base_url' with the base URL of your .NET backend
    return this.http.get(this.baseurl + 'Download', { responseType: 'blob' });
  }

  removeFromCart(userid: number, productid: number) {
    let url = this.baseurl + 'RemoveFromCart/' + userid + '/' + productid;
    return this.http.post(url, null, { responseType: 'text' });
  }

  calculateShippingCost(cartid: number) {
    let url = this.baseurl + 'CalculateShipingCost/' + cartid;
    return this.http.get(url);
  }

  getCurrentUploadProduct(userId: number) {
    let url = this.baseurl + 'GetCurrentUploadProduct/' + userId;
    return this.http.get(url);
  }

  getSearchedProducts(query: string, page: number, pageSize: number) {
    return this.http.get<any[]>(this.baseurl + 'getSearchedProducts', {
      params: new HttpParams()
        .set('query', query)
        .set('page', page.toString())
        .set('pageSize', pageSize.toString())
    });
  }

  placeUserOrder(userId: number) {
    let url = this.baseurl + 'placeUserOrder/' + userId;
    return this.http.get(url);
  }

  getComplaints(userId: number): Observable<Complaint[]> {
    let url = this.baseurl + 'GetComplaints/' + userId;
    return this.http.get<Complaint[]>(url);
  }

  addComplaint(complaint: Complaint): Observable<Complaint> {
    let url = this.baseurl + 'AddComplaint';
    return this.http.post<Complaint>(url, complaint);
  }

  quotationMobileNo(quotationTitle: string, mobileNumber: string) {
    let url = this.baseurl + 'QuotationMobileNo/' + quotationTitle + '/' + mobileNumber ;
    return this.http.post(url, null, { responseType: 'text' });
  }

  postAiReq(aiReq: AIReq) {
    let url = this.baseurl + 'PostAiRequirement';
    return this.http.post(url, aiReq, { responseType: 'text' });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseurl}forgot-password`, { email });
  }

  resetPassword(email: string, token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseurl}reset-password`, { email, token, newPassword });
  }

  getPendingProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseurl + 'GetPendingProducts');
  }

  updateApprovalStatus(id: number, status: string): Observable<any> {
    let url = this.baseurl + 'UpdateApprovalStatus/' + id + '/' + status;
    return this.http.post(url, null, { responseType: 'text' });
  }

  submitContactForm(formData: any) {
    let url = this.baseurl + 'SubmitContact'
    return this.http.post(url, formData);
  }
}


