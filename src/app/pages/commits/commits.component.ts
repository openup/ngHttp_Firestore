import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router'
import { CommitsService } from './commits.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: 'commits.component.html'
})
export class CommitsComponent implements OnInit {
    repoID : string = '';
    alertMsg: string = '';
    commits: any[] | undefined ;

    private destroyRef = inject(DestroyRef);

    constructor(private route: ActivatedRoute, private _commitsService : CommitsService) {

    }

    ngOnInit(): void {
     this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params: ParamMap) => {
        this.repoID = params.get('repoId') || ''; 

        this._commitsService.searchCommits(this.repoID).subscribe(
          (data : []) => {
            this.commits = [...data];

            if (!data.length) {
                this.alertMsg = 'No records Found !'
            }
        }, 
        (error) => {
           this.alertMsg = error.error.message;
         }
        )
      })
    }

}
