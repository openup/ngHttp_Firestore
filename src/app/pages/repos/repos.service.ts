import { Injectable, Injector } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import { EndPoints } from '../../core/services/const';
import { ApiService } from '../../core/services/http.service';

@Injectable({
  providedIn: 'root'
})

export class ReposService  extends ApiService{


  constructor(injector: Injector) {
    super(injector);
  }

  searchRepos(term: string, page : number = 1, per_page : number, language?: string, minStars?: number): Observable<any> {
    let url = EndPoints.Repos + "?q=" + term;
    if (language) {
      url += "+language:" + language;
    }
    if (minStars) {
      url += "+stars:" + minStars;
    }

    url += `&per_page=${per_page}&page=${page}`;

    return this.get(url);
  }
  
  

}