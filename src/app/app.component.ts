import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ExcelService } from './services/excel.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any = [];
  @ViewChild('table') table: ElementRef;

  constructor(private excelService: ExcelService) {
  }

  ngOnInit() {
    this.estados();
  }

  estados() {
    this.excelService.getEstados().subscribe(uf => {
      this.data = uf;
    });
  }

  exportAsExcelFile(nomeArquivo, excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);

    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet}, SheetNames: ['data'] };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.excelService.saveAsExcelFile(excelBuffer, excelFileName);
  }

  exportAsXLSX(): void {
    this.exportAsExcelFile(this.data, 'estados');
  }

}
