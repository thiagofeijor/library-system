import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BookService } from "../book.service";
import { shareReplay } from "rxjs/operators";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";

const REGEX_URL_VALIDATOR = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent {
  books$;
  bookGroup: FormGroup;
  isExpanded = false;

  constructor(
    public router: Router, 
    private bookService: BookService, 
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar
    ) {
    this.defineList();
    this.bookGroup = this.formBuilder.group({
      id: [""],
      title: ["", Validators.required],
      description: ["", Validators.required],
      cover: ["", [Validators.required, Validators.pattern(REGEX_URL_VALIDATOR)]],
      author: ["", Validators.required]
    });

    this.bookGroup.patchValue({
      title: "teste",
      description: "teste",
      cover: "http://2.bp.blogspot.com/-zfDTFoJC5N4/UDxUIkWr4mI/AAAAAAAAGrY/aDzJ3IE4I9w/s1600/MACHISMO.jpg",
      author: "teste"
    });
  }

  isValidCover() {
    return this.bookGroup.get('cover').valid;
  }

  reset() {
    this.bookGroup.reset();
  }

  save() {
    if (this.bookGroup.valid) {
      if (!!this.bookGroup.value.id) {
        let id = this.bookGroup.value.id;
        delete this.bookGroup.value.id;

        this.bookService
          .update(id, this.bookGroup.value)
          .toPromise()
          .then(() => {
            this.defineList();
            this.snackBar.open("Salvo com sucesso!", "Fechar");
            this.bookGroup.reset();
            this.isExpanded = false;
          })
          .catch(() => {
            this.snackBar.open("Não foi possivel salvar!", "Fechar");
          });
      } else {
        this.bookService
          .create(this.bookGroup.value)
          .toPromise()
          .then(() => {
            this.defineList();
            this.snackBar.open("Atualizado com sucesso!", "Fechar");
            this.bookGroup.reset();
            this.isExpanded = false;
          })
          .catch(() => {
            this.snackBar.open("Não foi possivel autalizar!", "Fechar");
          });
      }
    } else {
      this.snackBar.open("Todos campos são obrigatórios e precisam estar válidos!", "Fechar");
    }
  }

  edit(row) {
    this.bookGroup.reset();
    this.bookGroup.patchValue(row);
    if (this.isExpanded) this.isExpanded = false;
    this.isExpanded = true;
  }

  defineList() {
    this.books$ = this.bookService.listBooks({}).pipe(shareReplay(1));
  }

  delete(row) {
    if (row.id) {
      this.bookService
        .delete(row.id)
        .toPromise()
        .then(() => {
          this.defineList();
        });
    }
  }

  logoff() {
    localStorage.removeItem("token");
    this.router.navigate([""]);
  }
}
