import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  weatherData: any;
  loading: boolean = true;
  error: string = '';

  constructor(public weatherService: WeatherService) {} // Ubah private menjadi public

  ngOnInit() {
    this.loadWeather();
  }

  loadWeather() {
    this.loading = true;
    this.weatherService.getWeather().subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Gagal memuat data cuaca';
        this.loading = false;
        console.error('Error:', error);
      },
    });
  }

  getWeatherIcon(icon: string): string {
    return this.weatherService.getWeatherIcon(icon);
  }

  refresh() {
    this.loadWeather();
  }
}
