import React, { useEffect, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { MapContainer, TileLayer, GeoJSON, LayersControl, useMapEvents, useMap} from 'react-leaflet';
import { LatLngLiteral, LeafletEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import zonas from 'data/zonas.json';
import maquina from 'data/maquina.json';
import nvm from 'data/nvm.json';

interface Props extends PanelProps<SimpleOptions> {};


export const Main: React.FC<Props> = ({ options, data, width, height, replaceVariables }) => {
  const geojsons = options.geojsons;
  const original_zoom = options.view.zoom;
  const original_position: LatLngLiteral = {
    lat : options.view.lat,
    lng : options.view.lon
  };
 
  const [center, setCenter]     = useState<LatLngLiteral>(original_position);
  const [zoom, setZoom]         = useState<number>(original_zoom);
  
  // This function is called when the map is dragged and then it changes the state of the center of the map to update the rest of sync maps
  function HandleMapEvents() {
    const map = useMapEvents({
      zoom: (event : LeafletEvent) => {
        if(options.sharedView){
          window.localStorage.setItem('ertismap-zoom', event.target.getZoom());
          window.dispatchEvent(new Event("changeZoom"));
        }
      },
      drag: () => {
        if(options.sharedView){
          const newCenter = map.getCenter();
          window.localStorage.setItem('ertismap-lat', newCenter.lat.toString())
          window.localStorage.setItem('ertismap-lng', newCenter.lng.toString())
          window.dispatchEvent(new Event("changeLatitudeLongitude"));
        }
        //setCenter2(map.getCenter())
      }
    })
    return null;
  };

  useEffect(() => {
    window.addEventListener('changeZoom', () => {
      //Getting the local storage values
      const local_zoom = Number(window.localStorage.getItem('ertismap-zoom'));
      //If the local storage values are different from the current ones, change the center
      if(options.sharedView && (local_zoom!==zoom)) {
        setZoom(local_zoom)
      }
    });

    window.addEventListener('changeLatitudeLongitude', () => {
      //Getting the local storage values
      const local_lat = Number(window.localStorage.getItem('ertismap-lat'));
      const local_lng = Number(window.localStorage.getItem('ertismap-lng'));

      //If the local storage values are different from the current ones, change the center
      if(options.sharedView && (local_lat!==center.lat || local_lng!==center.lng)) {
        //console.log(options.title,center)
        let newPosition: LatLngLiteral = {
          lat : local_lat,
          lng : local_lng
        };
        setCenter(newPosition)
      }
    });
  }, []);
  
  useEffect(() => {
  }, [center, zoom])
  
  
  //Retrieves all the geojsons and returns them as layers
  function getLayers(){
    const getGeoJSONs = geojsons.map(function(geojson) {
      let nombrecito;
      if (geojson.name === "Parcelas"){
        nombrecito = zonas.features;
      }else if(geojson.name === "Maquina"){
        nombrecito = maquina.features;
      }else{
        nombrecito = nvm.features;
      }
      return (
      <LayersControl.BaseLayer name={geojson.name}>
        <GeoJSON key={geojson.name} data={nombrecito as any} />
      </LayersControl.BaseLayer>)
    })


    //If there are no geojsons, return an empty div
    if(options.geojsons.length === 0){
      return <div></div>
    }else{
      return (
      <LayersControl key="a" collapsed={false} position="topright">
        {getGeoJSONs}
      </LayersControl>
      )
    }
  };

  //Returns the baselayer of the map
  function getBaseLayer(){
    return(<TileLayer
      // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url={options.viewMode}
    />)
  };

  function ChangeView( {center, zoom}: {center: LatLngLiteral, zoom: number} ) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  //Returns the map with all the components
  return (
    <div className={(options.sharedView) ? "shared" : "no-shared"}>
      {/* Hidden inputs to manage shared view */}

      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ width: width, height: height }}>
      <ChangeView center={center} zoom={zoom} />
      {getBaseLayer()}
      {getLayers()}
      <HandleMapEvents />
    </MapContainer>
  </div>
  );
};
