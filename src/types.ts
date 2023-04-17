type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  title: string;
  viewMode: string;
  view: IView;
  sharedView: boolean;
  geojsons: IGeoJSON[];
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
};

export interface IGeoJSON {
  name: string
  url: string
};


export interface IView {
  id: string;
  lat: number;
  lon: number;
  zoom: number;
  minZoom?: number;
  maxZoom?: number;
  share?: boolean;
};

export const defaultView: IView = {
  id: "default",
  lat: 0,
  lon: 0,
  zoom: 1,
};
