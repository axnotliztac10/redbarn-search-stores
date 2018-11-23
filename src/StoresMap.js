import React, { Component } from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import Geocode from "react-geocode";

import SideBar from './components/SideBar';
import SearchStores from './components/SearchStores'
import stores from './store_directory';

const ApiKey = 'AIzaSyDqNG9hp-DLdtFMWB6qfuU7b2oamO6eDNI';

/*
* Use this component as a launching-pad to build your functionality.
*
*/
class StoresMap extends Component {
  center = { lat: 19.426757, lng: -99.132385 };
  state = {
    loading: false,
    favoriteStores: [],
    isSearching: false,
    showModal: true,
    currentStore: {},
  };

  getStorePosition = (store) => {
    this.setState({
      isSearching: true,
    });

    return Geocode.fromAddress(store.value).then((res) => {
      const { lat, lng } = res.results[0].geometry.location;

      setTimeout(() => {
        this.setState({
          isSearching: false,
          currentStore: {
            lat,
            lng,
            name: store.label,
            address: store.value
          },
          showModal: false,
        });
      }, 600);
    }, (error) => { throw(new Error(error)); });
  }

  setFavorite = () => {
    const { currentStore, favoriteStores } = this.state;

    if (!favoriteStores.filter((store) => store.name === currentStore.name).length) {
      this.setState({
        favoriteStores: [currentStore, ...favoriteStores],
      });
    }
  }

  onSearch = () => {
    this.setState({
      showModal: true,
    });
  }

  handleCancelSearch = () => {
    this.setState({
      showModal: false,
    });
  }

  handleVisitStore = (store) => {
    this.setState({
      currentStore: store,
    });
  }

  componentDidMount() {
    Geocode.setApiKey(ApiKey);

    this.setState({
      loading: true,
    });

    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1000);
  }

  render() {
    const {
      showModal,
      isSearching,
      currentStore,
      favoriteStores,
    } = this.state;

    return (
      <div className="search-map-container">
        <SideBar
          favoriteStores={favoriteStores}
          onSearch={this.onSearch}
          handleVisitStore={this.handleVisitStore}
        />
        {showModal && <SearchStores
          stores={stores.map((store) => {
            return { label: store.Name, value: store.Address };
          })}
          handleChange={this.getStorePosition}
          handleCancel={this.handleCancelSearch}
          loading={isSearching}
        />}
        <Map
          className="stores-map"
          google={this.props.google}
          initialCenter={this.center}
          zoom={15}
          center={currentStore}
        >
          <Marker name={'Current location'} />
          <Marker
            onClick={this.setFavorite}
            name={currentStore.name}
            position={currentStore}
            icon={{
              url: "/img/shop-marker.png",
              anchor: new window.google.maps.Point(32,32),
              scaledSize: new window.google.maps.Size(64,64)
            }}
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (ApiKey)
})(StoresMap)
