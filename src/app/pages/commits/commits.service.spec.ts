import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommitsService } from './commits.service';
import { environment } from '../../../environments/environment';
import { EndPoints } from '../../core/services/const';

describe('CommitsService', () => {
  let service: CommitsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommitsService]
    });

    service = TestBed.inject(CommitsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch commits for a given repoID', () => {
    const dummyCommits = [{ commit: 'dummy commit 1' }, { commit: 'dummy commit 2' }];
    const repoID = '12345';
    const url = environment.ApiUrl + EndPoints.Commits.replace(/repoID/i, repoID);

    service.searchCommits(repoID).subscribe(commits => {
      expect(commits).toEqual(dummyCommits);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCommits);
  });
});
