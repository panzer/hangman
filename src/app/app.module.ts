import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { WordComponent } from "./word/word.component";
import { IncorrectsComponent } from "./incorrects/incorrects.component";
import { WordService } from "./word.service";

@NgModule({
  declarations: [AppComponent, WordComponent, IncorrectsComponent],
  imports: [BrowserModule, FormsModule, HttpModule],
  providers: [WordService],
  bootstrap: [AppComponent]
})
export class AppModule {}
