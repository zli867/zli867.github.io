document.getElementById("timeprofile_model").addEventListener('change', function() {
    timeprofile_option = document.getElementById("timeprofile_model").value;
    if (timeprofile_option == 1) {
        document.getElementById("ubc-bsf-feps_settings").style.display = "none";
        document.getElementById("default_settings").style.display = "block";
    } else {
        document.getElementById("ubc-bsf-feps_settings").style.display = "block";
        document.getElementById("default_settings").style.display = "none";
    }
})

document.getElementById("plumerise_model").addEventListener('change', function() {
    plumerise_option = document.getElementById("plumerise_model").value;
    if (plumerise_option == 1) {
        document.getElementById("feps").style.display = "block";
        document.getElementById("sev").style.display = "none";
    } else {
        document.getElementById("feps").style.display = "none";
        document.getElementById("sev").style.display = "block";
    }
})


document.getElementById("btn").addEventListener('click', function(params) {
    // Fuelbeds
    var fccs_version = Number(document.getElementById("fccs_version").value);
    // Ecoregion
    var ecoregion_default = document.getElementById("ecoregion_default").value;
    // Consumption
    var slope = document.getElementById("slope").value == "" ? 5 : Number(document.getElementById("slope").value);
    var windspeed = document.getElementById("windspeed").value == "" ? 6 : Number(document.getElementById("windspeed").value);
    var days_since_rain = document.getElementById("days_since_rain").value == "" ? 10 : Number(document.getElementById("days_since_rain").value);
    // Moisture
    var fuel_moisture_10hr_pct = document.getElementById("fuel_moisture_10hr_pct").value == "" ? 50 : Number(document.getElementById("fuel_moisture_10hr_pct").value);
    var fuel_moisture_1000hr_pct = document.getElementById("fuel_moisture_1000hr_pct").value == "" ? 30 : Number(document.getElementById("fuel_moisture_1000hr_pct").value);
    var fuel_moisture_duff_pct = document.getElementById("fuel_moisture_duff_pct").value == "" ? 75 : Number(document.getElementById("fuel_moisture_duff_pct").value);
    var fuel_moisture_litter_pct = document.getElementById("fuel_moisture_litter_pct").value == "" ? 16 : Number(document.getElementById("fuel_moisture_litter_pct").value);
    var canopy_consumption_pct = document.getElementById("canopy_consumption_pct").value == "" ? 0 : Number(document.getElementById("canopy_consumption_pct").value);
    var shrub_blackened_pct = document.getElementById("shrub_blackened_pct").value == "" ? 50 : Number(document.getElementById("shrub_blackened_pct").value);
    var pile_blackened_pct = document.getElementById("pile_blackened_pct").value == "" ? 0 : Number(document.getElementById("pile_blackened_pct").value);
    // Emissions
    var emission_model = document.getElementById("emission_model").value;
    var species = document.getElementById("species").value;
    var species_str = species.replace(/\s*/g, "");
    var species_array = species_str.split(",");
    console.log(species_str == "");
    // Timeprofile
    var timeprofile_option = document.getElementById("timeprofile_model").value;
    var timeprofile_model = "default";
    config_res["config"]["timeprofile"] = {};
    if (timeprofile_option == 1) {
        timeprofile_model = "default";
        console.log(config_res);
        config_res["config"]["timeprofile"]["model"] = timeprofile_model;
        var fraction_array = ["area_fraction", "flaming", "smoldering", "residual"];
        var isnull_array = false
        for (var i = 0; i < fraction_array.length; i++) {
            isnull_array = isnull_array || (document.getElementById(fraction_array[i]).value == "");
            if (isnull_array) {
                break;
            }
        }
        if (!isnull_array) {
            config_res["config"]["timeprofile"]["hourly_fractions"] = {};
            for (var i = 0; i < fraction_array.length; i++) {
                var fracs = document.getElementById(fraction_array[i]).value;
                var fracs_str = fracs.replace(/\s*/g, "");
                var fracs_array = fracs_str.split(",");
                var frac_num_array = []
                    // convert number array
                for (let j = 0; j < fracs_array.length; j++) {
                    frac_num_array.push(Number(fracs_array[j]))
                }
                config_res["config"]["timeprofile"]["hourly_fractions"][fraction_array[i]] = frac_num_array;
                console.log(frac_num_array);
            }
        }
    } else {
        timeprofile_model = "ubc-bsf-feps";
        config_res["config"]["timeprofile"]["model"] = timeprofile_model;
        config_res["config"]["timeprofile"]["ubc-bsf-feps"] = {};
        var interpolation_type = document.getElementById("interpolation_type").value;
        config_res["config"]["timeprofile"]["ubc-bsf-feps"]["interpolation_type"] = Number(interpolation_type);
        var normalize = document.getElementById("normalize").value;
        if (normalize == 1) {
            config_res["config"]["timeprofile"]["ubc-bsf-feps"]["normalize"] = true;
        } else {
            config_res["config"]["timeprofile"]["ubc-bsf-feps"]["normalize"] = false;
        }
    }
    // plumerise
    config_res["config"]["plumerise"] = {};
    var alpha = document.getElementById("alpha").value == "" ? 0.24 : Number(document.getElementById("alpha").value);
    var beta = document.getElementById("beta").value == "" ? 170 : Number(document.getElementById("beta").value);
    var ref_power = document.getElementById("ref_power").value == "" ? 1e6 : Number(document.getElementById("ref_power").value);
    var gamma = document.getElementById("gamma").value == "" ? 0.35 : Number(document.getElementById("gamma").value);
    var delta = document.getElementById("delta").value == "" ? 0.6 : Number(document.getElementById("delta").value);
    var ref_n = document.getElementById("ref_n").value == "" ? 2.5e-4 : Number(document.getElementById("ref_n").value);
    var gravity = document.getElementById("gravity").value == "" ? 9.8 : Number(document.getElementById("gravity").value);
    var plume_bottom_over_top = document.getElementById("plume_bottom_over_top").value == "" ? 0.5 : Number(document.getElementById("plume_bottom_over_top").value);

    var plumerise_option = document.getElementById("plumerise_model").value;
    if (plumerise_option == 1) {
        config_res["config"]["plumerise"]["model"] = 'feps';
        config_res["config"]["plumerise"]["feps"] = {};
        var top_beh_value = document.getElementById("plume_top_behavior").value;
        var top_beh = 'auto';
        if (top_beh_value == 1) {
            top_beh = 'auto';
        } else if (top_beh_value == 2) {
            top_beh = 'FEPS'
        } else {
            top_beh = 'Briggs'
        }
        config_res["config"]["plumerise"]["feps"]["plume_top_behavior"] = top_beh
    } else {
        config_res["config"]["plumerise"]["model"] = 'sev';
        config_res["config"]["plumerise"]["sev"] = {};
        config_res["config"]["plumerise"]["sev"]["alpha"] = alpha;
        config_res["config"]["plumerise"]["sev"]["beta"] = beta;
        config_res["config"]["plumerise"]["sev"]["ref_power"] = ref_power;
        config_res["config"]["plumerise"]["sev"]["gamma"] = gamma;
        config_res["config"]["plumerise"]["sev"]["delta"] = delta;
        config_res["config"]["plumerise"]["sev"]["ref_n"] = ref_n;
        config_res["config"]["plumerise"]["sev"]["gravity"] = gravity;
        config_res["config"]["plumerise"]["sev"]["plume_bottom_over_top"] = plume_bottom_over_top;
    }

    // Generate Json file
    config_res["config"]["fuelbeds"]["fccs_version"] = fccs_version
    config_res["config"]["ecoregion"]["default"] = ecoregion_default
    config_res["config"]["consumption"]["consume_settings"]["activity"]["slope"]["default"] = slope
    config_res["config"]["consumption"]["consume_settings"]["activity"]["windspeed"]["default"] = windspeed
    config_res["config"]["consumption"]["consume_settings"]["activity"]["days_since_rain"]["default"] = days_since_rain
    config_res["config"]["consumption"]["consume_settings"]["activity"]["fuel_moisture_10hr_pct"]["default"] = fuel_moisture_10hr_pct
    config_res["config"]["consumption"]["consume_settings"]["all"]["fuel_moisture_1000hr_pct"]["default"] = fuel_moisture_1000hr_pct
    config_res["config"]["consumption"]["consume_settings"]["all"]["fuel_moisture_duff_pct"]["default"] = fuel_moisture_duff_pct
    config_res["config"]["consumption"]["consume_settings"]["all"]["fuel_moisture_litter_pct"]["default"] = fuel_moisture_litter_pct
    config_res["config"]["consumption"]["consume_settings"]["all"]["canopy_consumption_pct"]["default"] = canopy_consumption_pct
    config_res["config"]["consumption"]["consume_settings"]["all"]["shrub_blackened_pct"]["default"] = shrub_blackened_pct
    config_res["config"]["consumption"]["consume_settings"]["all"]["pile_blackened_pct"]["default"] = pile_blackened_pct
    config_res["config"]["emissions"]["model"] = emission_model
    if (species_str != "") {
        config_res["config"]["emissions"]["species"] = species_array
    }

    // console.log(JSON.stringify(config_res));
    // alert(JSON.stringify(config_res))
    var str_json = JSON.stringify(config_res, null, 4)
    var config_box = document.getElementById("configuration")
    config_box.innerHTML = str_json
    navigator.clipboard.writeText(str_json);

})