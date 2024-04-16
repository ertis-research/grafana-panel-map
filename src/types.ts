type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  title: string;
  viewMode: string;
  view: InView;
  sharedView: boolean;
  geojsons: InGeoJSON[];
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
};

export interface InGeoJSON {
  name: string
  url: string
};


export interface InView {
  id: string;
  lat: number;
  lon: number;
  zoom: number;
  minZoom?: number;
  maxZoom?: number;
  share?: boolean;
};

export const defaultView: InView = {
  id: "default",
  lat: 0,
  lon: 0,
  zoom: 1,
};
