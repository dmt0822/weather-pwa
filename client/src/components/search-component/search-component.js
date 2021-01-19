import React, { useState } from 'react';
import './search-component.scss';
import { states } from '../../util/util';

const SearchComponent = (props) => {
    const [searchText, setSearchText] = useState('');

    const onFormSubmit = async (event) => {
        event.preventDefault();
        props.onLocationSearch(searchText);
    }

    const handleChange = (event) => {
        // This is needed in order to get target.value
        event.persist();
        setSearchText(event.target.value);
    }

    return (
        <div className="location-search">
            <form onSubmit={onFormSubmit}>
                <input
                    type="text"
                    id="input"
                    name="input"
                    className="search-input"
                    value={searchText}
                    onChange={handleChange}
                    placeholder="Search for a location"
                    autoComplete="off"
                />
                <button
                    type="submit"
                    className="search-btn"
                    title="Search for a location"
                >
                    <i className="fa fa-search" />
                </button>
                <button
                    type="button"
                    className="search-btn"
                    title="Find my location"
                    onClick={props.onGeolocation}
                >
                    <i className="fa fa-globe-americas" />
                </button>
            </form>
            <div className="location-list" id="location-list">
                {   /**
                     * Only show the location list if location status is complete, a
                     * locationList exists, and there is no current selection.
                     * 
                     * selectedLocation will be reset to undefined when a new search
                     * is initiated.
                     */
                    props.locationList?.length > 0 &&
                    !props.selectedLocation &&
                    props.locationList.map((location, index) => {
                        try {
                            const lat = location.Location.NavigationPosition[0].Latitude;
                            const long = location.Location.NavigationPosition[0].Longitude;
                            const locationId = location.Location.LocationId;

                            return (
                                <button
                                    onClick={(e) => props.onLocationClick(e, locationId, lat, long)}
                                    key={`location-${index}`}
                                    id={locationId}
                                    className="location-btn"
                                >
                                    {location.Location?.Address?.Label}
                                </button>
                            );
                        } catch(err) {
                            return (<div>Locations cannot be displayed at this time.</div>);
                        }
                    })
                }
                {
                    props.locationList?.length === 0 && props.status === states.COMPLETE &&
                    <button className="location-btn">
                        Location not found
                    </button>
                }
            </div>
        </div>
    );
}

export default SearchComponent;
