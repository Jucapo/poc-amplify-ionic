import { Injectable } from '@angular/core';

/** Campos específicos que queremos devolver */
export interface ReverseGeocode {
  address: string;
  department: string;
  municipality: string;
}

@Injectable({ providedIn: 'root' })
export class GeocodingService {
  private geocoder = new google.maps.Geocoder();

  /**
   * Convierte lat/lng a dirección legible.
   * @returns objeto con address, department, municipality
   */
  async reverse(lat: number, lng: number): Promise<ReverseGeocode> {
    const { results } = await this.geocoder.geocode({
      location: { lat, lng },
    });

    if (!results.length) {
      throw new Error('No se encontró dirección para estas coordenadas');
    }

    const first = results[0];
    const address = first.formatted_address;

    /* ───── Extraer departamento y municipio ───── */
    let department = '';
    let municipality = '';

    first.address_components.forEach((c) => {
      if (c.types.includes('administrative_area_level_1')) {
        department = c.long_name; // Ej. "Guatemala"
      }
      if (c.types.includes('locality')) {
        municipality = c.long_name; // Ej. "Ciudad de Guatemala"
      }
    });

    return { address, department, municipality };
  }
}
