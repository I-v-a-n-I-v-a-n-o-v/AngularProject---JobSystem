import { Job } from "src/app/main/models/Job";

export class User {

    id!: number;
    username!: string;
    email!: string;
    password?: string;
    jobsList!: Job[];

}

