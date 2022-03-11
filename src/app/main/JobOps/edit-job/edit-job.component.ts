import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { off } from 'process';
import { of, Subject, switchMap, take, takeUntil } from 'rxjs';
// import { User } from 'src/Models/User';
import { Job } from '../../models/Job';
import { JobService } from '../../services/jobs.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;
  jobModel: Job = new Job();
  selectedType!: string;
  returnOption!: string;
  buttonType!: string;
  strObject!: string;
  jobs!: Job[];
  destroy$ = new Subject<boolean>();
  updatedJob = new Job();

  // selectedJobId = JSON.parse(localStorage.getItem('selectedJob')!) as number;
  selectedJob = new Job;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private jobService: JobService,
    private route: ActivatedRoute
  ) {
    this.jobModel = {
      jobTitle: '',
      category: '',
      description: '',
      jobType: '',
      likes: 0,
      id: 0,
      candidates: [],
      jobPublisher: '',
      userId: 0

    }
    this.formBuild();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get titleFormControl(): FormControl {
    return this.formGroup.get('title') as FormControl;
  }
  get descriptionFormControl(): FormControl {
    return this.formGroup.get('description') as FormControl;
  }
  get categoryFormControl(): FormControl {
    return this.formGroup.get('category') as FormControl;
  }
  get organisationNameFormControl(): FormControl {
    return this.formGroup.get('organisationName') as FormControl;
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        if (params['id']) {
          return this.jobService.getJob$(params['id']);
        }
        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (response) {
          this.jobModel = response;
          this.formBuild();
        }
      }
    })
    // this.formGroup.patchValue({ title: this.selectedJob.jobTitle });
  }

  formBuild(): void {
    this.formGroup = this.fb.group({
      //belows are 'controlsConfig' objects
      title: [this.jobModel.jobTitle, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: [this.jobModel.description, [Validators.required, Validators.minLength(2)]],
      likes: [this.jobModel.likes],
      type: [this.jobModel.jobType],
      category: [this.jobModel.category, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      organisationName: [this.jobModel.jobPublisher, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    });
  }

  private getJobs(): void {
    this.jobService.getJobs$().pipe(
      take(1)
    ).subscribe({
      next: (response) => {
        this.jobs = response;
      }
    })
  }

  onSubmit(buttonType: string): void {
    if (buttonType === "Edit") {
      // this.condition = true;
      // this.formGroup.get('editedDecsription')?.enable();
      // this.formGroup.get('title')?.enable();
      // this.formGroup.get('category')?.enable();
      // this.formGroup.get('organisationName')?.enable();
      // this.formGroup.get('type')?.enable();

      // this.jobService.getJob$(this.selectedJobId).subscribe({
      //   next: (response => {
      //     this.selectedJob = response;
      //     console.log(this.selectedJob);
      //   })
      // });


      // this.formGroup.get('id')!.setValue(this.job2.description);
      // this.formGroup.patchValue({ description: this.job2.description });
      // console.log(buttonType)
    }
    if (buttonType === "Save") {
      this.updatedJob.jobTitle = this.formGroup.value.title;
      this.updatedJob.description = this.formGroup.value.description;
      this.updatedJob.category = this.formGroup.value.category;
      this.updatedJob.jobPublisher = this.formGroup.value.organisationName;
      this.updatedJob.jobType = this.formGroup.value.type;
      this.updatedJob.likes = this.jobModel.likes;
      this.updatedJob.id = this.jobModel.id;
      this.updatedJob.userId = this.jobModel.userId;

      this.jobService.putJob$(this.updatedJob).subscribe();

      this.router.navigate(['/home', 'home']);
      this.router.navigate(['/home', 'published']);
      // this.job2 = new Job();
      // this.disable();
    }
    if (buttonType === "Delete") {
      this.jobService.deleteJob$(this.jobModel.id).subscribe();

      this.router.navigate(['/home']);
      window.alert("You successfully deleted the job!");
    }

    //   // this.ngOnInit();
    //   // console.log(buttonType);
    //   // this.router.navigate(['/home']);
    //   // this.router.navigate(['/home/published']);
    //   // this.ngOnInit();

    // }

  }

}
