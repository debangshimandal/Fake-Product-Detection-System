import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable, interval } from 'rxjs';
import { RegisterResponseData, AuthService } from '@authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {


  registerForm!: FormGroup
  isLoading = false;
  error: string = '';
  success: any;
  name: any;
  phone: any;
  password: any
  confirmPassword: any;
  EmailID:string='';
  referral: any;
  otpSent: boolean = false;
  resendOtp: boolean = false;
  countdownMinutes: number = 2;
  codeValidated: boolean = false;
  countdownSeconds: number = 0;

  constructor(private authService: AuthService, public router: Router,private http: HttpClient, public route: ActivatedRoute, private toastr: ToastrService) { }

  getControl(name: any): AbstractControl | null {
    return this.registerForm.get(name);
  }
  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
  });

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}/)]),
      confirmPassword: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15), Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/)]),
    });

  }


  onSubmit(registerForm: any) {
    let registerObs: Observable<RegisterResponseData>
    this.error = '';
    this.isLoading = true;
    registerObs = this.authService.register(this.registerForm.value)
    registerObs.subscribe({
      next: (responseData: any) => {
        sessionStorage.setItem('access_token', responseData.message)
        this.registerForm.reset();
        this.toastr
          .success("Success! You have successfully registered to CertCheck!");
        this.router.navigate(['']);
      },
      error: (errorMessage) => {
        this.isLoading = false;
        this.error = errorMessage;
        this.toastr.warning(this.error);
        this.registerForm.reset();
      }
    })
  }

  emailVeri(email: string) {
    console.log('email-----', email);
    this.EmailID=email;
    let url = `http://localhost:5000/auth/user/sendotp/${email}`;
    this.http.post<any>(url, { headers: this.headers }).subscribe(data => {
      if (data.accepted && data.accepted.includes(email)) {
        this.toastr.success('OTP sent successfully');
        this.otpSent = true;
        this.startCountdown();
      } else{
        this.toastr.error('Oops! User already Exist..');
        this.otpSent = false;
      }
    },
      (error:any) =>{
        if(error.status=== 500){
          this.toastr.error('Try Again! After Sometime...')
        }
      }
    );
  }
  startCountdown() {
    this.resendOtp = true;
  
    const countdown = interval(1000).subscribe(() => {
      if (this.countdownSeconds > 0) {
        this.countdownSeconds--;
      } else {
        if (this.countdownMinutes > 0) {
          this.countdownMinutes--;
          this.countdownSeconds = 59;
        } else {
          countdown.unsubscribe();
          this.resendOtp = false;
        }
      }
    });
  }

  resendOTP() {
    if(this.otpSent){
      this.startCountdown();
      let url=`http://localhost:5000/auth/user/resendotp/${this.EmailID}`;
      this.http.put<any>(url,{headers:this.headers}).subscribe(data =>{
        this.toastr.success('OTP sent successfully');
      });
    }
  }

  ValidateCode(code:any){

let url=`http://localhost:5000/auth/user/sendotp/${code}/${this.EmailID}`;
this.http.get<any>(url,{headers:this.headers}).subscribe((data)=>{
  this.toastr.success('Verification COde Verified!!!');   
  this.codeValidated = true;
})
  }
}
