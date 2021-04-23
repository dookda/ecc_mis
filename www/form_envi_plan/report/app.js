let uid = sessionStorage.getItem('key');
let typ = sessionStorage.getItem('typ');
let org = sessionStorage.getItem('org');

let logout = () => {
    sessionStorage.clear();
    location.href = "./../login/index.html";
}
// console.log(uid, org);
uid && org ? null : logout();
$("#aut").html(`${org}`)

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3700';

$(document).ready(function () {
    let table = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/projmon-api/getdata',
            data: { org: org, typ: typ },
            dataSrc: 'data'
        },
        columns: [
            {
                data: '',
                render: (data, type, row, meta) => {
                    // console.log(meta.row)
                    return `${meta.row + 1}`
                }
            },
            {
                data: '',
                render: (data, type, row) => {
                    return `${row.prj_name} <span class="badge bg-info text-white">${row.prj_cate}</span>`
                }
            },
            { data: 'prj_operat' },
            { data: 'budget' },
            { data: 'proc_stat' },
            { data: 'opert_stat' },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return `
                       <a type="button" class="btn btn-margin btn-info" href="./../edit/index.html?id=${row.prj_id}"><i class="bi bi-gear-fill"></i>&nbsp;แก้ไข</a>
                       <button type="button" class="btn btn-margin btn-danger" onclick="confirmDelete(${row.prj_id},'${row.prj_name}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>`
                }
            }
        ],
        searching: true,
        scrollX: true
    });

    table.on('search.dt', function () {
        let data = table.rows({ search: 'applied' }).data()
        getProc_stat(data);
        getOpert_stat(data);
        getPrj_cate(data);
        getBudget(data);
        getMap(data)
    });

    loadMap();
})

let latlng;

let map = L.map('map', {
    center: { lat: 13.305567, lng: 101.383101 },
    zoom: 9
});

let drawnItems = new L.FeatureGroup();

let loadMap = () => {
    let mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1
    });

    let ghyb = L.tileLayer('https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const tam = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
        layers: "th:tambon_4326",
        format: "image/png",
        transparent: true,
        CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
    });

    const amp = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
        layers: "th:amphoe_4326",
        format: "image/png",
        transparent: true,
        CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
    });

    const pro = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
        layers: "th:province_4326",
        format: "image/png",
        transparent: true,
        CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
    });

    let baseMap = {
        "Mapbox": mapbox.addTo(map),
        "google Hybrid": ghyb
    }
    let overlayMap = {
        "ขอบเขตตำบล": tam.addTo(map),
        "ขอบเขตอำเภอ": amp.addTo(map),
        "ขอบเขตจังหวัด": pro.addTo(map),
        "พื้นที่ดำเนินโครงการ": drawnItems.addTo(map)
    }
    L.control.layers(baseMap, overlayMap).addTo(map);
}

// map.addLayer(drawnItems);

let confirmDelete = (prj_id, prj_name) => {
    $("#projId").val(prj_id)
    $("#projName").text(prj_name)
    $("#deleteModal").modal("show")
}

let closeModal = () => {
    $('#editModal').modal('hide')
    $('#deleteModal').modal('hide')
    $('#myTable').DataTable().ajax.reload();
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let prj_id = $("#projId").val()
    axios.post(url + "/projmon-api/deletedata", { prj_id: prj_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
    })
}

let getMap = (x) => {
    // console.log(x);
    map.eachLayer((lyr) => {
        if (lyr.options.name == 'geojson') {
            map.removeLayer(lyr);
        }
    });
    var style = {
        "color": "#ff7800",
        "weight": 2,
        "opacity": 0.65
    };
    x.map(i => {
        if (i.geojson) {
            // console.log(i.geojson);
            let geojson = L.geoJSON(JSON.parse(i.geojson), {
                style: style,
                name: "geojson",
                onEachFeature: function (feature, layer) {
                    drawnItems.addLayer(layer);
                }
            })
            geojson.addTo(map);
        }
    })
}

let getPrj_cate = async (x) => {
    let a = "Flagship"
    let b = "ยุทธศาสตร์ที่ 1"
    let c = "ยุทธศาสตร์ที่ 2"
    let d = "ยุทธศาสตร์ที่ 3"
    let e = "ยุทธศาสตร์ที่ 4"
    let av = 0, bv = 0, cv = 0, dv = 0, ev = 0;

    await x.map(i => {
        // console.log(i);
        if (i.prj_cate == a) {
            av++
        } else if (i.prj_cate == b) {
            bv++
        } else if (i.prj_cate == c) {
            cv++
        } else if (i.prj_cate == d) {
            dv++
        } else if (i.prj_cate == e) {
            ev++
        }
    })
    let dat = [{
        cat: a,
        val: av
    }, {
        cat: b,
        val: bv
    }, {
        cat: c,
        val: cv
    }, {
        cat: d,
        val: dv
    }, {
        cat: e,
        val: ev
    }]
    barChart(dat, "chart1", "โครงการ")
}

let getBudget = async (x) => {
    let a = "งบประมาณประจำปี 2561"
    let b = "งบประมาณประจำปี 2562"
    let c = "งบประมาณประจำปี 2563"
    let d = "งบประมาณประจำปี 2564"
    let av = 0, bv = 0, cv = 0, dv = 0

    await x.map(i => {

        if (i.budg_61) {
            av += Number(i.budg_61)
        } else if (i.budg_62) {
            bv += Number(i.budg_62)
        } else if (i.budg_63) {
            cv += Number(i.budg_63)
        } else if (i.budg_64) {
            dv += Number(i.budg_64)
        }
    })
    let dat = [{
        cat: a,
        val: av
    }, {
        cat: b,
        val: bv
    }, {
        cat: c,
        val: cv
    }, {
        cat: d,
        val: dv
    }]

    // console.log(dat);
    barChart(dat, "chart2", "ล้านบาท")
}

let getProc_stat = async (x) => {
    let a = "ได้รับงบประมาณแล้ว";
    let b = "ไม่ได้รับงบประมาณ";
    let c = "ยังไม่ยื่นของบประมาณ";
    let av = 0, bv = 0, cv = 0;

    await x.map(i => {
        // console.log(i);
        if (i.proc_stat == a) {
            av++
        } else if (i.proc_stat == b) {
            bv++
        } else if (i.proc_stat == c) {
            cv++
        }
    })
    let dat = [{
        cat: a,
        val: av
    }, {
        cat: b,
        val: bv
    }, {
        cat: c,
        val: cv
    }]
    barChart(dat, "chart3", "โครงการ")
}

let getOpert_stat = async (x) => {
    let a = "อยู่ระหว่างการศึกษาความเหมาะสมและออกแบบรายละเอียด"
    let b = "อยู่ระหว่างตั้งของบประมาณ"
    let c = "อยู่ระหว่างดำเนินการ/ก่อสร้าง"
    let d = "ยังไม่ได้ดำเนินการ"
    let e = "ดำเนินการเรียบร้อยแล้ว"
    let av = 0, bv = 0, cv = 0, dv = 0, ev = 0;

    await x.map(i => {
        // console.log(i);
        if (i.opert_stat == a) {
            av++
        } else if (i.opert_stat == b) {
            bv++
        } else if (i.opert_stat == c) {
            cv++
        } else if (i.opert_stat == d) {
            dv++
        } else if (i.opert_stat == e) {
            ev++
        }
    })
    let dat = [{
        cat: "อยู่ระหว่างการศึกษาความเหมาะสมฯ",
        val: av
    }, {
        cat: b,
        val: bv
    }, {
        cat: c,
        val: cv
    }, {
        cat: d,
        val: dv
    }, {
        cat: e,
        val: ev
    }]
    barChart(dat, "chart4", "โครงการ")
}

let barChart = (datarr, chartdiv, unit) => {
    am4core.useTheme(am4themes_animated);
    // Themes end
    var chart = am4core.create(chartdiv, am4charts.XYChart);
    chart.padding(40, 40, 40, 40);
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "cat";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.title.text = unit;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "cat";
    series.dataFields.valueX = "val";
    series.tooltipText = "{valueX.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

    var labelBullet = series.bullets.push(new am4charts.LabelBullet())
    labelBullet.label.horizontalCenter = "left";
    labelBullet.label.dx = 10;
    labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.locationX = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
    });

    // categoryAxis.sortBySeries = series;
    chart.data = datarr
}










