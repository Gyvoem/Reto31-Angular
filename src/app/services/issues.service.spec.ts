import { TestBed } from '@angular/core/testing';

import { IssuesService } from './issues.service';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';


import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Issues } from '../models/issues';

describe('IssuesService', () => {
  let service: IssuesService;

  let httpClientSpy: { get: jasmine.Spy }; //TODO: 🙄

  let httpController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    //service = new IssuesService(httpClientSpy as any);
    service = TestBed.inject(IssuesService);
    httpController = TestBed.inject(HttpTestingController);


  });

  it('should be created servicess', () => {
    expect(service).toBeTruthy();
  });



  // it('should call getAllBooks and return an array of Books', () => {
			
  //   // 1
  //   service.getIssues().subscribe((res) => {
  //     //2
  //     expect(res).toEqual(mockBookArray);
  //   });

  //   //3
  //   const req = httpController.expectOne({
  //     method: 'GET',
  //     url: `${url}/books`,
  //   });

  //   //4
  //   req.flush(mockBookArray);
  // });




  it('Se espera una lista de asuntos(issues)', (done: DoneFn) => {
    const expectedHeroes: Issues =
    {
      id: '1565714612',
      title: 'Handle forward references in same file imports',
      state: 'open',
      url: 'https://api.github.com/repos/angular/angular/issues/48898',
      created_at: '2023-02-01T09:05:16Z',
      updated_at: '2023-02-01T11:23:09Z'
    };

    httpClientSpy.get.and.returnValue(of(expectedHeroes));
    let dataIssues = new Array();
    service.getIssues().subscribe({
      next: response => {
        dataIssues = response;
        // expect(response).not.toBeNaN()//.toEqual(expectedHeroes);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toHaveSize(1)
  });


  it('should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(of(errorResponse));

    service.getIssues().subscribe({
      next: response => done.fail('expected an error, not heroes'),
      error: error => {
        expect(error.message).toContain('test 404 error');
        done();
      }
    });
  });

  // it('should be createcd servicess', () => {
  //   const check = service.getIssues();
  //   expect(check).toBeTruthy();
  // });

  // it('Deberia retornar un array', (done: DoneFn) => {

  //   //TODO: Mock de datos!

  //   const mockUserCredentials = { //TODO: Exito!
  //     id: '1565714612',
  //     title: 'Handle forward references in same file imports',
  //     state: 'open',
  //     url: 'https://api.github.com/repos/angular/angular/issues/48898'
  //   }

  //   const mockResultLogin = {
  //     "data": {
  //       "id": 2,
  //       "user": "Leifer"
  //     }
  //   }

  //     httpClientSpy.get.and.returnValue(of(mockResultLogin)) //TODO: Observable!
});
