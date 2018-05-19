import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopicPageComponent } from './topic-page/topic-page.component';
import { TopicService } from './topic-page/topic-service';
import {  HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [TopicPageComponent],
  exports: [TopicPageComponent],
  providers: [TopicService]
})
export class TopicModule { }
