import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operation } from '../../models/operation';

@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  baseUrl = 'http://localhost:8000/shop/';

  constructor(private http: HttpClient) {}

  async getOperations() {
    return await this.http.get(this.baseUrl+'operations').toPromise();
  }

  async createOperation(operation: Operation) {
    await this.http.post(this.baseUrl + 'operation', operation).toPromise();
  }
}
