import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { WordComponent } from "./word/word.component";
import { IncorrectsComponent } from './incorrects/incorrects.component';

@NgModule({
  declarations: [AppComponent, WordComponent, IncorrectsComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
