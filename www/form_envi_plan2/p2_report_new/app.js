let uid = sessionStorage.getItem('key');
let typ = sessionStorage.getItem('typ');
let org = sessionStorage.getItem('org');

let usrname = sessionStorage.getItem('usrname');

sessionStorage.removeItem("pid");

let logout = () => {
    sessionStorage.clear();
    location.href = "./../login/index.html";
}
console.log(uid, typ, org, usrname);

uid && org ? null : logout();

if (typ == "admin") {
    $("#usermenu").append(`<li style="cursor: pointer;"><a onclick='goprofile()'><i class="bi bi-person-square"></i>&nbsp;<span >${usrname}</span></a></li>
        <li><a href="./../admin/index.html"><i class="bi bi-tools"></i>&nbsp;จัดการผู้ใช้</a></li>
        <li><a href="./../../file/MIS-Plan_plan2.pdf" target="_blank"><i class="bi bi-journal-arrow-down"></i>&nbsp;คู่มือระบบติดตามแผนสิ่งแวดล้อมระยะที่ 2
        </a></li>`)
} else {
    $("#usermenu").append(`<li><a href="" ><i class="bi bi-person-square"></i>&nbsp;<span >${usrname}</span></a></li>`)
}
let goprofile = () => {
    sessionStorage.setItem('pfuid', uid);
    location.href = "./../profile/index.html";
}

const url = "https://engrids.soc.cmu.ac.th/api";

let latlng;

let map = L.map('map', {
    center: { lat: 13.305567, lng: 101.383101 },
    zoom: 9
});
map.scrollWheelZoom.disable();

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

let gotoEdit = (pid) => {
    sessionStorage.setItem("pid", pid);
    location.href = "./../p2_edit_new/index.html";
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
            },
            "emptyTable": "ไม่พบข้อมูล..."
        }
    });
    let table = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/projmon2-api/getallproj_new',
            data: { uid, typ },
            dataSrc: 'data'
        },
        columns: [
            { data: 'p_order' },
            {
                data: '',
                render: (data, type, row) => {
                    return `<span class="bg-info">${row.p_strategy}</span><br>${row.p_tact}<br>${row.p_plan}<br>${row.p_way}`
                    // return `${row.prj_name}`
                }
            },
            { data: 'p_name' },
            { data: 'prj_operat' },
            { data: 'budget' },
            // { data: 'proc_stat' },
            { data: 'opert_stat' },
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(row);
                    return `
                       <button type="button" class="btn btn-margin btn-info" onclick="gotoEdit(${row.pid})"><i class="bi bi-gear-fill"></i>&nbsp;รายละเอียด</button>
                       <button type="button" class="btn btn-margin btn-danger" onclick="confirmDelete(${row.pid},'${row.prj_name}', 'prj')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>`
                },
                width: "15%"
            }
        ],
        searching: true,
        scrollX: false,
        // order: [2, 'asc'],
    });

    // table.column(2).visible(false);

    table.on('search.dt', function () {
        let data = table.rows({ search: 'applied' }).data()
        getProc_stat(data);
        getOpert_stat(data);
        getPrj_cate(data);
        getBudget(data);
        getMap(data)
    });
    loadMap();
}

loadTable()

// map.addLayer(drawnItems);

let confirmDelete = (prj_id, prj_name, tbType) => {
    $("#projId").val(prj_id)
    $("#projName").text(prj_name)
    $("#tbType").val(tbType)
    $("#deleteModal").modal("show")
}

let closeModal = () => {
    $('#editModal').modal('hide')
    $('#deleteModal').modal('hide')
    $('#myTable').DataTable().ajax.reload();
}

let deleteValue = () => {
    console.log($("#projId").val());
    let pid = $("#projId").val()
    if ($("#tbType").val() == "prj") {
        axios.post(url + "/projmon2-api/delete_new", { pid }).then(r => {
            if (r.data.data == "success") {
                $('#editModal').modal('hide')
                $('#deleteModal').modal('hide')
                $('#myTable').DataTable().ajax.reload();
            }
        })
    }
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
    let a = "ยุทธศาสตร์ที่ 1  การจัดการสิ่งแวดล้อมเพื่อชีวิตที่เป็นสุข"
    let b = "ยุทธศาสตร์ที่ 2  การจัดการทรัพยากรธรรมชาติอย่างยั่งยืน"
    let c = "ยุทธศาสตร์ที่ 3 การสร้างศักยภาพชุมชนพึ่งตนเองและรับมือต่อการเปลี่ยนแปลงสภาพภูมิอากาศและอุบัติภัย  "
    let d = "ยุทธศาสตร์ที่ 4 การเพิ่มประสิทธิภาพการบริหารจัดการและกลไกการมีส่วนร่วมเพื่อขับเคลื่อนแผนสู่การปฏิบัติ "
    let av = 0, bv = 0, cv = 0, dv = 0;

    await x.map(i => {
        // console.log(i);
        if (i.p_strategy == a) {
            av++
        } else if (i.p_strategy == b) {
            bv++
        } else if (i.p_strategy == c) {
            cv++
        } else if (i.p_strategy == d) {
            dv++
        }
    })
    let dat = [{
        cat: 'ยุทธศาสตร์ที่ 1',
        val: a
    }, {
        cat: 'ยุทธศาสตร์ที่ 2',
        val: bv
    }, {
        cat: 'ยุทธศาสตร์ที่ 3',
        val: cv
    }, {
        cat: 'ยุทธศาสตร์ที่ 4',
        val: dv
    }]
    barChart(dat, "chart1", "จำนวนโครงการ")
}

let getBudget = async (x) => {
    // console.log(x);
    let a = "งบประมาณปี 2565";
    let b = "งบประมาณปี 2566";
    let c = "งบประมาณปี 2567";
    let d = "งบประมาณปี 2568";
    let e = "งบประมาณปี 2569";
    let f = "งบประมาณปี 2570";
    let av = 0, bv = 0, cv = 0, dv = 0, ev = 0, fv = 0;

    await x.map(i => {
        // console.log(i);
        av += Number(i.budg_65)
        bv += Number(i.budg_66)
        cv += Number(i.budg_67)
        dv += Number(i.budg_68)
        ev += Number(i.budg_69)
        fv += Number(i.budg_70)
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
    }, {
        cat: f,
        val: fv
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
    ratioChart(dat, "chart3", "จำนวนโครงการ")
}

let getOpert_stat = async (x) => {
    let a = "อยู่ระหว่างการศึกษาความเหมาะสมและออกแบบรายละเอียด"
    let b = "อยู่ระหว่างตั้งของบประมาณ"
    let c = "อยู่ระหว่างดำเนินการ/ก่อสร้าง"
    let d = "อยู่ระหว่างจัดซื้อจัดจ้าง"
    let e = "ยังไม่ได้ดำเนินการ"
    let f = "ดำเนินการแล้วเสร็จ"
    let g = "ไม่ได้ดำเนินการ"
    let h = "ยกเลิกโครงการ"
    let av = 0, bv = 0, cv = 0, dv = 0, ev = 0, fv = 0, gv = 0, hv = 0;

    await x.map((i, k) => {
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
        } else if (i.opert_stat == f) {
            fv++
        } else if (i.opert_stat == g) {
            gv++
        } else if (i.opert_stat == h) {
            hv++
        }
        $("#projtotal").text(k + 1)
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
    }, {
        cat: f,
        val: fv
    }, {
        cat: g,
        val: gv
    }, {
        cat: h,
        val: hv
    }]
    // barChart(dat, "chart4", "จำนวนโครงการ");
    ratioChart(dat, "chart5", "จำนวนโครงการ");
}

let ratioChart = (dat, div, label) => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create(div, am4charts.PieChart);

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "val";
    pieSeries.dataFields.category = "cat";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template.cursorOverStyle = [
        {
            "property": "cursor",
            "value": "pointer"
        }
    ];

    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;

    // Create hover state
    var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    chart.legend.fontSize = "12px";
    // chart.legend.valueLabels.template.align = "left"
    // chart.legend.valueLabels.template.textAlign = "start"

    chart.data = dat;
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








