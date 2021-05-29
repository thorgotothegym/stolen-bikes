export interface IncidentsResp {
  id: number;
  title: string;
  description: string;
  address: string;
  occurred_at: number;
  updated_at: number;
  media?: any;
  location_type: string;
  location_description: string;
  type: string;
  type_properties: string;
}

export interface Image {
  image_url?: string;
  image_url_thumb?: string;
}
