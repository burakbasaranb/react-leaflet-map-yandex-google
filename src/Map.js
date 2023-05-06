import React, { useEffect, useState, useRef } from "react";

import { Map as LeafletMap, TileLayer, LayersControl} from "react-leaflet";
import 'leaflet/dist/leaflet.css' 
import L from 'leaflet'; 

const { BaseLayer } = LayersControl;

const MyMap = () => {

  const yandexCrs = L.CRS.EPSG3395;
  const otherCrs = L.CRS.EPSG3857;
  const defaultZoom = 11;
  const mapCenter = [40.97, 29.06];
  const [CusromCRS, setCusromCRS] = useState(otherCrs); // [googleCrs, yandexCrs
  const mapRef = useRef(null);

  const handleTileClick_addYandex = () => {
    setCusromCRS(yandexCrs);
  };
  const handleTileClick_removeYandex = () => {
    setCusromCRS(otherCrs);
  };

  useEffect(() => {
    const map = mapRef.current.leafletElement;
    map.options.crs = CusromCRS;
    var userZoom = map.getZoom();
    var refreshZoom = userZoom + 1;
    map.setView(mapCenter, refreshZoom);
    map.setView(mapCenter, userZoom);
  }, [CusromCRS]);

  //console.log(mapRef.current.props.crs)
 
    return (
      <div> 
      <LeafletMap
        doubleClickZoom={false}
        id="mapId"
        zoom={defaultZoom}
        ref={mapRef}
        crs={CusromCRS}
        >

      <LayersControl>
          <BaseLayer checked name="Google Yol">
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&lang=tr_TR"
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
          </BaseLayer>
          <BaseLayer name="Yandex Uydu">
            <TileLayer
              url="https://sat{s}.maps.yandex.net/tiles?l=sat&x={x}&y={y}&z={z}&lang=tr_TR"
              subdomains={['01', '02', '03', '04']}
              attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
              onAdd={() => handleTileClick_addYandex()}
              onRemove={() => handleTileClick_removeYandex()}
            />
          </BaseLayer>
          <BaseLayer name="Google Uydu">
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}&lang=tr_TR"
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
          </BaseLayer>
          <BaseLayer  name="Yandex Yol">
          <TileLayer
            attribution= "Yandex Yol"
            url= "https://core-renderer-tiles.maps.yandex.net/tiles?l=map&v=21.06.18-0-b210520094930&x={x}&y={y}&z={z}&scale=1&lang=tr_TR"
            maxNativeZoom = {20}
            subdomains = {["01", "02", "03", "04"]}
            onAdd={() => handleTileClick_addYandex()}
            onRemove={() => handleTileClick_removeYandex()}
            />
          </BaseLayer>
          <BaseLayer name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
          </BaseLayer>
          <BaseLayer name="NASA Gibs Blue Marble">
            <TileLayer
              url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg"
              attribution="&copy; NASA Blue Marble, image service by OpenGeo"
              maxNativeZoom={8}
            />
          </BaseLayer>
        </LayersControl>  
      </LeafletMap>
      </div>
    );
}

export default MyMap;