let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);
urid ? null : location.href = "./../../form_register/login/index.html";

if (eecauth !== "admin" && eecauth !== "user") {
    location.href = "./../../form_register/login/index.html";
}

sessionStorage.removeItem('biodiversity_proj_gid');

$(document).ready(() => {
    loadTable()

});

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3700';

let latlng = {
    lat: 13.305567,
    lng: 101.383101
};

let map = L.map('map', {
    center: latlng,
    zoom: 9
});

var mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
});

const ghyb = L.tileLayer('https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

const tam = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__03_tambon_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 18,
    // minZoom: 14,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 14,
    // minZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__01_prov_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});
// const specieseec = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
//     layers: 'eec:a__66_species_eec',
//     format: 'image/png',
//     transparent: true
// });
// const naturaleec = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
//     layers: 'eec:a__71_natural_eec',
//     format: 'image/png',
//     transparent: true
// });
// const wetlandeec = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
//     layers: 'eec:a__80_wetland_eec',
//     format: 'image/png',
//     transparent: true
// });

const forest2563 = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: 'eec:a__27_f_type63_eec',
    format: 'image/png',
    transparent: true
});

let lyrs = L.featureGroup().addTo(map)

var baseMap = {
    "Mapbox": mapbox.addTo(map),
    "google Hybrid": ghyb
}

let specieseec = L.featureGroup();
let naturaleec = L.featureGroup();
let wetlandeec = L.featureGroup();

const overlayMap = {
    "ขอบเขตจังหวัด": pro.addTo(map),
    "ขอบเขตอำเภอ": amp,
    "ขอบเขตตำบล": tam,
    "ข้อมูลป่าไม้ ปี2563": forest2563,
    "ชนิดพันธุ์สำคัญ หายาก และชีวภาพที่มีความสำคัญในพื้นที่เขตพัฒนาพิเศษภาคตะวันออก": specieseec.addTo(map),
    "ตำแหน่งแหล่งธรรมชาติในพื้นที่เขตพัฒนาพิเศษภาคตะวันออก": naturaleec.addTo(map),
    "พื้นที่ชุ่มน้ำ": wetlandeec.addTo(map),
}

const lyrControl = L.control.layers(baseMap, overlayMap, {
    collapsed: true
}).addTo(map);

var legend = L.control({ position: "bottomleft" });
function showLegend() {
    legend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += `<button class="btn btn-sm" onClick="hideLegend()">
      <span class="kanit">ซ่อนสัญลักษณ์</span><i class="fa fa-angle-double-down" aria-hidden="true"></i>
    </button><br>`;
        div.innerHTML += '<i style="background: #FFFFFF; border-style: solid; border-width: 3px;"></i><span>ขอบเขตจังหวัด</span><br>';
        div.innerHTML += '<i style="background: #FFFFFF; border-style: solid; border-width: 1.5px;"></i><span>ขอบเขตอำเภอ</span><br>';
        div.innerHTML += '<i style="background: #FFFFFF; border-style: dotted; border-width: 1.5px;"></i><span>ขอบเขตตำบล</span><br>';
        div.innerHTML += `<button class="btn btn-sm" onClick="Forop()" id="FOROP">
    <span class="kanit">ข้อมูลป่าไม้ปี 2563</span><i class="fa fa-angle-double-down" aria-hidden="true"></i>
  </button>`
        div.innerHTML += `<div id='ForLegend'></div>`
        div.innerHTML += '<img src="./img/bio3.png" width="10px"><span>ชนิดพันธุ์สำคัญ หายาก และชีวภาพ</span><br>';
        div.innerHTML += '<img src="./img/bio1.png" width="10px"><span>ตำแหน่งแหล่งธรรมชาติ</span><br>';
        div.innerHTML += '<img src="./img/bio2.png" width="10px"></i><span>พื้นที่ชุ่มน้ำ</span><br>';
        div.innerHTML += '<img src="./img/Mark.png" width="10px"><span>ตำแหน่งนำเข้าข้อมูล</span><br>';
        return div;
    };
    legend.addTo(map);
}

function hideLegend() {
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend')
        div.innerHTML += `<button class="btn btn-sm" onClick="showLegend()">
        <small class="prompt"><span class="kanit">แสดงสัญลักษณ์</span></small> 
        <i class="fa fa-angle-double-up" aria-hidden="true"></i>
    </button>`;
        return div;
    };
    legend.addTo(map);
}

hideLegend()

function Forop() {
    $('#FOROP').hide()
    $('#ForLegend').html(`<button class="btn btn-sm" onClick="Forclose()" id="FORCLOSE">
    <span class="kanit">ข้อมูลป่าไม้ปี 2563</span><i class="fa fa-angle-double-up" aria-hidden="true"></i></button><br>
       <i style="background: #00441b; border-radius: 1%;"></i><span>ป่าชายเลน</span><br>
    <i style="background: #006629; border-radius: 1%;"></i><span>ป่าชายหาด</span><br>
    <i style="background: #137e3a; border-radius: 1%;"></i><span>ป่าดิบแล้ง</span><br>
    <i style="background: #2a924a; border-radius: 1%;"></i><span>ป่าเต็งรัง</span><br>
    <i style="background: #3da75a; border-radius: 1%;"></i><span>ป่าที่ฟื้นฟูตามธรรมชาติ</span><br>
    <i style="background: #5bb86a; border-radius: 1%;"></i><span>ป่าทุ่ง</span><br>
    <i style="background: #7bc87c; border-radius: 1%;"></i><span>ป่าเบญจพรรณ</span><br>
    <i style="background: #98d593; border-radius: 1%;"></i><span>ป่าไผ่</span><br>
    <i style="background: #b2e0ab; border-radius: 1%;"></i><span>ป่าพรุ</span><br>
    <i style="background: #caeac3; border-radius: 1%;"></i><span>สวนป่าสัก</span><br>
    <i style="background: #ddf2d7; border-radius: 1%;"></i><span>สวนป่าอื่นๆ</span><br>
    <i style="background: #ecf8e8; border-radius: 1%;"></i><span>สังคมพืชลานหิน</span><br>
    <i style="background: #f7fcf5; border-radius: 1%;"></i><span>ไม่มีข้อมูล</span></div>`)
}
function Forclose() {
    $('#FOROP').show()
    $('#ForLegend').html('')
}

let refreshPage = () => {
    location.href = "./../report/index.html";
    // console.log("ok");
}

let confirmDelete = (id, gr_name, date) => {
    $("#projId").val(id)
    if (gr_name !== null) { $("#projName").text(gr_name) }
    if (date !== null) {
        $('#projTime').text(`วันที่ ${date}`)
    }
    $("#deleteModal").modal("show")
}

let closeModal = () => {
    $('#editModal').modal('hide')
    $('#deleteModal').modal('hide')
    $('#myTable').DataTable().ajax.reload();
    window.location.reload();
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let proj_id = $("#projId").val()
    axios.post(url + "/biodiversity-api/delete", { proj_id: proj_id }).then(r => {
        r.data.data == "success" ? closeModal() : null;
        $('#myTable').DataTable().ajax.reload();
        window.location.reload();
    })
}

let dtable
let loadTable = () => {
    $.extend(true, $.fn.dataTable.defaults, {
        "language": {
            "sProcessing": "กำลังดำเนินการ...",
            "sLengthMenu": "แสดง_MENU_ แถว",
            "sZeroRecords": "ไม่พบข้อมูล",
            "sInfo": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
            "sInfoEmpty": "แสดง 0 ถึง 0 จาก 0 แถว",
            "sInfoFiltered": "(กรองข้อมูล _MAX_ ทุกแถว)",
            "sInfoPostFix": "",
            "sSearch": "ค้นหา:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "เริ่มต้น",
                "sPrevious": "ก่อนหน้า",
                "sNext": "ถัดไป",
                "sLast": "สุดท้าย"
            }
        }
    });
    dtable = $('#myTable').DataTable({
        scrollX: true,
        ajax: {
            async: true,
            type: "POST",
            url: url + '/biodiversity-api/getdata',
            data: { usrid: urid },
            dataSrc: 'data'
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(row);
                    return `<button class="btn m btn-warning" onclick="zoomMap(${row.lat}, ${row.lon})"><i class="bi bi-map"></i>&nbsp;ซูม</button>
                            <button class="btn m btn-info" onclick="getDetail(${row.proj_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;แก้ไขข้อมูล</button>
                            <button class="btn m btn-danger" onclick="confirmDelete('${row.proj_id}','${row.bioname}','${row.ndate}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>`
                },
                // width: "30%"
            },
            { data: 'bioname' },
            {
                data: '',
                render: (data, type, row) => {
                    return `ต.${row.tam_name} อ.${row.amp_name} จ.${row.pro_name} `
                }
            },
            { data: 'ndate' },
            { data: 'usrname' },
        ],
        columnDefs: [
            { className: 'text-center', targets: [2, 3] },
        ],
        // "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
        dom: 'Bfrtip',
        buttons: [
            'excel', 'print'
        ],
        searching: true
    });

    dtable.on('search.dt', function () {
        let data = dtable.rows({ search: 'applied' }).data()
        getMarker(data);
        loadBiotype(data);
        loadBiopro(data);
    });
}

let zoomMap = (lat, lon) => {
    // console.log(lat, lon);
    map.setView([lat, lon], 14)
}

let onEachFeature = (feature, layer) => {
    // console.log(feature);
    if (feature.properties) {
        layer.bindPopup(`<span class="kanit"><b>${feature.properties.bioname}</b>
            <br>${feature.properties.biodetail}
            <br><img src="${feature.properties.img}" width="240px"
            <br><button class="btn m btn-outline-success kanit" onclick="getDetail(${feature.properties.proj_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;รายละเอียด</button></span>`,
            { maxWidth: 240 }
        );
    }
}
var mk, mg
let getMarker = (d) => {
    map.eachLayer(i => {
        i.options.name == "marker" ? map.removeLayer(i) : null;
    });
    if (!mg) {
        mg = L.layerGroup();
        d.map(i => {
            if (i.geojson) {

                let json = JSON.parse(i.geojson);
                json.properties = { bioname: i.bioname, biodetail: i.biodetail, img: i.img };

                mk = L.geoJson(json, {
                    onEachFeature: onEachFeature,
                    name: "marker"
                })
                // .addTo(map)
                mg.addLayer(mk);
            }

        });
        mg.addTo(map)
        lyrControl.addOverlay(mg, "ตำแหน่งนำเข้าข้อมูล")
    }
}

let loadBiotype = async (d) => {
    let zoo = 0;
    let plant = 0;
    let other = 0;

    await d.map(i => {
        i.biotype == "สัตว์" ? zoo += 1 : null
        i.biotype == "พืช" ? plant += 1 : null
        i.biotype == "ไม่ทราบ" ? other += 1 : null
    })

    // let dat = [{
    //     name: "สัตว์",
    //     value: zoo
    // }, {
    //     name: "พืช",
    //     value: plant
    // }, {
    //     name: "ไม่ทราบ",
    //     value: other
    // }]
    $("#zoo").text(zoo)
    $("#plant").text(plant)
    $("#other").text(other)

    // pieChart("chartbiotype", dat)
}

let loadBiopro = async (d) => {
    let chan = 0;
    let csao = 0;
    let chon = 0;
    let trad = 0;
    let nyok = 0;
    let pchin = 0;
    let ryong = 0;
    let skeaw = 0;
    await d.map(i => {
        i.pro_name == "จันทบุรี" ? chan += 1 : null;
        i.pro_name == "ฉะเชิงเทรา" ? csao += 1 : null;
        i.pro_name == "ชลบุรี" ? chon += 1 : null;
        i.pro_name == "ตราด" ? trad += 1 : null;
        i.pro_name == "นครนายก" ? nyok += 1 : null;
        i.pro_name == "ปราจีนบุรี" ? pchin += 1 : null;
        i.pro_name == "ระยอง" ? ryong += 1 : null;
        i.pro_name == "สระแก้ว" ? skeaw += 1 : null;
    })
    let dat = [{
        name: "ชลบุรี",
        value: chon
    }, {
        name: "ระยอง",
        value: ryong
    }, {
        name: "ฉะเชิงเทรา",
        value: csao
    }]

    // let dat = [{
    //     name: "จันทบุรี",
    //     value: chan
    // }, {
    //     name: "ฉะเชิงเทรา",
    //     value: csao
    // }, {
    //     name: "ชลบุรี",
    //     value: chon
    // }, {
    //     name: "ตราด",
    //     value: trad
    // }, {
    //     name: "นครนายก",
    //     value: nyok
    // }, {
    //     name: "ปราจีนบุรี",
    //     value: pchin
    // }, {
    //     name: "ระยอง",
    //     value: ryong
    // }, {
    //     name: "สระแก้ว",
    //     value: skeaw
    // }];

    chartbiopro("chartbiopro", dat)
}

let getDetail = (e) => {
    sessionStorage.setItem('biodiversity_proj_gid', e);
    sessionStorage.setItem('biodiversity_from_admin', 'yes');
    location.href = "./../detail/index.html";
}

let chartbiopro = (div, val) => {
    // console.log(val);
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);
    // chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = val;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "name";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    var hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();
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

let pieChart = (div, val) => {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(div, am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = val;

    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.radiusValue = "value";
    series.dataFields.category = "name";
    series.slices.template.cornerRadius = 6;
    series.colors.step = 3;

    series.hiddenState.properties.endAngle = -90;

    chart.legend = new am4charts.Legend();
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

let wfs = "https://eec-onep.online:8443/geoserver/eec/ows?service=WFS&version=1.0.0&request=GetFeature&maxFeatures=50&outputFormat=application%2Fjson"


// div.innerHTML += '<img src="./../../marker/forest2.png" width="10px"><span>ชนิดพันธุ์สำคัญ หายาก และชีวภาพ</span><br>';
// div.innerHTML += '<img src="./../../marker/mountains.png" width="10px"><span>ตำแหน่งแหล่งธรรมชาติ</span><br>';
// div.innerHTML += '<img src="./../../marker/grass.png" width="10px"></i><span>พื้นที่ชุ่มน้ำ</span><br>';

let getSpecies = () => {
    axios.get(wfs + "&typeName=eec%3Aa__66_species_eec").then(r => {
        let fs = r.data;

        var icon = L.icon({
            iconUrl: './img/bio3.png',
            iconSize: [32, 32],
            iconAnchor: [16, 37],
            popupAnchor: [0, -28]
        });

        let a = L.geoJSON(fs, {

            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: icon });
            },
            onEachFeature: (feature, layer) => {
                if (feature.properties) {
                    let popupContent = `<span style="font-family: 'Kanit'"><b>ชนิดพันธุ์สำคัญ หายาก และชีวภาพ</b><br> ชนิด: ${feature.properties.typ}<br>  
                    สถานะ: ${feature.properties.status}<br>  
                    สถานที่:  ${feature.properties.location}</span>`;
                    layer.bindPopup(popupContent);
                }
            }
        }).addTo(map);
        a.addTo(specieseec)
    })
}

getSpecies()

let getNatural = () => {
    axios.get(wfs + "&typeName=eec%3Aa__71_natural_eec").then(r => {
        let fs = r.data;

        var icon = L.icon({
            iconUrl: './img/bio1.png',
            iconSize: [32, 32],
            iconAnchor: [16, 37],
            popupAnchor: [0, -28]
        });

        let a = L.geoJSON(fs, {

            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: icon });
            },
            onEachFeature: (feature, layer) => {
                if (feature.properties) {
                    let popupContent = `<span style="font-family: 'Kanit'"><b>ตำแหน่งแหล่งธรรมชาติ</b><br> 
                    ประเภท: ${feature.properties.name}<br>  
                    คำอธิบาย: ${feature.properties.type}<br>  
                    สถานที่:  ${feature.properties.location}</span>`;
                    layer.bindPopup(popupContent);
                }
            }
        })
        a.addTo(naturaleec);
    })
}

getNatural()


let getWetland = () => {
    axios.get(wfs + "&typeName=eec%3Aa__80_wetland_eec").then(r => {
        let fs = r.data;

        var icon = L.icon({
            iconUrl: './img/bio2.png',
            iconSize: [32, 32],
            iconAnchor: [16, 37],
            popupAnchor: [0, -28]
        });

        let a = L.geoJSON(fs, {

            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: icon });
            },
            onEachFeature: (feature, layer) => {
                if (feature.properties) {
                    let popupContent = `<span style="font-family: 'Kanit'"><b>พื้นที่ชุ่มน้ำ</b><br> 
                    ประเภท: ${feature.properties.type}<br>  
                    ชื่อ: ${feature.properties.name}<br>  
                    สถานที่:  ${feature.properties.prov}</span>`;
                    layer.bindPopup(popupContent);
                }
            }
        })
        a.addTo(wetlandeec);

    })
}

getWetland()

$('#prov').on("change", function () {
    getPro(this.value)
    zoomExtent("pro", this.value)

    let pro = $("#prov").children("option:selected").text()
    if (pro !== "ทุกจังหวัด") {
        dtable.search(pro).draw();
    } else {
        dtable.search('').draw();
    }
})
$('#amp').on("change", function () {
    getAmp(this.value)
    zoomExtent("amp", this.value)

    let amp = $("#amp").children("option:selected").text()
    dtable.search(amp).draw();
})
$('#tam').on("change", function () {
    zoomExtent("tam", this.value)

    let tam = $("#tam").children("option:selected").text()
    dtable.search(tam).draw();
})

let zoomExtent = (lyr, code) => {
    map.eachLayer(lyr => {
        if (lyr.options.name == 'bound') {
            map.removeLayer(lyr)
        }
    })

    axios.get(url + `/eec-api/get-bound-flip/${lyr}/${code}`).then(r => {
        let geom = JSON.parse(r.data.data[0].geom)
        var polygon = L.polygon(geom.coordinates, { color: "red", name: "bound", fillOpacity: 0.0 }).addTo(map);
        map.fitBounds(polygon.getBounds());
    })
}
let getPro = (procode) => {
    axios.get(url + `/eec-api/get-amp/${procode}`).then(r => {
        // console.log(r.data.data);
        $("#amp").empty();
        $("#tam").empty();
        r.data.data.map(i => {
            $("#amp").append(`<option value="${i.amphoe_idn}">${i.amp_namt}</option>`)
        })
    })
}
let getAmp = (ampcode) => {
    axios.get(url + `/eec-api/get-tam/${ampcode}`).then(r => {
        $("#tam").empty();
        r.data.data.map(i => {
            $("#tam").append(`<option value="${i.tambon_idn}">${i.tam_namt}</option>`)
        })
    })
}









