import { LoginInterface } from "./login.interface";

export interface ResponseLoginInterface {
  retorno: string;
  idUser: string;
  token: string;
  id_militar: string;
  ci_militar: string;
  nome: string;
  fone_corporativo: string;
  cel1: string;
  cel2: string;
  lotacao: string;
  funcao: string;
  status: string;
  is_search: string;
  key: string;
  vession_prod: string;
  message: string;
  data_aplicacoes: Array<LoginInterface>;
}
