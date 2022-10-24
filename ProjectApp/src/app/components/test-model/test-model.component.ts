import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ScoresService } from 'src/app/services/scores.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-test-model',
  templateUrl: './test-model.component.html',
  styleUrls: ['./test-model.component.css']
})
export class TestModelComponent implements OnInit {

  private readonly dummyUser: User = {
    name: "Dummy",
    databaseName: "Database",
    gitURL: "GitURL",
    score: 0
  }

  testForm = this.formBuilder.group( {
    name:'',
    gitURL: ''
  });

  private modelFile: File | null = null;
  private databaseFile: File | null = null;

  private currentUser: User = {
    name: this.dummyUser.name,
    databaseName: this.dummyUser.databaseName,
    gitURL: this.dummyUser.gitURL,
    score: this.dummyUser.score
  }

  public outputString: String = 'No Data Entered';
  public scoreString: String = 'No Score';

  constructor( 
    private formBuilder: FormBuilder, 
    private scoreService: ScoresService
  ) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    // save user input data
    
    //might make a formal global object for users
    if (this.testForm.controls['name'].value) {
      this.currentUser.name = this.testForm.controls['name'].value;
      if (this.testForm.controls['gitURL'].value) {
        this.currentUser.gitURL = this.testForm.controls['gitURL'].value;
      }
      // check files
      if (this.databaseFile) {
        console.log("database file is real!");
        this.sendDatabase(this.databaseFile);
      }
      if (this.modelFile) {
        console.log("model file is real!");
        this.currentUser.score = this.getScore();
      }
    }
  
    this.setOutputStrings(this.currentUser);
    this.scoreService.sendUserObject(this.currentUser);

    this.testForm.reset();
  }

  public onClear(): void {
    this.testForm.reset();
    this.resetCurrentUser();
    this.modelFile = null;
    this.databaseFile = null;
  }

  public modelChange(_event: Event): void  {
    if (_event.target) {
      const files = (_event.target as HTMLInputElement).files;

      if (files?.item(0)) {
        this.modelFile = files.item(0);
      }
    }
  }

  public databaseChange(_event: Event): void  {
    if (_event.target) {
      const files = (_event.target as HTMLInputElement).files;

      if (files?.item(0)) {
        this.databaseFile = files.item(0);
      }
    }
  }

  private resetCurrentUser(): void  {
    this.currentUser = {
      name: this.dummyUser.name,
      databaseName: this.dummyUser.databaseName,
      gitURL: this.dummyUser.gitURL,
      score: this.dummyUser.score
    };
  }

  private setOutputStrings(_user: User): void  {
    let outString = '';
    let scoreStr = '';
    
    if (_user.name != this.dummyUser.name) {
      outString = _user.name + " : " + _user.gitURL;
      scoreStr = _user.score.toFixed(0);
    }
    else {
      outString = 'No Data Entered';
      scoreStr = 'No Score';
    }

    this.outputString = outString;
    this.scoreString = scoreStr;
  }

  private getScore(): number {
    // send User data to back end, and receive a score

    //currently chooses a random score
    let score = Math.floor(Math.random() * 100);
    return score;
  }

  private sendDatabase(_file: File): void  {
    // send database file to back
    // database should be added to available databases to compare
    // modelFile to

    console.log("sending database");
  }

}
