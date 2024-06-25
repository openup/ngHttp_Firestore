import { Component, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SpinnerLoaderService } from './core/services/spinner.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, MatProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterContentChecked  {
  title = 'cgm';
  
  public loading: Subject<boolean> = this._spinner.isLoading;

  constructor(public _spinner: SpinnerLoaderService, private changeDetector: ChangeDetectorRef) {}

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
