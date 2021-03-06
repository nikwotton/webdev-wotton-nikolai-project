///<reference path='services/user.service.client.ts'/>
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {TestComponent} from './components/test/test.component';
import {Routing} from './app.routing';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './components/user/login/login.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {RegisterComponent} from './components/user/register/register.component';
import {WebsiteNewComponent} from './components/website/website-new/website-new.component';
import {WebsiteEditComponent} from './components/website/website-edit/website-edit.component';
import {WebsiteListComponent} from './components/website/website-list/website-list.component';
import {PageNewComponent} from './components/page/page-new/page-new.component';
import {PageEditComponent} from './components/page/page-edit/page-edit.component';
import {PageListComponent} from './components/page/page-list/page-list.component';
import {WidgetChooserComponent} from './components/widget/widget-chooser/widget-chooser.component';
import {WidgetEditComponent} from './components/widget/widget-edit/widget-edit.component';
import {WidgetListComponent} from './components/widget/widget-list/widget-list.component';
import {WidgetHeaderComponent} from './components/widget/widget-edit/widget-header/widget-header.component';
import {WidgetImageComponent} from './components/widget/widget-edit/widget-image/widget-image.component';
import {WidgetYoutubeComponent} from './components/widget/widget-edit/widget-youtube/widget-youtube.component';
import {WidgetHTMLComponent} from './components/widget/widget-edit/widget-html/widget-html.component';
import {WidgetTextComponent} from './components/widget/widget-edit/widget-text/widget-text.component';
import {UserService} from './services/user.service.client';
import {WebsiteService} from './services/website.service.client';
import {PageService} from './services/page.service.client';
import {WidgetService} from './services/widget.service.client';
import {QuillEditorModule} from 'ngx-quill-editor';
import {SharedService} from './services/shared.service';
import {AuthGuard} from './services/auth-guard.service';
import {MemeListComponent} from './components/memes/meme-list/meme-list.component';
import {AboutComponent} from './components/about/about.component';
import {MemeService} from './services/meme.service.client';
import {MemeNewComponent} from './components/memes/meme-new/meme-new.component';
import {ImageService} from './services/image.service.client';
import {AdminGuard} from './services/admin-guard.service';
import {UserListComponent} from './components/user/user-list/user-list.component';
import {UserEditComponent} from './components/user/user-edit/user-edit.component';
import {MemeEditComponent} from './components/memes/meme-edit/meme-edit.component';
import {UserNewComponent} from './components/user/user-new/user-new.component';
import {CommentService} from './services/comment.service.client';

@NgModule({
  // Declare components here
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    WebsiteNewComponent,
    WebsiteEditComponent,
    WebsiteListComponent,
    PageNewComponent,
    PageEditComponent,
    PageListComponent,
    WidgetChooserComponent,
    WidgetEditComponent,
    WidgetListComponent,
    WidgetHeaderComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent,
    WidgetHTMLComponent,
    WidgetTextComponent,
    MemeListComponent,
    MemeNewComponent,
    AboutComponent,
    UserListComponent,
    UserEditComponent,
    MemeEditComponent,
    UserNewComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    Routing,
    QuillEditorModule
  ],
  // Client Side services here
  providers: [UserService, WebsiteService, PageService, WidgetService, SharedService, AuthGuard, MemeService,
    ImageService, AdminGuard, CommentService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
