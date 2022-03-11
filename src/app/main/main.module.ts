import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { JobsComponent } from './JobOps/jobs/jobs.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateJobComponent } from './JobOps/create-job/create-job.component';
import { PublishedJobsComponent } from './JobOps/published-jobs/published-jobs.component';
import { EditJobComponent } from './JobOps/edit-job/edit-job.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MainRoutingModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    MainComponent,
    HomeComponent,
    JobsComponent,
    CreateJobComponent,
    PublishedJobsComponent,
    EditJobComponent
  ]
})
export class MainModule {
}