import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService , OrganizationSignUpResponseData} from '../../authentication.service';


@Component({
  selector: 'app-organization-signup',
  templateUrl: './organization-signup.component.html',
  styleUrls: ['./organization-signup.component.scss']
})
export class OrganizationSignupComponent {
  organizationSingup!: FormGroup
  isLoading=false;
  error: string='';
  success: any;
  name: any;
  email: any;
  phone: any;
  password:any;
  inviteCode:string='';
  confirmPassword:any;
  referral:any;
  
  constructor(private authService: AuthService, public router: Router, public route: ActivatedRoute,private toastr: ToastrService) {}
  
  getControl(name:any):AbstractControl | null{
    return this.organizationSingup.get(name);
  }

  ngOnInit(){
    this.organizationSingup=new FormGroup({
      name:new FormControl('',Validators.required),
      Orgname:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)]),
      password:new FormControl('',[Validators.required,Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}/)]),
      confirmPassword:new FormControl('',Validators.required),
      phone:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/) ]),
      inviteCode:new FormControl('',[Validators.required])
    });
  }
  

  onSubmit(organizationSingup: FormGroup) {
    //console.log("=========================",this.organizationSingup.value)
    let signupObs:Observable< OrganizationSignUpResponseData>
    this.error='';
    this.isLoading=true;
    signupObs=this.authService.orgsignUp(this.organizationSingup.value)
    signupObs.subscribe({
      next:(responseData:any)=>{
        sessionStorage.setItem('access_token',responseData.access_token)
        this.organizationSingup.reset();
        this.toastr
        .success("Success! You have successfully registered to CertCheck!");
        this.router.navigate(['']); 
      },
      error: (errorMessage) => {
        this.isLoading = false;
        this.error = errorMessage;
        this.toastr.warning(this.error);
        // this.organizationSingup.reset();  
    }

    
  })
      
}
   

}
