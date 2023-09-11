export interface LoginInterface {
    cpf: string;
    senha: string;
    token_firebase: string;
    id_os: string;
    id_app: string;
    app_version: string;
    app_version_name: string;
    modelo_cel: string;
    sdk: string;
    ip: string;
}

export interface IPAdressInterface{
    ip: string;
}

export interface JwtTokenInterface {
    jwtToken: string;
    retorno?: string;
    message?: string;
}
