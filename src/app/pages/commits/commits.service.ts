import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EndPoints } from '../../core/services/const';
import { ApiService } from '../../core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class CommitsService extends ApiService {


    constructor(injector: Injector) {
      super(injector);
    }
  

  searchCommits(repoID: string): Observable<any> {
    let url = EndPoints.Commits.replace(/repoID/i, repoID);
    return this.get(url);
  }
}