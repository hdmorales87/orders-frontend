import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pedido } from "../models/pedido";
import { ConfigService } from "../../../core/config.service";

@Injectable({ providedIn: 'root' })
export class PedidoService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {}

  listar() {
    const apiUrl = `${this.configService.getApiUrl()}/pedidos`;
    return this.http.get<Pedido[]>(apiUrl);
  }

  crear(pedido: Pedido) {
    const apiUrl = `${this.configService.getApiUrl()}/pedidos`;
    return this.http.post<Pedido>(apiUrl, pedido);
  }
}
