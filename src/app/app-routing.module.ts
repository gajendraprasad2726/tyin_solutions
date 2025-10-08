import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { UploadmaterialComponent } from './uploadmaterial/uploadmaterial.component';
import { AccountComponent } from './account/account.component';
import { SearchedProductsComponent } from './searched-products/searched-products.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { IntegrateaiComponent } from './integrateai/integrateai.component';
import { QuotationMobileNumberComponent } from './quotation-mobile-number/quotation-mobile-number.component';
import { PostAiReqComponent } from './post-ai-req/post-ai-req.component';
import { CareerComponent } from './career/career.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from './guards/auth.guard';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';
import { ShippingPolicyComponent } from './shipping-policy/shipping-policy.component';
import { AdminApprovalsComponent } from './admin-approvals/admin-approvals.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'uploadmaterial', component: UploadmaterialComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'searched-products', component: SearchedProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'complaints', component: ComplaintsComponent },
  { path: 'integrate-ai', component: IntegrateaiComponent },
  { path: 'quotation-mobile-no/:quotationTitle', component: QuotationMobileNumberComponent },
  { path: 'post-ai-req', component: PostAiReqComponent },
  { path: 'career', component: CareerComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'return-policy', component: ReturnPolicyComponent },
  { path: 'shipping-policy', component: ShippingPolicyComponent },
  { path: 'admin-approvals', component: AdminApprovalsComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
