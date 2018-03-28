webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ".wrapper {\n  text-align: center;\n}\n\n.flex-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap-reverse;\n      flex-wrap: wrap-reverse;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n.incorrect {\n  -webkit-box-flex: 2;\n      -ms-flex: 2 1 auto;\n          flex: 2 1 auto;\n  max-width: 200px;\n}\n\n.figure {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  max-width: 300px;\n}\n\n.nowrap {\n  white-space: nowrap;\n}\n\ninput[type=\"text\"] {\n  font-size: 14px;\n  padding: 5px;\n  border: 2px solid black;\n}\n\nbutton {\n  color: black;\n  font-weight: 600;\n  background-color: #fdd835;\n  padding: 10px 15px;\n  margin: 10px;\n  border-radius: 1px;\n  border: none;\n  text-transform: uppercase;\n  -webkit-box-shadow: 0px 0px 2px 0px #bbb;\n          box-shadow: 0px 0px 2px 0px #bbb;\n}\n\nbutton:hover {\n  cursor: pointer;\n  background-color: #feda38;\n  -webkit-box-shadow: 0px 1px 3px 0px #999;\n          box-shadow: 0px 1px 3px 0px #999;\n}\n\nbutton:focus {\n  outline: 0;\n}\n\nimg {\n  max-width: 100%;\n  height: auto;\n}\n"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <div class=\"wrapper\" *ngIf=\"!loading; else load\">\n    <h1>\n      {{ title }}\n    </h1>\n\n    <!-- Shown if you haven't won or lost -->\n    <div *ngIf=\"!loseCondition(); else lose\">\n      <div *ngIf=\"!winCondition(); else win\">\n        <form (ngSubmit)=\"onGuess(guessLetter)\" autocomplete=\"off\">\n          <label>\n            <input\n              id=\"input\"\n              type=\"text\"\n              [(ngModel)]=\"guessLetter\"\n              placeholder=\"letter\"\n              name=\"letter\"\n              autofocus\n            >\n          </label>\n          <button> Guess </button>\n          <!-- Will tell you if you entered something incorrectly -->\n          <p class=\"warning\"> {{ error }} </p>\n        </form>\n      </div>\n    </div>\n\n    <!-- Shown if you lose -->\n    <ng-template #lose>\n      <p class=\"warning\"> You lose! </p>\n      <button (click)=\"reset()\"> Play Again </button>\n    </ng-template>\n\n    <!-- Shown if you win -->\n    <ng-template #win>\n      <p class=\"reward\"> You win! </p>\n      <button (click)=\"reset()\"> Play Again </button>\n    </ng-template>\n\n    <!-- Blank lines and letters for the answer -->\n    <div class=\"card center\">\n      <h3> Guess the Word: </h3>\n      <app-word\n        [letters]=letters\n        [answer]=word\n        [showAnswer]=loseCondition()\n      >\n      </app-word>\n    </div>\n\n    <!-- Stick figure drawing -->\n    <div class=\"card flex-container center\">\n      <img class=\"figure\"[src]=figureSrc>\n      <div class=\"incorrect\">\n        <h3>\n          Incorrect Letters:\n          <span class=\"nowrap\">\n            {{ incorrectLetters.length }} / {{ maxIncorrect }}\n          </span>\n        </h3>\n        <app-incorrects [letters]=incorrectLetters></app-incorrects>\n      </div>\n    </div>\n  </div>\n\n  <ng-template #load>\n    <h2> Loading... </h2>\n  </ng-template>\n\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__word_service__ = __webpack_require__("./src/app/word.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(wordService) {
        var _this = this;
        this.wordService = wordService;
        this.title = "The Hangman Challenge";
        this.maxIncorrect = 10; // Maximum incorrect guesses allowed before loss
        this.loading = true;
        this.onGuess = function (guessLetter) {
            // Make lowercase
            guessLetter = guessLetter.toLowerCase();
            // Show error if not a single letter
            if (!/^[a-z]{1}$/.test(guessLetter)) {
                _this.error = "Please enter a single letter";
                return;
            }
            // This letter was guessed and it was incorrect
            if (_this.incorrectLetters.includes(guessLetter)) {
                _this.error = "You've already guessed " + guessLetter.toUpperCase();
                return;
            }
            // This letter was guessed and it was incorrect
            if (_this.letters.includes(guessLetter)) {
                _this.error = "You've already guessed " + guessLetter.toUpperCase();
                return;
            }
            if (_this.word.includes(guessLetter)) {
                // If the letter is in the word
                _this.letters.push(guessLetter);
            }
            else {
                // Letter is not found in the word
                _this.incorrectLetters.push(guessLetter);
            }
            // Update drawing (stick figure)
            _this.updateFigureSrc();
            // Clear guess input and error
            _this.guessLetter = "";
            _this.error = "";
            // Focus on input (makes it easier to put another letter)
            var input = document.getElementById("input");
            input.focus();
        };
        this.reset = function () {
            _this.guessLetter = "";
            _this.incorrectLetters = [];
            _this.loading = true;
            _this.getRandomWord(function (r) {
                _this.word = r.json();
                _this.loading = false;
                console.log("hello!");
            });
            _this.letters = [];
            _this.error = "";
            _this.figureSrc = "./assets/Drawing-0.png";
        };
        this.getRandomWord = function (callback) {
            _this.wordService.getWord().subscribe(function (r) { return callback(r); });
        };
        this.updateFigureSrc = function () {
            var n = _this.incorrectLetters.length;
            _this.figureSrc = "./assets/Drawing-" + n + ".png";
        };
        this.winCondition = function () {
            // For each character of the answer, if it's not in "guessed letters"
            //  then we haven't won
            for (var _i = 0, _a = _this.word; _i < _a.length; _i++) {
                var c = _a[_i];
                if (!_this.letters.includes(c)) {
                    return false;
                }
            }
            return true;
        };
        this.loseCondition = function () { return _this.incorrectLetters.length >= _this.maxIncorrect; };
    }
    AppComponent.prototype.ngOnInit = function () {
        this.reset();
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "app-root",
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__word_service__["a" /* WordService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__word_word_component__ = __webpack_require__("./src/app/word/word.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__incorrects_incorrects_component__ = __webpack_require__("./src/app/incorrects/incorrects.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__word_service__ = __webpack_require__("./src/app/word.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_5__word_word_component__["a" /* WordComponent */], __WEBPACK_IMPORTED_MODULE_6__incorrects_incorrects_component__["a" /* IncorrectsComponent */]],
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */]],
            providers: [__WEBPACK_IMPORTED_MODULE_7__word_service__["a" /* WordService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/incorrects/incorrects.component.css":
/***/ (function(module, exports) {

module.exports = ".letters {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  text-transform: uppercase;\n  margin: 10px auto;\n  border: 1px dashed black;\n  height: 100px;\n  width: 100%;\n  overflow-y: scroll;\n}\n\n.letter {\n  margin: 5px 10px;\n}\n"

/***/ }),

/***/ "./src/app/incorrects/incorrects.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"letters\">\n  <span *ngFor=\"let letter of letters\" class=\"letter\"> {{ letter }} </span>\n</div>\n"

/***/ }),

/***/ "./src/app/incorrects/incorrects.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IncorrectsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var IncorrectsComponent = /** @class */ (function () {
    function IncorrectsComponent() {
        this.letters = [];
    }
    IncorrectsComponent.prototype.ngOnInit = function () { };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], IncorrectsComponent.prototype, "letters", void 0);
    IncorrectsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "app-incorrects",
            template: __webpack_require__("./src/app/incorrects/incorrects.component.html"),
            styles: [__webpack_require__("./src/app/incorrects/incorrects.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], IncorrectsComponent);
    return IncorrectsComponent;
}());



/***/ }),

/***/ "./src/app/word.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WordService = /** @class */ (function () {
    function WordService(http) {
        this.http = http;
    }
    WordService.prototype.getWord = function () {
        return this.http.get("/api/getWord");
    };
    WordService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], WordService);
    return WordService;
}());



/***/ }),

/***/ "./src/app/word/word.component.css":
/***/ (function(module, exports) {

module.exports = ".word {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  text-transform: uppercase;\n  margin: 10px;\n  padding: 10px;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  height: 30px;\n}\n\n.field {\n  font-size: 18px;\n  font-weight: 600;\n  width: 28px;\n  margin: 2px;\n  border-bottom: 2px solid black;\n}\n\n.hint {\n  color: blue;\n}\n"

/***/ }),

/***/ "./src/app/word/word.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"word\">\n  <!-- For each letter in the answer -->\n  <div *ngFor=\"let letter of answer.split('')\" class=\"field\">\n    <!-- Show it if it has been guessed -->\n    <div *ngIf=\"letters.includes(letter); else hint\">\n      <span>{{ letter }}</span>\n    </div>\n    <!-- Otherwise, -->\n    <ng-template #hint>\n      <!-- Show it as a hint if we should show the full answer (game over) -->\n      <div *ngIf='showAnswer'>\n        <span class=\"hint\">{{ letter }}</span>\n      </div>\n    </ng-template>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/word/word.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WordComponent = /** @class */ (function () {
    function WordComponent() {
        this.letters = [];
        this.answer = "";
        this.showAnswer = false;
    }
    WordComponent.prototype.ngOnInit = function () { };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], WordComponent.prototype, "letters", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], WordComponent.prototype, "answer", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], WordComponent.prototype, "showAnswer", void 0);
    WordComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "app-word",
            template: __webpack_require__("./src/app/word/word.component.html"),
            styles: [__webpack_require__("./src/app/word/word.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], WordComponent);
    return WordComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map