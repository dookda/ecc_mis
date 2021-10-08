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

let dataforecast_eec = () => {
    let url = "https://eec-onep.online:3700";
    axios.post(url + "/forecast_eec/getdata/").then(async (r) => {
        let eec24_all = r.data.data.filter(e => e.list_code == "popsum" && e.t_code == "24")
        let eec20_all = r.data.data.filter(e => e.list_code == "popsum" && e.t_code == "20")
        let eec21_all = r.data.data.filter(e => e.list_code == "popsum" && e.t_code == "21")
        let eec_all = r.data.data.filter(e => e.list_code == "popsum" && e.t_code == "eec")
        datall_pop.push(
            { category: 'ปี 2559', first: Number(eec24_all[0].f2559), second: Number(eec20_all[0].f2559), third: Number(eec21_all[0].f2559), four: Number(eec_all[0].f2559), },
            { category: 'ปี 2560', first: Number(eec24_all[0].f2560), second: Number(eec20_all[0].f2560), third: Number(eec21_all[0].f2560), four: Number(eec_all[0].f2560), },
            { category: 'ปี 2561', first: Number(eec24_all[0].f2561), second: Number(eec20_all[0].f2561), third: Number(eec21_all[0].f2561), four: Number(eec_all[0].f2561), },
            { category: 'ปี 2562', first: Number(eec24_all[0].f2562), second: Number(eec20_all[0].f2562), third: Number(eec21_all[0].f2562), four: Number(eec_all[0].f2562), },
            { category: 'ปี 2563', first: Number(eec24_all[0].f2563), second: Number(eec20_all[0].f2563), third: Number(eec21_all[0].f2563), four: Number(eec_all[0].f2563), },
            { category: 'ปี 2564', first: Number(eec24_all[0].f2564), second: Number(eec20_all[0].f2564), third: Number(eec21_all[0].f2564), four: Number(eec_all[0].f2564), },
            { category: 'ปี 2565', first: Number(eec24_all[0].f2565), second: Number(eec20_all[0].f2565), third: Number(eec21_all[0].f2565), four: Number(eec_all[0].f2565), },
            { category: 'ปี 2566', first: Number(eec24_all[0].f2566), second: Number(eec20_all[0].f2566), third: Number(eec21_all[0].f2566), four: Number(eec_all[0].f2566), },
            { category: 'ปี 2567', first: Number(eec24_all[0].f2567), second: Number(eec20_all[0].f2567), third: Number(eec21_all[0].f2567), four: Number(eec_all[0].f2567), },
            { category: 'ปี 2568', first: Number(eec24_all[0].f2568), second: Number(eec20_all[0].f2568), third: Number(eec21_all[0].f2568), four: Number(eec_all[0].f2568), },
            { category: 'ปี 2569', first: Number(eec24_all[0].f2569), second: Number(eec20_all[0].f2569), third: Number(eec21_all[0].f2569), four: Number(eec_all[0].f2569), },
            { category: 'ปี 2570', first: Number(eec24_all[0].f2570), second: Number(eec20_all[0].f2570), third: Number(eec21_all[0].f2570), four: Number(eec_all[0].f2570), }
        )

        let eec24_house = r.data.data.filter(e => e.list_code == "pophouse" && e.t_code == "24")
        let eec20_house = r.data.data.filter(e => e.list_code == "pophouse" && e.t_code == "20")
        let eec21_house = r.data.data.filter(e => e.list_code == "pophouse" && e.t_code == "21")
        let eec_house = r.data.data.filter(e => e.list_code == "pophouse" && e.t_code == "eec")
        datregister_pop.push(
            { category: 'ปี 2559', first: Number(eec24_house[0].f2559), second: Number(eec20_house[0].f2559), third: Number(eec21_house[0].f2559), four: Number(eec_house[0].f2559), },
            { category: 'ปี 2560', first: Number(eec24_house[0].f2560), second: Number(eec20_house[0].f2560), third: Number(eec21_house[0].f2560), four: Number(eec_house[0].f2560), },
            { category: 'ปี 2561', first: Number(eec24_house[0].f2561), second: Number(eec20_house[0].f2561), third: Number(eec21_house[0].f2561), four: Number(eec_house[0].f2561), },
            { category: 'ปี 2562', first: Number(eec24_house[0].f2562), second: Number(eec20_house[0].f2562), third: Number(eec21_house[0].f2562), four: Number(eec_house[0].f2562), },
            { category: 'ปี 2563', first: Number(eec24_house[0].f2563), second: Number(eec20_house[0].f2563), third: Number(eec21_house[0].f2563), four: Number(eec_house[0].f2563), },
            { category: 'ปี 2564', first: Number(eec24_house[0].f2564), second: Number(eec20_house[0].f2564), third: Number(eec21_house[0].f2564), four: Number(eec_house[0].f2564), },
            { category: 'ปี 2565', first: Number(eec24_house[0].f2565), second: Number(eec20_house[0].f2565), third: Number(eec21_house[0].f2565), four: Number(eec_house[0].f2565), },
            { category: 'ปี 2566', first: Number(eec24_house[0].f2566), second: Number(eec20_house[0].f2566), third: Number(eec21_house[0].f2566), four: Number(eec_house[0].f2566), },
            { category: 'ปี 2567', first: Number(eec24_house[0].f2567), second: Number(eec20_house[0].f2567), third: Number(eec21_house[0].f2567), four: Number(eec_house[0].f2567), },
            { category: 'ปี 2568', first: Number(eec24_house[0].f2568), second: Number(eec20_house[0].f2568), third: Number(eec21_house[0].f2568), four: Number(eec_house[0].f2568), },
            { category: 'ปี 2569', first: Number(eec24_house[0].f2569), second: Number(eec20_house[0].f2569), third: Number(eec21_house[0].f2569), four: Number(eec_house[0].f2569), },
            { category: 'ปี 2570', first: Number(eec24_house[0].f2570), second: Number(eec20_house[0].f2570), third: Number(eec21_house[0].f2570), four: Number(eec_house[0].f2570), }
        )

        let eec24_hide = r.data.data.filter(e => e.list_code == "pophide" && e.t_code == "24")
        let eec20_hide = r.data.data.filter(e => e.list_code == "pophide" && e.t_code == "20")
        let eec21_hide = r.data.data.filter(e => e.list_code == "pophide" && e.t_code == "21")
        let eec_hide = r.data.data.filter(e => e.list_code == "pophide" && e.t_code == "eec")
        datdisguise_pop.push(
            { category: 'ปี 2559', first: Number(eec24_hide[0].f2559), second: Number(eec20_hide[0].f2559), third: Number(eec21_hide[0].f2559), four: Number(eec_hide[0].f2559), },
            { category: 'ปี 2560', first: Number(eec24_hide[0].f2560), second: Number(eec20_hide[0].f2560), third: Number(eec21_hide[0].f2560), four: Number(eec_hide[0].f2560), },
            { category: 'ปี 2561', first: Number(eec24_hide[0].f2561), second: Number(eec20_hide[0].f2561), third: Number(eec21_hide[0].f2561), four: Number(eec_hide[0].f2561), },
            { category: 'ปี 2562', first: Number(eec24_hide[0].f2562), second: Number(eec20_hide[0].f2562), third: Number(eec21_hide[0].f2562), four: Number(eec_hide[0].f2562), },
            { category: 'ปี 2563', first: Number(eec24_hide[0].f2563), second: Number(eec20_hide[0].f2563), third: Number(eec21_hide[0].f2563), four: Number(eec_hide[0].f2563), },
            { category: 'ปี 2564', first: Number(eec24_hide[0].f2564), second: Number(eec20_hide[0].f2564), third: Number(eec21_hide[0].f2564), four: Number(eec_hide[0].f2564), },
            { category: 'ปี 2565', first: Number(eec24_hide[0].f2565), second: Number(eec20_hide[0].f2565), third: Number(eec21_hide[0].f2565), four: Number(eec_hide[0].f2565), },
            { category: 'ปี 2566', first: Number(eec24_hide[0].f2566), second: Number(eec20_hide[0].f2566), third: Number(eec21_hide[0].f2566), four: Number(eec_hide[0].f2566), },
            { category: 'ปี 2567', first: Number(eec24_hide[0].f2567), second: Number(eec20_hide[0].f2567), third: Number(eec21_hide[0].f2567), four: Number(eec_hide[0].f2567), },
            { category: 'ปี 2568', first: Number(eec24_hide[0].f2568), second: Number(eec20_hide[0].f2568), third: Number(eec21_hide[0].f2568), four: Number(eec_hide[0].f2568), },
            { category: 'ปี 2569', first: Number(eec24_hide[0].f2569), second: Number(eec20_hide[0].f2569), third: Number(eec21_hide[0].f2569), four: Number(eec_hide[0].f2569), },
            { category: 'ปี 2570', first: Number(eec24_hide[0].f2570), second: Number(eec20_hide[0].f2570), third: Number(eec21_hide[0].f2570), four: Number(eec_hide[0].f2570), }
        )

        let eec24_city = r.data.data.filter(e => e.list_code == "popcity" && e.t_code == "24")
        let eec20_city = r.data.data.filter(e => e.list_code == "popcity" && e.t_code == "20")
        let eec21_city = r.data.data.filter(e => e.list_code == "popcity" && e.t_code == "21")
        datacity_pop.push(
            { category: 'ปี 2565', first: Number(eec24_city[0].f2565), second: Number(eec20_city[0].f2565), third: Number(eec21_city[0].f2565), },
            { category: 'ปี 2566', first: Number(eec24_city[0].f2566), second: Number(eec20_city[0].f2566), third: Number(eec21_city[0].f2566), },
            { category: 'ปี 2567', first: Number(eec24_city[0].f2567), second: Number(eec20_city[0].f2567), third: Number(eec21_city[0].f2567), },
            { category: 'ปี 2568', first: Number(eec24_city[0].f2568), second: Number(eec20_city[0].f2568), third: Number(eec21_city[0].f2568), },
            { category: 'ปี 2569', first: Number(eec24_city[0].f2569), second: Number(eec20_city[0].f2569), third: Number(eec21_city[0].f2569), },
            { category: 'ปี 2570', first: Number(eec24_city[0].f2570), second: Number(eec20_city[0].f2570), third: Number(eec21_city[0].f2570), },
            { category: 'ปี 2571', first: Number(eec24_city[0].f2571), second: Number(eec20_city[0].f2571), third: Number(eec21_city[0].f2571), },
            { category: 'ปี 2572', first: Number(eec24_city[0].f2572), second: Number(eec20_city[0].f2572), third: Number(eec21_city[0].f2572), },
            { category: 'ปี 2573', first: Number(eec24_city[0].f2573), second: Number(eec20_city[0].f2573), third: Number(eec21_city[0].f2573), },
            { category: 'ปี 2574', first: Number(eec24_city[0].f2574), second: Number(eec20_city[0].f2574), third: Number(eec21_city[0].f2574), },
            { category: 'ปี 2575', first: Number(eec24_city[0].f2575), second: Number(eec20_city[0].f2575), third: Number(eec21_city[0].f2575), },
            { category: 'ปี 2576', first: Number(eec24_city[0].f2576), second: Number(eec20_city[0].f2576), third: Number(eec21_city[0].f2576), },
            { category: 'ปี 2577', first: Number(eec24_city[0].f2577), second: Number(eec20_city[0].f2577), third: Number(eec21_city[0].f2577), },
            { category: 'ปี 2578', first: Number(eec24_city[0].f2578), second: Number(eec20_city[0].f2578), third: Number(eec21_city[0].f2578), },
            { category: 'ปี 2579', first: Number(eec24_city[0].f2579), second: Number(eec20_city[0].f2579), third: Number(eec21_city[0].f2579), },
            { category: 'ปี 2580', first: Number(eec24_city[0].f2580), second: Number(eec20_city[0].f2580), third: Number(eec21_city[0].f2580), }
        )
        ///pop_covid
        let eec24_all_covid = r.data.data.filter(e => e.list_code == "popsum_covid" && e.t_code == "24")
        let eec20_all_covid = r.data.data.filter(e => e.list_code == "popsum_covid" && e.t_code == "20")
        let eec21_all_covid = r.data.data.filter(e => e.list_code == "popsum_covid" && e.t_code == "21")
        let eec_all_covid = r.data.data.filter(e => e.list_code == "popsum_covid" && e.t_code == "eec")
        datall_pop_covid.push(
            { category: 'ปี 2562', first: Number(eec24_all_covid[0].f2562), second: Number(eec20_all_covid[0].f2562), third: Number(eec21_all_covid[0].f2562), four: Number(eec_all_covid[0].f2562), },
            { category: 'ปี 2563', first: Number(eec24_all_covid[0].f2563), second: Number(eec20_all_covid[0].f2563), third: Number(eec21_all_covid[0].f2563), four: Number(eec_all_covid[0].f2563), },
            { category: 'ปี 2564', first: Number(eec24_all_covid[0].f2564), second: Number(eec20_all_covid[0].f2564), third: Number(eec21_all_covid[0].f2564), four: Number(eec_all_covid[0].f2564), },
            { category: 'ปี 2565', first: Number(eec24_all_covid[0].f2565), second: Number(eec20_all_covid[0].f2565), third: Number(eec21_all_covid[0].f2565), four: Number(eec_all_covid[0].f2565), },
            { category: 'ปี 2566', first: Number(eec24_all_covid[0].f2566), second: Number(eec20_all_covid[0].f2566), third: Number(eec21_all_covid[0].f2566), four: Number(eec_all_covid[0].f2566), },
            { category: 'ปี 2567', first: Number(eec24_all_covid[0].f2567), second: Number(eec20_all_covid[0].f2567), third: Number(eec21_all_covid[0].f2567), four: Number(eec_all_covid[0].f2567), },
            { category: 'ปี 2568', first: Number(eec24_all_covid[0].f2568), second: Number(eec20_all_covid[0].f2568), third: Number(eec21_all_covid[0].f2568), four: Number(eec_all_covid[0].f2568), },
            { category: 'ปี 2569', first: Number(eec24_all_covid[0].f2569), second: Number(eec20_all_covid[0].f2569), third: Number(eec21_all_covid[0].f2569), four: Number(eec_all_covid[0].f2569), },
            { category: 'ปี 2570', first: Number(eec24_all_covid[0].f2570), second: Number(eec20_all_covid[0].f2570), third: Number(eec21_all_covid[0].f2570), four: Number(eec_all_covid[0].f2570), }
        )

        let eec24_house_covid = r.data.data.filter(e => e.list_code == "pophouse_covid" && e.t_code == "24")
        let eec20_house_covid = r.data.data.filter(e => e.list_code == "pophouse_covid" && e.t_code == "20")
        let eec21_house_covid = r.data.data.filter(e => e.list_code == "pophouse_covid" && e.t_code == "21")
        let eec_house_covid = r.data.data.filter(e => e.list_code == "pophouse_covid" && e.t_code == "eec")
        datregister_pop_covid.push(
            { category: 'ปี 2562', first: Number(eec24_house_covid[0].f2562), second: Number(eec20_house_covid[0].f2562), third: Number(eec21_house_covid[0].f2562), four: Number(eec_house_covid[0].f2562), },
            { category: 'ปี 2563', first: Number(eec24_house_covid[0].f2563), second: Number(eec20_house_covid[0].f2563), third: Number(eec21_house_covid[0].f2563), four: Number(eec_house_covid[0].f2563), },
            { category: 'ปี 2564', first: Number(eec24_house_covid[0].f2564), second: Number(eec20_house_covid[0].f2564), third: Number(eec21_house_covid[0].f2564), four: Number(eec_house_covid[0].f2564), },
            { category: 'ปี 2565', first: Number(eec24_house_covid[0].f2565), second: Number(eec20_house_covid[0].f2565), third: Number(eec21_house_covid[0].f2565), four: Number(eec_house_covid[0].f2565), },
            { category: 'ปี 2566', first: Number(eec24_house_covid[0].f2566), second: Number(eec20_house_covid[0].f2566), third: Number(eec21_house_covid[0].f2566), four: Number(eec_house_covid[0].f2566), },
            { category: 'ปี 2567', first: Number(eec24_house_covid[0].f2567), second: Number(eec20_house_covid[0].f2567), third: Number(eec21_house_covid[0].f2567), four: Number(eec_house_covid[0].f2567), },
            { category: 'ปี 2568', first: Number(eec24_house_covid[0].f2568), second: Number(eec20_house_covid[0].f2568), third: Number(eec21_house_covid[0].f2568), four: Number(eec_house_covid[0].f2568), },
            { category: 'ปี 2569', first: Number(eec24_house_covid[0].f2569), second: Number(eec20_house_covid[0].f2569), third: Number(eec21_house_covid[0].f2569), four: Number(eec_house_covid[0].f2569), },
            { category: 'ปี 2570', first: Number(eec24_house_covid[0].f2570), second: Number(eec20_house_covid[0].f2570), third: Number(eec21_house_covid[0].f2570), four: Number(eec_house_covid[0].f2570), }
        )

        let eec24_hide_covid = r.data.data.filter(e => e.list_code == "pophide_covid" && e.t_code == "24")
        let eec20_hide_covid = r.data.data.filter(e => e.list_code == "pophide_covid" && e.t_code == "20")
        let eec21_hide_covid = r.data.data.filter(e => e.list_code == "pophide_covid" && e.t_code == "21")
        let eec_hide_covid = r.data.data.filter(e => e.list_code == "pophide_covid" && e.t_code == "eec")
        datdisguise_pop_covid.push(
            { category: 'ปี 2562', first: Number(eec24_hide_covid[0].f2562), second: Number(eec20_hide_covid[0].f2562), third: Number(eec21_hide_covid[0].f2562), four: Number(eec_hide_covid[0].f2562), },
            { category: 'ปี 2563', first: Number(eec24_hide_covid[0].f2563), second: Number(eec20_hide_covid[0].f2563), third: Number(eec21_hide_covid[0].f2563), four: Number(eec_hide_covid[0].f2563), },
            { category: 'ปี 2564', first: Number(eec24_hide_covid[0].f2564), second: Number(eec20_hide_covid[0].f2564), third: Number(eec21_hide_covid[0].f2564), four: Number(eec_hide_covid[0].f2564), },
            { category: 'ปี 2565', first: Number(eec24_hide_covid[0].f2565), second: Number(eec20_hide_covid[0].f2565), third: Number(eec21_hide_covid[0].f2565), four: Number(eec_hide_covid[0].f2565), },
            { category: 'ปี 2566', first: Number(eec24_hide_covid[0].f2566), second: Number(eec20_hide_covid[0].f2566), third: Number(eec21_hide_covid[0].f2566), four: Number(eec_hide_covid[0].f2566), },
            { category: 'ปี 2567', first: Number(eec24_hide_covid[0].f2567), second: Number(eec20_hide_covid[0].f2567), third: Number(eec21_hide_covid[0].f2567), four: Number(eec_hide_covid[0].f2567), },
            { category: 'ปี 2568', first: Number(eec24_hide_covid[0].f2568), second: Number(eec20_hide_covid[0].f2568), third: Number(eec21_hide_covid[0].f2568), four: Number(eec_hide_covid[0].f2568), },
            { category: 'ปี 2569', first: Number(eec24_hide_covid[0].f2569), second: Number(eec20_hide_covid[0].f2569), third: Number(eec21_hide_covid[0].f2569), four: Number(eec_hide_covid[0].f2569), },
            { category: 'ปี 2570', first: Number(eec24_hide_covid[0].f2570), second: Number(eec20_hide_covid[0].f2570), third: Number(eec21_hide_covid[0].f2570), four: Number(eec_hide_covid[0].f2570), }
        )
        ///wastewaters
        let eec24_waste = r.data.data.filter(e => e.list_code == "wastewater" && e.t_code == "24")
        let eec20_waste = r.data.data.filter(e => e.list_code == "wastewater" && e.t_code == "20")
        let eec21_waste = r.data.data.filter(e => e.list_code == "wastewater" && e.t_code == "21")
        let eec_waste = r.data.data.filter(e => e.list_code == "wastewater" && e.t_code == "eec")
        datwaste.push(
            { category: 'ปี 2564', first: Number(eec24_waste[0].f2564), second: Number(eec20_waste[0].f2564), third: Number(eec21_waste[0].f2564), four: Number(eec_waste[0].f2564), },
            { category: 'ปี 2565', first: Number(eec24_waste[0].f2565), second: Number(eec20_waste[0].f2565), third: Number(eec21_waste[0].f2565), four: Number(eec_waste[0].f2565), },
            { category: 'ปี 2566', first: Number(eec24_waste[0].f2566), second: Number(eec20_waste[0].f2566), third: Number(eec21_waste[0].f2566), four: Number(eec_waste[0].f2566), },
            { category: 'ปี 2567', first: Number(eec24_waste[0].f2567), second: Number(eec20_waste[0].f2567), third: Number(eec21_waste[0].f2567), four: Number(eec_waste[0].f2567), },
            { category: 'ปี 2568', first: Number(eec24_waste[0].f2568), second: Number(eec20_waste[0].f2568), third: Number(eec21_waste[0].f2568), four: Number(eec_waste[0].f2568), },
            { category: 'ปี 2569', first: Number(eec24_waste[0].f2569), second: Number(eec20_waste[0].f2569), third: Number(eec21_waste[0].f2569), four: Number(eec_waste[0].f2569), },
            { category: 'ปี 2570', first: Number(eec24_waste[0].f2570), second: Number(eec20_waste[0].f2570), third: Number(eec21_waste[0].f2570), four: Number(eec_waste[0].f2570), }
        )
        ///garbages
        let eec24_garbage = r.data.data.filter(e => e.list_code == "garbage" && e.t_code == "24")
        let eec20_garbage = r.data.data.filter(e => e.list_code == "garbage" && e.t_code == "20")
        let eec21_garbage = r.data.data.filter(e => e.list_code == "garbage" && e.t_code == "21")
        let eec_garbage = r.data.data.filter(e => e.list_code == "garbage" && e.t_code == "eec")
        datgarbage.push(
            { category: 'ปี 2564', first: Number(eec24_garbage[0].f2564), second: Number(eec20_garbage[0].f2564), third: Number(eec21_garbage[0].f2564), four: Number(eec_garbage[0].f2564), },
            { category: 'ปี 2565', first: Number(eec24_garbage[0].f2565), second: Number(eec20_garbage[0].f2565), third: Number(eec21_garbage[0].f2565), four: Number(eec_garbage[0].f2565), },
            { category: 'ปี 2566', first: Number(eec24_garbage[0].f2566), second: Number(eec20_garbage[0].f2566), third: Number(eec21_garbage[0].f2566), four: Number(eec_garbage[0].f2566), },
            { category: 'ปี 2567', first: Number(eec24_garbage[0].f2567), second: Number(eec20_garbage[0].f2567), third: Number(eec21_garbage[0].f2567), four: Number(eec_garbage[0].f2567), },
            { category: 'ปี 2568', first: Number(eec24_garbage[0].f2568), second: Number(eec20_garbage[0].f2568), third: Number(eec21_garbage[0].f2568), four: Number(eec_garbage[0].f2568), },
            { category: 'ปี 2569', first: Number(eec24_garbage[0].f2569), second: Number(eec20_garbage[0].f2569), third: Number(eec21_garbage[0].f2569), four: Number(eec_garbage[0].f2569), },
            { category: 'ปี 2570', first: Number(eec24_garbage[0].f2570), second: Number(eec20_garbage[0].f2570), third: Number(eec21_garbage[0].f2570), four: Number(eec_garbage[0].f2570), }
        )
        ///usewaters
        let eec24_WD = r.data.data.filter(e => e.list_code == "water_demand" && e.t_code == "24")
        let eec20_WD = r.data.data.filter(e => e.list_code == "water_demand" && e.t_code == "20")
        let eec21_WD = r.data.data.filter(e => e.list_code == "water_demand" && e.t_code == "21")
        let eec_WD = r.data.data.filter(e => e.list_code == "water_demand" && e.t_code == "eec")
        datuse_water_all.push(
            { category: 'ปี 2560', first: Number(eec24_WD[0].f2560), second: Number(eec20_WD[0].f2560), third: Number(eec21_WD[0].f2560), four: Number(eec_WD[0].f2560), },
            { category: 'ปี 2570', first: Number(eec24_WD[0].f2570), second: Number(eec20_WD[0].f2570), third: Number(eec21_WD[0].f2570), four: Number(eec_WD[0].f2570), },
            { category: 'ปี 2580', first: Number(eec24_WD[0].f2580), second: Number(eec20_WD[0].f2580), third: Number(eec21_WD[0].f2580), four: Number(eec_WD[0].f2580), },
        )

        let eec24_WD_consumer = r.data.data.filter(e => e.list_code == "WD_consumer" && e.t_code == "24")
        let eec20_WD_consumer = r.data.data.filter(e => e.list_code == "WD_consumer" && e.t_code == "20")
        let eec21_WD_consumer = r.data.data.filter(e => e.list_code == "WD_consumer" && e.t_code == "21")
        let eec_WD_consumer = r.data.data.filter(e => e.list_code == "WD_consumer" && e.t_code == "eec")
        datuse_water_Yconsume.push(
            { category: 'ปี 2560', first: Number(eec24_WD_consumer[0].f2560), second: Number(eec20_WD_consumer[0].f2560), third: Number(eec21_WD_consumer[0].f2560), four: Number(eec_WD_consumer[0].f2560), },
            { category: 'ปี 2570', first: Number(eec24_WD_consumer[0].f2570), second: Number(eec20_WD_consumer[0].f2570), third: Number(eec21_WD_consumer[0].f2570), four: Number(eec_WD_consumer[0].f2570), },
            { category: 'ปี 2580', first: Number(eec24_WD_consumer[0].f2580), second: Number(eec20_WD_consumer[0].f2580), third: Number(eec21_WD_consumer[0].f2580), four: Number(eec_WD_consumer[0].f2580), },
        )

        let eec24_WD_agri = r.data.data.filter(e => e.list_code == "WD_agri" && e.t_code == "24")
        let eec20_WD_agri = r.data.data.filter(e => e.list_code == "WD_agri" && e.t_code == "20")
        let eec21_WD_agri = r.data.data.filter(e => e.list_code == "WD_agri" && e.t_code == "21")
        let eec_WD_agri = r.data.data.filter(e => e.list_code == "WD_agri" && e.t_code == "eec")
        datuse_water_Yagri.push(
            { category: 'ปี 2560', first: Number(eec24_WD_agri[0].f2560), second: Number(eec20_WD_agri[0].f2560), third: Number(eec21_WD_agri[0].f2560), four: Number(eec_WD_agri[0].f2560), },
            { category: 'ปี 2570', first: Number(eec24_WD_agri[0].f2570), second: Number(eec20_WD_agri[0].f2570), third: Number(eec21_WD_agri[0].f2570), four: Number(eec_WD_agri[0].f2570), },
            { category: 'ปี 2580', first: Number(eec24_WD_agri[0].f2580), second: Number(eec20_WD_agri[0].f2580), third: Number(eec21_WD_agri[0].f2580), four: Number(eec_WD_agri[0].f2580), },
        )

        let eec24_WD_industry = r.data.data.filter(e => e.list_code == "WD_industry" && e.t_code == "24")
        let eec20_WD_industry = r.data.data.filter(e => e.list_code == "WD_industry" && e.t_code == "20")
        let eec21_WD_industry = r.data.data.filter(e => e.list_code == "WD_industry" && e.t_code == "21")
        let eec_WD_industry = r.data.data.filter(e => e.list_code == "WD_industry" && e.t_code == "eec")
        datuse_water_Yindustry.push(
            { category: 'ปี 2560', first: Number(eec24_WD_industry[0].f2560), second: Number(eec20_WD_industry[0].f2560), third: Number(eec21_WD_industry[0].f2560), four: Number(eec_WD_industry[0].f2560), },
            { category: 'ปี 2570', first: Number(eec24_WD_industry[0].f2570), second: Number(eec20_WD_industry[0].f2570), third: Number(eec21_WD_industry[0].f2570), four: Number(eec_WD_industry[0].f2570), },
            { category: 'ปี 2580', first: Number(eec24_WD_industry[0].f2580), second: Number(eec20_WD_industry[0].f2580), third: Number(eec21_WD_industry[0].f2580), four: Number(eec_WD_industry[0].f2580), },
        )

        let eec_WD_industry1 = r.data.data.filter(e => e.list_code == "WD_industry1" && e.t_code == "eec")
        datuse_water_Yindustry1.push(
            { category: 'ปี 2559', four: Number(eec_WD_industry1[0].f2559), },
            { category: 'ปี 2566', four: Number(eec_WD_industry1[0].f2566), },
            { category: 'ปี 2569', four: Number(eec_WD_industry1[0].f2569), },
            { category: 'ปี 2574', four: Number(eec_WD_industry1[0].f2574), },
            { category: 'ปี 2579', four: Number(eec_WD_industry1[0].f2579), },
            { category: 'ปี 2584', four: Number(eec_WD_industry1[0].f2584), },
        )
        let eec_WD_industry2 = r.data.data.filter(e => e.list_code == "WD_industry2" && e.t_code == "eec")
        datuse_water_Yindustry2.push(
            { category: 'ปี 2566', four: Number(eec_WD_industry2[0].f2566), },
            { category: 'ปี 2569', four: Number(eec_WD_industry2[0].f2569), },
            { category: 'ปี 2574', four: Number(eec_WD_industry2[0].f2574), },
            { category: 'ปี 2579', four: Number(eec_WD_industry2[0].f2579), },
            { category: 'ปี 2584', four: Number(eec_WD_industry2[0].f2584), },
        )

        let eec24_WD_prapa = r.data.data.filter(e => e.list_code == "WD_prapa" && e.t_code == "24")
        let eec20_WD_prapa = r.data.data.filter(e => e.list_code == "WD_prapa" && e.t_code == "20")
        let eec21_WD_prapa = r.data.data.filter(e => e.list_code == "WD_prapa" && e.t_code == "21")
        let eec_WD_prapa = r.data.data.filter(e => e.list_code == "WD_prapa" && e.t_code == "eec")
        datuse_water_prapa.push(
            { category: 'ปี 2559', first: Number(eec24_WD_prapa[0].f2559), second: Number(eec20_WD_prapa[0].f2559), third: Number(eec21_WD_prapa[0].f2559), four: Number(eec_WD_prapa[0].f2559), },
            { category: 'ปี 2566', first: Number(eec24_WD_prapa[0].f2566), second: Number(eec20_WD_prapa[0].f2566), third: Number(eec21_WD_prapa[0].f2566), four: Number(eec_WD_prapa[0].f2566), },
            { category: 'ปี 2569', first: Number(eec24_WD_prapa[0].f2569), second: Number(eec20_WD_prapa[0].f2569), third: Number(eec21_WD_prapa[0].f2569), four: Number(eec_WD_prapa[0].f2569), },
            { category: 'ปี 2574', first: Number(eec24_WD_prapa[0].f2574), second: Number(eec20_WD_prapa[0].f2574), third: Number(eec21_WD_prapa[0].f2574), four: Number(eec_WD_prapa[0].f2574), },
            { category: 'ปี 2579', first: Number(eec24_WD_prapa[0].f2579), second: Number(eec20_WD_prapa[0].f2579), third: Number(eec21_WD_prapa[0].f2579), four: Number(eec_WD_prapa[0].f2579), },
            { category: 'ปี 2584', first: Number(eec24_WD_prapa[0].f2584), second: Number(eec20_WD_prapa[0].f2584), third: Number(eec21_WD_prapa[0].f2584), four: Number(eec_WD_prapa[0].f2584), },
        )
        datuse_water_prov60.push(
            { category: 'อุปโภค', first: eec24_WD_consumer[0].f2560, second: eec20_WD_consumer[0].f2560, third: eec21_WD_consumer[0].f2560, four: eec_WD_consumer[0].f2560 },
            { category: 'อุตสาหกรรม', first: eec24_WD_industry[0].f2560, second: eec20_WD_industry[0].f2560, third: eec21_WD_industry[0].f2560, four: eec_WD_industry[0].f2560 },
            { category: 'เกษตรกรรม', first: eec24_WD_agri[0].f2560, second: eec20_WD_agri[0].f2560, third: eec21_WD_agri[0].f2560, four: eec_WD_agri[0].f2560 },
        )
        datuse_water_prov70.push(
            { category: 'อุปโภค', first: eec24_WD_consumer[0].f2570, second: eec20_WD_consumer[0].f2570, third: eec21_WD_consumer[0].f2570, four: eec_WD_consumer[0].f2570 },
            { category: 'อุตสาหกรรม', first: eec24_WD_industry[0].f2570, second: eec20_WD_industry[0].f2570, third: eec21_WD_industry[0].f2570, four: eec_WD_industry[0].f2570 },
            { category: 'เกษตรกรรม', first: eec24_WD_agri[0].f2570, second: eec20_WD_agri[0].f2570, third: eec21_WD_agri[0].f2570, four: eec_WD_agri[0].f2570 },
        )
        datuse_water_prov80.push(
            { category: 'อุปโภค', first: eec24_WD_consumer[0].f2580, second: eec20_WD_consumer[0].f2580, third: eec21_WD_consumer[0].f2580, four: eec_WD_consumer[0].f2580 },
            { category: 'อุตสาหกรรม', first: eec24_WD_industry[0].f2580, second: eec20_WD_industry[0].f2580, third: eec21_WD_industry[0].f2580, four: eec_WD_industry[0].f2580 },
            { category: 'เกษตรกรรม', first: eec24_WD_agri[0].f2580, second: eec20_WD_agri[0].f2580, third: eec21_WD_agri[0].f2580, four: eec_WD_agri[0].f2580 },
        )

        ///untreatedwater
        let eec_UW_industry = r.data.data.filter(e => e.list_code == "UW_industry" && e.t_code == "eec")
        let eec_UW_prapa = r.data.data.filter(e => e.list_code == "UW_prapa" && e.t_code == "eec")
        let eec_UW_sum = r.data.data.filter(e => e.list_code == "UW_sum" && e.t_code == "eec")

        UW_industry.push(
            { category: 'ปี 2559', four: Number(eec_UW_industry[0].f2559), },
            { category: 'ปี 2566', four: Number(eec_UW_industry[0].f2566), },
            { category: 'ปี 2569', four: Number(eec_UW_industry[0].f2569), },
            { category: 'ปี 2574', four: Number(eec_UW_industry[0].f2574), },
            { category: 'ปี 2579', four: Number(eec_UW_industry[0].f2579), },
            { category: 'ปี 2584', four: Number(eec_UW_industry[0].f2579), }
        )
        UW_prapa.push(
            { category: 'ปี 2559', four: Number(eec_UW_prapa[0].f2559), },
            { category: 'ปี 2566', four: Number(eec_UW_prapa[0].f2566), },
            { category: 'ปี 2569', four: Number(eec_UW_prapa[0].f2569), },
            { category: 'ปี 2574', four: Number(eec_UW_prapa[0].f2574), },
            { category: 'ปี 2579', four: Number(eec_UW_prapa[0].f2579), },
            { category: 'ปี 2584', four: Number(eec_UW_prapa[0].f2579), }
        )
        UW_sum.push(
            { category: 'ปี 2559', four: Number(eec_UW_sum[0].f2559), },
            { category: 'ปี 2566', four: Number(eec_UW_sum[0].f2566), },
            { category: 'ปี 2569', four: Number(eec_UW_sum[0].f2569), },
            { category: 'ปี 2574', four: Number(eec_UW_sum[0].f2574), },
            { category: 'ปี 2579', four: Number(eec_UW_sum[0].f2579), },
            { category: 'ปี 2584', four: Number(eec_UW_sum[0].f2579), }
        )
        ///elec_demand
        let eec24_elec_demand = r.data.data.filter(e => e.list_code == "elec_demand" && e.t_code == "24")
        let eec20_elec_demand = r.data.data.filter(e => e.list_code == "elec_demand" && e.t_code == "20")
        let eec21_elec_demand = r.data.data.filter(e => e.list_code == "elec_demand" && e.t_code == "21")
        let eec_elec_demand = r.data.data.filter(e => e.list_code == "elec_demand" && e.t_code == "eec")
        datelec_demand.push(
            { category: 'ปี 2566', first: Number(eec24_elec_demand[0].f2566), second: Number(eec20_elec_demand[0].f2566), third: Number(eec21_elec_demand[0].f2566), four: Number(eec_elec_demand[0].f2566), },
            { category: 'ปี 2569', first: Number(eec24_elec_demand[0].f2569), second: Number(eec20_elec_demand[0].f2569), third: Number(eec21_elec_demand[0].f2569), four: Number(eec_elec_demand[0].f2569), },
            { category: 'ปี 2574', first: Number(eec24_elec_demand[0].f2574), second: Number(eec20_elec_demand[0].f2574), third: Number(eec21_elec_demand[0].f2574), four: Number(eec_elec_demand[0].f2574), },
            { category: 'ปี 2579', first: Number(eec24_elec_demand[0].f2579), second: Number(eec20_elec_demand[0].f2579), third: Number(eec21_elec_demand[0].f2579), four: Number(eec_elec_demand[0].f2579), },
            { category: 'ปี 2584', first: Number(eec24_elec_demand[0].f2584), second: Number(eec20_elec_demand[0].f2584), third: Number(eec21_elec_demand[0].f2584), four: Number(eec_elec_demand[0].f2584), },
        )
        let eec_genelec_insys = r.data.data.filter(e => e.list_code == "genelec_insys" && e.t_code == "eec")
        datelec_genelec_insys.push(
            { category: 'ปี 2566', four: Number(eec_genelec_insys[0].f2566), },
            { category: 'ปี 2569', four: Number(eec_genelec_insys[0].f2569), },
            { category: 'ปี 2574', four: Number(eec_genelec_insys[0].f2574), },
            { category: 'ปี 2579', four: Number(eec_genelec_insys[0].f2579), },
            { category: 'ปี 2584', four: Number(eec_genelec_insys[0].f2584), },
        )
        let eec_genelec_afsys = r.data.data.filter(e => e.list_code == "genelec_afsys" && e.t_code == "eec")
        datelec_genelec_afsys.push(
            { category: 'ปี 2566', four: Number(eec_genelec_afsys[0].f2566), },
            { category: 'ปี 2569', four: Number(eec_genelec_afsys[0].f2569), },
            { category: 'ปี 2574', four: Number(eec_genelec_afsys[0].f2574), },
            { category: 'ปี 2579', four: Number(eec_genelec_afsys[0].f2579), },
            { category: 'ปี 2584', four: Number(eec_genelec_afsys[0].f2584), }
        )
        ///econ
        let eec24_econ_tourist = r.data.data.filter(e => e.list_code == "econ_tourist" && e.t_code == "24")
        let eec20_econ_tourist = r.data.data.filter(e => e.list_code == "econ_tourist" && e.t_code == "20")
        let eec21_econ_tourist = r.data.data.filter(e => e.list_code == "econ_tourist" && e.t_code == "21")
        let eec_econ_tourist = r.data.data.filter(e => e.list_code == "econ_tourist" && e.t_code == "eec")
        datecon_tourist.push(
            { category: 'ปี 2565', first: Number(eec24_econ_tourist[0].f2565), second: Number(eec20_econ_tourist[0].f2565), third: Number(eec21_econ_tourist[0].f2565), four: Number(eec_econ_tourist[0].f2565), },
            { category: 'ปี 2566', first: Number(eec24_econ_tourist[0].f2566), second: Number(eec20_econ_tourist[0].f2566), third: Number(eec21_econ_tourist[0].f2566), four: Number(eec_econ_tourist[0].f2566), },
            { category: 'ปี 2567', first: Number(eec24_econ_tourist[0].f2567), second: Number(eec20_econ_tourist[0].f2567), third: Number(eec21_econ_tourist[0].f2567), four: Number(eec_econ_tourist[0].f2567), },
            { category: 'ปี 2568', first: Number(eec24_econ_tourist[0].f2568), second: Number(eec20_econ_tourist[0].f2568), third: Number(eec21_econ_tourist[0].f2568), four: Number(eec_econ_tourist[0].f2568), },
            { category: 'ปี 2569', first: Number(eec24_econ_tourist[0].f2569), second: Number(eec20_econ_tourist[0].f2569), third: Number(eec21_econ_tourist[0].f2569), four: Number(eec_econ_tourist[0].f2569), },
            { category: 'ปี 2570', first: Number(eec24_econ_tourist[0].f2570), second: Number(eec20_econ_tourist[0].f2570), third: Number(eec21_econ_tourist[0].f2570), four: Number(eec_econ_tourist[0].f2570), },
            { category: 'ปี 2571', first: Number(eec24_econ_tourist[0].f2571), second: Number(eec20_econ_tourist[0].f2571), third: Number(eec21_econ_tourist[0].f2571), four: Number(eec_econ_tourist[0].f2571), },
            { category: 'ปี 2572', first: Number(eec24_econ_tourist[0].f2572), second: Number(eec20_econ_tourist[0].f2572), third: Number(eec21_econ_tourist[0].f2572), four: Number(eec_econ_tourist[0].f2572), },
            { category: 'ปี 2573', first: Number(eec24_econ_tourist[0].f2573), second: Number(eec20_econ_tourist[0].f2573), third: Number(eec21_econ_tourist[0].f2573), four: Number(eec_econ_tourist[0].f2573), },
            { category: 'ปี 2574', first: Number(eec24_econ_tourist[0].f2574), second: Number(eec20_econ_tourist[0].f2574), third: Number(eec21_econ_tourist[0].f2574), four: Number(eec_econ_tourist[0].f2574), },
            { category: 'ปี 2575', first: Number(eec24_econ_tourist[0].f2575), second: Number(eec20_econ_tourist[0].f2575), third: Number(eec21_econ_tourist[0].f2575), four: Number(eec_econ_tourist[0].f2575), },
            { category: 'ปี 2576', first: Number(eec24_econ_tourist[0].f2576), second: Number(eec20_econ_tourist[0].f2576), third: Number(eec21_econ_tourist[0].f2576), four: Number(eec_econ_tourist[0].f2576), },
            { category: 'ปี 2577', first: Number(eec24_econ_tourist[0].f2577), second: Number(eec20_econ_tourist[0].f2577), third: Number(eec21_econ_tourist[0].f2577), four: Number(eec_econ_tourist[0].f2577), },
            { category: 'ปี 2578', first: Number(eec24_econ_tourist[0].f2578), second: Number(eec20_econ_tourist[0].f2578), third: Number(eec21_econ_tourist[0].f2578), four: Number(eec_econ_tourist[0].f2578), },
            { category: 'ปี 2579', first: Number(eec24_econ_tourist[0].f2579), second: Number(eec20_econ_tourist[0].f2579), third: Number(eec21_econ_tourist[0].f2579), four: Number(eec_econ_tourist[0].f2579), },
            { category: 'ปี 2580', first: Number(eec24_econ_tourist[0].f2580), second: Number(eec20_econ_tourist[0].f2580), third: Number(eec21_econ_tourist[0].f2580), four: Number(eec_econ_tourist[0].f2580), },
        )
        let eec_econ_agri = r.data.data.filter(e => e.list_code == "econ_agri" && e.t_code == "eec")
        let eec_econ_industry = r.data.data.filter(e => e.list_code == "econ_industry" && e.t_code == "eec")
        let eec_econ_sevice = r.data.data.filter(e => e.list_code == "econ_sevice" && e.t_code == "eec")

        datecon_agri.push(
            { category: 'ปี 2562', four: Number(eec_econ_agri[0].f2562), },
            { category: 'ปี 2563', four: Number(eec_econ_agri[0].f2563), },
            { category: 'ปี 2564', four: Number(eec_econ_agri[0].f2564), },
            { category: 'ปี 2565', four: Number(eec_econ_agri[0].f2565), },
            { category: 'ปี 2566', four: Number(eec_econ_agri[0].f2566), },
            { category: 'ปี 2567', four: Number(eec_econ_agri[0].f2567), },
            { category: 'ปี 2568', four: Number(eec_econ_agri[0].f2568), },
            { category: 'ปี 2569', four: Number(eec_econ_agri[0].f2569), },
            { category: 'ปี 2570', four: Number(eec_econ_agri[0].f2570), }
        )
        datecon_industry.push(
            { category: 'ปี 2562', four: Number(eec_econ_industry[0].f2562), },
            { category: 'ปี 2563', four: Number(eec_econ_industry[0].f2563), },
            { category: 'ปี 2564', four: Number(eec_econ_industry[0].f2564), },
            { category: 'ปี 2565', four: Number(eec_econ_industry[0].f2565), },
            { category: 'ปี 2566', four: Number(eec_econ_industry[0].f2566), },
            { category: 'ปี 2567', four: Number(eec_econ_industry[0].f2567), },
            { category: 'ปี 2568', four: Number(eec_econ_industry[0].f2568), },
            { category: 'ปี 2569', four: Number(eec_econ_industry[0].f2569), },
            { category: 'ปี 2570', four: Number(eec_econ_industry[0].f2570), }
        )
        datecon_sevice.push(
            { category: 'ปี 2562', four: Number(eec_econ_sevice[0].f2562), },
            { category: 'ปี 2563', four: Number(eec_econ_sevice[0].f2563), },
            { category: 'ปี 2564', four: Number(eec_econ_sevice[0].f2564), },
            { category: 'ปี 2565', four: Number(eec_econ_sevice[0].f2565), },
            { category: 'ปี 2566', four: Number(eec_econ_sevice[0].f2566), },
            { category: 'ปี 2567', four: Number(eec_econ_sevice[0].f2567), },
            { category: 'ปี 2568', four: Number(eec_econ_sevice[0].f2568), },
            { category: 'ปี 2569', four: Number(eec_econ_sevice[0].f2569), },
            { category: 'ปี 2570', four: Number(eec_econ_sevice[0].f2570), }
        )
        ///labor
        let eec24_labor_minwage = r.data.data.filter(e => e.list_code == "labor_minwage" && e.t_code == "24")
        let eec20_labor_minwage = r.data.data.filter(e => e.list_code == "labor_minwage" && e.t_code == "20")
        let eec21_labor_minwage = r.data.data.filter(e => e.list_code == "labor_minwage" && e.t_code == "21")
        datlabor_minwage.push(
            { category: 'ปี 2565', first: Number(eec24_labor_minwage[0].f2565), second: Number(eec20_labor_minwage[0].f2565), third: Number(eec21_labor_minwage[0].f2565), },
            { category: 'ปี 2566', first: Number(eec24_labor_minwage[0].f2566), second: Number(eec20_labor_minwage[0].f2566), third: Number(eec21_labor_minwage[0].f2566), },
            { category: 'ปี 2567', first: Number(eec24_labor_minwage[0].f2567), second: Number(eec20_labor_minwage[0].f2567), third: Number(eec21_labor_minwage[0].f2567), },
            { category: 'ปี 2568', first: Number(eec24_labor_minwage[0].f2568), second: Number(eec20_labor_minwage[0].f2568), third: Number(eec21_labor_minwage[0].f2568), },
            { category: 'ปี 2569', first: Number(eec24_labor_minwage[0].f2569), second: Number(eec20_labor_minwage[0].f2569), third: Number(eec21_labor_minwage[0].f2569), },
            { category: 'ปี 2570', first: Number(eec24_labor_minwage[0].f2570), second: Number(eec20_labor_minwage[0].f2570), third: Number(eec21_labor_minwage[0].f2570), },
            { category: 'ปี 2571', first: Number(eec24_labor_minwage[0].f2571), second: Number(eec20_labor_minwage[0].f2571), third: Number(eec21_labor_minwage[0].f2571), },
            { category: 'ปี 2572', first: Number(eec24_labor_minwage[0].f2572), second: Number(eec20_labor_minwage[0].f2572), third: Number(eec21_labor_minwage[0].f2572), },
            { category: 'ปี 2573', first: Number(eec24_labor_minwage[0].f2573), second: Number(eec20_labor_minwage[0].f2573), third: Number(eec21_labor_minwage[0].f2573), },
            { category: 'ปี 2574', first: Number(eec24_labor_minwage[0].f2574), second: Number(eec20_labor_minwage[0].f2574), third: Number(eec21_labor_minwage[0].f2574), },
            { category: 'ปี 2575', first: Number(eec24_labor_minwage[0].f2575), second: Number(eec20_labor_minwage[0].f2575), third: Number(eec21_labor_minwage[0].f2575), },
            { category: 'ปี 2576', first: Number(eec24_labor_minwage[0].f2576), second: Number(eec20_labor_minwage[0].f2576), third: Number(eec21_labor_minwage[0].f2576), },
            { category: 'ปี 2577', first: Number(eec24_labor_minwage[0].f2577), second: Number(eec20_labor_minwage[0].f2577), third: Number(eec21_labor_minwage[0].f2577), },
            { category: 'ปี 2578', first: Number(eec24_labor_minwage[0].f2578), second: Number(eec20_labor_minwage[0].f2578), third: Number(eec21_labor_minwage[0].f2578), },
            { category: 'ปี 2579', first: Number(eec24_labor_minwage[0].f2579), second: Number(eec20_labor_minwage[0].f2579), third: Number(eec21_labor_minwage[0].f2579), },
            { category: 'ปี 2580', first: Number(eec24_labor_minwage[0].f2580), second: Number(eec20_labor_minwage[0].f2580), third: Number(eec21_labor_minwage[0].f2580), },
        )

        let eec24_labor_employ = r.data.data.filter(e => e.list_code == "labor_employ" && e.t_code == "24")
        let eec20_labor_employ = r.data.data.filter(e => e.list_code == "labor_employ" && e.t_code == "20")
        let eec21_labor_employ = r.data.data.filter(e => e.list_code == "labor_employ" && e.t_code == "21")
        let eec_labor_employ = r.data.data.filter(e => e.list_code == "labor_employ" && e.t_code == "eec")
        datlabor_employ.push(
            { category: 'ปี 2565', first: Number(eec24_labor_employ[0].f2565), second: Number(eec20_labor_employ[0].f2565), third: Number(eec21_labor_employ[0].f2565), four: Number(eec_labor_employ[0].f2565), },
            { category: 'ปี 2566', first: Number(eec24_labor_employ[0].f2566), second: Number(eec20_labor_employ[0].f2566), third: Number(eec21_labor_employ[0].f2566), four: Number(eec_labor_employ[0].f2566), },
            { category: 'ปี 2567', first: Number(eec24_labor_employ[0].f2567), second: Number(eec20_labor_employ[0].f2567), third: Number(eec21_labor_employ[0].f2567), four: Number(eec_labor_employ[0].f2567), },
            { category: 'ปี 2568', first: Number(eec24_labor_employ[0].f2568), second: Number(eec20_labor_employ[0].f2568), third: Number(eec21_labor_employ[0].f2568), four: Number(eec_labor_employ[0].f2568), },
            { category: 'ปี 2569', first: Number(eec24_labor_employ[0].f2569), second: Number(eec20_labor_employ[0].f2569), third: Number(eec21_labor_employ[0].f2569), four: Number(eec_labor_employ[0].f2569), },
            { category: 'ปี 2570', first: Number(eec24_labor_employ[0].f2570), second: Number(eec20_labor_employ[0].f2570), third: Number(eec21_labor_employ[0].f2570), four: Number(eec_labor_employ[0].f2570), },
            { category: 'ปี 2571', first: Number(eec24_labor_employ[0].f2571), second: Number(eec20_labor_employ[0].f2571), third: Number(eec21_labor_employ[0].f2571), four: Number(eec_labor_employ[0].f2571), },
            { category: 'ปี 2572', first: Number(eec24_labor_employ[0].f2572), second: Number(eec20_labor_employ[0].f2572), third: Number(eec21_labor_employ[0].f2572), four: Number(eec_labor_employ[0].f2572), },
            { category: 'ปี 2573', first: Number(eec24_labor_employ[0].f2573), second: Number(eec20_labor_employ[0].f2573), third: Number(eec21_labor_employ[0].f2573), four: Number(eec_labor_employ[0].f2573), },
            { category: 'ปี 2574', first: Number(eec24_labor_employ[0].f2574), second: Number(eec20_labor_employ[0].f2574), third: Number(eec21_labor_employ[0].f2574), four: Number(eec_labor_employ[0].f2574), },
            { category: 'ปี 2575', first: Number(eec24_labor_employ[0].f2575), second: Number(eec20_labor_employ[0].f2575), third: Number(eec21_labor_employ[0].f2575), four: Number(eec_labor_employ[0].f2575), },
            { category: 'ปี 2576', first: Number(eec24_labor_employ[0].f2576), second: Number(eec20_labor_employ[0].f2576), third: Number(eec21_labor_employ[0].f2576), four: Number(eec_labor_employ[0].f2576), },
            { category: 'ปี 2577', first: Number(eec24_labor_employ[0].f2577), second: Number(eec20_labor_employ[0].f2577), third: Number(eec21_labor_employ[0].f2577), four: Number(eec_labor_employ[0].f2577), },
            { category: 'ปี 2578', first: Number(eec24_labor_employ[0].f2578), second: Number(eec20_labor_employ[0].f2578), third: Number(eec21_labor_employ[0].f2578), four: Number(eec_labor_employ[0].f2578), },
            { category: 'ปี 2579', first: Number(eec24_labor_employ[0].f2579), second: Number(eec20_labor_employ[0].f2579), third: Number(eec21_labor_employ[0].f2579), four: Number(eec_labor_employ[0].f2579), },
            { category: 'ปี 2580', first: Number(eec24_labor_employ[0].f2580), second: Number(eec20_labor_employ[0].f2580), third: Number(eec21_labor_employ[0].f2580), four: Number(eec_labor_employ[0].f2580), },
        )

        let eec24_labor_exert = r.data.data.filter(e => e.list_code == "labor" && e.t_code == "24")
        let eec20_labor_exert = r.data.data.filter(e => e.list_code == "labor" && e.t_code == "20")
        let eec21_labor_exert = r.data.data.filter(e => e.list_code == "labor" && e.t_code == "21")
        let eec_labor_exert = r.data.data.filter(e => e.list_code == "labor" && e.t_code == "eec")
        datlabor_exert.push(
            { category: 'ปี 2565', first: Number(eec24_labor_exert[0].f2565), second: Number(eec20_labor_exert[0].f2565), third: Number(eec21_labor_exert[0].f2565), four: Number(eec_labor_exert[0].f2565), },
            { category: 'ปี 2566', first: Number(eec24_labor_exert[0].f2566), second: Number(eec20_labor_exert[0].f2566), third: Number(eec21_labor_exert[0].f2566), four: Number(eec_labor_exert[0].f2566), },
            { category: 'ปี 2567', first: Number(eec24_labor_exert[0].f2567), second: Number(eec20_labor_exert[0].f2567), third: Number(eec21_labor_exert[0].f2567), four: Number(eec_labor_exert[0].f2567), },
            { category: 'ปี 2568', first: Number(eec24_labor_exert[0].f2568), second: Number(eec20_labor_exert[0].f2568), third: Number(eec21_labor_exert[0].f2568), four: Number(eec_labor_exert[0].f2568), },
            { category: 'ปี 2569', first: Number(eec24_labor_exert[0].f2569), second: Number(eec20_labor_exert[0].f2569), third: Number(eec21_labor_exert[0].f2569), four: Number(eec_labor_exert[0].f2569), },
            { category: 'ปี 2570', first: Number(eec24_labor_exert[0].f2570), second: Number(eec20_labor_exert[0].f2570), third: Number(eec21_labor_exert[0].f2570), four: Number(eec_labor_exert[0].f2570), },
            { category: 'ปี 2571', first: Number(eec24_labor_exert[0].f2571), second: Number(eec20_labor_exert[0].f2571), third: Number(eec21_labor_exert[0].f2571), four: Number(eec_labor_exert[0].f2571), },
            { category: 'ปี 2572', first: Number(eec24_labor_exert[0].f2572), second: Number(eec20_labor_exert[0].f2572), third: Number(eec21_labor_exert[0].f2572), four: Number(eec_labor_exert[0].f2572), },
            { category: 'ปี 2573', first: Number(eec24_labor_exert[0].f2573), second: Number(eec20_labor_exert[0].f2573), third: Number(eec21_labor_exert[0].f2573), four: Number(eec_labor_exert[0].f2573), },
            { category: 'ปี 2574', first: Number(eec24_labor_exert[0].f2574), second: Number(eec20_labor_exert[0].f2574), third: Number(eec21_labor_exert[0].f2574), four: Number(eec_labor_exert[0].f2574), },
            { category: 'ปี 2575', first: Number(eec24_labor_exert[0].f2575), second: Number(eec20_labor_exert[0].f2575), third: Number(eec21_labor_exert[0].f2575), four: Number(eec_labor_exert[0].f2575), },
            { category: 'ปี 2576', first: Number(eec24_labor_exert[0].f2576), second: Number(eec20_labor_exert[0].f2576), third: Number(eec21_labor_exert[0].f2576), four: Number(eec_labor_exert[0].f2576), },
            { category: 'ปี 2577', first: Number(eec24_labor_exert[0].f2577), second: Number(eec20_labor_exert[0].f2577), third: Number(eec21_labor_exert[0].f2577), four: Number(eec_labor_exert[0].f2577), },
            { category: 'ปี 2578', first: Number(eec24_labor_exert[0].f2578), second: Number(eec20_labor_exert[0].f2578), third: Number(eec21_labor_exert[0].f2578), four: Number(eec_labor_exert[0].f2578), },
            { category: 'ปี 2579', first: Number(eec24_labor_exert[0].f2579), second: Number(eec20_labor_exert[0].f2579), third: Number(eec21_labor_exert[0].f2579), four: Number(eec_labor_exert[0].f2579), },
            { category: 'ปี 2580', first: Number(eec24_labor_exert[0].f2580), second: Number(eec20_labor_exert[0].f2580), third: Number(eec21_labor_exert[0].f2580), four: Number(eec_labor_exert[0].f2580), },
        )

        let eec_labor_M3 = r.data.data.filter(e => e.list_code == "labor_M3" && e.t_code == "eec")
        let eec_labor_M6 = r.data.data.filter(e => e.list_code == "labor_M6" && e.t_code == "eec")
        let eec_labor_profession = r.data.data.filter(e => e.list_code == "labor_profession" && e.t_code == "eec")
        let eec_labor_Bachelor = r.data.data.filter(e => e.list_code == "labor_Bachelor" && e.t_code == "eec")
        let eec_labor_MoreBachelor = r.data.data.filter(e => e.list_code == "labor_MoreBachelor" && e.t_code == "eec")
        datlabor_edulevel_all.push(
            { category: 'ปี 2561', first: Number(eec_labor_M3[0].f2561), second: Number(eec_labor_M6[0].f2561), third: Number(eec_labor_profession[0].f2561), four: Number(eec_labor_Bachelor[0].f2561), fifth: Number(eec_labor_MoreBachelor[0].f2561), },
            { category: 'ปี 2562', first: Number(eec_labor_M3[0].f2562), second: Number(eec_labor_M6[0].f2562), third: Number(eec_labor_profession[0].f2562), four: Number(eec_labor_Bachelor[0].f2562), fifth: Number(eec_labor_MoreBachelor[0].f2562), },
            { category: 'ปี 2563', first: Number(eec_labor_M3[0].f2563), second: Number(eec_labor_M6[0].f2563), third: Number(eec_labor_profession[0].f2563), four: Number(eec_labor_Bachelor[0].f2563), fifth: Number(eec_labor_MoreBachelor[0].f2563), },
            { category: 'ปี 2564', first: Number(eec_labor_M3[0].f2564), second: Number(eec_labor_M6[0].f2564), third: Number(eec_labor_profession[0].f2564), four: Number(eec_labor_Bachelor[0].f2564), fifth: Number(eec_labor_MoreBachelor[0].f2564), },
            { category: 'ปี 2565', first: Number(eec_labor_M3[0].f2565), second: Number(eec_labor_M6[0].f2565), third: Number(eec_labor_profession[0].f2565), four: Number(eec_labor_Bachelor[0].f2565), fifth: Number(eec_labor_MoreBachelor[0].f2565), },
            { category: 'ปี 2566', first: Number(eec_labor_M3[0].f2566), second: Number(eec_labor_M6[0].f2566), third: Number(eec_labor_profession[0].f2566), four: Number(eec_labor_Bachelor[0].f2566), fifth: Number(eec_labor_MoreBachelor[0].f2566), },
            { category: 'ปี 2567', first: Number(eec_labor_M3[0].f2567), second: Number(eec_labor_M6[0].f2567), third: Number(eec_labor_profession[0].f2567), four: Number(eec_labor_Bachelor[0].f2567), fifth: Number(eec_labor_MoreBachelor[0].f2567), },
            { category: 'ปี 2568', first: Number(eec_labor_M3[0].f2568), second: Number(eec_labor_M6[0].f2568), third: Number(eec_labor_profession[0].f2568), four: Number(eec_labor_Bachelor[0].f2568), fifth: Number(eec_labor_MoreBachelor[0].f2568), },
            { category: 'ปี 2569', first: Number(eec_labor_M3[0].f2569), second: Number(eec_labor_M6[0].f2569), third: Number(eec_labor_profession[0].f2569), four: Number(eec_labor_Bachelor[0].f2569), fifth: Number(eec_labor_MoreBachelor[0].f2569), },
            { category: 'ปี 2570', first: Number(eec_labor_M3[0].f2570), second: Number(eec_labor_M6[0].f2570), third: Number(eec_labor_profession[0].f2570), four: Number(eec_labor_Bachelor[0].f2570), fifth: Number(eec_labor_MoreBachelor[0].f2570), },
        )

        datlabor_edulevel_M3.push(
            { year: '2018', value: Number(eec_labor_M3[0].f2561), },
            { year: '2019', value: Number(eec_labor_M3[0].f2562), },
            { year: '2020', value: Number(eec_labor_M3[0].f2563), },
            { year: '2021', value: Number(eec_labor_M3[0].f2564), },
            { year: '2022', value: Number(eec_labor_M3[0].f2565), },
            { year: '2023', value: Number(eec_labor_M3[0].f2566), },
            { year: '2024', value: Number(eec_labor_M3[0].f2567), },
            { year: '2025', value: Number(eec_labor_M3[0].f2568), },
            { year: '2026', value: Number(eec_labor_M3[0].f2569), },
            { year: '2027', value: Number(eec_labor_M3[0].f2570), },
        )
        datlabor_edulevel_M6.push(
            { year: '2018', value: Number(eec_labor_M6[0].f2561), },
            { year: '2019', value: Number(eec_labor_M6[0].f2562), },
            { year: '2020', value: Number(eec_labor_M6[0].f2563), },
            { year: '2021', value: Number(eec_labor_M6[0].f2564), },
            { year: '2022', value: Number(eec_labor_M6[0].f2565), },
            { year: '2023', value: Number(eec_labor_M6[0].f2566), },
            { year: '2024', value: Number(eec_labor_M6[0].f2567), },
            { year: '2025', value: Number(eec_labor_M6[0].f2568), },
            { year: '2026', value: Number(eec_labor_M6[0].f2569), },
            { year: '2027', value: Number(eec_labor_M6[0].f2570), },
        )
        datlabor_edulevel_profession.push(
            { year: '2018', value: Number(eec_labor_profession[0].f2561), },
            { year: '2019', value: Number(eec_labor_profession[0].f2562), },
            { year: '2020', value: Number(eec_labor_profession[0].f2563), },
            { year: '2021', value: Number(eec_labor_profession[0].f2564), },
            { year: '2022', value: Number(eec_labor_profession[0].f2565), },
            { year: '2023', value: Number(eec_labor_profession[0].f2566), },
            { year: '2024', value: Number(eec_labor_profession[0].f2567), },
            { year: '2025', value: Number(eec_labor_profession[0].f2568), },
            { year: '2026', value: Number(eec_labor_profession[0].f2569), },
            { year: '2027', value: Number(eec_labor_profession[0].f2570), },
        )
        datlabor_edulevel_Bachelor.push(
            { year: '2018', value: Number(eec_labor_Bachelor[0].f2561), },
            { year: '2019', value: Number(eec_labor_Bachelor[0].f2562), },
            { year: '2020', value: Number(eec_labor_Bachelor[0].f2563), },
            { year: '2021', value: Number(eec_labor_Bachelor[0].f2564), },
            { year: '2022', value: Number(eec_labor_Bachelor[0].f2565), },
            { year: '2023', value: Number(eec_labor_Bachelor[0].f2566), },
            { year: '2024', value: Number(eec_labor_Bachelor[0].f2567), },
            { year: '2025', value: Number(eec_labor_Bachelor[0].f2568), },
            { year: '2026', value: Number(eec_labor_Bachelor[0].f2569), },
            { year: '2027', value: Number(eec_labor_Bachelor[0].f2570), },
        )
        datlabor_edulevel_MoreBachelor.push(
            { year: '2018', value: Number(eec_labor_MoreBachelor[0].f2561), },
            { year: '2019', value: Number(eec_labor_MoreBachelor[0].f2562), },
            { year: '2020', value: Number(eec_labor_MoreBachelor[0].f2563), },
            { year: '2021', value: Number(eec_labor_MoreBachelor[0].f2564), },
            { year: '2022', value: Number(eec_labor_MoreBachelor[0].f2565), },
            { year: '2023', value: Number(eec_labor_MoreBachelor[0].f2566), },
            { year: '2024', value: Number(eec_labor_MoreBachelor[0].f2567), },
            { year: '2025', value: Number(eec_labor_MoreBachelor[0].f2568), },
            { year: '2026', value: Number(eec_labor_MoreBachelor[0].f2569), },
            { year: '2027', value: Number(eec_labor_MoreBachelor[0].f2570), },
        )
    })
}
dataforecast_eec()

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

        var bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = false
        bullet.dy = 30;
        bullet.label.text = "{valueY.formatNumber('###,###,###.##')}"
        bullet.label.fill = am4core.color('#ffffff')

        return series;
    }

    chart.data = data

    createSeries('four', 'ภาพรวมทั้ง 3 จังหวัด', umit, color1, color2);

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
    chart.exporting.adapter.add("data", function (data, target) {
        var data = [];
        chart.series.each(function (series) {
            for (var i = 0; i < series.data.length; i++) {
                series.data[i].name = series.name;
                data.push(series.data[i]);
            }
        });
        return { data: data };
    });
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
    chart.exporting.adapter.add("data", function (data, target) {
        var data = [];
        chart.series.each(function (series) {
            for (var i = 0; i < series.data.length; i++) {
                series.data[i].name = series.name;
                data.push(series.data[i]);
            }
        });
        return { data: data };
    });
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
    chart.exporting.adapter.add("data", function (data, target) {
        var data = [];
        chart.series.each(function (series) {
            for (var i = 0; i < series.data.length; i++) {
                series.data[i].name = series.name;
                data.push(series.data[i]);
            }
        });
        return { data: data };
    });

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
    chart.exporting.adapter.add("data", function (data, target) {
        var data = [];
        chart.series.each(function (series) {
            for (var i = 0; i < series.data.length; i++) {
                series.data[i].name = series.name;
                data.push(series.data[i]);
            }
        });
        return { data: data };
    });
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
    chart.exporting.adapter.add("data", function (data, target) {
        var data = [];
        chart.series.each(function (series) {
            for (var i = 0; i < series.data.length; i++) {
                series.data[i].name = series.name;
                data.push(series.data[i]);
            }
        });
        return { data: data };
    });
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
    chart.exporting.adapter.add("data", function (data, target) {
        var data = [];
        chart.series.each(function (series) {
            for (var i = 0; i < series.data.length; i++) {
                series.data[i].name = series.name;
                data.push(series.data[i]);
            }
        });
        return { data: data };
    });
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
    chart.exporting.adapter.add("data", function (data, target) {
        var data = [];
        chart.series.each(function (series) {
            for (var i = 0; i < series.data.length; i++) {
                series.data[i].name = series.name;
                data.push(series.data[i]);
            }
        });
        return { data: data };
    });
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