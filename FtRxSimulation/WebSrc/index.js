// var test_var = 1;
// var options = document.getElementById("burnDate");
// var select_value = options.value;
// console.log(select_value);
// // console.log(test_var);
// // alert(test_var)

function showSelectedDate() {
    document.getElementById("main-content").style.display = 'block';
    var selectedDate = document.getElementById("burnDate").value;
    var isFortStewart = false;
    var fortStewartDates = ["2022_03_05", "2022_03_03", "2022_03_02"]
    for (let index = 0; index < fortStewartDates.length; index++) {
        const fortStewartDate = fortStewartDates[index];
        if (fortStewartDate == selectedDate) {
            isFortStewart = true;
            break;
        }
    }
    update_figure("monitor_loc", "../Monitor/Monitor_" + selectedDate + ".png", "monitor_fig", 40)
    update_figure("monitor_conc", "../Observation/obs_conc_" + selectedDate + ".png", "conc_fig", 60)
    if (isFortStewart) {
        var elements = document.getElementsByClassName("Stewart");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = "block"; // Change "block" to "inline", "flex", etc., based on your needs
        }
        update_figure("ignition_pattern", "../Ignitions/ignition_pattern_" + selectedDate + ".gif", "ign_gif", 30)
    } else {
        var elements = document.getElementsByClassName("Stewart");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = "none"; // Change "block" to "inline", "flex", etc., based on your needs
        }
    }
    update_figure("sfire_ig", "../SFIREIgnitions/SFIRE_ignition_" + selectedDate + ".png", "sfire_ig_fig", 60)
    update_figure("wrf_series", "../Met/series/Wind_Series_" + selectedDate + ".png", "wrf_series_fig", 60)
    update_figure("dirbias", "../Met/wddirbias/winddir_bias_" + selectedDate + ".png", "dirbias_fig", 100)
    update_figure("spdbias", "../Met/wdspdbias/windspd_bias_" + selectedDate + ".png", "spdbias_fig", 100)
    update_figure("bsp_fuel", "../FuelType/BSP/BSP_" + selectedDate + ".png", "bsp_fuel_fig", 100)
    update_figure("sfire_fuel", "../FuelType/SFIRE/SFIRE_fuel_" + selectedDate + ".png", "sfire_fuel_fig", 100)
    update_figure("fuel_consumption", "../Consumption/Fuel/consumption_" + selectedDate + ".png", "fuel_consumption_fig", 100)
    update_figure("burned_area", "../Consumption/Burned_Area/Burned_Area_" + selectedDate + ".png", "burned_area_fig", 100)
    update_figure("emis_int", "../Emissions/Intensity/Emission_" + selectedDate + ".png", "emis_int_fig", 100)
    update_figure("emis_prof", "../Emissions/Profile/emiss_profile_" + selectedDate + ".png", "emis_prof_fig", 100)
    update_figure("Briggs_conc", "../SpatialConcentration/conc_Briggs_" + selectedDate + ".gif", "Briggs_conc_fig", 100)
    update_figure("FEPS_conc", "../SpatialConcentration/conc_FEPS_" + selectedDate + ".gif", "FEPS_conc_fig", 100)
    update_figure("SEV_conc", "../SpatialConcentration/conc_SEV_" + selectedDate + ".gif", "SEV_conc_fig", 100)
    update_figure("SFIRE_conc", "../SpatialConcentration/conc_SFIRE_" + selectedDate + ".gif", "SFIRE_conc_fig", 100)

    clear_content("monitor_eval");

    var valid_figures = []
    for (let index = 1; index < 7; index++) {
        valid_figures.push("../Evaluations/conc_" + selectedDate + "_" + index.toString() + ".png")

    }

    for (let img_idx = 0; img_idx < valid_figures.length; img_idx++) {
        fig_id_tag = "eval_" + img_idx.toString()
        checkImage(valid_figures[img_idx], function() { create_div_figure("monitor_eval", valid_figures[img_idx], fig_id_tag, 40) }, function() { console.log("error"); });
    }
}

function checkImage(imageSrc, good, bad) {
    var img = new Image();
    img.onerror = bad;
    img.onload = good;
    img.src = imageSrc;
}

function update_figure(id_name, fig_name, fig_id, ratio) {
    var div = document.getElementById(id_name);
    div.innerHTML = "<img src=\"" + fig_name + "\" class=\"image\" id=" + fig_id + ">";
    var theImg = document.getElementById(fig_id);
    theImg.style.width = ratio + "%";
    theImg.style.width = ratio + "%";
}

function create_div_figure(id_name, fig_name, fig_id, ratio) {
    var div = document.getElementById(id_name);
    div.innerHTML += "<img src=\"" + fig_name + "\" class=\"image\" id=" + fig_id + ">";
    var theImg = document.getElementById(fig_id);
    theImg.style.width = ratio + "%";
    theImg.style.width = ratio + "%";
}

function clear_content(id_name) {
    var div = document.getElementById(id_name);
    div.innerHTML = ""
}