import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginInterface, JwtTokenInterface, IPAdressInterface } from "./../../shared/interfaces/login.interface";
import { ActivatedRoute, Router } from '@angular/router';
import { constants } from '../../../environments/constants';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebTokenService } from '../../services/auth/web-token.service';
import { UserService } from '../../services/user.service';
import { usernameValidator } from '../../shared/directives/username.validator';
import { environment } from 'src/environments/environment';
import { getMessaging, getToken } from "firebase/messaging";
import { ResponseLoginInterface } from "../../shared/interfaces/response-login.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public copyright: string = constants.copyright;
  public loginForm: FormGroup;
  private fromUrl: string;
  public isLoadingLogin: boolean = false;
  public alertMessage: string;
  public isHaveError: boolean = false;
  private tokenFirebase: string;
  public loginInterface: LoginInterface;
  private ipAdress: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private webTokenService: WebTokenService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => this.fromUrl = params['fromUrl']);
    this.initStylesEvents();
    this.getIpAdress();
    this.requestPermission();
  }

  private initStylesEvents(): void {
    this.initLoginForm();
    this.adjustDisplayHeight();
    window.addEventListener('resize', this.adjustDisplayHeight);
  }

  public requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey:environment.firebaseConfig.vapidKey }).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        this.tokenFirebase = currentToken;
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      this.alertMessage = err;
      this.isHaveError = true;
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });

  }

  // Add or remove style scss class by window width size
  private adjustDisplayHeight(): void {
    const loginSection = document.getElementById('login-section');
    const links = document.getElementById('links');
    const bannerDTI = document.getElementById('banner-dti-block');
    if (loginSection !== null && links !== null && bannerDTI !== null){
      const width: number = window.innerWidth;
      if (width >= 1368) {
        links.classList.remove('small-text-links');
        bannerDTI.style.display = "block";
      } else {
        links.classList.add('small-text-links');
        bannerDTI.style.display = "none";
      }

      if (width >= 992){
        loginSection.classList.add('hd-login');
      } else {
        loginSection.classList.remove('hd-login');
      }
    }
  }

  private initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(11), usernameValidator()]],
      password: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]]
    });
  }

  private setLogin(): LoginInterface{
    const login = { } as LoginInterface;
    login.cpf = this.loginForm.get('username')?.value;
    login.senha = this.loginForm.get('password')?.value;
    login.token_firebase = this.tokenFirebase;
    login.id_os = '1';
    login.id_app = 'App Comando';
    login.app_version = '1.0.0';
    login.app_version_name = '1.0.0';
    login.modelo_cel = window.navigator.userAgent;
    login.sdk = '';
    login.ip = this.ipAdress;
    return login;
  }

  private getIpAdress(): void{
    this.userService.getIpAdress().subscribe({
      next: (response: IPAdressInterface) => {
        this.ipAdress = response.ip;
      }
    });
  }

  public submitForm(): void {
    if (this.loginForm.valid){
      this.isHaveError = false;
      this.isLoadingLogin = true;
      // Descomente e edite quando for utilizar a API real de login
      const subscription = this.userService.login(this.setLogin()).subscribe({
          next: (response: ResponseLoginInterface) => {
            if (response.token !== undefined) {
              if (this.webTokenService.setToken(response.token) && this.webTokenService.setTokenValid()){
                this.fromUrl?this.router.navigateByUrl(this.fromUrl):this.router.navigate(['home']);
              } else {
                let msgError: string = "Não foi possível salvar o token so usuário!";
                console.log(msgError);
                this.loginForm.reset();
                this.alertMessage = msgError;
                this.isLoadingLogin = false;
                this.isHaveError = true;
                this.userService.logout();
              }
            } else {
              this.loginForm.reset();
              this.alertMessage = response.message?response.message+".":'';
              this.isLoadingLogin = false;
              this.isHaveError = true;
            }
          },
          error: (error: HttpErrorResponse) => {
            this.loginForm.reset();
            this.isLoadingLogin = false;
            this.isHaveError = true;
          }
      });
      subscription.unsubscribe();
    } else {
      this.alertMessage = "Preencha CPF e senha";
      this.isHaveError = true;
    }
  }

  public resetError(isClosedAlert: boolean): void {
    if (isClosedAlert) {
      this.isHaveError = false;
      this.alertMessage = '';
    }
  }

  public navigateTo(url:string): void {
    window.open(url, "_blank");
  }
}
