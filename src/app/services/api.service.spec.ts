import { ApiService } from "./api.service"
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { EmpInterface } from "../interfaces/app.model";
import { empUrl } from "src/environments/environment";

describe('ApiService',() => {
    let apiService : ApiService;
    let httpTestingController : HttpTestingController;

    beforeEach( async() => {
        await TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[ApiService]
        });

        apiService = TestBed.inject(ApiService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should load service instance',() => {
        expect(apiService).toBeTruthy();
    });

    it( 'should get all employee data',() => {
        apiService.getEmpData().subscribe(resp => {
            expect(resp).toBeNaN();
        });
        const request = httpTestingController.expectOne(empUrl);
        expect(request.request.method).toEqual('GET');
    });

    it('should make a call for post data',() => {
        const empInterfaceStub : EmpInterface = <any>{};
        apiService.postData(empInterfaceStub).subscribe( resp => {
            expect(resp).toEqual(empInterfaceStub);
        })
        const request = httpTestingController.expectOne(empUrl);
        expect(request.request.method).toEqual('POST');
    });

    it( 'should make a call to update data', () => {
        const empInterfaceStub : EmpInterface = <any>{};
        apiService.updateData(empInterfaceStub,1).subscribe( resp => {
            expect(resp).toEqual(empInterfaceStub);
        });
        const request =httpTestingController.expectOne(empUrl + 1);
        expect(request.request.method).toEqual('PUT');
    });

    it( 'should make a call to delete data',() => {
        apiService.deleteData(1).subscribe();
        const request = httpTestingController.expectOne(empUrl + 1);
        expect(request.request.method).toEqual('DELETE');
    });
})