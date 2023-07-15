import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, ChangePasswordResponseData } from '../../authentication.service';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
changepasswordForm!:FormGroup
private _token: string = '';
newpassword:any;
confirmpassword:any;
isLoading=false
  error: string='';
  success: string='';
constructor(private authservice:AuthService,
  private toastr:ToastrService,
  public router: Router, 
  private route: ActivatedRoute){}
ngOnInit(){
  this._token = this.route.snapshot.queryParamMap.get('token') || '';
  this.changepasswordForm=new FormGroup({
    newpassword:new FormControl('',[Validators.required,Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}/)]),
    confirmpassword:new FormControl('',Validators.required)

})
}
onSubmit(changepasswordForm:FormGroup){
  let passwordObs:Observable<ChangePasswordResponseData>
  this.error='';
  passwordObs=this.authservice.changepassword(this.changepasswordForm.value, this._token)
  passwordObs.subscribe({
    next:(responseData:any)=>{
      // sessionStorage.setItem('access_token', this._token)
      this.success='Congratulations! Your Password is changed!'
      this.toastr.success(this.success);
      this.router.navigate(['']);
    },
    error: (errorMessage) => {
      this.isLoading = false;
      this.error = errorMessage;
      this.toastr.error(this.error)
      
  }
     })
    

}
}