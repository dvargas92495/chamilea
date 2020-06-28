import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import markers from './markers';
import ExpandedMarker from "./ExpandedMarker";
import Modal from "./Modal";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

class MapChart extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    onClick = marker => () => {
        this.setState({ marker });
    }

    render () {
        const marker = this.state.marker;
        return (
            <>
                <ComposableMap projection="geoAlbersUsa">
                <Geographies geography={geoUrl}>
                    {({ geographies }) => (
                        <>
                            {geographies.map(geo => (
                            <Geography
                                key={geo.rsmKey}
                                // stroke="#FFF"
                                geography={geo}
                                fill="#DDD"
                            />
                            ))}
                        </>
                    )}
                </Geographies>
                {Object.values(markers).map(({ Location, Coordinates }) => (
                    <Marker key={Location} coordinates={Coordinates}>
                    <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} onClick={this.onClick(Location)} />
                    <text
                        textAnchor="middle"
                        y={25}
                        style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                    >
                        {Location}
                    </text>
                    </Marker>
                ))}
                </ComposableMap>
                {marker && (
                    <Modal 
                        onClose={this.onClick()}
                        content={<ExpandedMarker marker={markers[marker]} />}
                    />
                )}
            </>
        );
    }
};

export default MapChart;