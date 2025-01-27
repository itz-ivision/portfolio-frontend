import { Component, OnInit } from '@angular/core';
import { Certificate } from 'src/app/core/models';
import { PortfolioService } from 'src/app/core/services/portfolio.service';

@Component({
  selector: 'app-portfolio-certificates',
  templateUrl: './portfolio-certificates.component.html',
  styleUrls: ['./portfolio-certificates.component.scss']
})
export class PortfolioCertificatesComponent implements OnInit{

  certificates: Certificate[] = [];
  loading = false;
  error: string | null = null;

  constructor(private portfolioService: PortfolioService,) {}

  ngOnInit(): void {
    this.loadCertificates();
  }

  loadCertificates() {
    this.loading = true;
    this.error = null;

    this.portfolioService.getCertificates().subscribe({
      next: (response: Certificate[]) => {
        this.certificates = response;
        this.loading = false;
      },
      error: (error) => {
        this.error = "Failed to load certificates!";
        this.loading = false;
        console.log("Error while loading certificates : ", error)
      }
    });
  }

}
