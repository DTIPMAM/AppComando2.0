import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {GlobalService} from "./global.service";
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdentidadeDigitalService extends GlobalService{

  // Descomentar substituindo a URL da API de login
  // return this.getHttp().post<JwtTokenInterface>(
  //   `${environment.urlBackend}/site/api-token`, arrayPost
  // );
public generateId(token:string, id: number): Observable<any> {
  const array = {
    token: token,
    id: id
  }
  return this.getHttp().post<any>(`${environment.appcomando_url}dpa/identidade/api_gerar_ci`, array);
}

  public login(token:string, senha: string): Observable<any> {
    const array = {
      cpf: token,
      secret: senha
    }
    return this.getHttp().post<any>(`${environment.appcomando_url}geosecurity/default/loginportal`, array, {

    });
  }
}
