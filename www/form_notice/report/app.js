let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);

urid ? null : location.href = "./../../form_register/login/index.html";
if (eecauth !== "admin" && eecauth !== "user") {
    location.href = "./../../form_register/login/index.html";
}

var L68 = 'https://engrids.soc.cmu.ac.th/geoserver/eec/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=eec%3Aa__68_complaint_pollu_cco&maxFeatures=50&outputFormat=application%2Fjson';
var L69 = 'https://engrids.soc.cmu.ac.th/geoserver/eec/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=eec%3Aa__69_complaint_pollu_cbi&maxFeatures=50&outputFormat=application%2Fjson';
var L70 = 'https://engrids.soc.cmu.ac.th/geoserver/eec/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=eec%3Aa__70_complaint_pollu_ryg&maxFeatures=50&outputFormat=application%2Fjson';
$(document).ready(() => {
    loadTable()
    layermark(L68, 68)
    layermark(L69, 69)
    layermark(L70, 70)
});

const url = "https://engrids.soc.cmu.ac.th/api";

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

const tam = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: "eec:a__03_tambon_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 18,
    // minZoom: 14,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 14,
    // minZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: "eec:a__01_prov_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});
const pollucco = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: 'eec:a__68_complaint_pollu_cco',
    format: 'image/png',
    transparent: true
});
const pollucbi = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: 'eec:a__69_complaint_pollu_cbi',
    format: 'image/png',
    transparent: true
});
const polluryg = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: 'eec:a__70_complaint_pollu_ryg',
    format: 'image/png',
    transparent: true
});
let lyrs = L.featureGroup().addTo(map)

var baseMap = {
    "Mapbox": mapbox.addTo(map),
    "google Hybrid": ghyb
}

const overlayMap = {
    "ขอบเขตจังหวัด": pro.addTo(map),
    "ขอบเขตอำเภอ": amp,
    "ขอบเขตตำบล": tam,
    // "เรื่องร้องเรียนมลพิษ จังหวัดฉะเชิงเทรา": m68,
    // "เรื่องร้องเรียนมลพิษ จังหวัดชลบุรี": m69,
    // "เรื่องร้องเรียนมลพิษ จังหวัดระยอง": m70,
}
// L.control.layers(baseMap, overlayMap).addTo(map);
const lyrControl = L.control.layers(baseMap, overlayMap, {
    collapsed: true
}).addTo(map);

var legend = L.control({ position: "bottomleft" });
function showLegend() {
    legend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += `<button class="btn btn-sm" onClick="hideLegend()">
      <span class="kanit">ซ่อนสัญลักษณ์</span><i class="fa fa-angle-double-down" aria-hidden="true"></i>
    </button><br>`; div.innerHTML += '<i style="background: #FFFFFF; border-style: solid; border-width: 3px;"></i><span>ขอบเขตจังหวัด</span><br>';
        div.innerHTML += '<i style="background: #FFFFFF; border-style: solid; border-width: 1.5px;"></i><span>ขอบเขตอำเภอ</span><br>';
        div.innerHTML += '<i style="background: #FFFFFF; border-style: dotted; border-width: 1.5px;"></i><span>ขอบเขตตำบล</span><br>';
        div.innerHTML += '<img src="./img/cco.png"  height="30px"><span>เรื่องร้องเรียนมลพิษ จ.ฉะเชิงเทรา</span><br>';
        div.innerHTML += '<img src="./img/cbi.png"  height="30px"><span>เรื่องร้องเรียนมลพิษ จ.ชลบุรี</span><br>';
        div.innerHTML += '<img src="./img/ryg.png"  height="30px"><span>เรื่องร้องเรียนมลพิษ จ.ระยอง</span><br>';
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

let refreshPage = () => {
    location.href = "./../report/index.html";
    // console.log("ok");
}

let confirmDelete = (id, gr_name, date) => {
    $("#projId").val(id)
    $("#projName").text(gr_name)
    if (date !== null) {
        $("#projTime").text(`วันที่ ${date}`)
    }
    $("#deleteModal").modal("show")
}

let closeModal = () => {
    $('#editModal').modal('hide')
    $('#deleteModal').modal('hide')
    $('#myTable').DataTable().ajax.reload();
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let proj_id = $("#projId").val()
    axios.post(url + "/notice-api/delete", { proj_id: proj_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
        $('#myTable').DataTable().ajax.reload();
    })
}

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
    let dtable = $('#myTable').DataTable({
        scrollX: true,
        ajax: {
            async: true,
            type: "POST",
            url: url + '/notice-api/getownerdata',
            data: { usrid: urid },
            dataSrc: 'data'
        },
        columns: [
            {
                data: '',
                render: (data, type, row, meta) => {
                    return `${meta.row + 1}`
                }
            },
            { data: 'noticename' },
            { data: 'noticedetail' },
            {
                data: '',
                render: (data, type, row) => {
                    return `ต.${row.tam_name} อ.${row.amp_name} จ.${row.pro_name} `
                }
            },
            { data: 'ndate' },
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(row);
                    return `<button class="btn m btn-outline-info" onclick="zoomMap(${row.lat}, ${row.lon})"><i class="bi bi-map"></i>&nbsp;zoom</button>
                            <button class="btn btn-margin btn-outline-success" onclick="getDetail(${row.proj_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;รายละเอียด</button>
                            <button class="btn btn-margin btn-outline-danger" onclick="confirmDelete('${row.proj_id}','${row.noticename}','${row.ndate}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>`
                },
                // width: "32%"
            }
        ],
        columnDefs: [
            { className: 'text-center', targets: [0, 4] },
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
        loadNoticetype(data);
        loadNoticepro(data);
    });
}

let zoomMap = (lat, lon) => {
    // console.log(lat, lon);
    map.setView([lat, lon], 14)
}

let onEachFeature = (feature, layer) => {
    // console.log(feature);
    if (feature.properties) {
        layer.bindPopup(`<b>${feature.properties.noticename}</b>
            <br>${feature.properties.noticedetail}
            <br><img src="${feature.properties.img}" width="240px">`,
            { maxWidth: 240 });
    }
}

var mm, ms
let getMarker = (d) => {
    map.eachLayer(i => {
        i.options.name == "marker" ? map.removeLayer(i) : null;
    });
    // console.log(d);
    ms = L.layerGroup()
    d.map(i => {
        if (i.geojson) {
            let json = JSON.parse(i.geojson);
            json.properties = { noticename: i.noticename, noticedetail: i.noticedetail, img: i.img };
            mm = L.geoJson(json, {
                onEachFeature: onEachFeature,
                name: "marker"
            })
                .bindPopup(`<h6><b>เรื่องร้องเรียน :</b> ${i.noticename}</h6><h6><b>จังหวัด :</b> ${i.pro_name}</h6><h6><b>วันที่รายงาน :</b> ${i.ndate}</h6>`)
            // .addTo(map)
        }
        ms.addLayer(mm);
    });
    ms.addTo(map)
    lyrControl.addOverlay(ms, "ตำแหน่งนำเข้าข้อมูล")
}

let loadNoticetype = async (d) => {
    // console.log(d);
    let hazard = 0;
    let diaster = 0;
    let other = 0;

    await d.map(i => {
        i.noticetype == "มลพิษ" ? hazard += 1 : null
        i.noticetype == "ภัยธรรมชาติ" ? diaster += 1 : null
        i.noticetype == "อื่นๆ" ? other += 1 : null
    })

    let dat = [{
        name: "มลพิษ",
        value: hazard
    }, {
        name: "ภัยธรรมชาติ",
        value: diaster
    }, {
        name: "อื่นๆ",
        value: other
    }]

    pieChart("chartnoticetype", dat)
}

let loadNoticepro = async (d) => {
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
        name: "จันทบุรี",
        value: chan
    }, {
        name: "ฉะเชิงเทรา",
        value: csao
    }, {
        name: "ชลบุรี",
        value: chon
    }, {
        name: "ตราด",
        value: trad
    }, {
        name: "นครนายก",
        value: nyok
    }, {
        name: "ปราจีนบุรี",
        value: pchin
    }, {
        name: "ระยอง",
        value: ryong
    }, {
        name: "สระแก้ว",
        value: skeaw
    }];

    chartbiopro("chartnoticepro", dat)
}

let getDetail = (e) => {
    sessionStorage.setItem('notice_gid', e);
    location.href = "./../detail/index.html";
}

let chartbiopro = (div, val) => {
    am4core.useTheme(am4themes_animated);

    var chart = am4core.create(div, am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

    chart.data = val;

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
    chart.exporting.menu.align = "left";
    chart.exporting.menu.verticalAlign = "top";
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
    chart.exporting.menu.align = "left";
    chart.exporting.menu.verticalAlign = "top";
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

var m68, m69, m70, ms68, ms69, ms70
let layermark = (Url, Nlayer) => {
    var MIcon1 = L.icon({
        iconUrl: './img/cco.png',
        iconSize: [18, 18],
        iconAnchor: [10, 5],
        // popupAnchor: [10, 0]
    });
    var MIcon2 = L.icon({
        iconUrl: './img/cbi.png',
        iconSize: [18, 18],
        iconAnchor: [10, 5],
        // popupAnchor: [10, 0]
    });

    var MIcon3 = L.icon({
        iconUrl: './img/ryg.png',
        iconSize: [18, 18],
        iconAnchor: [10, 5],
        // popupAnchor: [10, 0]
    });


    if (Nlayer == 68) {
        axios.get(Url).then((r) => {
            var d = r.data.features
            // console.log(r.data.features);
            ms68 = L.layerGroup()
            d.map(i => {
                if (i.properties) {
                    m68 = L.marker([i.properties.lat, i.properties.long], { icon: MIcon1 })
                        .bindPopup(`<h6><b>เรื่อง :</b> ${i.properties.name}</h6><h6><b>ประเภท :</b> ${i.properties.type2}</h6><h6><b>ผู้ร้องเรียน :</b> ${i.properties.complain}</h6><h6><b>สถานที่ :</b> ${i.properties.location}</h6><h6><b>วันที่ร้องเรียน :</b> ${i.properties.date}</h6>`)
                }
                ms68.addLayer(m68);
            })
            ms68.addTo(map)
            lyrControl.addOverlay(ms68, "เรื่องร้องเรียนมลพิษ จังหวัดฉะเชิงเทรา")
        });


    } else if (Nlayer == 69) {
        axios.get(Url).then((r) => {
            var d = r.data.features
            // console.log(r.data.features);
            ms69 = L.layerGroup()
            d.map(i => {
                if (i.properties) {
                    m69 = L.marker([i.properties.lat, i.properties.long], { icon: MIcon2 })
                        .bindPopup(`<h6><b>เรื่อง :</b> ${i.properties.name}</h6><h6><b>ร้องเรียน :</b> ${i.properties.complainty}</h6><h6><b>ประเภท :</b> ${i.properties.type2}</h6><h6><b>สถานที่ :</b> ${i.properties.location}</h6><h6><b>วันที่ร้องเรียน :</b> ${i.properties.date}</h6>`)
                    // .addTo(map);
                }
                ms69.addLayer(m69);
            })
            ms69.addTo(map)
            lyrControl.addOverlay(ms69, "เรื่องร้องเรียนมลพิษ จังหวัดชลบุรี")
        });
    } else if (Nlayer == 70) {
        axios.get(Url).then((r) => {
            var d = r.data.features
            // console.log(r.data.features);
            ms70 = L.layerGroup()
            d.map(i => {
                if (i.properties) {
                    m70 = L.marker([i.properties.lat, i.properties.long], { icon: MIcon3 })
                        .bindPopup(`<h6><b>ชื่อโรงงาน :</b> ${i.properties.name}</h6><h6><b>ประเภทของโรงงาน :</b> ${i.properties.category}</h6><h6><b>ร้องเรียน :</b> ${i.properties.complainty}</h6><h6><b>ประเภท :</b> ${i.properties.type2}</h6><h6><b>ผู้ร้องเรียน :</b> ${i.properties.complain}</h6><h6><b>สถานที่ :</b> ${i.properties.location}</h6><h6><b>วันที่ร้องเรียน :</b> ${i.properties.date}</h6>`)
                    // .addTo(map);
                }
                ms70.addLayer(m70);
            })
            ms70.addTo(map)
            lyrControl.addOverlay(ms70, "เรื่องร้องเรียนมลพิษ จังหวัดระยอง")
        });
    }

}