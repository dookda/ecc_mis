let datall_pop = []
let datregister_pop = []
let datdisguise_pop = []
let datacity_pop = []

let datall_pop_covid = []
let datregister_pop_covid = []
let datdisguise_pop_covid = []

let datwaste = [];

let datgarbage = [];

let datuse_water_all = [];
let datuse_water_prov60 = [];
let datuse_water_prov70 = [];
let datuse_water_prov80 = [];
let datuse_water_Yagri = [];
let datuse_water_Yconsume = [];
let datuse_water_Yindustry = [];
let datuse_water_Yindustry1 = [];
let datuse_water_Yindustry2 = [];
let datuse_water_prapa = [];

let UW_industry = [];
let UW_prapa = [];
let UW_sum = [];

let datelec_demand = [];
let datelec_genelec_insys = [];
let datelec_genelec_afsys = [];

let datecon_tourist = [];
let datecon_agri = [];
let datecon_industry = [];
let datecon_sevice = [];

let datlabor_minwage = [];
let datlabor_employ = [];
let datlabor_exert = [];
let datlabor_edulevel_all = [];

let datlabor_edulevel_M3 = [];
let datlabor_edulevel_M3s = [];
let datlabor_edulevel_M6 = [];
let datlabor_edulevel_profession = [];
let datlabor_edulevel_Bachelor = [];
let datlabor_edulevel_MoreBachelor = [];

let datwaste_industry = [];
let datwaste_infectious = [];
let datwaste_garbage = [];

let datgas_all = [];
let datgas_energy = [];
let datgas_waste = [];
let datgas_industry = [];
let datgas_agri = [];

let datlu_urban = [];
let datlu_industry = [];
let datlu_agri = [];
let datlu_envi = [];

$(document).ready(function () {
    forecast()
})
const url = "https://engrids.soc.cmu.ac.th/api";

let forecast = async () => {
    //pop normal  
    let year_pop_T01 = []
    let year_pop_T02 = []
    let year_pop_T03 = []
    let year_pop_T04 = []

    let pop_eec_T01 = []
    let pop_eec_T02 = []
    let pop_eec_T03 = []
    let pop_eec_T04 = []
    await axios.post(url + "/forecast_eec/pop/year", { code: 'T01' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_pop_T01.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/pop/year", { code: 'T02' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_pop_T02.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/pop/year", { code: 'T03' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_pop_T03.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/pop/year", { code: 'T04' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_pop_T04.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/pop/data").then(async (r) => {
        let data = r.data.data
        let eec24_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "24")
        let eec20_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "20")
        let eec21_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "21")
        let eec_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "eec")

        year_pop_T01.map(i => {
            let cs = eec24_T01.filter(e => e.y_year == i.year)
            let cb = eec20_T01.filter(e => e.y_year == i.year)
            let ry = eec21_T01.filter(e => e.y_year == i.year)
            let eec = eec_T01.filter(e => e.y_year == i.year)
            // console.log(cs, i.year)
            datall_pop.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value), four: Number(eec[0].v_value) },
            )
        })
        // console.log(pop_eec_T01)
        // console.log(datall_pop)

        let eec24_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "24")
        let eec20_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "20")
        let eec21_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "21")
        let eec_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "eec")

        year_pop_T02.map(i => {
            let cs = eec24_T02.filter(e => e.y_year == i.year)
            let cb = eec20_T02.filter(e => e.y_year == i.year)
            let ry = eec21_T02.filter(e => e.y_year == i.year)
            let eec = eec_T02.filter(e => e.y_year == i.year)
            // console.log(cs, i.year)
            datregister_pop.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value), four: Number(eec[0].v_value) },
            )
        })
        // console.log(pop_eec_T02)
        // console.log(datregister_pop)

        let eec24_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "24")
        let eec20_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "20")
        let eec21_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "21")
        let eec_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "eec")

        year_pop_T03.map(i => {
            let cs = eec24_T03.filter(e => e.y_year == i.year)
            let cb = eec20_T03.filter(e => e.y_year == i.year)
            let ry = eec21_T03.filter(e => e.y_year == i.year)
            let eec = eec_T03.filter(e => e.y_year == i.year)
            // console.log(cs, i.year)
            datdisguise_pop.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value), four: Number(eec[0].v_value) },
            )
        })
        // console.log(pop_eec_T03)
        // console.log(datdisguise_pop)

        let eec24_T04 = r.data.data.filter(e => e.title_c == "T04" && e.prov_c == "24")
        let eec20_T04 = r.data.data.filter(e => e.title_c == "T04" && e.prov_c == "20")
        let eec21_T04 = r.data.data.filter(e => e.title_c == "T04" && e.prov_c == "21")

        year_pop_T04.map(i => {
            let cs = eec24_T04.filter(e => e.y_year == i.year)
            let cb = eec20_T04.filter(e => e.y_year == i.year)
            let ry = eec21_T04.filter(e => e.y_year == i.year)
            // console.log(cs, i.year)
            datacity_pop.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value), four: 0 },
            )
        })
        // console.log(pop_eec_T04)
        // console.log(datacity_pop)
    })
    //pop covid
    let year_popcovid_T01 = []
    let year_popcovid_T02 = []
    let year_popcovid_T03 = []

    let popcovid_eec_T01 = []
    let popcovid_eec_T02 = []
    let popcovid_eec_T03 = []
    await axios.post(url + "/forecast_eec/pop_covid/year", { code: 'T01' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_popcovid_T01.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/pop_covid/year", { code: 'T02' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_popcovid_T02.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/pop_covid/year", { code: 'T03' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_popcovid_T03.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/pop_covid/data").then(async (r) => {
        let data = r.data.data
        let eec24_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "24")
        let eec20_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "20")
        let eec21_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "21")
        let eec_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "eec")

        year_popcovid_T01.map(i => {
            let cs = eec24_T01.filter(e => e.y_year == i.year)
            let cb = eec20_T01.filter(e => e.y_year == i.year)
            let ry = eec21_T01.filter(e => e.y_year == i.year)
            let eec = eec_T01.filter(e => e.y_year == i.year)
            // console.log(cs, i.year)
            datall_pop_covid.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value), four: Number(eec[0].v_value) },
            )
        })
        // console.log(popcovid_eec_T01)
        // console.log(datall_pop_covid)

        let eec24_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "24")
        let eec20_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "20")
        let eec21_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "21")
        let eec_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "eec")

        year_popcovid_T02.map(i => {
            let cs = eec24_T02.filter(e => e.y_year == i.year)
            let cb = eec20_T02.filter(e => e.y_year == i.year)
            let ry = eec21_T02.filter(e => e.y_year == i.year)
            let eec = eec_T02.filter(e => e.y_year == i.year)
            // console.log(cs, i.year)
            datregister_pop_covid.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value), four: Number(eec[0].v_value) },
            )
        })
        // console.log(popcovid_eec_T02)
        // console.log(datregister_pop_covid)

        let eec24_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "24")
        let eec20_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "20")
        let eec21_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "21")
        let eec_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "eec")

        year_popcovid_T03.map(i => {
            let cs = eec24_T03.filter(e => e.y_year == i.year)
            let cb = eec20_T03.filter(e => e.y_year == i.year)
            let ry = eec21_T03.filter(e => e.y_year == i.year)
            let eec = eec_T03.filter(e => e.y_year == i.year)
            // console.log(cs, i.year)
            datdisguise_pop_covid.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value), four: Number(eec[0].v_value) },
            )
        })
        // console.log(popcovid_eec_T03)
        // console.log(datdisguise_pop_covid)
    })

    // wastewater
    let year_wastewater_T01 = []
    let wastewater_eec_T01 = []
    await axios.post(url + "/forecast_eec/wastewater/year", { code: 'T01' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_wastewater_T01.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/wastewater/data").then(async (r) => {
        let data = r.data.data
        let eec24_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "24")
        let eec20_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "20")
        let eec21_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "21")
        let eec_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "eec")

        year_wastewater_T01.map(i => {
            let cs = eec24_T01.filter(e => e.y_year == i.year)
            let cb = eec20_T01.filter(e => e.y_year == i.year)
            let ry = eec21_T01.filter(e => e.y_year == i.year)
            let eec = eec_T01.filter(e => e.y_year == i.year)
            // console.log(cs, i.year)
            datwaste.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value), four: Number(eec[0].v_value) },
            )
        })
        // console.log(wastewater_eec_T01)
        // console.log(datwaste)
    })

    // garbage
    let year_garbage_T01 = []
    let garbage_eec_T01 = []
    await axios.post(url + "/forecast_eec/garbage/year", { code: 'T01' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_garbage_T01.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/garbage/data").then(async (r) => {
        let data = r.data.data
        let eec24_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "24")
        let eec20_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "20")
        let eec21_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "21")
        let eec_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "eec")

        year_garbage_T01.map(i => {
            let cs = eec24_T01.filter(e => e.y_year == i.year)
            let cb = eec20_T01.filter(e => e.y_year == i.year)
            let ry = eec21_T01.filter(e => e.y_year == i.year)
            let eec = eec_T01.filter(e => e.y_year == i.year)
            // console.log(cs, i.year)
            datgarbage.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value), four: Number(eec[0].v_value) },
            )
        })
        // console.log(garbage_eec_T01)
        // console.log(datgarbage)
    })

    //water_demand
    let year_WD_T01 = []
    let year_WD_T02 = []
    let year_WD_T03 = []
    let year_WD_T04 = []
    let year_WD_T04_2 = []
    let year_WD_T04_3 = []
    let year_WD_T05 = []
    let year_WD_T06 = [{ year: '2560' }, { year: '2570' }, { year: '2580' }]

    let WD_eec_T01 = []
    let WD_eec_T02 = []
    let WD_eec_T03 = []
    let WD_eec_T04 = []
    let WD_eec_T04_2 = []
    let WD_eec_T04_3 = []
    let WD_eec_T05 = []
    await axios.post(url + "/forecast_eec/water_demand/year", { code: 'T01' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_WD_T01.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/water_demand/year", { code: 'T02' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_WD_T02.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/water_demand/year", { code: 'T03' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_WD_T03.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/water_demand/year", { code: 'T04' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_WD_T04.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/water_demand/year", { code: 'T04_2' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_WD_T04_2.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/water_demand/year", { code: 'T04_3' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_WD_T04_3.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/water_demand/year", { code: 'T05' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_WD_T05.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/water_demand/data").then(async (r) => {
        let data = r.data.data
        let eec24_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "24")
        let eec20_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "20")
        let eec21_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "21")
        let eec_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "eec")

        year_WD_T01.map(i => {
            let cs = eec24_T01.filter(e => e.y_year == i.year)
            let cb = eec20_T01.filter(e => e.y_year == i.year)
            let ry = eec21_T01.filter(e => e.y_year == i.year)
            let eec = eec_T01.filter(e => e.y_year == i.year)
            // console.log(cs, i.year)
            datuse_water_all.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value), four: Number(eec[0].v_value) },
            )
        })
        // console.log(WD_eec_T01)
        // console.log(datuse_water_all)

        let eec24_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "24")
        let eec20_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "20")
        let eec21_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "21")
        let eec_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "eec")

        year_WD_T02.map(i => {
            let cs = eec24_T02.filter(e => e.y_year == i.year)
            let cb = eec20_T02.filter(e => e.y_year == i.year)
            let ry = eec21_T02.filter(e => e.y_year == i.year)
            let eec = eec_T02.filter(e => e.y_year == i.year)
            // console.log(cs, i.year)
            datuse_water_Yconsume.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value), four: Number(eec[0].v_value) },
            )
        })
        // console.log(WD_eec_T02)
        // console.log(datuse_water_Yconsume)

        let eec24_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "24")
        let eec20_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "20")
        let eec21_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "21")
        let eec_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "eec")

        year_WD_T03.map(i => {
            let cs = eec24_T03.filter(e => e.y_year == i.year)
            let cb = eec20_T03.filter(e => e.y_year == i.year)
            let ry = eec21_T03.filter(e => e.y_year == i.year)
            let eec = eec_T03.filter(e => e.y_year == i.year)
            // console.log(cs, i.year)
            datuse_water_Yagri.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value), four: Number(eec[0].v_value) },
            )
        })
        // console.log(WD_eec_T03)
        // console.log(datuse_water_Yagri)

        let eec24_T04 = r.data.data.filter(e => e.title_c == "T04" && e.prov_c == "24")
        let eec20_T04 = r.data.data.filter(e => e.title_c == "T04" && e.prov_c == "20")
        let eec21_T04 = r.data.data.filter(e => e.title_c == "T04" && e.prov_c == "21")
        let eec_T04 = r.data.data.filter(e => e.title_c == "T04" && e.prov_c == "eec")
        let eec_T04_2 = r.data.data.filter(e => e.title_c == "T04_2" && e.prov_c == "eec")
        let eec_T04_3 = r.data.data.filter(e => e.title_c == "T04_3" && e.prov_c == "eec")
        // console.log(eec24_T04)
        // console.log(year_WD_T04)
        year_WD_T04.map(i => {
            let cs = eec24_T04.filter(e => e.y_year == i.year)
            let cb = eec20_T04.filter(e => e.y_year == i.year)
            let ry = eec21_T04.filter(e => e.y_year == i.year)
            let eec = eec_T04.filter(e => e.y_year == i.year)
            datuse_water_Yindustry.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value), four: Number(eec[0].v_value) },
            )
        })
        year_WD_T04_2.map(i => {
            let eec = eec_T04_2.filter(e => e.y_year == i.year)
            datuse_water_Yindustry1.push(
                { category: `ปี ${i.year}`, four: Number(eec[0].v_value) },
            )
        })
        year_WD_T04_3.map(i => {
            let eec = eec_T04_3.filter(e => e.y_year == i.year)
            datuse_water_Yindustry2.push(
                { category: `ปี ${i.year}`, four: Number(eec[0].v_value) },
            )
        })
        // console.log(WD_eec_T04_2)
        // console.log(datuse_water_Yindustry1)
        // console.log(WD_eec_T04_3)
        // console.log(datuse_water_Yindustry2)
        // console.log(datuse_water_Yindustry)
        year_WD_T06.map(i => {
            let cs_T02 = eec24_T02.filter(e => e.y_year == i.year)
            let cs_T03 = eec24_T03.filter(e => e.y_year == i.year)
            let cs_T04 = eec24_T04.filter(e => e.y_year == i.year)

            let cb_T02 = eec20_T02.filter(e => e.y_year == i.year)
            let cb_T03 = eec20_T03.filter(e => e.y_year == i.year)
            let cb_T04 = eec20_T04.filter(e => e.y_year == i.year)

            let ry_T02 = eec21_T02.filter(e => e.y_year == i.year)
            let ry_T03 = eec21_T03.filter(e => e.y_year == i.year)
            let ry_T04 = eec21_T04.filter(e => e.y_year == i.year)

            let Aeec_T02 = eec_T02.filter(e => e.y_year == i.year)
            let Aeec_T03 = eec_T03.filter(e => e.y_year == i.year)
            let Aeec_T04 = eec_T04.filter(e => e.y_year == i.year)

            if (i.year == '2560') {
                datuse_water_prov60.push(
                    { category: 'อุปโภค', first: cs_T02[0].v_value, second: cb_T02[0].v_value, third: ry_T02[0].v_value, four: Aeec_T02[0].v_value },
                    { category: 'อุตสาหกรรม', first: cs_T04[0].v_value, second: cb_T04[0].v_value, third: ry_T04[0].v_value, four: Aeec_T04[0].v_value },
                    { category: 'เกษตรกรรม', first: cs_T03[0].v_value, second: cb_T03[0].v_value, third: ry_T03[0].v_value, four: Aeec_T03[0].v_value },

                )
            } else if (i.year == '2570') {
                datuse_water_prov70.push(
                    { category: 'อุปโภค', first: cs_T02[0].v_value, second: cb_T02[0].v_value, third: ry_T02[0].v_value, four: Aeec_T02[0].v_value },
                    { category: 'อุตสาหกรรม', first: cs_T04[0].v_value, second: cb_T04[0].v_value, third: ry_T04[0].v_value, four: Aeec_T04[0].v_value },
                    { category: 'เกษตรกรรม', first: cs_T03[0].v_value, second: cb_T03[0].v_value, third: ry_T03[0].v_value, four: Aeec_T03[0].v_value },

                )
            } else if (i.year == '2580') {
                datuse_water_prov80.push(
                    { category: 'อุปโภค', first: cs_T02[0].v_value, second: cb_T02[0].v_value, third: ry_T02[0].v_value, four: Aeec_T02[0].v_value },
                    { category: 'อุตสาหกรรม', first: cs_T04[0].v_value, second: cb_T04[0].v_value, third: ry_T04[0].v_value, four: Aeec_T04[0].v_value },
                    { category: 'เกษตรกรรม', first: cs_T03[0].v_value, second: cb_T03[0].v_value, third: ry_T03[0].v_value, four: Aeec_T03[0].v_value },

                )
            }

        })

        // console.log(WD_eec_T01)
        // console.log(datuse_water_Yindustry)
        let eec24_T05 = r.data.data.filter(e => e.title_c == "T05" && e.prov_c == "24")
        let eec20_T05 = r.data.data.filter(e => e.title_c == "T05" && e.prov_c == "20")
        let eec21_T05 = r.data.data.filter(e => e.title_c == "T05" && e.prov_c == "21")
        let eec_T05 = r.data.data.filter(e => e.title_c == "T05" && e.prov_c == "eec")

        year_WD_T05.map(i => {
            let cs = eec24_T05.filter(e => e.y_year == i.year)
            let cb = eec20_T05.filter(e => e.y_year == i.year)
            let ry = eec21_T05.filter(e => e.y_year == i.year)
            let eec = eec_T05.filter(e => e.y_year == i.year)
            // console.log(cs, i.year)
            datuse_water_prapa.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value), four: Number(eec[0].v_value) },
            )
        })
        // console.log(WD_eec_T05)
        // console.log(datuse_water_prapa)
    })

    //untreated_water
    let year_UW_T01 = []
    let year_UW_T02 = []
    let year_UW_T03 = []

    let UW_eec_T01 = []
    let UW_eec_T02 = []
    let UW_eec_T03 = []
    await axios.post(url + "/forecast_eec/untreated_water/year", { code: 'T01' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_UW_T01.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/untreated_water/year", { code: 'T02' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_UW_T02.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/untreated_water/year", { code: 'T03' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_UW_T03.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/untreated_water/data").then(async (r) => {
        let data = r.data.data
        let eec_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "eec")
        let eec_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "eec")
        let eec_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "eec")

        year_UW_T01.map(i => {
            let eec = eec_T01.filter(e => e.y_year == i.year)
            UW_industry.push(
                { category: `ปี ${i.year}`, four: Number(eec[0].v_value) },
            )
        })
        year_UW_T02.map(i => {
            let eec = eec_T02.filter(e => e.y_year == i.year)
            UW_prapa.push(
                { category: `ปี ${i.year}`, four: Number(eec[0].v_value) },
            )
        })
        year_UW_T03.map(i => {
            let eec = eec_T03.filter(e => e.y_year == i.year)
            UW_sum.push(
                { category: `ปี ${i.year}`, four: Number(eec[0].v_value) },
            )
        })

    })

    //elec_demand
    let year_ED_T01 = []
    let year_ED_T02 = []
    let year_ED_T03 = []

    let ED_eec_T01 = []
    let ED_eec_T02 = []
    let ED_eec_T03 = []
    await axios.post(url + "/forecast_eec/elec_demand/year", { code: 'T01' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_ED_T01.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/elec_demand/year", { code: 'T02' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_ED_T02.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/elec_demand/year", { code: 'T03' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_ED_T03.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/elec_demand/data").then(async (r) => {
        let data = r.data.data
        let eec24_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "24")
        let eec20_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "20")
        let eec21_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "21")
        let eec_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "eec")

        let eec_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "eec")
        let eec_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "eec")

        year_ED_T01.map(i => {
            let cs = eec24_T01.filter(e => e.y_year == i.year)
            let cb = eec20_T01.filter(e => e.y_year == i.year)
            let ry = eec21_T01.filter(e => e.y_year == i.year)
            let eec = eec_T01.filter(e => e.y_year == i.year)
            if (i.year !== '2559') {
                datelec_demand.push(
                    { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value), four: Number(eec[0].v_value) },
                )
            }
        })
        // console.log(datelec_demand)
        year_ED_T02.map(i => {
            let eec = eec_T02.filter(e => e.y_year == i.year)
            if (i.year !== '2559') {
                datelec_genelec_insys.push(
                    { category: `ปี ${i.year}`, four: Number(eec[0].v_value) },
                )
            }
        })
        // console.log(ED_eec_T02)
        // console.log(datelec_genelec_insys)
        year_ED_T03.map(i => {
            let eec = eec_T03.filter(e => e.y_year == i.year)
            if (i.year !== '2559') {
                datelec_genelec_afsys.push(
                    { category: `ปี ${i.year}`, four: Number(eec[0].v_value) },
                )
            }
        })
        // console.log(ED_eec_T03)
        // console.log(datelec_genelec_afsys)

    })

    //econ
    let year_econ_T01 = []
    let year_econ_T02 = []
    let year_econ_T03 = []
    let year_econ_T04 = []

    let econ_eec_T01 = []
    let econ_eec_T02 = []
    let econ_eec_T03 = []
    let econ_eec_T04 = []
    await axios.post(url + "/forecast_eec/econ/year", { code: 'T01' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_econ_T01.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/econ/year", { code: 'T02' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_econ_T02.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/econ/year", { code: 'T03' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_econ_T03.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/econ/year", { code: 'T04' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_econ_T04.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/econ/data").then(async (r) => {
        let data = r.data.data
        let eec24_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "24")
        let eec20_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "20")
        let eec21_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "21")
        let eec_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "eec")

        let eec_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "eec")
        let eec_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "eec")
        let eec_T04 = r.data.data.filter(e => e.title_c == "T04" && e.prov_c == "eec")

        year_econ_T01.map(i => {
            let cs = eec24_T01.filter(e => e.y_year == i.year)
            let cb = eec20_T01.filter(e => e.y_year == i.year)
            let ry = eec21_T01.filter(e => e.y_year == i.year)
            let eec = eec_T01.filter(e => e.y_year == i.year)
            datecon_tourist.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value), four: Number(eec[0].v_value) },
            )

        })
        // console.log(econ_eec_T01)
        // console.log(datecon_tourist)
        year_econ_T02.map(i => {
            let eec = eec_T02.filter(e => e.y_year == i.year)
            datecon_agri.push(
                { category: `ปี ${i.year}`, four: Number(eec[0].v_value) },
            )

        })
        // console.log(econ_eec_T02)
        // console.log(datecon_agri)
        year_econ_T03.map(i => {
            let eec = eec_T03.filter(e => e.y_year == i.year)
            datecon_industry.push(
                { category: `ปี ${i.year}`, four: Number(eec[0].v_value) },
            )

        })
        // console.log(econ_eec_T03)
        // console.log(datecon_industry)
        year_econ_T04.map(i => {
            let eec = eec_T04.filter(e => e.y_year == i.year)
            datecon_sevice.push(
                { category: `ปี ${i.year}`, four: Number(eec[0].v_value) },
            )
        })
        // console.log(econ_eec_T04)
        // console.log(datecon_sevice)

    })

    //labor
    let year_labor_T01 = []
    let year_labor_T02 = []
    let year_labor_T03 = []

    let labor_eec_T01 = []
    let labor_eec_T02 = []
    let labor_eec_T03 = []
    await axios.post(url + "/forecast_eec/labor/year", { code: 'T01' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_labor_T01.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/labor/year", { code: 'T02' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_labor_T02.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/labor/year", { code: 'T03' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_labor_T03.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/labor/data").then(async (r) => {
        let data = r.data.data
        let eec24_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "24")
        let eec20_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "20")
        let eec21_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "21")

        let eec24_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "24")
        let eec20_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "20")
        let eec21_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "21")
        let eec_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "eec")

        let eec24_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "24")
        let eec20_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "20")
        let eec21_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "21")
        let eec_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "eec")

        year_labor_T01.map(i => {
            let cs = eec24_T01.filter(e => e.y_year == i.year)
            let cb = eec20_T01.filter(e => e.y_year == i.year)
            let ry = eec21_T01.filter(e => e.y_year == i.year)
            datlabor_minwage.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value) },
            )

        })
        // console.log(labor_eec_T01)
        // console.log(datlabor_minwage)
        year_labor_T02.map(i => {
            let cs = eec24_T02.filter(e => e.y_year == i.year)
            let cb = eec20_T02.filter(e => e.y_year == i.year)
            let ry = eec21_T02.filter(e => e.y_year == i.year)
            let eec = eec_T02.filter(e => e.y_year == i.year)
            datlabor_employ.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value), four: Number(eec[0].v_value) },
            )

        })
        // console.log(labor_eec_T02)
        // console.log(datlabor_employ)
        year_labor_T03.map(i => {
            let cs = eec24_T03.filter(e => e.y_year == i.year)
            let cb = eec20_T03.filter(e => e.y_year == i.year)
            let ry = eec21_T03.filter(e => e.y_year == i.year)
            let eec = eec_T03.filter(e => e.y_year == i.year)
            datlabor_exert.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value), four: Number(eec[0].v_value) },
            )
        })
        // console.log(labor_eec_T03)
        // console.log(datlabor_exert)
    })

    //labor_edulevel
    let year_LE = []
    let year_LE_T01 = []
    let year_LE_T02 = []
    let year_LE_T03 = []
    let year_LE_T04 = []
    let year_LE_T05 = []

    let LE_eec = []
    let LE_eec_T01 = []
    let LE_eec_T02 = []
    let LE_eec_T03 = []
    let LE_eec_T04 = []
    let LE_eec_T05 = []
    await axios.post(url + "/forecast_eec/labor_edulevel/years").then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_LE.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/labor_edulevel/year", { code: 'T01' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_LE_T01.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/labor_edulevel/year", { code: 'T02' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_LE_T02.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/labor_edulevel/year", { code: 'T03' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_LE_T03.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/labor_edulevel/year", { code: 'T04' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_LE_T04.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/labor_edulevel/year", { code: 'T05' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_LE_T05.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/labor_edulevel/data").then(async (r) => {
        let data = r.data.data
        let eec_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "eec")
        let eec_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "eec")
        let eec_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "eec")
        let eec_T04 = r.data.data.filter(e => e.title_c == "T04" && e.prov_c == "eec")
        let eec_T05 = r.data.data.filter(e => e.title_c == "T05" && e.prov_c == "eec")

        year_LE.map(i => {
            let T01 = eec_T01.filter(e => e.y_year == i.year)
            let T02 = eec_T02.filter(e => e.y_year == i.year)
            let T03 = eec_T03.filter(e => e.y_year == i.year)
            let T04 = eec_T04.filter(e => e.y_year == i.year)
            let T05 = eec_T05.filter(e => e.y_year == i.year)
            datlabor_edulevel_all.push(
                { category: `ปี ${i.year}`, first: Number(T01[0].v_value), second: Number(T02[0].v_value), third: Number(T03[0].v_value), four: Number(T04[0].v_value), fifth: Number(T05[0].v_value) },
            )
        })
        // console.log(LE_eec)
        // console.log(datlabor_edulevel_all)

        year_LE_T01.map(i => {
            let eec = eec_T01.filter(e => e.y_year == i.year)
            datlabor_edulevel_M3.push(
                { year: `${i.year}`, value: Number(eec[0].v_value) },
            )

        })
        // console.log(LE_eec_T01)
        // console.log(datlabor_edulevel_M3)
        year_LE_T02.map(i => {
            let eec = eec_T02.filter(e => e.y_year == i.year)
            datlabor_edulevel_M6.push(
                { year: `${i.year}`, value: Number(eec[0].v_value) },
            )

        })
        // console.log(LE_eec_T02)
        // console.log(datlabor_edulevel_M6)
        year_LE_T03.map(i => {
            let eec = eec_T03.filter(e => e.y_year == i.year)
            datlabor_edulevel_profession.push(
                { year: `${i.year}`, value: Number(eec[0].v_value) },
            )
        })
        // console.log(LE_eec_T03)
        year_LE_T04.map(i => {
            let eec = eec_T04.filter(e => e.y_year == i.year)
            datlabor_edulevel_Bachelor.push(
                { year: `${i.year}`, value: Number(eec[0].v_value) },
            )
        })
        // console.log(LE_eec_T04)
        year_LE_T05.map(i => {
            let eec = eec_T05.filter(e => e.y_year == i.year)
            datlabor_edulevel_MoreBachelor.push(
                { year: `${i.year}`, value: Number(eec[0].v_value) },
            )
        })
        // console.log(LE_eec_T05)
        // console.log(datlabor_exert)
    })

    //waste_raffle
    let year_WR_T01 = []
    let year_WR_T02 = []
    let year_WR_T03 = []

    let WR_eec_T01 = []
    let WR_eec_T02 = []
    let WR_eec_T03 = []
    await axios.post(url + "/forecast_eec/waste_raffle/year", { code: 'T01' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_WR_T01.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/waste_raffle/year", { code: 'T02' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_WR_T02.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/waste_raffle/year", { code: 'T03' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_WR_T03.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/waste_raffle/data").then(async (r) => {
        let data = r.data.data
        let eec_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "eec")
        let eec_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "eec")
        let eec_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "eec")

        year_WR_T01.map(i => {
            let eec = eec_T01.filter(e => e.y_year == i.year)
            datwaste_industry.push(
                { category: `ปี ${i.year}`, four: Number(eec[0].v_value) },
            )

        })
        // console.log(WR_eec_T01)
        // console.log(datwaste_industry)
        year_WR_T02.map(i => {
            let eec = eec_T02.filter(e => e.y_year == i.year)
            datwaste_infectious.push(
                { category: `ปี ${i.year}`, four: Number(eec[0].v_value) },
            )

        })
        // console.log(WR_eec_T02)
        // console.log(datwaste_infectious)
        year_WR_T03.map(i => {
            let eec = eec_T03.filter(e => e.y_year == i.year)
            datwaste_garbage.push(
                { category: `ปี ${i.year}`, four: Number(eec[0].v_value) },
            )
        })
        // console.log(WR_eec_T03)
        // console.log(datwaste_garbage)

    })

    //greenhouse_gas
    let year_gg_T01 = []
    let year_gg_T02 = []
    let year_gg_T03 = []
    let year_gg_T04 = []
    let year_gg_T05 = []

    let gg_eec_T01 = []
    let gg_eec_T02 = []
    let gg_eec_T03 = []
    let gg_eec_T04 = []
    let gg_eec_T05 = []
    await axios.post(url + "/forecast_eec/greenhouse_gas/year", { code: 'T01' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_gg_T01.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/greenhouse_gas/year", { code: 'T02' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_gg_T02.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/greenhouse_gas/year", { code: 'T03' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_gg_T03.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/greenhouse_gas/year", { code: 'T04' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_gg_T04.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/greenhouse_gas/year", { code: 'T05' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_gg_T05.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/greenhouse_gas/data").then(async (r) => {
        let data = r.data.data
        let eec_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "TH")
        let eec_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "TH")
        let eec_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "TH")
        let eec_T04 = r.data.data.filter(e => e.title_c == "T04" && e.prov_c == "TH")
        let eec_T05 = r.data.data.filter(e => e.title_c == "T05" && e.prov_c == "TH")

        year_gg_T01.map(i => {
            let eec = eec_T01.filter(e => e.y_year == i.year)
            datgas_energy.push(
                { category: `ปี ${i.year}`, four: Number(eec[0].v_value) },
            )

        })
        // console.log(gg_eec_T01)
        // console.log(datgas_energy)
        year_gg_T02.map(i => {
            let eec = eec_T02.filter(e => e.y_year == i.year)
            datgas_waste.push(
                { category: `ปี ${i.year}`, four: Number(eec[0].v_value) },
            )

        })
        // console.log(gg_eec_T02)
        // console.log(datgas_waste)
        year_gg_T03.map(i => {
            let eec = eec_T03.filter(e => e.y_year == i.year)
            datgas_industry.push(
                { category: `ปี ${i.year}`, four: Number(eec[0].v_value) },
            )
        })
        // console.log(gg_eec_T03)
        // console.log(datgas_industry)
        year_gg_T04.map(i => {
            let eec = eec_T04.filter(e => e.y_year == i.year)
            datgas_agri.push(
                { category: `ปี ${i.year}`, four: Number(eec[0].v_value) },
            )
        })
        // console.log(gg_eec_T04)
        // console.log(datgas_agri)
        year_gg_T05.map(i => {
            let eec = eec_T05.filter(e => e.y_year == i.year)
            datgas_all.push(
                { category: `ปี ${i.year}`, four: Number(eec[0].v_value) },
            )
        })
        // console.log(gg_eec_T05)
        // console.log(datgas_all)


    })

    //landuse
    let year_lu_T01 = []
    let year_lu_T02 = []
    let year_lu_T03 = []
    let year_lu_T04 = []

    let lu_eec_T01 = []
    let lu_eec_T02 = []
    let lu_eec_T03 = []
    let lu_eec_T04 = []
    await axios.post(url + "/forecast_eec/landuse/year", { code: 'T01' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_lu_T01.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/landuse/year", { code: 'T02' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_lu_T02.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/landuse/year", { code: 'T03' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_lu_T03.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/landuse/year", { code: 'T04' }).then(async (r) => {
        let d = r.data.data
        d.map(i => {
            year_lu_T04.push({ year: i.y_year })
        })
    })
    await axios.post(url + "/forecast_eec/landuse/data").then(async (r) => {
        let data = r.data.data
        let eec24_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "24")
        let eec20_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "20")
        let eec21_T01 = r.data.data.filter(e => e.title_c == "T01" && e.prov_c == "21")

        let eec24_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "24")
        let eec20_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "20")
        let eec21_T02 = r.data.data.filter(e => e.title_c == "T02" && e.prov_c == "21")

        let eec24_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "24")
        let eec20_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "20")
        let eec21_T03 = r.data.data.filter(e => e.title_c == "T03" && e.prov_c == "21")

        let eec24_T04 = r.data.data.filter(e => e.title_c == "T04" && e.prov_c == "24")
        let eec20_T04 = r.data.data.filter(e => e.title_c == "T04" && e.prov_c == "20")
        let eec21_T04 = r.data.data.filter(e => e.title_c == "T04" && e.prov_c == "21")

        year_lu_T01.map(i => {
            let cs = eec24_T01.filter(e => e.y_year == i.year)
            let cb = eec20_T01.filter(e => e.y_year == i.year)
            let ry = eec21_T01.filter(e => e.y_year == i.year)
            datlu_urban.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value) },
            )
        })
        // console.log(lu_eec_T01)
        // console.log(datlu_urban)

        year_lu_T02.map(i => {
            let cs = eec24_T02.filter(e => e.y_year == i.year)
            let cb = eec20_T02.filter(e => e.y_year == i.year)
            let ry = eec21_T02.filter(e => e.y_year == i.year)
            datlu_industry.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value) },
            )
        })
        // console.log(lu_eec_T02)
        // console.log(datlu_industry)
        year_lu_T03.map(i => {
            let cs = eec24_T03.filter(e => e.y_year == i.year)
            let cb = eec20_T03.filter(e => e.y_year == i.year)
            let ry = eec21_T03.filter(e => e.y_year == i.year)
            datlu_agri.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value) },
            )
        })
        // console.log(lu_eec_T03)
        // console.log(datlu_agri)
        year_lu_T04.map(i => {
            let cs = eec24_T04.filter(e => e.y_year == i.year)
            let cb = eec20_T04.filter(e => e.y_year == i.year)
            let ry = eec21_T04.filter(e => e.y_year == i.year)
            datlu_envi.push(
                { category: `ปี ${i.year}`, first: Number(cs[0].v_value), second: Number(cb[0].v_value), third: Number(ry[0].v_value) },
            )
        })
        // console.log(lu_eec_T04)
        // console.log(datlu_envi)

    })



}

let chart_all = (data, umit, divchart, color1, color2) => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    var chart = am4core.create(divchart, am4charts.XYChart)
    chart.colors.step = 2;
    chart.numberFormatter.numberFormat = "#,###,###,###.##as" + ` ${umit}` + "'";

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95

    var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'category'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0;

    var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name, unit, color1, color2) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name
        series.columns.template.tooltipText = `{categoryX} : [bold]{valueY.formatNumber('###,###,###.##')} ${unit}[/]`;

        series.events.on("hidden", arrangeColumns);
        series.events.on("shown", arrangeColumns);

        series.stroke = am4core.color(color2);
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color(color2);
        series.columns.template.stroke = am4core.color(color1);
        series.columns.template.fill = am4core.color(color1);

        series.tooltip.label.adapter.add("text", function (text, target) {
            if (target.dataItem && target.dataItem.valueY == 0) {
                return "";
            }
            else {
                return text;
            }
        });

        var bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = false
        bullet.dy = 30;
        bullet.label.text = "{valueY.formatNumber('###,###,###.##')}"
        bullet.label.fill = am4core.color('#ffffff')

        return series;
    }

    chart.data = data

    if (divchart == 'chartdiv12') {

        createSeries('four', 'ภาพรวม', umit, color1, color2);
    } else {
        createSeries('four', 'ภาพรวมทั้ง 3 จังหวัด', umit, color1, color2);
    }

    function arrangeColumns() {

        var series = chart.series.getIndex(0);

        var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
        if (series.dataItems.length > 1) {
            var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
            var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
            var delta = ((x1 - x0) / chart.series.length) * w;
            if (am4core.isNumber(delta)) {
                var middle = chart.series.length / 2;

                var newIndex = 0;
                chart.series.each(function (series) {
                    if (!series.isHidden && !series.isHiding) {
                        series.dummyData = newIndex;
                        newIndex++;
                    }
                    else {
                        series.dummyData = chart.series.indexOf(series);
                    }
                })
                var visibleCount = newIndex;
                var newMiddle = visibleCount / 2;

                chart.series.each(function (series) {
                    var trueIndex = chart.series.indexOf(series);
                    var newIndex = series.dummyData;

                    var dx = (newIndex - trueIndex + middle - newMiddle) * delta

                    series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                    series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                })
            }
        }
    }
    chart.cursor = new am4charts.XYCursor()
    chart.exporting.menu = new am4core.ExportMenu();
    // chart.exporting.adapter.add("data", function (data, target) {
    //     var data = [];
    //     chart.series.each(function (series) {
    //         for (var i = 0; i < series.data.length; i++) {
    //             series.data[i].name = series.name;
    //             data.push(series.data[i]);
    //         }
    //     });
    //     return { data: data };
    // });
}
let chart_by_prov = (data, umit, divchart) => {
    // $("#chartdiv2").removeAttr("style").css({ "width": "1200px", "height": "800px" })
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    var chart = am4core.create(divchart, am4charts.XYChart)
    chart.colors.step = 2;
    chart.numberFormatter.numberFormat = "##,###,###,###.##as" + ` ${umit}` + "'";

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95

    var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'category'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0;

    var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name, unit, color1, color2) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name
        series.columns.template.tooltipText = `${name} : [bold]{valueY.formatNumber('###,###,###.##')} ${unit}[/]`;

        series.events.on("hidden", arrangeColumns);
        series.events.on("shown", arrangeColumns);

        series.tooltip.pointerOrientation = "down";
        series.columns.template.tooltipY = 0;
        series.tooltip.dy = -5;

        series.stroke = am4core.color(color2);
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color(color2);
        series.columns.template.stroke = am4core.color(color1);
        series.columns.template.fill = am4core.color(color1);

        // var bullet = series.bullets.push(new am4charts.LabelBullet())
        // bullet.interactionsEnabled = false
        // bullet.dy = 10;
        // bullet.label.text = "{valueY.formatNumber('###,###,###.##')}"
        // bullet.label.fill = am4core.color('#FFF')
        // bullet.label.hideOversized = false;
        // bullet.label.truncate = false;

        return series;
    }

    chart.data = data

    createSeries('first', 'จังหวัดฉะเชิงเทรา', umit, '#CB0000', '#CB0000');
    createSeries('second', 'จังหวัดชลบุรี', umit, '#F2C95F', '#F2C95F');
    createSeries('third', 'จังหวัดระยอง', umit, '#000080', '#000080');

    function arrangeColumns() {

        var series = chart.series.getIndex(0);

        var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
        if (series.dataItems.length > 1) {
            var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
            var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
            var delta = ((x1 - x0) / chart.series.length) * w;
            if (am4core.isNumber(delta)) {
                var middle = chart.series.length / 2;

                var newIndex = 0;
                chart.series.each(function (series) {
                    if (!series.isHidden && !series.isHiding) {
                        series.dummyData = newIndex;
                        newIndex++;
                    }
                    else {
                        series.dummyData = chart.series.indexOf(series);
                    }
                })
                var visibleCount = newIndex;
                var newMiddle = visibleCount / 2;

                chart.series.each(function (series) {
                    var trueIndex = chart.series.indexOf(series);
                    var newIndex = series.dummyData;

                    var dx = (newIndex - trueIndex + middle - newMiddle) * delta

                    series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                    series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                })
            }
        }
    }
    chart.cursor = new am4charts.XYCursor()
    chart.exporting.menu = new am4core.ExportMenu();
    // chart.exporting.adapter.add("data", function (data, target) {
    //     var data = [];
    //     chart.series.each(function (series) {
    //         for (var i = 0; i < series.data.length; i++) {
    //             series.data[i].name = series.name;
    //             data.push(series.data[i]);
    //         }
    //     });
    //     return { data: data };
    // });
}
let chart_edu = (data, name, umit) => {
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv10", am4charts.XYChart);
    chart.numberFormatter.numberFormat = "#,###,###' " + umit + "'";

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95
    // Add data
    chart.data = data

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.renderer.grid.template.location = 0.5;
    dateAxis.baseInterval = {
        count: 1,
        timeUnit: "year"
    }

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "year";
    series.name = name
    series.strokeWidth = 3;
    series.connect = false;
    series.tensionX = 0.8;
    series.fillOpacity = 0.2;
    series.stroke = am4core.color("#77dddd")
    series.fill = am4core.color("#77dddd")
    // series.tooltip.getFillFromObject = false;
    // series.tooltip.background.fill = am4core.color("#77dddd");
    // series.tooltipText = "ปี {dateX.formatDate('yyyy')} : [bold]{valueY} คน[/]";

    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.stroke = new am4core.InterfaceColorSet().getFor("background");
    bullet.strokeWidth = 2;
    bullet.tooltipText = "ปี {dateX.formatDate('yyyy')} : [bold]{valueY}[/]";
    bullet.circle.radius = 4;
    bullet.adapter.add("fill", function (fill, target) {
        if (target.dataItem.valueY < 0) {
            return am4core.color("#ce3a3a");
        }
        return fill;
    })

    var range = valueAxis.createSeriesRange(series);
    range.value = 0;
    range.endValue = -999999;
    range.contents.stroke = am4core.color("#ce3a3a");
    range.contents.fill = range.contents.stroke;
    range.contents.fillOpacity = 0.2;

    // chart.scrollbarX = new am4core.Scrollbar();
    chart.cursor = new am4charts.XYCursor()
    chart.exporting.menu = new am4core.ExportMenu();
    // chart.exporting.adapter.add("data", function (data, target) {
    //     var data = [];
    //     chart.series.each(function (series) {
    //         for (var i = 0; i < series.data.length; i++) {
    //             series.data[i].name = series.name;
    //             data.push(series.data[i]);
    //         }
    //     });
    //     return { data: data };
    // });

}
$('#laboredu').on('change', function () {
    var type = $('#laboredu').val()
    if (type == 'M3') {
        chart_edu(datlabor_edulevel_M3, "ระดับการศึกษา ม.3 หรือต่ำกว่า", ' คน')
    }
    else if (type == 'M6') {
        chart_edu(datlabor_edulevel_M6, "ระดับการศึกษา ม.6", 'คน')
    }
    else if (type == 'profession') {
        chart_edu(datlabor_edulevel_profession, "ระดับการศึกษาวิชาชีพ", ' คน')
    }
    else if (type == 'Bachelor') {
        chart_edu(datlabor_edulevel_Bachelor, "ระดับการศึกษาปรีญญาตรี", ' คน')
    }
    else if (type == 'MoreBachelor') {
        chart_edu(datlabor_edulevel_MoreBachelor, "ระดับการศึกษาสูงกว่าปรีญญาตรี", ' คน')
    }
})
$('#labor_Demploy').on('change', function () {
    var type = $('#labor_Demploy').val()
    if (type == "eec") {
        chart_all(datlabor_employ, 'คน', 'chartdiv10', '#77AADD', '#77AADD')
    } else if (type == "byprov") {
        chart_by_prov(datlabor_employ, 'คน', 'chartdiv10')
    }
})
$('#labor_Dexert').on('change', function () {
    var type = $('#labor_Dexert').val()
    if (type == "eec") {
        chart_all(datlabor_exert, 'คน', 'chartdiv10', '#40B2BF', '#40B2BF')
    } else if (type == "byprov") {
        chart_by_prov(datlabor_exert, 'คน', 'chartdiv10')
    }

})
$('#labortype').on('change', function () {
    var type = $('#labortype').val()
    if (type == 'exert') {
        $('#hchart10').html('การคาดการณ์กําลังแรงงานไทยในเขตพัฒนาพิเศษภาคตะวันออก (EEC)')
        $('#d_exert').show()
        $('#d_employ').hide()
        $('#d_edu').hide()
        chart_all(datlabor_exert, 'คน', 'chartdiv10', '#40B2BF', '#40B2BF')
    }
    else if (type == 'employ') {
        $('#hchart10').html('การคาดการณ์การจ้างแรงงานไทยในเขตพัฒนาพิเศษภาคตะวันออก (EEC)')
        $('#d_exert').hide()
        $('#d_employ').show()
        $('#d_edu').hide()
        chart_all(datlabor_employ, 'คน', 'chartdiv10', '#359ECA', '#359ECA')
    }
    else if (type == 'minwage') {
        $('#hchart10').html('การคาดการณ์อัตราค่าแรงขั้นต่ำของแรงงานไทยในเขตพัฒนาพิเศษภาคตะวันออก (EEC)')
        $('#d_exert').hide()
        $('#d_employ').hide()
        $('#d_edu').hide()
        chart_by_prov(datlabor_minwage, 'คน', 'chartdiv10')
    }
    else if (type == 'edu') {
        $('#hchart10').html(`การคาดการณ์ความต้องการจำนวนแรงงานไทย แยกตามระดับการศึกษาในเขตพัฒนาพิเศษภาคตะวันออก (EEC)<br>จำแนกตามระดับการศึกษา`)
        $('#d_exert').hide()
        $('#d_employ').hide()
        $('#d_edu').show()
        chart_edu(datlabor_edulevel_M3, "ระดับการศึกษา ม.3 หรือต่ำกว่า", ' คน')
    }
})
$('#cardlabor').hide();
$('#d_exert').hide()
$('#d_employ').hide()
$('#d_edu').hide()
$('#trendlabor').click(function () {
    if (this.checked) {
        $('#hchart10').html('การคาดการณ์แรงงานไทยในเขตพัฒนาพิเศษภาคตะวันออก (EEC)')
        $('#cardlabor').slideDown();
        $('#labortype').prop('selectedIndex', 0);

        $('#d_exert').show()
        $('#d_employ').hide()
        $('#d_edu').hide()
        chart_all(datlabor_employ, 'คน', 'chartdiv10', '#359ECA', '#359ECA')

    } else {
        $('#hchart10').html('')
        $('#cardlabor').slideUp();
    }
})

$('#econtype').on('change', function () {
    var type = $('#econtype').val()
    if (type == 'eec') { chart_all(datecon_tourist, 'คน', 'chartdiv9', '#77AADD', '#77AADD') }
    else if (type == 'byprov') { chart_by_prov(datecon_tourist, 'คน', 'chartdiv9') }
    else if (type == 'agri') { chart_all(datecon_agri, 'ล้านบาท', 'chartdiv9', '#aadd77', '#aadd77') }
    else if (type == 'industry') { chart_all(datecon_industry, 'ล้านบาท', 'chartdiv9', '#7777dd', '#7777dd') }
    else if (type == 'sevice') { chart_all(datecon_sevice, 'ล้านบาท', 'chartdiv9', '#77dddd', '#77dddd') }
})
$('#cardecon').hide();
$('#trendecon').click(function () {
    if (this.checked) {
        $('#cardecon').slideDown();
        $('#econtype').prop('selectedIndex', 0);
        chart_all(datecon_tourist, 'คน', 'chartdiv9', '#77AADD', '#77AADD')
    } else {
        $('#cardecon').slideUp();
    }
})

$('#UWtype').on('change', function () {
    var type = $('#UWtype').val()
    if (type == 'sum') { chart_all(UW_sum, 'ล้าน ลบ.ม.', 'chartdiv8', '#20DFC1', '#1CC8AD') }
    else if (type == 'prapa') { chart_all(UW_prapa, 'ล้าน ลบ.ม.', 'chartdiv8', '#20DFC1', '#1CC8AD') }
    else if (type == 'industry') { chart_all(UW_industry, 'ล้าน ลบ.ม.', 'chartdiv8', '#20DFC1', '#1CC8AD') }
})
$('#cardUW').hide();
$('#trendUW').click(function () {
    if (this.checked) {
        $('#cardUW').slideDown();
        $('#UWtype').prop('selectedIndex', 0);
        chart_all(UW_sum, 'ล้าน ลบ.ม.', 'chartdiv8', '#20DFC1', '#1CC8AD')
    } else {
        $('#cardUW').slideUp();
    }
})

$('#electype').on('change', function () {
    var type = $('#electype').val()
    if (type == 'eec') { chart_all(datelec_demand, 'MW', 'chartdiv7', '#FFD166', '#E5BC5B') }
    else if (type == 'byprov') { chart_by_prov(datelec_demand, 'MW', 'chartdiv7') }
    else if (type == 'insys') { chart_all(datelec_genelec_insys, 'MW', 'chartdiv7', '#FFD166', '#E5BC5B') }
    else if (type == 'afsys') { chart_all(datelec_genelec_afsys, 'MW', 'chartdiv7', '#FFD166', '#E5BC5B') }
})
$('#cardelec').hide();
$('#trendelec').click(function () {
    if (this.checked) {
        $('#cardelec').slideDown();
        $('#electype').prop('selectedIndex', 0);
        chart_all(datelec_demand, 'MW', 'chartdiv7', '#FFD166', '#E5BC5B')
    } else {
        $('#cardelec').slideUp();
    }
})
//การคาดการณ์ปริมาณน้ำเสียชุมชนในกรณีที่มีการพัฒนาพื้นที่เขตพัฒนาพิเศษ ภาคตะวันออก ปี พ.ศ. ๒๕๖๔ – ๒๕๗๐
$('#wastetype').on('change', function () {
    var type = $('#wastetype').val()
    if (type == 'byprov') {
        let data = []
        datwaste.map(i => {
            data.push({ category: i.category, first: i.first, second: i.second, third: i.third })
        })
        chart_by_prov(data, 'ลบ.ม./วัน', 'chartdiv2')
        'การคาดการณ์ปริมาณน้ำเสียชุมชนในกรณีที่มีการพัฒนาพื้นที่เขตพัฒนาพิเศษ ภาคตะวันออก ปี พ.ศ. 2564 – 2570'
    } else {
        let data = []
        datwaste.map(i => {
            data.push({ category: i.category, four: i.four })
        })
        chart_all(data, 'ลบ.ม./วัน', 'chartdiv2', '#D5CA18', '#D5CA18')
    }
})
let calwaste = () => {
    var numpop = $('#numpopwaste').val();
    var cal = numpop * 150;
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    var string = formatNumber(cal);
    $('#valuewaste').html(string)
}
$('#cardwaste').hide();
$('#trendwaste').click(function () {
    if (this.checked) {
        $('#wastetype').prop('selectedIndex', 0);
        $('#cardwaste').slideDown();
        chart_all(datwaste, 'ลบ.ม./วัน', 'chartdiv2', '#D5CA18', '#D5CA18')
    } else {
        $('#cardwaste').slideUp();
    }
})
$('#offwaste').hide()
$('#calwaste').hide()
let onwaste = () => {
    $('#onwaste').hide()
    $('#offwaste').show()
    $('#calwaste').slideDown();
}
let offwaste = () => {
    $('#onwaste').show()
    $('#offwaste').hide()
    $('#calwaste').slideUp();
}

//การคาดการณ์ปริมาณขยะมูลฝอยในพื้นที่เขตเศรษฐกิจพิเศษภาคตะวันออก พ.ศ. ๒๕๖๔ - ๒๕๖๙
$('#garbagetype').on('change', function () {
    var type = $('#garbagetype').val()
    if (type == 'byprov') {
        let data = []
        datgarbage.map(i => {
            data.push({ category: i.category, first: i.first, second: i.second, third: i.third })
        })
        chart_by_prov(data, 'ตัน/วัน', 'chartdiv3')
        'การคาดการณ์ปริมาณน้ำเสียชุมชนในกรณีที่มีการพัฒนาพื้นที่เขตพัฒนาพิเศษ ภาคตะวันออก ปี พ.ศ. 2564 – 2570'
    } else {
        let data = []
        datgarbage.map(i => {
            data.push({ category: i.category, four: i.four })
        })
        chart_all(data, 'ตัน/วัน', 'chartdiv3', '#E97537', '#E97537')
    }
})
let calgarbage = () => {
    var numpop = $('#numpopgarbage').val();
    var cal = numpop * 1.17;
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    var string = formatNumber(cal);
    $('#valuegarbage').html(string)
}
$('#cardgarbage').hide();
$('#trendgarbage').click(function () {
    if (this.checked) {
        $('#garbagetype').prop('selectedIndex', 0);
        $('#cardgarbage').slideDown();
        chart_all(datgarbage, 'ตัน/วัน', 'chartdiv3', '#E97537', '#E97537')
    } else {
        $('#cardgarbage').slideUp();
    }
})
$('#offgarbage').hide()
$('#calgarbage').hide()
let ongarbage = () => {
    $('#ongarbage').hide()
    $('#offgarbage').show()
    $('#calgarbage').slideDown();
}
let offgarbage = () => {
    $('#ongarbage').show()
    $('#offgarbage').hide()
    $('#calgarbage').slideUp();
}

let chartUW_by_prov = (data, umit, divchart) => {
    // $("#chartdiv2").removeAttr("style").css({ "width": "1200px", "height": "800px" })
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    var chart = am4core.create(divchart, am4charts.XYChart)
    chart.colors.step = 2;
    chart.numberFormatter.numberFormat = "##,###,###,###as" + ` ${umit}` + "'";

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95

    var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'category'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0;

    var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name, unit, color1, color2) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name
        series.columns.template.tooltipText = `${name} : [bold]{valueY.formatNumber('###,###,###.##')} ${unit}[/]`;

        series.events.on("hidden", arrangeColumns);
        series.events.on("shown", arrangeColumns);

        series.stroke = am4core.color(color2);
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color(color2);
        series.columns.template.stroke = am4core.color(color1);
        series.columns.template.fill = am4core.color(color1);


        var bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = false
        bullet.dy = 10;
        bullet.label.text = "{valueY.formatNumber('###,###,###.##')}"
        bullet.label.fill = am4core.color('#ffffff')

        return series;
    }

    chart.data = data
    createSeries('first', 'จังหวัดฉะเชิงเทรา', umit, '#CB0000', '#CB0000');
    createSeries('second', 'จังหวัดชลบุรี', umit, '#F2C95F', '#F2C95F');
    createSeries('third', 'จังหวัดระยอง', umit, '#000080', '#000080');

    function arrangeColumns() {

        var series = chart.series.getIndex(0);

        var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
        if (series.dataItems.length > 1) {
            var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
            var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
            var delta = ((x1 - x0) / chart.series.length) * w;
            if (am4core.isNumber(delta)) {
                var middle = chart.series.length / 2;

                var newIndex = 0;
                chart.series.each(function (series) {
                    if (!series.isHidden && !series.isHiding) {
                        series.dummyData = newIndex;
                        newIndex++;
                    }
                    else {
                        series.dummyData = chart.series.indexOf(series);
                    }
                })
                var visibleCount = newIndex;
                var newMiddle = visibleCount / 2;

                chart.series.each(function (series) {
                    var trueIndex = chart.series.indexOf(series);
                    var newIndex = series.dummyData;

                    var dx = (newIndex - trueIndex + middle - newMiddle) * delta

                    series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                    series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                })
            }
        }
    }
    chart.exporting.menu = new am4core.ExportMenu();
    // chart.exporting.adapter.add("data", function (data, target) {
    //     var data = [];
    //     chart.series.each(function (series) {
    //         for (var i = 0; i < series.data.length; i++) {
    //             series.data[i].name = series.name;
    //             data.push(series.data[i]);
    //         }
    //     });
    // return { data: data };
    // });
}
let chartUW_by_cat = (data, umit, divchart) => {
    // $("#chartdiv2").removeAttr("style").css({ "width": "1200px", "height": "800px" })
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    var chart = am4core.create(divchart, am4charts.XYChart)
    chart.colors.step = 2;
    chart.numberFormatter.numberFormat = "##,###,###,###as" + ` ${umit}` + "'";

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95

    var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'category'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0;

    var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name, unit) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name
        series.columns.template.tooltipText = `${name} : [bold]{valueY.formatNumber('###,###,###.##')} ${unit}[/]`;

        series.events.on("hidden", arrangeColumns);
        series.events.on("shown", arrangeColumns);

        var bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = false
        bullet.dy = 15;
        bullet.label.text = "{valueY.formatNumber('###,###,###.##')}"
        bullet.label.fill = am4core.color('#ffffff')

        return series;
    }

    chart.data = data

    createSeries('first', 'อุปโภคบริโภค', umit);
    createSeries('second', 'อุตสาหกรรม', umit);
    createSeries('third', 'เกษตรกรรม', umit);

    function arrangeColumns() {

        var series = chart.series.getIndex(0);

        var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
        if (series.dataItems.length > 1) {
            var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
            var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
            var delta = ((x1 - x0) / chart.series.length) * w;
            if (am4core.isNumber(delta)) {
                var middle = chart.series.length / 2;

                var newIndex = 0;
                chart.series.each(function (series) {
                    if (!series.isHidden && !series.isHiding) {
                        series.dummyData = newIndex;
                        newIndex++;
                    }
                    else {
                        series.dummyData = chart.series.indexOf(series);
                    }
                })
                var visibleCount = newIndex;
                var newMiddle = visibleCount / 2;

                chart.series.each(function (series) {
                    var trueIndex = chart.series.indexOf(series);
                    var newIndex = series.dummyData;

                    var dx = (newIndex - trueIndex + middle - newMiddle) * delta

                    series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                    series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                })
            }
        }
    }
    chart.exporting.menu = new am4core.ExportMenu();
    // chart.exporting.adapter.add("data", function (data, target) {
    //     var data = [];
    //     chart.series.each(function (series) {
    //         for (var i = 0; i < series.data.length; i++) {
    //             series.data[i].name = series.name;
    //             data.push(series.data[i]);
    //         }
    //     });
    //     return { data: data };
    // });
}
let chartUW_by_year = (data, umit, divchart) => {
    // $("#chartdiv2").removeAttr("style").css({ "width": "1200px", "height": "800px" })
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    var chart = am4core.create(divchart, am4charts.XYChart)
    chart.colors.step = 2;
    chart.numberFormatter.numberFormat = "##,###,###,###as" + ` ${umit}` + "'";

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95

    var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'category'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0;

    var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name, unit, color1, color2) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name
        series.columns.template.tooltipText = `${name} : [bold]{valueY.formatNumber('###,###,###.##')} ${unit}[/]`;

        series.events.on("hidden", arrangeColumns);
        series.events.on("shown", arrangeColumns);

        series.stroke = am4core.color(color2);
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color(color2);
        series.columns.template.stroke = am4core.color(color1);
        series.columns.template.fill = am4core.color(color1);


        var bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = false
        bullet.dy = 10;
        bullet.label.text = "{valueY.formatNumber('###,###,###.##')}"
        bullet.label.fill = am4core.color('#ffffff')

        return series;
    }

    chart.data = data

    createSeries('first', 'ปี 2560', umit, '#F73E63', '#F50D3B');
    createSeries('second', 'ปี 2570', umit, '#EC486B', '#F17690');
    createSeries('third', 'ปี 2580', umit, '#35040C', '#640817');

    function arrangeColumns() {

        var series = chart.series.getIndex(0);

        var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
        if (series.dataItems.length > 1) {
            var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
            var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
            var delta = ((x1 - x0) / chart.series.length) * w;
            if (am4core.isNumber(delta)) {
                var middle = chart.series.length / 2;

                var newIndex = 0;
                chart.series.each(function (series) {
                    if (!series.isHidden && !series.isHiding) {
                        series.dummyData = newIndex;
                        newIndex++;
                    }
                    else {
                        series.dummyData = chart.series.indexOf(series);
                    }
                })
                var visibleCount = newIndex;
                var newMiddle = visibleCount / 2;

                chart.series.each(function (series) {
                    var trueIndex = chart.series.indexOf(series);
                    var newIndex = series.dummyData;

                    var dx = (newIndex - trueIndex + middle - newMiddle) * delta

                    series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                    series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                })
            }
        }
    }
    chart.exporting.menu = new am4core.ExportMenu();
    // chart.exporting.adapter.add("data", function (data, target) {
    //     var data = [];
    //     chart.series.each(function (series) {
    //         for (var i = 0; i < series.data.length; i++) {
    //             series.data[i].name = series.name;
    //             data.push(series.data[i]);
    //         }
    //     });
    //     return { data: data };
    // });
}
///cardusewater
$('#cardusewater').hide();
$('#trendusewater').click(function () {
    if (this.checked) {
        $('#usewatecat').prop('selectedIndex', 0);
        $('#usewateyear').prop('selectedIndex', 0);
        $('#usewatetype').prop('selectedIndex', 0);
        $('#cardusewater').slideDown();
        // chartUW_by_cat(datuse_water_all, 'ล้าน ลบ.ม./ปี', 'chartdiv4')
        chartUW_all()
    } else {
        $('#cardusewater').slideUp();
    }
})
$('#usewatetype').hide()
$('#usewateyear').hide()
$('#usewatecat').on('change', function () {
    var cat = $('#usewatecat').val()
    if (cat == 'all') {
        $('#usewatetype').hide()
        $('#usewateyear').hide()
        chartUW_all()
        // chartUW_by_cat(datuse_water_all, 'ล้าน ลบ.ม./ปี', 'chartdiv4')
    } else if (cat == 'byprov') {
        $('#usewatetype').hide()
        $('#usewateyear').show()
        $('#usewateyear').prop('selectedIndex', 0);
        chartUW_by_prov(datuse_water_prov60, 'ล้าน ลบ.ม./ปี', 'chartdiv4')
    } else {
        $('#usewatetype').show()
        $('#usewateyear').hide()
        $('#usewatetype').prop('selectedIndex', 0);
        chartUW_by_year(datuse_water_Yconsume, 'ล้าน ลบ.ม./ปี', 'chartdiv4')

    }
})
$('#usewatetype').on('change', function () {
    var type = $('#usewatetype').val()
    if (type == 'consume') {
        chartUW_by_year(datuse_water_Yconsume, 'ล้าน ลบ.ม./ปี', 'chartdiv4')
    } else if (type == 'industry') {
        chartUW_by_year(datuse_water_Yindustry, 'ล้าน ลบ.ม./ปี', 'chartdiv4')
    } else if (type == 'agri') {
        chartUW_by_year(datuse_water_Yagri, 'ล้าน ลบ.ม./ปี', 'chartdiv4')
    }
})
$('#usewateyear').on('change', function () {
    var year = $('#usewateyear').val()
    if (year == '2560') {
        chartUW_by_prov(datuse_water_prov60, 'ล้าน ลบ.ม./ปี', 'chartdiv4')
    } else if (year == '2570') {
        chartUW_by_prov(datuse_water_prov70, 'ล้าน ลบ.ม./ปี', 'chartdiv4')
    } else if (year == '2580') {
        chartUW_by_prov(datuse_water_prov80, 'ล้าน ลบ.ม./ปี', 'chartdiv4')
    }
})
///cardpopnormal
$('#cardpopnormal').hide()
$('#trendpopnormal').click(function () {
    if (this.checked) {
        $('#cardpopnormal').slideDown();
        $('#popnormaltype').prop('selectedIndex', 0);
        chart_by_prov(datall_pop, 'คน', 'chartdiv5')
    } else {
        $('#cardpopnormal').slideUp();
    }
})
$('#Hpopincity').hide();
$('#Hpop2').hide();
$('#popnormaltype').on('change', function () {
    var type = $('#popnormaltype').val()
    if (type == 'all') {
        $('#Hpopincity').hide();
        $('#Hpop').show();
        $('#Hpop2').hide();
        chart_by_prov(datall_pop, 'คน', 'chartdiv5')
    } else if (type == 'register') {
        $('#Hpopincity').hide();
        $('#Hpop').show();
        $('#Hpop2').hide();
        chart_by_prov(datregister_pop, 'คน', 'chartdiv5')
    } else if (type == 'popincity') {
        $('#Hpopincity').show();
        $('#Hpop').hide();
        $('#Hpop2').hide();
        chart_by_prov(datacity_pop, '', 'chartdiv5')

    } else {
        $('#Hpopincity').hide();
        $('#Hpop').hide();
        $('#Hpop2').show();
        chart_by_prov(datdisguise_pop, 'คน', 'chartdiv5')
    }
})
///cardpopcovid
$('#cardpopcovid').hide()
$('#trendpopcovid').click(function () {
    if (this.checked) {
        $('#cardpopcovid').slideDown();
        $('#popcovidtype').prop('selectedIndex', 0);
        chart_by_prov(datall_pop_covid, 'คน', 'chartdiv6')
    } else {
        $('#cardpopcovid').slideUp();
    }
})
$('#popcovidtype').on('change', function () {
    var type = $('#popcovidtype').val()
    if (type == 'all') {
        chart_by_prov(datall_pop_covid, 'คน', 'chartdiv6')
    } else if (type == 'register') {
        chart_by_prov(datregister_pop_covid, 'คน', 'chartdiv6')
    } else {
        chart_by_prov(datdisguise_pop_covid, 'คน', 'chartdiv6')
    }
})
let chartUW_all = () => {
    // $("#chartdiv4").removeAttr("style").css({ "width": "1200px", "height": "520px" })
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv4", am4charts.XYChart);

    // Add data
    chart.data = [
        {
            category: 'ปี 2560',
            value1: 252,
            value2: 606,
            value3: 1562,
            value4: 2420
        },
        {
            category: 'ปี 2570',
            value1: 309,
            value2: 748,
            value3: 1831,
            value4: 2888
        },
        {
            category: 'ปี 2580',
            value1: 392,
            value2: 865,
            value3: 1832,
            value4: 3089
        }
    ]
    chart.legend = new am4charts.Legend();
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95
    // Create axes
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.numberFormatter.numberFormat = "#";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    // valueAxis.renderer.opposite = true;
    // valueAxis.numberFormatter.numberFormat = "#.0as' " + "ล้าน ลบ.ม./ปี" + "'";
    // valueAxis.min = 10000000;
    // valueAxis.max = 3300;

    // Create series
    function createSeries(field, name, color1, color2) {
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = field;
        series.dataFields.categoryY = "category";
        series.stacked = true;
        series.name = name;
        series.columns.template.tooltipText = `{categoryY} : [bold]{valueX.formatNumber('###,###,###.##')} ล้าน ลบ.ม./ปี[/]`;
        series.columns.template.height = am4core.percent(100);
        series.sequencedInterpolation = true;
        series.stroke = am4core.color(color2);
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color(color2);
        series.columns.template.stroke = am4core.color(color1);
        series.columns.template.fill = am4core.color(color1);
        // series.columns.template.column.cornerRadiusTopRight = 10;
        // series.columns.template.column.cornerRadiusTopLeft = 10;
        series.calculatePercent = true;

        var labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.locationX = 0.5;
        labelBullet.label.text = "{valueX.percent.formatNumber('###.##')}%";
        labelBullet.label.fill = am4core.color("#fff");

        // var valueLabel = series.bullets.push(new am4charts.LabelBullet());
        // valueLabel.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
        // valueLabel.label.horizontalCenter = "left";
        // valueLabel.label.dx = 10;
        // valueLabel.label.hideOversized = false;
        // valueLabel.label.truncate = false;

        // var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
        // categoryLabel.label.text = "{name}";
        // categoryLabel.label.horizontalCenter = "right";
        // categoryLabel.label.dx = -10;
        // categoryLabel.label.fill = am4core.color("#fff");
        // categoryLabel.label.hideOversized = false;
        // categoryLabel.label.truncate = false;
    }

    createSeries("value1", "อุปโภคบริโภค", "#85D5E8", "#3DB2FF");
    createSeries("value2", "อุตสาหกรรม", "#DEAD54", "#D69929");
    createSeries("value3", "เกษตรกรรม", "#54DEAD", "#29D699");
    chart.exporting.menu = new am4core.ExportMenu();
    // chart.exporting.adapter.add("data", function (data, target) {
    //     var data = [];
    //     chart.series.each(function (series) {
    //         for (var i = 0; i < series.data.length; i++) {
    //             series.data[i].name = series.name;
    //             data.push(series.data[i]);
    //         }
    //     });
    //     return { data: data };
    // });
}

$('#btn_prapa_down').hide();
$('#prapa').hide();
let op_forecate_prapa = () => {
    $('#btn_prapa_down').show();
    $('#btn_prapa_up').hide();
    $('#prapa').slideDown();
    $('#prapa_type').prop('selectedIndex', 0);
    chart_all(datall_pop_covid, 'ล้าน ลบ.ม./ปี', 'chartprapa', '#3f80e1', '#3f80e1')
}
let close_forecate_prapa = () => {
    $('#btn_prapa_down').hide();
    $('#btn_prapa_up').show();
    $('#prapa').slideUp();
    $('#prapa_type').prop('selectedIndex', 0);
}
$('#prapa_type').on('change', function () {
    var type = $('#prapa_type').val()
    if (type == 'eec') {
        chart_all(datall_pop_covid, 'ล้าน ลบ.ม./ปี', 'chartprapa', '#3f80e1', '#3f80e1')
    } else if (type == 'byprov') {
        chart_by_prov(datuse_water_prapa, 'ล้าน ลบ.ม./ปี', 'chartprapa')
    }
})
$('#P_industry2').hide();
$('#T_industry').on('change', function () {
    if (this.value == "industry2") {
        chart_all(datuse_water_Yindustry2, 'ล้าน ลบ.ม./ปี', 'chartUW_industry', '#3f80e1', '#3f80e1')
        $('#P_industry1').hide();
        $('#P_industry2').show();
    }
    else {
        $('#Y_industry_1').hide();
        $('#Y_industry_2').hide();
        $('#Y_industry_3').hide();

        $('#P2_industry_1').hide();
        $('#P2_industry_2').hide();
        $('#C_industry_1').hide();
        $('#P_industry2').hide();
    }
})

$('#cardraffle').hide();
$('#trendraffle').click(function () {
    if (this.checked) {
        $('#cardraffle').slideDown();
        $('#raffletype').prop('selectedIndex', 0);
        chart_all(datwaste_industry, 'ตัน/ปี', 'chartdiv11', '#b09980', '#b09980')
    } else {
        $('#cardraffle').slideUp();
    }
})
$('#raffletype').on('change', function () {
    if (this.value == "industry") {
        chart_all(datwaste_industry, 'ตัน/ปี', 'chartdiv11', '#b09980', '#b09980')
    } else if (this.value == "infectious") {
        chart_all(datwaste_infectious, 'ตัน/ปี', 'chartdiv11', '#D1B3B2', '#B5A1A0')
    } else if (this.value == "garbage") {
        chart_all(datwaste_garbage, 'ล้านตัน/ปี', 'chartdiv11', '#F4E9A6', '#D9CAA3')
    }
})
$('#cardgas').hide();
$('#trendgas').click(function () {
    if (this.checked) {
        $('#cardgas').slideDown();
        $('#green_gastype').prop('selectedIndex', 0);
        chart_all(datgas_all, 'ktCO2eq', 'chartdiv12', '#b09980', '#b09980')
    } else {
        $('#cardgas').slideUp();
    }
})
$('#green_gastype').on('change', function () {
    if (this.value == "TH") {
        chart_all(datgas_all, 'ktCO2eq', 'chartdiv12', '#b09980', '#b09980')
    } else if (this.value == "energy") {
        chart_all(datgas_energy, 'ktCO2eq', 'chartdiv12', '#fdc81a', '#fdc81a')
    } else if (this.value == "waste") {
        chart_all(datgas_waste, 'ktCO2eq', 'chartdiv12', '#f16808', '#f16808')
    } else if (this.value == "industry") {
        chart_all(datgas_industry, 'ktCO2eq', 'chartdiv12', '#8a5352', '#8a5352')
    } else if (this.value == "agri") {
        chart_all(datgas_agri, 'ktCO2eq', 'chartdiv12', '#36c745', '#36c745')
    }
})

$('#cardlu').hide();
$('#trendlu').click(function () {
    if (this.checked) {
        $('#cardlu').slideDown();
        $('#lutype').prop('selectedIndex', 0);
        chart_by_prov(datlu_urban, 'ไร่', 'chartdiv13')
    } else {
        $('#cardlu').slideUp();
    }
})
$('#lutype').on('change', function () {
    if (this.value == 'urban') {
        chart_by_prov(datlu_urban, 'ไร่', 'chartdiv13')
    }
    else if (this.value == 'agri') {
        chart_by_prov(datlu_agri, 'ไร่', 'chartdiv13')
    }
    else if (this.value == 'industry') {
        chart_by_prov(datlu_industry, 'ไร่', 'chartdiv13')
    }
    else if (this.value == 'envi') {
        chart_by_prov(datlu_envi, 'ไร่', 'chartdiv13')
    }
})