var config_res = {
    "config": {
        "skip_failed_fires": false,
        "skip_failed_sources": false,
        "fuelbeds": {
            "fccs_version": 2
        },
        "ecoregion": {
            "lookup_implementation": "ogr",
            "skip_failures": true,
            "default": "western"
        },
        "consumption": {
            "consume_settings": {
                "activity": {
                    "slope": {
                        "default": 10
                    },
                    "windspeed": {
                        "default": 6
                    },
                    "days_since_rain": {
                        "default": 10
                    },
                    "fuel_moisture_10hr_pct": {
                        "default": 50
                    },
                    "fm_type": {
                        "default": "MEAS-Th"
                    }
                },
                "all": {
                    "fuel_moisture_1000hr_pct": {
                        "default": 30
                    },
                    "fuel_moisture_duff_pct": {
                        "default": 75
                    },
                    "fuel_moisture_litter_pct": {
                        "default": 16
                    },
                    "canopy_consumption_pct": {
                        "default": 0
                    },
                    "shrub_blackened_pct": {
                        "default": 50
                    },
                    "pile_blackened_pct": {
                        "default": 0
                    }
                }
            }
        },
        "emissions": {
            "model": "feps",
            "include_emissions_details": false
        }
    }
}