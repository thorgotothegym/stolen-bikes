export interface IncidentsResp {
  date_stolen: number;
  description: string;
  frame_colors: Array<string>;
  frame_model: string;
  id: number;
  is_stock_img: boolean;
  large_img: string;
  location_found: string;
  manufacturer_name: string;
  external_id: number;
  registry_name: string;
  registry_url: string;
  serial: string;
  status: any; // see the response
  stolen: boolean;
  stolen_location: string;
  thumb: string;
  title: string;
  url: string;
  year: number;
}

export interface ResponseIncidents {
  bikes: IncidentsResp[];
}

export interface Image {
  image_url?: string;
  image_url_thumb?: string;
}