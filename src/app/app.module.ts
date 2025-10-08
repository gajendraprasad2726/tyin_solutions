import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { SuggestedProductsComponent } from './suggested-products/suggested-products.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OpenProductsDirective } from './directives/open-products.directive';
import { OpenProductDetailsDirective } from './directives/open-product-details.directive';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { UploadmaterialComponent } from './uploadmaterial/uploadmaterial.component';
import { AccountComponent } from './account/account.component';
import { SearchedProductsComponent } from './searched-products/searched-products.component';
import { OpenSearchedProductsDirective } from './directives/open-searched-products.directive';
import { FilterPipe } from './pipe/filter.pipe';
import { StateFilterPipe } from './pipe/state-filter.pipe';
import { ComplaintsComponent } from './complaints/complaints.component';
import { IntegrateaiComponent } from './integrateai/integrateai.component';
import { QuotationMobileNumberComponent } from './quotation-mobile-number/quotation-mobile-number.component';
import { PostAiReqComponent } from './post-ai-req/post-ai-req.component';
import { DatePipe } from '@angular/common';
import { CareerComponent } from './career/career.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';
import { ShippingPolicyComponent } from './shipping-policy/shipping-policy.component';
import { AdminApprovalsComponent } from './admin-approvals/admin-approvals.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    SuggestedProductsComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CartComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    OpenProductsDirective,
    OpenProductDetailsDirective,
    RegisterComponent,
    LoginComponent,
    AboutusComponent,
    ContactusComponent,
    UploadmaterialComponent,
    AccountComponent,
    SearchedProductsComponent,
    OpenSearchedProductsDirective,
    FilterPipe,
    StateFilterPipe,
    ComplaintsComponent,
    IntegrateaiComponent,
    QuotationMobileNumberComponent,
    PostAiReqComponent,
    CareerComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ReturnPolicyComponent,
    ShippingPolicyComponent,
    AdminApprovalsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('user');
        },
        //allowedDomains: ['localhost:7149'],
        //allowedDomains: ['localhost:5001']
        //allowedDomains: ['tradeyourinventoryapi-d4c2g7daecfpgsh3.centralus-01.azurewebsites.net'],
      },
    }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
