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
  searchCity: string = 'Manado';

  constructor(public weatherService: WeatherService) {}

  ngOnInit() {
    this.loadWeather();
  }

  loadWeather() {
    this.loading = true;
    this.error = '';
    this.weatherService.getWeather(this.searchCity).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Kota tidak ditemukan atau terjadi kesalahan';
        this.loading = false;
        console.error('Error:', error);
      },
    });
  }

  getWeatherIcon(icon: string): string {
    return this.weatherService.getWeatherIcon(icon);
  }

  searchWeather(event: any) {
    if (event.key === 'Enter') {
      this.loadWeather();
    }
  }

  refresh() {
    this.loadWeather();
  }
}
