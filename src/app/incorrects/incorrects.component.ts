import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-incorrects",
  templateUrl: "./incorrects.component.html",
  styleUrls: ["./incorrects.component.css"]
})
export class IncorrectsComponent implements OnInit {
  @Input() letters = [];
  constructor() {}

  ngOnInit() {}
}
