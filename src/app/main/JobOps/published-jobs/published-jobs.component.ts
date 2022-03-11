import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/Models/User';
import { Job } from '../../models/Job';
import { JobService } from '../../services/jobs.service';


@Component({
  selector: 'app-published-jobs',
  templateUrl: './published-jobs.component.html',
  styleUrls: ['./published-jobs.component.scss']
})
export class PublishedJobsComponent implements OnInit {

  formGroup!: FormGroup;
  user = JSON.parse(localStorage.getItem('loggedUser')!) as User;
  // index = ["jobTitle", "description", "likes", "jobType", "category", "jobPublisher", "id"];
  jobsArray!: Job[];
  buttonType!: string;

  condition = false;
  job = new Job();
  job2 = new Job();
  // content = 'effsfd';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private jobService: JobService
  ) {
    this.getJobs();
  }

  ngOnInit(): void {

    this.formBuild();
    this.disable();

    this.jobService.getJobs$().subscribe(
      {
        next: (response) => {
          this.jobsArray = response.filter(x => x.userId === JSON.parse(localStorage.getItem('loggedUser')!).id);
        }
      }
    );

  }


  private getJobs(): void {
    this.jobService.getJobs$().pipe(
      take(1)
    ).subscribe({
      next: (response) => {

        this.jobsArray = response.filter(x => x.userId === JSON.parse(localStorage.getItem('loggedUser')!).id);
        this.formBuild();
      },
      error: (response: HttpErrorResponse) => {
        //this.err
      }

    })
  }

  formBuild(): void {
    this.formGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: [''],
      editedDecsription: ['', [Validators.required, Validators.minLength(2)]],
      likes: [''],
      type: [''],
      category: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      organisationName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    });
    this.disable();
  }

  onSubmit(buttonType: string, id: number): void {
    if (buttonType === "Edit") {
      // this.condition = true;
      // this.formGroup.get('editedDecsription')?.enable();
      // this.formGroup.get('title')?.enable();
      // this.formGroup.get('category')?.enable();
      // this.formGroup.get('organisationName')?.enable();
      // this.formGroup.get('type')?.enable();

      this.jobService.getJob$(id).subscribe({
        next: (response => {
          this.job2 = response;
          console.log(this.job2);
          console.log(this.job2.jobTitle);
        })
      });


      // localStorage.setItem('selectedJob', this.job2.id.toString());
      // console.log(localStorage.getItem('selectedJob')!);
      // console.log(this.job2.id);

      // console.log(['/home', '/edit', id])
      this.router.navigate(['/home', 'edit', id]);


      // this.formGroup.get('id')!.setValue(this.job2.description);
      // this.formGroup.patchValue({ description: this.job2.description });
      // console.log(buttonType)
    }
    // if (buttonType === "Save") {
    //   this.condition = false;
    //   this.job.jobTitle = this.formGroup.value.title;
    //   this.job.description = this.formGroup.value.editedDecsription;
    //   this.job.category = this.formGroup.value.category;
    //   this.job.jobPublisher = this.formGroup.value.organisationName;
    //   this.job.jobType = this.formGroup.value.type;
    //   this.job.likes = this.job2.likes;
    //   this.job.id = id;
    //   this.job.userId = JSON.parse(localStorage.getItem('loggedUser')!).id;

    //   this.jobService.putJob$(this.job).subscribe();
    //   this.job2 = new Job();
    //   this.disable();
    // }
    // if (buttonType === "Delete") {
    //   this.jobService.deleteJob$(id).subscribe();
    //   this.router.navigate(['/home']);


    //   // this.ngOnInit();
    //   // console.log(buttonType);
    //   // this.router.navigate(['/home']);
    //   // this.router.navigate(['/home/published']);
    //   // this.ngOnInit();

    // }

  }

  disable(): void {
    this.formGroup.get('description')?.disable();
    this.formGroup.get('title')?.disable();
    this.formGroup.get('category')?.disable();
    this.formGroup.get('organisationName')?.disable();
    this.formGroup.get('type')?.disable();
  }


}
