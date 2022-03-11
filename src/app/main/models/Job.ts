import { User } from "src/Models/User";

export class Job {

    id!: number;
    jobTitle!: string;
    description!: string;
    likes!: number;
    jobType!: string;
    jobPublisher!: string;
    category!: string;
    userId!: number;
    candidates!: User[]

}
