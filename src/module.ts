import { PanelPlugin } from '@grafana/data';
import { SimpleOptions, defaultView } from './types';
import { Main } from './components/main';
import { GeoJSONEditor } from './components/editors/geojsonEditor'
import { MapViewEditor } from './components/editors/MapViewEditor'
import './css/bootstrap-grid.css';
import './css/grid.css';
import './css/others.css';

export const plugin = new PanelPlugin<SimpleOptions>(Main).setPanelOptions((builder) => {
  let category = ['Map view']
  builder.addTextInput({
    category,
    path: 'title',
    name: 'Title',
    defaultValue: 'izquierda',
  })
  builder.addCustomEditor({
    category,
    path : 'view',
    id: 'view',
    name : 'Initial view',
    editor : MapViewEditor,
    defaultValue: defaultView
  })
  builder.addBooleanSwitch({
    category,
    path: 'sharedView',
    name: 'Shared view',
    defaultValue: false,
  })
  builder.addSelect({
    category,
    path: 'viewMode',
    name: 'View mode',
    defaultValue: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    settings: {
      options: [
        { value: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', label: 'Open Street Map' },
        { value: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', label: 'World Imagery' },
      ],
    },
  })
  builder.addCustomEditor({
    category:['GeoJSON layers'],
    path : 'geojsons',
    id: 'geojsons',
    name : 'GeoJSONs',
    editor : GeoJSONEditor,
    defaultValue: []
  })
  
});
