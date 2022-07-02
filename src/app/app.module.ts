import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PasswordresetComponent } from './components/passwordreset/passwordreset.component';
import { SignupauthComponent } from './components/signupauth/signupauth.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { PostsComponent } from './components/profile/posts/posts.component';
import { UserpostsComponent } from './components/userpage/userposts/userposts.component';
import { LikesComponent } from './components/profile/likes/likes.component';
import { PostviewComponent } from './components/postview/postview.component';
import { CommentsComponent } from './components/postview/comments/comments.component';
import { PostComponent } from './components/postview/post/post.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    PasswordresetComponent,
    SignupauthComponent,
    UserpageComponent,
    PostsComponent,
    UserpostsComponent,
    LikesComponent,
    PostviewComponent,
    CommentsComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
