import React, { Component } from "react";
import { Input } from "antd";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";
import TimeInput from "../../../../../components/TimeInput";
import * as company_providers from "../../../../../providers/master/company";
import * as branch_providers from "../../../../../providers/master/branch";
import {
  SysJWTDecoder,
  SysValidateForm,
  showToast,
} from "../../../../../utils/global_store";
import { useLoadingContext } from "../../../../../components/Loading";
class LoadScriptComponent extends LoadScript {
  componentDidMount() {
    try {
      const cleaningUp = true;
      const isBrowser = typeof document !== "undefined";
      const isAlreadyLoaded =
        window.google &&
        window.google.maps &&
        document.querySelector("body.first-hit-completed"); // AJAX page loading system is adding this class the first time the app is loaded

      if (!isAlreadyLoaded && isBrowser) {
        // @ts-ignore
        if (window.google && !cleaningUp) {
          console.error("google api is already presented");
          return;
        }

        this.isCleaningUp().then(this.injectScript);
      }

      if (isAlreadyLoaded) {
        this.setState({ loaded: true });
      }
    } catch (error) {
      // console.log(error);
      // this.isCleaningUp().then(this.injectScript);
    }
  }
}
class BranchMapForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      branch_name: "",
      center: {
        lat: -6.1943955,
        lng: 106.8145921,
      },
      zoom: 16,
      marker: {
        lat: -6.1943955,
        lng: 106.8145921,
      },
      radius: 100,
      address: "",
      geolocationPermission: null,
      phone: "",
      phone2: "",
      branchSchIn: "",
      branchSchOut: "",
      branchSchInHalf: "",
      branchSchOutHalf: "",
      jwt: SysJWTDecoder(),
      company_id: "",
      company_list: [],
    };
  }
  componentDidMount() {
    // this.getCompanyList();
    this.handleGetCurrentLocationClick();
    if (this.props.id) {
      this.setState({ id: this.props.id });
      this.getDetail(this.props.id);
    }
  }
  required_field = [
    "name as nama_cabang",
    "address as alamat",
    "radius",
    "primary_phone as nomor_utama",
    "longitude",
    "latitude",
    "sch_in as clock_in",
    "sch_out as clock_out",
  ];
  getDetail = async (id) => {
    this.loader.showLoading();
    try {
      const resp = await branch_providers.getDetail(id);
      this.setState({
        branch_name: resp.data.name,
        address: resp.data.address,
        radius: resp.data.radius,
        marker: {
          lat: resp.data.latitude,
          lng: resp.data.longitude,
        },
        center: {
          lat: resp.data.latitude,
          lng: resp.data.longitude,
        },
        phone: resp.data.primary_phone,
        phone2: resp.data.secondary_phone,
        branchSchIn: resp.data.sch_in,
        branchSchOut: resp.data.sch_out,
        branchSchInHalf: resp.data.sch_in_half,
        branchSchOutHalf: resp.data.sch_out_half,
        company_id: resp.data.company_id,
      });
    } catch (error) {
      showToast({ message: error.message, type: "error" });
      this.props.navigate(-1);
    }
    this.loader.hideLoading();
  };
  // getCompanyList = async () => {
  //   try {
  //     const resp = await company_providers.getDataMaximum();
  //     this.setState({
  //       company_list: resp.data.data,
  //     });
  //   } catch (error) {
  //     showToast({ message: error.message, type: "error" });
  //   }
  // };
  handleSubmit = async () => {
    // this.loader.showLoading();
    try {
      //   console.log(this.props);
      const data_submit = {
        name: this.state.branch_name,
        address: this.state.address,
        radius: this.state.radius,
        latitude: this.state.marker.lat,
        longitude: this.state.marker.lng,
        primary_phone: this.state.phone,
        secondary_phone: this.state.phone2,
        sch_in: this.state.branchSchIn,
        sch_out: this.state.branchSchOut,
        sch_in_half: this.state.branchSchInHalf,
        sch_out_half: this.state.branchSchOutHalf,
        company_id: this.state.jwt.companyId,
      };
      const validateForm = SysValidateForm(this.required_field, data_submit);
      if (!validateForm.is_valid) {
        showToast({ message: validateForm.message });
        return false;
      }
      if (this.state.branchSchIn >= this.state.branchSchOut) {
        showToast({ message: "Clock Out must be greater than Clock In" });
        // console.log('JAM BENER');
        return "";
      }
      const resp = await branch_providers.insertData(data_submit);
      showToast({ message: resp.message, type: "success" });
      this.props.navigate(-1);
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: "error" });
    }
    // this.loader.hideLoading();
  };

  handleUpdate = async () => {
    // this.loader.showLoading();
    try {
      const data_submit = {
        name: this.state.branch_name,
        address: this.state.address,
        radius: this.state.radius,
        latitude: this.state.marker.lat,
        longitude: this.state.marker.lng,
        primary_phone: this.state.phone,
        secondary_phone: this.state.phone2,
        sch_in: this.state.branchSchIn,
        sch_out: this.state.branchSchOut,
        sch_in_half: this.state.branchSchInHalf,
        sch_out_half: this.state.branchSchOutHalf,
        company_id: this.state.jwt.companyId,
      };
      const validateForm = SysValidateForm(this.required_field, data_submit);
      if (!validateForm.is_valid) {
        showToast({ message: validateForm.message });
        return false;
      }
      if (this.state.branchSchIn >= this.state.branchSchOut) {
        showToast({ message: "Clock Out must be greater than Clock In" });
        // console.log('JAM BENER');
        return "";
      }
      if (this.state.branchSchInHalf >= this.state.branchSchOutHalf) {
        // console.log('JAM GAK BENER');
        showToast({ message: "Clock Out must be greater than Clock In" });
        return "";
      }
      const resp = await branch_providers.updateData(
        data_submit,
        this.state.id
      );
      showToast({ message: resp.message, type: "success" });
      this.props.navigate(-1);
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: "error" });
    }
    // this.loader.hideLoading();
  };
  handleChangeAddress = (address) => {
    this.setState({ address });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onMapClick = (val) => {
    // console.log(val.latLng.lat());
    this.setState({
      marker: {
        lat: val.latLng.lat(),
        lng: val.latLng.lng(),
      },
      center: {
        lat: val.latLng.lat(),
        lng: val.latLng.lng(),
      },
    });
  };

  handleTimeInChange = (value) => {
    this.setState({ branchSchIn: value });
  };

  handleCompanyChange = (value) => {
    console.log(value.target.value);
    this.setState({ company_id: value.target.value });
  };
  handleTimeOutChange = (value) => {
    this.setState({ branchSchOut: value });
  };

  handleTimeInHalfChange = (value) => {
    this.setState({ branchSchInHalf: value });
  };

  handleTimeOutHalfChange = (value) => {
    this.setState({ branchSchOutHalf: value });
  };

  onRadiusChange = (event) => {
    this.setState({ radius: event.target.value });
  };

  onLatLngChange = (field) => (event) => {
    const { value } = event.target;
    this.setState((prevState) => ({
      marker: {
        ...prevState.marker,
        [field]: value,
      },
    }));
    if (field === "lat") {
      this.setState((prevState) => ({
        center: {
          ...prevState.center,
          lat: parseFloat(value),
        },
      }));
    } else if (field === "lng") {
      this.setState((prevState) => ({
        center: {
          ...prevState.center,
          lng: parseFloat(value),
        },
      }));
    }
  };

  handleGetCurrentLocationClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.setState({
            center: {
              lat: latitude,
              lng: longitude,
            },
            marker: {
              lat: latitude,
              lng: longitude,
            },
          });
        },
        (error) => {
          // showToast({message:"please enable location permission!"})
        }
      );
    } else {
      showToast({ message: "location service not supported!" });
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
      branchSchOutHalf,
      company_list,
      company_id,
      branch_name,
      jwt,
    } = this.state;

    return (
      <div className="form form-horizontal">
        <div className="form-body">
          <div className="form-group">
            <label>Nama</label>
            <input
              type="text"
              value={branch_name}
              onChange={this.handleChange}
              id="branch_name"
              disabled={this.props.readOnly}
              name="branch_name"
              className="form-control"
              placeholder="Nama Cabang"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <Input.TextArea
              value={this.state.address}
              onChange={this.handleChange}
              id="address"
              disabled={this.props.readOnly}
              name="address"
              className="form-control"
              placeholder="Address"
            />
          </div>

          <div className="row">
            <div className="col-sm-8">
              <LoadScriptComponent
                googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}
              >
                <GoogleMap
                  onClick={this.onMapClick}
                  mapContainerStyle={{
                    width: "100%",
                    height: "500px",
                  }}
                  center={center}
                  zoom={zoom}
                >
                  <Circle // required
                    center={center} // required
                    options={{
                      strokeColor: "#FF0000",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: "#FF0000",
                      fillOpacity: 0.35,
                      clickable: false,
                      draggable: false,
                      editable: false,
                      visible: true,
                      radius: parseInt(radius),
                      zIndex: 1,
                    }}
                  />
                  <Marker
                    position={marker}
                    draggable={true}
                    onDragEnd={(e) => {
                      const latLng = e.latLng.toJSON();
                      this.setState({ center: latLng, marker: latLng });
                    }}
                  />
                </GoogleMap>
              </LoadScriptComponent>
            </div>

            <div className="col-sm-3">
              <div className="form-group">
                <label>Radius (meters):</label>
                <input
                  className="form-control"
                  type="number"
                  value={radius}
                  onChange={this.onRadiusChange}
                />
              </div>
              <div className="form-group">
                <label>Latitude:</label>
                <input
                  className="form-control"
                  type="number"
                  value={marker.lat}
                  onChange={this.onLatLngChange("lat")}
                />
              </div>

              <div className="form-group">
                <label>Longitude:</label>
                <input
                  className="form-control"
                  type="number"
                  value={marker.lng}
                  onChange={this.onLatLngChange("lng")}
                />
              </div>
              {this.props.readOnly?null:
                
              <button
              className="btn btn-primary mt-2"
              onClick={this.handleGetCurrentLocationClick}
              >
                Ambil lokasi saat ini
              </button>
              }
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <div className="form-group">
                <label>Phone:</label>
                <input
                  className="form-control"
                  type="number"
                  name="phone"
                  value={phone}
              disabled={this.props.readOnly}

                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Phone 2:</label>
                <input
                  className="form-control"
                  type="number"
                  name="phone2"
              disabled={this.props.readOnly}

                  value={phone2}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Jam Masuk (Senin - Jumat):</label>
                <TimeInput
                  className="form-control"
                  value={branchSchIn}
                  onChange={this.handleTimeInChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Jam Keluar (Senin - Jumat):</label>
                <TimeInput
                  className="form-control"
                  
                  value={branchSchOut}
                  onChange={this.handleTimeOutChange}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Jam Masuk (Sabtu - Minggu):</label>
                <TimeInput
                  className="form-control"
                  value={branchSchInHalf}
                  onChange={this.handleTimeInHalfChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Jam Keluar (Sabtu - Minggu):</label>
                <TimeInput
                  className="form-control"
                  value={branchSchOutHalf}
                  onChange={this.handleTimeOutHalfChange}
                />
              </div>
            </div>
          </div>
          {this.props.readOnly?null:
          <button
          onClick={this.state.id ? this.handleUpdate : this.handleSubmit}
          className="btn btn-primary"
          >
            {this.state.id ? "Update" : "Submit"}
          </button>
          }
        </div>
      </div>
    );
  };
}
export default BranchMapForm;
