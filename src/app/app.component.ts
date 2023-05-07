import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.production';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    console.log('production ? : ', environment.production, environment.useBackend)
  }

}
