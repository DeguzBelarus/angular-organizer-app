import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { map, Observable } from "rxjs";

export interface Task {
   id?: string,
   title: string,
   date?: string
}

interface CreateResponse {
   name: string
}

@Injectable({
   providedIn: "root"
})
export class TasksService {
   static url = "https://angular-organizer-practi-262aa-default-rtdb.europe-west1.firebasedatabase.app/tasks"

   constructor(public http: HttpClient) {
   }

   load(date: moment.Moment): Observable<Task[]> {
      return this.http
         .get<Task[]>(`${TasksService.url}/${date.format("DD-MM-YYYY")}.json`)
         .pipe((map((tasks) => {
            if (!tasks) {
               return []
            }
            return Object.keys(tasks).map((key: any) => ({ ...tasks[key], id: key }))
         })))
   }

   create(task: Task): Observable<Task> {
      return this.http.post<CreateResponse>(`${TasksService.url}/${task.date}.json`, task)
         .pipe(map((response) => {
            return { ...task, id: response.name }
         }))
   }

   remove(task: Task): Observable<void> {
      return this.http.delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`)
   }
}