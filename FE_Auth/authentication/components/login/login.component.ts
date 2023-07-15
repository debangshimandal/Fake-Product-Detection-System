import { Component } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  LoginResponseData,
  AuthService
} from '@authentication/authentication.service';
import { Router } from '@angular/router';
import { JwtService } from '@src/app/shared/service/jwt.service';
import { UserPermissionEnum } from '@src/app/shared/constants/permission-constant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  public form!: FormGroup;
  public emailControl!: AbstractControl;
  public passwordControl!: AbstractControl;
  isLoading = false;
  error: string = '';
  showPassword: boolean = true;
  candidate : boolean = false;
  issuer : boolean = false;
  verifier : boolean = false;



  constructor(
    private authService: AuthService,
    public router: Router,
    private jwtService: JwtService,
    private toastr:ToastrService,
    private fb: FormBuilder
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.log('Form is invalid');
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let loginObs: Observable<LoginResponseData>;
    this.error = '';
    this.isLoading = true;
    loginObs = this.authService.login(email, password);


    loginObs.subscribe({
      next: (responseData) => {
        sessionStorage.setItem('access_token', responseData.access_token);
        var tokenDetails:any = this.jwtService.DecodeToken(responseData.access_token);
        sessionStorage.setItem('orgName',tokenDetails['orgName'])
        sessionStorage.setItem('candidateName',tokenDetails['candidateName'])
        sessionStorage.setItem('candidateEmail',tokenDetails['candidateEmail'])
        sessionStorage.setItem('verifierEmail',tokenDetails['userEmail'])
        sessionStorage.setItem('phone',tokenDetails['phone'])
        //  console.log(JSON.parse(JSON.stringify(this.jwtService.DecodeToken(responseData.access_token))));
        //  sessionStorage.setItem('orgName',(JSON.parse(JSON.stringify(this.jwtService.DecodeToken(responseData.access_token))).orgName));
        //  sessionStorage.setItem('candidateName',(JSON.parse(JSON.stringify(this.jwtService.DecodeToken(responseData.access_token))).candidateName));
        //  sessionStorage.setItem('candidateEmail',(JSON.parse(JSON.stringify(this.jwtService.DecodeToken(responseData.access_token))).candidateEmail));
        //  sessionStorage.setItem('verifierEmail',(JSON.parse(JSON.stringify(this.jwtService.DecodeToken(responseData.access_token))).userEmail));

        this.isLoading = false;
        form.reset();
        sessionStorage.setItem('subject_role',(JSON.parse(JSON.stringify(this.jwtService.DecodeToken(responseData.access_token))).permissions[0]));
        let role = (JSON.parse(JSON.stringify(this.jwtService.DecodeToken(responseData.access_token))).permissions[0]);
        
        if(role === UserPermissionEnum.Candidate){
          this.candidate = true;
          this.router.navigate(['certificates-list']);
        }
        if (role === UserPermissionEnum.Issuer) {
          this.issuer = true;
          this.router.navigate(['certificate-list-issuer']);
        }
        if (role === UserPermissionEnum.Verifier) {
          this.verifier = true;
          this.router.navigate(['verify-certificate']);
        }
        if (role === UserPermissionEnum.Admin) {
          this.verifier = true;
          this.router.navigate(['admin-dashboard']);
        }
      },
      error: (errorMessage: string) => {
        this.isLoading = false;
        this.error = errorMessage;
        this.toastr.warning(this.error);
      }
    });

  }
  verifierEmail(verifierEmail: any) {
    throw new Error('Method not implemented.');
  }

  viewCertificate(){
    this.router.navigate(['hash-certificate']);
  }

  getData() {
    const userObject = this.authService.UserObject;
    return userObject ? userObject.role : null;
  }

  onclick(x:any){
    x.type = x.type === 'password' ? 'text' : 'password';
    this.showPassword = !this.showPassword;
  }

  private formInit(): void{
    this.form = this.fb.group({
      email: [''],
      password: ['']
    })
    // this.emailControl : this.form.get('email')
    // this.passwordControl : this.form.get('password')
  }
}
