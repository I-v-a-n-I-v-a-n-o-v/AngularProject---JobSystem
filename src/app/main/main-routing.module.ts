import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AclGuard } from '../guards/acl.guard';
import { HomeComponent } from './home/home.component';
import { CreateJobComponent } from './JobOps/create-job/create-job.component';
import { EditJobComponent } from './JobOps/edit-job/edit-job.component';
import { JobsComponent } from './JobOps/jobs/jobs.component';
import { PublishedJobsComponent } from './JobOps/published-jobs/published-jobs.component';
import { MainComponent } from './main.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'jobs',
                component: JobsComponent
            },
            {
                path: 'create',
                component: CreateJobComponent,
                canActivate: [AclGuard]
            },
            {
                path: 'published',
                component: PublishedJobsComponent,
                canActivate: [AclGuard]
            },
            {
                path: 'edit',
                component: EditJobComponent
            },
            {
                path: 'edit/:id',
                component: EditJobComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'home'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {
}