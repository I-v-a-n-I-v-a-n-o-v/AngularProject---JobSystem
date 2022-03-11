import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/Models/User';
import { Job } from '../../models/Job';
import { JobService } from '../../services/jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  formGroup!: FormGroup;
  cond = 'readonly';
  // user!: User;
  user = JSON.parse(localStorage.getItem('loggedUser')!) as User;
  // jobTitle": "pppppppp",
  // "description": "pppppppppppp",
  // "likes": 0,
  // "jobType": "Remote",
  // "category": "ppppppp",
  // "jobPublisher": "pppppp",
  // "id": 19
  index = ["jobTitle", "description", "likes", "jobType", "category", "jobPublisher", "id"];
  jobsArray: Job[] = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private jobService: JobService
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      likes: [''],
      type: [''],
      category: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      organisationName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    });

    // for (let i = 0; i < this.jobsArray.length; i++) {
    this.formGroup.get('description')?.disable();
    this.formGroup.get('title')?.disable();
    this.formGroup.get('category')?.disable();
    this.formGroup.get('organisationName')?.disable();

    // }


    this.jobService.getJobs$().subscribe(
      {
        next: (response) => {
          this.jobsArray = response;
          //this.jobsArray = response.filter(x => x.userId === JSON.parse(localStorage.getItem('loggedUser')!).id);
          // console.log(this.jobsArray[10].description);
        }
      }
    );
    // .pipe(
    //   map((response: Job[]) => {
    //     this.jobsArray = response.filter(job => job.userId == this.user.id);

    //   }
    //   )
    // )




    // .filter(job => job.userId == this.user.id);
  }



  onEdit(): void {
  }

  onDelete(): void {

  }

}
