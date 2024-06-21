import { Component, OnInit, inject } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { saveAs } from 'file-saver';
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
    this.processAnimes();
  }


  delay(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async processAnimes() {
    const records: any[] = [];

    for (let index = 0; index <= 1805; index++) {
      await this.delay(900); // Espera 100 milisegundos antes de la siguiente iteración

      this.animeS.dataAnime(index).subscribe({
        next: (res: any) => {
          // Usar DOMParser para convertir la respuesta en un documento HTML
          const parser = new DOMParser();
          const doc = parser.parseFromString(res, 'text/html');

          // Extraer el título
          const title = doc.querySelector('title')?.textContent;
          const record: any = { title: title, links: [] };

          // Verificar enlaces de Google Drive y Mega
          const links = doc.querySelectorAll('a');
          links.forEach(link => {
            if (link.href.includes('drive.google.com')) {
              record.links.push({ type: 'Google Drive', href: link.href });
            }

            if (link.href.includes('https://mega.nz')) {
              record.links.push({ type: 'Mega', href: link.href });
            }
          });

          // Añadir el registro a la lista de registros
          records.push(record);
        },
        error: err => {
          console.log('Error =>', err);
        },
        complete: () => {
          // Verificar si hemos procesado todas las iteraciones
          if (index === 1805) {
            // Guardar el archivo JSON al final
            const blob = new Blob([JSON.stringify(records, null, 2)], { type: 'application/json' });
            saveAs(blob, 'anime_records.json');
          }
        }
      });
    }
  }
}
