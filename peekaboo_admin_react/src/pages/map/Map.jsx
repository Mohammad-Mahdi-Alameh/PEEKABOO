import { GoogleMap,InfoWindow,Marker,MarkerClusterer,useLoadScript } from "@react-google-maps/api"
import "./map.scss"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import mapStyles from "../../mapStyles"
import Navbar from "../../components/navbar/Navbar";
import React ,{ useState , useCallback ,useRef } from "react"
import {formatRelative} from "date-fns";
import usePlacesAutocomplete ,{getGeocode,getLatLng} from "use-places-autocomplete";
import { Combobox,ComboboxInput,ComboboxPopover,ComboboxList,ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";
import { Search } from "@mui/icons-material";
const libraries = ["places"]
const mapContainerStyle = {
    width : "100%",
    height : "100vh"
}
const center ={
    lat:43.653225,
    lng:-79.383186,
}
const options ={
    styles : mapStyles,
    disableDefaultUI: true,
    zoomControl :true,
}

const Map = () => {
    const [markers , setMarkers]=useState([])
    const [selected , setSelected]=useState(null)

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map)=>{
        mapRef.current = map ;
    });

    const panTo = React.useCallback(({lat , lng}) =>{
        mapRef.current.panTo({lat , lng});
        mapRef.current.setZoom(14);
        console.log(lat,lng);
    },[]);

    const onMapClick = React.useCallback((event)=>
    setMarkers((current) => [
        ...current,
        {
            lat : event.latLng.lat(),
            lng : event.latLng.lng(),
            time : new Date()
        }
    ]));

    const {isLoaded,loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });

    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps";

    

    function Search({panTo}){
        const {ready, value , suggestions : {status , data},setValue,clearSuggestions} = usePlacesAutocomplete({
            requestOptions:{
                location:{
                    lat : ()=> 43.653225,
                    lng : ()=>-79.383186,
                },
                radius:200*1000,
            }
        })
        return( <div className="wrapper">
        <div className="search"><Combobox
        onSelect={async (address) =>{
            try{
                const results = await getGeocode({address});
                const {lat ,lng} = getLatLng(results[0]);
                panTo({lat,lng});
            }catch(error){
                console.log("error")
            }
        }} >
            <ComboboxInput value={value} onChange={(e) =>{
                setValue(e.target.value);
            }}
            disable={!ready}
            placeholder="Enter an address"
            />
            <ComboboxPopover>
                {status === "OK" && data.map(( {id , description})=>(<ComboboxOption key={id} value={description}/>))}
            </ComboboxPopover>

        </Combobox>
        <SearchOutlinedIcon />
        </div>
        </div>)
    }

    return (<div className="map">
        <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
        >

            {markers.map((marker) => (
                <Marker
                key={marker.time.toISOString()}
                position={{lat :marker.lat, lng :marker.lng}}
                onClick={() =>{
                    setSelected(marker);
                }}/>

            ))}
            {
                selected ? (<InfoWindow position={{lat :selected.lat, lng :selected.lng}} onCloseClick={()=>{setSelected(null)}}>
                    <div>
                    <p>Created at {formatRelative(selected.time , new Date())}</p>
                    </div>

                </InfoWindow>
                
                ) : null }
            
            
            
            
            
            </GoogleMap>
            <Search panTo={panTo}/>
            </div>)


}

export default Map