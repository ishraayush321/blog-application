import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // ✅ Correct Import
import { AngularMaterialModule } from './AngularMaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { MatChipsModule } from '@angular/material/chips';
import { ViewAllComponent } from './pages/view-all/view-all.component';  // ✅ Import MatChipsModule
import { CommonModule } from '@angular/common';
import { ViewPostComponent } from './pages/view-post/view-post.component';


@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    ViewAllComponent,
    ViewPostComponent

  ],
  imports: [
    BrowserModule,
    CommonModule, 
    AppRoutingModule,
    BrowserAnimationsModule, // ✅ Fixed Import
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatChipsModule,
    

  
  ],
  providers: [], // ✅ Removed incorrect `provideAnimationsAsync()`
  bootstrap: [AppComponent]
})
export class AppModule { }
