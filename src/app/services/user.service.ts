import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { User, UserSystemInterface } from './../shared/interfaces/user.interface';
import {WebTokenService} from './auth/web-token.service';
import {Injectable } from '@angular/core';
import { LoginInterface, JwtTokenInterface, IPAdressInterface } from "../shared/interfaces/login.interface";
import { ResponseLoginInterface } from "../shared/interfaces/response-login.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService extends GlobalService {
  private webTokenService: WebTokenService = new WebTokenService();

  public login(loginData: LoginInterface): Observable<ResponseLoginInterface> {
    const arrayPost = {
      cpf: loginData.cpf,
      senha: loginData.senha,
      token_firebase: loginData.token_firebase,
      id_os: loginData.id_os,
      id_app: loginData.id_app,
      app_version: loginData.app_version,
      app_version_name: loginData.app_version_name,
      modelo_cel: loginData.modelo_cel,
      sdk: loginData.sdk,
      ip: loginData.ip
    };

    // Criado apenas para demonstração e teste, deve ser substuído pela chamada da API de login do sistema
    // let obJwt: Observable<JwtTokenInterface> = new Observable();
    // return obJwt;

    // Descomentar substituindo a URL da API de login
    return this.getHttp().post<ResponseLoginInterface>(
      `${environment.urlBackend}geosecurity/default/loginapp`, arrayPost
    );
  }

  public getIpAdress(): Observable<IPAdressInterface>{
    return this.getHttp().get<IPAdressInterface>('https://api.ipify.org/?format=json');
  }

  public isLogged(): boolean {
    return this.webTokenService.hasToken();
  }

  public isAdmin(): boolean {
    const rules: Array<string> = this.getLoggedUser().grupos;
    return rules.includes('ADMIN');
  }

  public getLoggedUser(): UserSystemInterface {
    const loggedUser: UserSystemInterface = this.webTokenService.getDecodedToken() as unknown as UserSystemInterface;
    return loggedUser;
  }

  public isTokenExpired(): boolean {
    return this.webTokenService.isTokenExpired();
  }

  public getUserToken(): string {
    const token: string | null = this.webTokenService.getToken();
    if (token !== null){
      return token;
    }
    return "";
  }

  public logout(): void {
    this.getStorage().clear();
    this.getRouter().navigate(['login']);
  }
}
