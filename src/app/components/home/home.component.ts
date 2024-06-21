import { Component, OnInit, inject } from '@angular/core';
import { AnimeService } from '../../services/anime.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private animeS = inject(AnimeService);



  ngOnInit(): void {
    this.loadData();
  }


  loadData() {
    for (let index = 0; index < 1000; index++) {


    }
    this.animeS.dataAnime(102)
      .subscribe({
        next: (res: any) => {
          // Usar DOMParser para convertir la respuesta en un documento HTML
          const parser = new DOMParser();
          const doc = parser.parseFromString(res, 'text/html');

          // Extraer el título
          const title = doc.querySelector('title')?.textContent;
          if (title) {
            console.log('Título del documento:', title);
          }

          // Verificar enlaces de Google Drive
          const links = doc.querySelectorAll('a');
          links.forEach(link => {
            if (link.href.includes('drive.google.com')) {
              console.log('Google Drive link found:', link.href);
            }
            if (link.href.includes('https://mega.nz')) {
              console.log('MEga link found:', link.href);
            }
          });
        },
        error: err => {
          console.log('Error => ', err);
        }
      });
  }
}
