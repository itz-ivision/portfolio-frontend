import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ApiHealthComponent } from './components/pages/api-health/api-health.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { PortfolioComponent } from './components/pages/portfolio/portfolio.component';
import { ServiceComponent } from './components/pages/service/service.component';
import { BlogListComponent } from './components/pages/blog/blog-list/blog-list.component';
import { BlogViewComponent } from './components/pages/blog/blog-view/blog-view.component';
import { AboutComponent } from './components/pages/about/about.component';
import { TestimonialsComponent } from './components/pages/testimonials/testimonials.component';
import { ContactFormComponent } from './components/pages/contact/contact-form/contact-form.component';
import { ContactPageComponent } from './components/pages/contact/contact-page/contact-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortfolioProjectsListComponent } from './components/pages/portfolio/portfolio-projects-list/portfolio-projects-list.component';
import { ChatBotComponent } from './components/pages/chat-bot/chat-bot.component';
import { FilterFeaturedPipe } from './core/pipes/filterFeatured.pipe';
import { TestimonialsFormComponent } from './components/pages/testimonials/testimonials-form/testimonials-form.component';
import { TestimonialsSectionComponent } from './components/pages/testimonials/testimonials-section/testimonials-section.component';
import { PortfolioSkillsListComponent } from './components/pages/portfolio/portfolio-skills-list/portfolio-skills-list.component';
import { PortfolioCertificatesComponent } from './components/pages/portfolio/portfolio-certificates/portfolio-certificates.component';
import { LucideAngularModule, Send, X, Bot, BotMessageSquare, BrainCog, Code, Github, Search   } from 'lucide-angular';
import { SafeHtmlPipe } from './core/pipes/safeHTML.pipe';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ApiHealthComponent,
    BlogComponent,
    BlogListComponent,
    BlogViewComponent,
    ContactComponent,
    ErrorComponent,
    PortfolioComponent,
    ServiceComponent,
    AboutComponent,
    TestimonialsComponent,
    ContactFormComponent,
    ContactPageComponent,
    PortfolioProjectsListComponent,
    ChatBotComponent,
    FilterFeaturedPipe,
    TestimonialsFormComponent,
    TestimonialsSectionComponent,
    PortfolioSkillsListComponent,
    PortfolioCertificatesComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LucideAngularModule.pick({ Send, X, Bot, BotMessageSquare, BrainCog, Code, Github, Search   }),
    MarkdownModule.forRoot()
  ],
  exports: [FilterFeaturedPipe],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
