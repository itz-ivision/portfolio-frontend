import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ServiceComponent } from './components/pages/service/service.component';
import { PortfolioComponent } from './components/pages/portfolio/portfolio.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { AboutComponent } from './components/pages/about/about.component';
import { BlogViewComponent } from './components/pages/blog/blog-view/blog-view.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { TestimonialsComponent } from './components/pages/testimonials/testimonials.component';
import { PortfolioProjectsListComponent } from './components/pages/portfolio/portfolio-projects-list/portfolio-projects-list.component';
import { PortfolioSkillsListComponent } from './components/pages/portfolio/portfolio-skills-list/portfolio-skills-list.component';
import { PortfolioCertificatesComponent } from './components/pages/portfolio/portfolio-certificates/portfolio-certificates.component';
import { ApiHealthComponent } from './components/pages/api-health/api-health.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'api-health', component: ApiHealthComponent },
  { path: 'services', component: ServiceComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'portfolio/certificates', component: PortfolioCertificatesComponent },
  { path: 'portfolio/skills', component: PortfolioSkillsListComponent },
  { path: 'portfolio/projects', component: PortfolioProjectsListComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: BlogViewComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactComponent },
  { path: 'testimonials', component: TestimonialsComponent},
  // { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
