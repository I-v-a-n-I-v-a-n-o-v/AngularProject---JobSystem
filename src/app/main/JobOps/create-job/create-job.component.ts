import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/Models/User';
import { Job } from '../../models/Job';
import { JobService } from '../../services/jobs.service';
// import { JobsComponent } from '../jobs/jobs.component';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {

  formGroup!: FormGroup;
  jobModel: Job = new Job();
  selectedType!: string;
  returnOption!: string;

  strObject!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private jobService: JobService
  ) {

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
    this.formGroup = this.fb.group({
      //belows are 'controlsConfig' objects
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      likes: [0],
      type: [''],
      category: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      organisationName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    });
  }

  onSubmit(): void {
    this.returnOption = (<HTMLSelectElement>document.getElementById("jobType")).value;
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
    } else {
      // console.log('I\'m clicked!!!!');
      this.jobModel.jobTitle = this.formGroup.value.title;
      this.jobModel.description = this.formGroup.value.description;
      this.jobModel.likes = this.formGroup.value.likes;
      this.jobModel.jobType = this.returnOption;
      this.jobModel.category = this.formGroup.value.category;
      this.jobModel.jobPublisher = this.formGroup.value.organisationName;
      this.jobModel.userId = (JSON.parse(localStorage.getItem('loggedUser')!) as User).id;

      this.jobService.postJob$(this.jobModel).subscribe();

      this.strObject = localStorage.getItem('loggedUser')!;
      console.log(this.strObject);
      this.router.navigate(['/home/jobs']);


    }


  }

}
