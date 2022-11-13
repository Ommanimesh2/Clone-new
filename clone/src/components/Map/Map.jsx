import React from 'react'
import './map.css'
import data from '../../Updated_data';
import dataContext from '../../datacontext';
import { useEffect,useContext } from 'react'
import * as L from "leaflet";
const Map = () => {
    const style1={
        display:'none'
      }
      const style2={
        display:'block'
      }
      const {cropHighlight,search,setSearch,centroid,setCentroid,khasra,setKhasra,setCropHighlight,seasonHighlight,setSeasonHighlight,param,allFarmerDetails,setAllFarmerDetails,setParam,address,setAddress,pop,setPop,setLeftDet}=useContext(dataContext)
      useEffect(()=>{
         handleAllFarmData()
    },[])
    const handleAllFarmData=async()=>{
      const data=await fetch('https://new-ndvi-default-rtdb.firebaseio.com/.json')
      const resp=await data.json();
      setAllFarmerDetails(resp)
    }
    function findCentroid(e){
      const length=e.length;
      var latArr=[]
      var longArr=[]
      for(let i=0; i<length; i++){
        latArr.push(e[i][0])
        longArr.push(e[i][1])
      }
      let latCentroid=0
      let longCentroid=0
      let centroid=[]
      for(let i=0; i<length; i++){
        latCentroid+=latArr[i]
        longCentroid+=longArr[i]
        
      }
      centroid[1]=latCentroid/length
      centroid[0]=longCentroid/length
      return centroid
    }
    useEffect(() => {
      var map1 = L.DomUtil.get('map'); if(map1 != null){ map1._leaflet_id = null; }
      // if(address.items!=undefined){
      //   var southWest = L.latLng(address.items[0].mapView.south,address.items[0].mapView.west)
      //   var northEast = L.latLng(address.items[0].mapView.north,address.items[0].mapView.east)
      //   var bounds = L.latLngBounds(southWest, northEast);
      // }else{
    
      //   var southWest = L.latLng(29.83900608249045,77.90231862375538)
      //   var northEast = L.latLng(29.88188113949949,77.95107045481006)
      //   var bounds = L.latLngBounds(southWest, northEast);
      // }
        var map = L.map('map',{
        //maxBounds: bounds,   // Then add it here..
        maxZoom: 19,
        minZoom: 10
    
      }).setView([29.8665,77.9060], 13);
      var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
      }).addTo(map);
      var latlngs = [  
        [29.83900608249045,77.90231862375538],
        [29.83900608249045,77.95107045481006],
        [29.88188113949949,77.95107045481006],
        [29.88188113949949,77.90231862375538],
        [29.83900608249045,77.90231862375538],
        
      ];
      var greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [35, 50],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

         var marker = L.marker([29.8665,77.9060], {icon: greenIcon},{
          draggable: true
        }).addTo(map);
        marker.on('dragend', function (e) {
          updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);
        });
      
  
      
      map.on('click', function (e) {
        marker.setLatLng(e.latlng);
        updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);
      });
      function updateLatLng(lat,lng,reverse) {
        if(reverse) {
          marker.setLatLng([lat,lng]);
          map.panTo([lat,lng]);
        } 
      }
    
      var polyline = L.polyline(latlngs, {color: 'orange'});
    
    
      
      // polyline.addTo(map);
      // osm.addTo(map);
     
      var myStyle = {
        "color": "red",
        "weight": 3,
        "opacity":1
    };
    var defaultStyle={
      "color":"lightblue",
      "weight":"2"
    }
      if(cropHighlight.features){
        console.log("data is",cropHighlight);
        var datas = L.geoJSON(cropHighlight.features,{
          style:myStyle,
          onEachFeature:onEachFeature
        }).addTo(map);
      }
      else if(seasonHighlight.features){
        console.log("data is",seasonHighlight);
        var datas = L.geoJSON(seasonHighlight.features,{
          style:myStyle,
          onEachFeature:onEachFeature
        }).addTo(map);
    
      }
      else{
        console.log("data is",data);
        var datas = L.geoJSON(data,{
          style:defaultStyle,
          onEachFeature:onEachFeature
        }).addTo(map);
    
      }
      console.log(search)
      if(search)
      {
       marker.setLatLng(centroid)

      }
   
      function onEachFeature(features, layer) {
        
        // if(features.properties.id===param)
        // {
        //  console.log(features.geometry.coordinates[0])
        // }
        
      //  else if(features.properties.id===param){
      //   marker = L.marker(findCentroid(features.geometry.coordinates[0]), {icon: greenIcon},{
      //    draggable: true
      //  }).addTo(map);
      //  marker.on('dragend', function (e) {
      //    updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);
      //  });
    
        // does this feature have a property named popupContent?
        layer.bindTooltip(`${features.properties.id}`, { 'noHide': true });
        layer.on('click',(e)=>{
          setParam(e.target.feature.properties.id)
          setLeftDet(e.target.feature.properties)
          
        })
      }
      
    },[address,cropHighlight,seasonHighlight,search,centroid])
  return (
    <div style={pop ? style1 :style2} className='map' id="map">
      
    </div>
  )
}

export default Map
