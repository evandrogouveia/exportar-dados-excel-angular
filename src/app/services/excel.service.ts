import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { HttpClient } from '@angular/common/http';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const EXCEL_EXTENSION = '.xlsx';

const CSV_EXTENSION = '.csv';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  readonly apiUrl: string = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor(private http: HttpClient) { }

  getEstados() {
    return this.http.get(`${this.apiUrl}/estados`);
  }

  public saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });

    FileSaver(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  public saveAsCsvFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });

    FileSaver(data, fileName + '_export_' + new Date().getTime() + CSV_EXTENSION);
  }
}
