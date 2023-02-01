
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, EnvironmentInjector } from '@angular/core';

import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { IssuesService } from 'src/app/services/issues.service';


import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Issues } from 'src/app/models/issues';


@Component({
    selector: 'app-tabla',
    templateUrl: './tabla.component.html',
    styleUrls: ['./tabla.component.css']
})
export class TablaComponent {

    constructor(private _httpClient: HttpClient, private issuesService: IssuesService) { }

    dataIssues = new Array();
    filter="";

    dataSource:any;
    displayedColumns:string[]|any;
    ngOnInit(){
        this.issuesService.getIssues().subscribe({
            next: (response: any) => {
                this.dataIssues = response;
                console.log(this.dataIssues);
                
                this.dataSource = new MatTableDataSource<Issues>(this.dataIssues);
                this.displayedColumns = ['id', 'title', 'state', 'url', 'created', 'updated', '+'];
                // dataSource = new MatTableDataSource<Issues>(this.dataIssues);
                this.dataSource.paginator = this.paginator;
            },
            error: (e) => console.error(e),
            complete: () => console.info("La API devolvio todos los registros")
        });
    }
    reload(){
        this.issuesService.getIssues().subscribe({
            next: (response: any) => {
                this.dataIssues = response;
                console.log(this.dataIssues);
                
                this.dataSource = new MatTableDataSource<Issues>(this.dataIssues);
                this.displayedColumns = ['id', 'title', 'state', 'url', 'created', 'updated', '+'];
                // dataSource = new MatTableDataSource<Issues>(this.dataIssues);
                this.dataSource.paginator = this.paginator;
            },
            error: (e) => console.error(e),
            complete: () => console.info("La API devolvio todos los registros")
        });
    }
    applyFilter(event:Event) {
        // const filterValue = (event.target as HTMLInputElement).value;
        const filterValue = this.filter;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    


    //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatPaginator) paginator :any = MatPaginator;


    // ngAfterViewInit() {
    //     this.dataSource.paginator = this.paginator;
    // }




}
