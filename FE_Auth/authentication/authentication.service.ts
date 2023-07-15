
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { authUrls } from './constants';
import { environment } from '@src/environments/environments';
import { Injectable } from '@angular/core';



export interface LoginResponseData {
  subject: any;
  access_token: string;
  role:string;
}
export interface ForgetPasswordResponseData {
  access_token: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  phone:string;
}

export interface RegisterResponseData {
  access_token: string;
}
export interface ChangePasswordResponseData {
  access_token: string;
}

export interface OrganizationSignUpResponseData {
  access_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  UserObject: any;
  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
  });

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<LoginResponseData>(`${environment.apiUrl}${authUrls.login}`, {
        username: email,
        password: password,
      })
      
        .pipe(catchError(this.handleError));
      
  }

  orgsignUp(formData:any){
    return this.http
    .post<OrganizationSignUpResponseData>(`${environment.apiUrl}${authUrls.orgSingup}`,formData)
    .pipe(catchError(this.handleError))
  }

  register(formData:any) {
    
    
    return this.http
      .post<RegisterResponseData>(`${environment.apiUrl}${authUrls.register}`, formData)
      .pipe(catchError(this.handleError));
  }
  forgetpassword(formData:any){
    return this.http.get<ForgetPasswordResponseData>(`${environment.apiUrl}${authUrls.forgetpassword}?toemail=${formData.email}`)
  }

  changepassword(formData:any, token: string){
    return this.http
      .post<ChangePasswordResponseData>(`${environment.apiUrl}${authUrls.changepassword}`,formData, {headers:  {
        'Authorization': `Bearer ${token}`
      }})
      .pipe(catchError(this.handleError))
  }
 
  requests(){
    return this.http.get<any>(`${environment.apiUrl}${authUrls.pendingrequests}`, {headers:this.headers})
  }

  requestHistoryVerifier(){
    return this.http.get<any>(`${environment.apiUrl}${authUrls.pendingrequesthistoryverifier}`, {headers:this.headers})
  }
  acceptrequest(email:any,days:any , id : string){
    return this.http.get<any>(`${environment.apiUrl}${authUrls.accept}${id}/${email}/${days}`, {headers:this.headers})
  }
  rejectrequest(email:string , id : string){
    return this.http.get<any>(`${environment.apiUrl}${authUrls.reject}${id}/${email}`, {headers:this.headers})
  }
  requestsHistory(){
    return this.http.get<string>(`${environment.apiUrl}${authUrls.requestHistory}`,{headers:this.headers})
  }
  withdrawreqs1(id:any,email:any){
    return this.http.get<any>(`${environment.apiUrl}${authUrls.withdrawrequestsforissuer}/${id}/${email}`,{headers:this.headers})
  }
  withdrawreqs2(id:any,email:any){
    return this.http.get<any>(`${environment.apiUrl}${authUrls.withdrawrequestsforverifier}/${id}/${email}`,{headers:this.headers})
  }
userdetails(){
  return this.http.get<any>(`${environment.apiUrl}${authUrls.user}`,{headers:this.headers})
  }
upload(file : File){
  const formData = new FormData();    
  formData.append('image',file);
  return this.http.post<any>(`${environment.apiUrl}${authUrls.upload}`,formData,{headers:this.headers})
}
editInfo(formData:any){
  return this.http.put<any>(`${environment.apiUrl}${authUrls.editInfo}`,formData,{headers:this.headers})
}


notification(){
  return this.http.get<any>(`${environment.apiUrl}${authUrls.notification}`,{headers:this.headers})
}
  allVerifierRequests(email:string){
    return this.http.get<any>(`${environment.apiUrl}${authUrls.allverifierrequests}${email}`, {headers:this.headers})
  }
  acceptDocs(id:string){
    return this.http.get<string>(`${environment.apiUrl}${authUrls.acceptverifierdocs}${id}`,{headers:this.headers})
  }
  rejectDocs(id:string){
    return this.http.get<string>(`${environment.apiUrl}${authUrls.rejectverifierdocs}${id}`,{headers:this.headers})
  }





  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Recived error from client-side
      errorMessage = error.error.message;
    } else {
      // Recived error from server-side
      errorMessage = error.error.message;
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}