import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Job } from "../models/Job";


@Injectable({
    providedIn: 'root'
})
export class JobService {


    private urlString = `${environment.apiUrl}/Job`;

    constructor(private http: HttpClient) {
    }

    postJob$(data: Job): Observable<Job | null> {

        return this.http.post<any>(this.urlString, data)
    }

    getJobs$(): Observable<Job[]> {
        // this.http.get<Job[]>(this.urlString).forEach(x => console.log(x));
        return this.http.get<Job[]>(this.urlString);
    }

    // getPublishedJobs$(organisationId: number): Observable<Job[]> {


    //     return this.jobsArray.filet ;
    // }

    getJob$(id: number): Observable<Job> {
        const url = `${this.urlString}/${id}`;

        return this.http.get<Job>(url);
    }

    putJob$(job: Job): Observable<Job> {
        const url = `${this.urlString}/${job.id}`;

        return this.http.put<Job>(url, job);
    }

    deleteJob$(id: number): Observable<void> {
        const url = `${this.urlString}/${id}`;

        return this.http.delete<void>(url);
    }


}
