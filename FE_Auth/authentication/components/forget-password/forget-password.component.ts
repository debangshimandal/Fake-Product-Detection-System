import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, ForgetPasswordResponseData } from '../../authentication.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  forgetpassword!: FormGroup
email:any;
isLoading: any;
error:string='';
success:string='';
constructor(private authService: AuthService){}
ngOnInit(){
  this.forgetpassword=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)]),
    });
}



  onSubmit(forgetpassword: FormGroup) {
    let passwordObs:Observable<ForgetPasswordResponseData>
    this.error='';
    this.isLoading=true  
   passwordObs=this.authService.forgetpassword(this.forgetpassword.value)
    passwordObs.subscribe({
      next:(responseData:any)=>{
        let mail=responseData.accepted
        sessionStorage.setItem('access_token',responseData.access_token)
        this.forgetpassword.reset();
        this.success=`Please check your mail (${mail}) and click on the link in the email to continue the password reset procedure`
      },
      error: (errorMessage: string) => {
        this.isLoading = false;
        this.error = errorMessage;
    }
       })
      
}

}
