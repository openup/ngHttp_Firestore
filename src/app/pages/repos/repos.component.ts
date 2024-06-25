import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReposService } from './repos.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialsModule } from '../../core/shared/materials.module';
import { ReposObject } from '../../core/interfaces/repo.interface';
import { Item } from '../../core/interfaces/item.interface';
import { ReposListComponent } from './list/list.component';
import { Subscription } from 'rxjs';

export interface FormValues {
    searchTerm: string,
    language?: string | undefined,
    minStars?: number | undefined
}

@Component({
    standalone: true,
    imports: [CommonModule,  MaterialsModule, ReactiveFormsModule, ReposListComponent],
    templateUrl: 'repos.component.html',
    styleUrl: './repos.component.scss'
})


export class ReposComponent implements OnInit, OnDestroy {

    reposFormGroup!: FormGroup;
    alertMsg: string = '';
    currentPage: number = 1;
    data: ReposObject | undefined;
    per_page: number = 50;
    total_count: number = 0;
    repos: Item[] | undefined;
    private changesListner = new Subscription();
    private formvaluesChanged: boolean = false;


    constructor(private reposService: ReposService, private fb: FormBuilder) { }


    ngOnInit() {
        this.reposFormGroup = this.fb.group({
            searchTerm: ['', Validators.required],
            language: [''],
            minStars: [0]
        });

        this.changesListner.add(this.reposFormGroup.valueChanges.subscribe((values : FormValues) => {
            this.formvaluesChanged = true;
        })
        );
    }


    searchRepos(p: number = 1, FormValues: FormValues) {

        if (FormValues.searchTerm != '') {

            this.alertMsg = '';
            scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
            this.reposService.searchRepos(FormValues.searchTerm, p, this.per_page, FormValues.language, FormValues.minStars)
                .subscribe(
                    (data: ReposObject) => {
                        this.data = data;
                        this.repos = data?.items;
                        this.total_count = data?.total_count;
                        if (data.total_count == 0) {
                            this.alertMsg = 'No records Found !'
                        }
                    },
                    (error) => {
                        this.alertMsg = error.error.message;
                    }

                )
        }
        else {
            this.alertMsg = 'You must enter keyword !';
        }
    }


    SubmitForm() {
        const form = this.reposFormGroup;

        if (form.status === 'VALID' && this.formvaluesChanged) {
            this.searchRepos(1, form.value);
            this.formvaluesChanged = false;
        }

    }

    pageChanged(e: any): void {
        this.currentPage = e.pageIndex;
        this.per_page = e.pageSize;
        this.searchRepos(this.currentPage, this.reposFormGroup.value);
    }


    ngOnDestroy(): void {
        this.changesListner.unsubscribe();
    }

}
