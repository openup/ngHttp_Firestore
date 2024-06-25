import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReposListComponent } from './list.component';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from '../../../core/shared/materials.module';

import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';

// Mocked Item interface 
interface MockItem {
    id: number,
    name: string,
    description: string,
    created_at: Date,
    owner: {
        avatar_url: string
    }
}

const mockData: MockItem[] = [
    {
        id: 1,
        name: 'karim',
        description: 'bla bala',
        created_at: new Date('2024-05-28'),
        owner: {
            avatar_url: 'http:/url_1'
        }
    },
    {
        id: 2,
        name: 'somai',
        description: 'bla bal fa',
        created_at: new Date('2024-05-30'),
        owner: {
            avatar_url: 'http:/url_2'
        }
    }
];

describe('ReposListComponent', () => {
    let component: ReposListComponent;
    let fixture: ComponentFixture<ReposListComponent>;
    let cdr: ChangeDetectorRef;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, RouterModule.forRoot([]), MaterialsModule, ReposListComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ReposListComponent);
        component = fixture.componentInstance;
        cdr = fixture.debugElement.injector.get(ChangeDetectorRef);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('should display provided data', () => {

        component.data = mockData;
        fixture.detectChanges();

        const displayedItems = fixture.nativeElement.querySelectorAll('.data-list > tbody > tr');
        expect(displayedItems.length).toBe(2);
    });

 
    it('should sort data in descending order on button click', () => {

        component.data = mockData;
        fixture.detectChanges();

        component._sortTable(false);

        expect(component.data[0].created_at).toBeGreaterThan(component.data[1].created_at);
    });


});
