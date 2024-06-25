import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommitsComponent } from './commits.component';
import { CommitsService } from './commits.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const dummyCommits = [
    {
        commit: { message: 'Commit 1', url: 'url1', author: { name: 'karim' } }
    }
    , { commit: { message: 'Commit 2', url: 'url2', author: { name: 'Somai' } } }
];

describe('CommitsComponent', () => {
    let component: CommitsComponent;
    let fixture: ComponentFixture<CommitsComponent>;
    let commitsService: jasmine.SpyObj<CommitsService>;
    let mockActivatedRoute;

    beforeEach(async () => {
        const commitsServiceSpy = jasmine.createSpyObj('CommitsService', ['searchCommits']);

        mockActivatedRoute = {
            paramMap: of({
                get: (key: string) => '101010'
            })
        };

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterModule.forRoot([]), CommitsComponent],
            providers: [
                { provide: CommitsService, useValue: commitsServiceSpy },
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CommitsComponent);
        component = fixture.componentInstance;
        commitsService = TestBed.inject(CommitsService) as jasmine.SpyObj<CommitsService>;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch and display commits on init', () => {
       
        commitsService.searchCommits.and.returnValue(of(dummyCommits));

        fixture.detectChanges(); // ngOnInit is called here

        expect(commitsService.searchCommits).toHaveBeenCalledWith('101010');
        expect(component.commits).toEqual(dummyCommits);
        expect(component.alertMsg).toBe('');
    });

    it('should display an alert message if no commits are found', () => {
        commitsService.searchCommits.and.returnValue(of([]));

        fixture.detectChanges(); 

        expect(commitsService.searchCommits).toHaveBeenCalledWith('101010');
        expect(component.commits).toEqual([]);
        expect(component.alertMsg).toBe('No records Found !');
    });

});
