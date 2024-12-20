import { Component } from '@angular/core';
import { MenuComponent } from '../menuBar/menu/menu.component';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';  // Correct import
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select'
import { AddEventCommand } from '../../model/AddEventCommand';
import { EventService } from '../../services/event.service';
import { error } from 'console';
import { MatButtonModule } from '@angular/material/button';

interface EventType {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    MenuComponent,
    CommonModule,
     MatCardModule, 
     MatCardContent,
     FormsModule, 
     MatFormFieldModule, 
     MatInputModule, 
     ReactiveFormsModule, 
     HttpClientModule,
     MatDatepickerModule,
     MatDatepicker,
     MatSelectModule,
     MatButtonModule
  ],
  providers:[provideNativeDateAdapter()],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {
  selectedEventType: string = '';
  event : FormGroup;
  eventModel = new AddEventCommand();
  constructor(private fb: FormBuilder, private eventService : EventService)
  {
    this.event = this.fb.group({
      name:['', Validators.required],
      type:['', Validators.required],
      phone:['', Validators.required],
      address: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate:['', Validators.required],
      city:['', Validators.required],
      region:['', Validators.required],
      postalCode:['', Validators.required],
      country:['', Validators.required],
      userId:['']
    })
  }
  eventsType: EventType[] = [
    {value: 0, viewValue: 'Wedding'},
    {value: 1, viewValue: 'Metting'},
    {value: 1, viewValue: 'Conference'},
  ];


  onSubmit(){
    if(this.event.valid){
      this.event.controls['userId'].setValue("02174cf0–9412–4cfe-afbf-59f706d72cf6")
      this.eventModel = this.event.value as AddEventCommand;
      this.eventService.post(this.eventModel).subscribe(
        (response) =>{
          this.eventModel = response;
        })
      }
  }
}
