import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class WordService {
  constructor(private http: Http) {}

  getWord() {
    return this.http.get("/api/getWord");
  }
}
