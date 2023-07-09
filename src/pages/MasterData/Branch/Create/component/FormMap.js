import React, {Component} from 'react';
import PlacesAutocomplete, {geocodeByPlaceId, getLatLng} from 'react-places-autocomplete';
import {GoogleMap, LoadScript, Marker, Circle} from "@react-google-maps/api";
import TimeInput from '../../../../../components/TimeInput';

class LoadScriptComponent extends LoadScript {
    componentDidMount() {
        const cleaningUp = true;
        const isBrowser = typeof document !== "undefined";
        const isAlreadyLoaded = window.google && window.google.maps && document.querySelector("body.first-hit-completed"); // AJAX page loading system is adding this class the first time the app is loaded
        if (!isAlreadyLoaded && isBrowser) {
            // @ts-ignore
            if (window.google && !cleaningUp) {
                console.error("google api is already presented");
                return;
            }

            this.isCleaningUp()
                .then(this.injectScript);
        }

        if (isAlreadyLoaded) {
            this.setState({loaded: true});
        }
    }
}
class FormMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 0,
                lng: 0
            },
            zoom: 16,
            marker: {
                lat: 0,
                lng: 0
            },
            radius: 100,
            address: '',
            geolocationPermission: null,
            phone: '',
            phone2: '',
            branchSchIn: '',
            branchSchOut: '',
            branchSchInHalf: '',
            branchSchOutHalf: ''
        };
    }

    handleChangeAddress = (address) => {
        this.setState({address});
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    handleSelect = (address, placeId) => {
        geocodeByPlaceId(placeId).then((results) => getLatLng(results[0])).then((latLng) => {
            this.setState({center: latLng, marker: latLng, address});

        }).catch((error) => console.error('Error', error));
    };

    onMapClick = ({lat, lng}) => {
        this.setState({
            marker: {
                lat,
                lng
            }
        });
    };

    handleTimeInChange = (value) => {
        this.setState({branchSchIn: value});
    };

    handleTimeOutChange = (value) => {
        this.setState({branchSchOut: value});
    };

    handleTimeInHalfChange = (value) => {
        this.setState({branchSchInHalf: value});
    };

    handleTimeOutHalfChange = (value) => {
        this.setState({branchSchOutHalf: value});
    };

    onRadiusChange = (event) => {
        this.setState({radius: event.target.value});
    };

    onLatLngChange = (field) => (event) => {
        const {value} = event.target;
        this.setState((prevState) => ({
            marker: {
                ...prevState.marker,
                [field]: value
            }
        }));
        if (field === 'lat') {
            this.setState((prevState) => ({
                center: {
                    ...prevState.center,
                    lat: parseFloat(value)
                }
            }));
        } else if (field === 'lng') {
            this.setState((prevState) => ({
                center: {
                    ...prevState.center,
                    lng: parseFloat(value)
                }
            }));
        }

    }

    handleGetCurrentLocationClick = () => {
        if ("geolocation" in navigator) {
            navigator
                .geolocation
                .getCurrentPosition((position) => {
                    const {latitude, longitude} = position.coords;
                    this.setState({
                        center: {
                            lat: latitude,
                            lng: longitude
                        },
                        marker: {
                            lat: latitude,
                            lng: longitude
                        }
                    });
                }, (error) => {
                    console.error("Error getting location", error);
                    alert("Error getting location");
                });
        } else {
            console.error("Geolocation not supported");
            alert("Geolocation not supported");
        }
    };

    render = () => {
        const {
            center,
            zoom,
            marker,
            radius,
            address,
            phone,
            phone2,
            branchSchIn,
            branchSchOut,
            branchSchInHalf,
            branchSchOutHalf
        } = this.state;

        return (
            <div className="form form-horizontal">
                <div className="form-body">
                    <div className="form-group">
                        <label for="first-name-column">Nama</label>
                        <input
                            type="text"
                            id="first-name-column"
                            className="form-control"
                            placeholder="Nama Cabang"
                            name="fname-column"/>
                    </div>
                    <PlacesAutocomplete
                        value={address}
                        onChange={this.handleChangeAddress}
                        onSelect={(address, placeId) => {
                        this.handleSelect(address, placeId);
                    }}
                        getSuggestionValue={(suggestion) => suggestion.description}>
                        {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                            <div className="form-group">
                                <label>Alamat:
                                </label>

                                <input
                                    className="form-control"
                                    {...getInputProps({ placeholder: 'Masukan alamat' })}/>
                                <div>
                                    {loading
                                        ? <div>Loading...</div>
                                        : null}

                                    {suggestions.map((suggestion) => {
                                        const style = {
                                            backgroundColor: suggestion.active
                                                ? '#445ebe'
                                                : '#fff',
                                            cursor: 'pointer',
                                            padding: '15px',
                                            textColor: 'white'
                                        };

                                        return (
                                            <div {...getSuggestionItemProps(suggestion, { style })}>
                                                {suggestion.description}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                    <div className="row">
                        <div className="col-sm-8">
                            <LoadScriptComponent
                                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                                <GoogleMap
                                    mapContainerStyle={{
                                    width: '100%',
                                    height: '500px'
                                }}
                                    center={center}
                                    zoom={zoom}>
                                    <Circle // required
                                        center={center} // required
                                        options={{
                                        strokeColor: '#FF0000',
                                        strokeOpacity: 0.8,
                                        strokeWeight: 2,
                                        fillColor: '#FF0000',
                                        fillOpacity: 0.35,
                                        clickable: false,
                                        draggable: false,
                                        editable: false,
                                        visible: true,
                                        radius: parseInt(radius),
                                        zIndex: 1
                                    }}/>
                                    <Marker
                                        position={marker}
                                        draggable={true}
                                        onDragEnd={(e) => {
                                        const latLng = e
                                            .latLng
                                            .toJSON();
                                        this.setState({center: latLng, marker: latLng});
                                    }}/>

                                </GoogleMap>
                            </LoadScriptComponent>
                        </div>

                        <div className="col-sm-3">
                            <div className="form-group">
                                <label>Radius (meters):
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    value={radius}
                                    onChange={this.onRadiusChange}/>
                            </div>
                            <div className="form-group">
                                <label>Latitude:</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    value={marker.lat}
                                    onChange={this.onLatLngChange('lat')}/>
                            </div>

                            <div className="form-group">
                                <label>Longitude:</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    value={marker.lng}
                                    onChange={this.onLatLngChange('lng')}/>
                            </div>
                            <button
                                className="btn btn-primary mt-2"
                                onClick={this.handleGetCurrentLocationClick}>
                                Ambil lokasi saat ini
                            </button>
                        </div>

                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Phone:
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="phone"
                                    value={phone}
                                    onChange={this.handleChange}/>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Phone 2:
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="phone2"
                                    value={phone2}
                                    onChange={(e) => {
                                    this.handleChange(e)
                                }}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Jam Masuk (Senin - Jumat):</label>
                                <TimeInput
                                    className="form-control"
                                    value={branchSchIn}
                                    onChange={this.handleTimeInChange}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Jam Keluar (Senin - Jumat):</label>
                                <TimeInput
                                    className="form-control"
                                    value={branchSchOut}
                                    onChange={this.handleTimeOutChange}/>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Jam Masuk (Sabtu - Minggu):</label>
                                <TimeInput
                                    className="form-control"
                                    value={branchSchInHalf}
                                    onChange={this.handleTimeInHalfChange}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Jam Keluar (Sabtu - Minggu):</label>
                                <TimeInput
                                    className="form-control"
                                    value={branchSchOutHalf}
                                    onChange={this.handleTimeOutHalfChange}/>
                            </div>
                        </div>

                    </div>
                    <button className="btn btn-primary">Submit</button>
                </div>
            </div>
        );
    }
}
export default FormMap;