let math = (dat, div) => {
    var data = dat;
    var a = data.length;
    var indexaqi = $("#aqilist").val();
    var indexpm25 = $("#pm25list").val();
    var indexpm10 = $("#pm10list").val();
    var indexco = $("#colist").val();
    var indexo3 = $("#o3list").val();
    var indexno2 = $("#no2list").val();
    var indexso2 = $("#so2list").val();
    if (div == "aqichart") {
        if (indexaqi == "aqi_d1") {
            var b = a - 1;
            var c = a - 2;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d2") {
            var b = a - 2;
            var c = a - 3;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d3") {
            var b = a - 3;
            var c = a - 4;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d4") {
            var b = a - 4;
            var c = a - 5;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d5") {
            var b = a - 5;
            var c = a - 6;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d6") {
            var b = a - 6;
            var c = a - 7;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d7") {
            var b = a - 7;
            var c = a - 8;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d8") {
            var b = a - 8;
            var c = a - 9;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d9") {
            var b = a - 9;
            var c = a - 10;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d10") {
            var b = a - 10;
            var c = a - 11;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d11") {
            var b = a - 11;
            var c = a - 12;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d12") {
            var b = a - 12;
            var c = a - 13;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d13") {
            var b = a - 13;
            var c = a - 14;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d14") {
            var b = a - 14;
            var c = a - 14;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2").innerHTML = "";
            }
        }

    }
    else if (div == "pm25chart") {
        if (indexpm25 == "pm25_d1") {
            var b = a - 1;
            var c = a - 2;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d2") {
            var b = a - 2;
            var c = a - 3;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d3") {
            var b = a - 3;
            var c = a - 4;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d4") {
            var b = a - 4;
            var c = a - 5;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d5") {
            var b = a - 5;
            var c = a - 6;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d6") {
            var b = a - 6;
            var c = a - 7;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d7") {
            var b = a - 7;
            var c = a - 8;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d8") {
            var b = a - 8;
            var c = a - 9;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d9") {
            var b = a - 9;
            var c = a - 10;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d10") {
            var b = a - 10;
            var c = a - 11;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d11") {
            var b = a - 11;
            var c = a - 12;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d12") {
            var b = a - 12;
            var c = a - 13;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d13") {
            var b = a - 13;
            var c = a - 14;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d14") {
            var b = a - 14;
            var c = a - 14;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252").innerHTML = "";
            }
        }
    }
    else if (div == "pm10chart") {
        if (indexpm10 == "pm10_d1") {
            var b = a - 1;
            var c = a - 2;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d2") {
            var b = a - 2;
            var c = a - 3;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d3") {
            var b = a - 3;
            var c = a - 4;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d4") {
            var b = a - 4;
            var c = a - 5;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d5") {
            var b = a - 5;
            var c = a - 6;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d6") {
            var b = a - 6;
            var c = a - 7;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d7") {
            var b = a - 7;
            var c = a - 8;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d8") {
            var b = a - 8;
            var c = a - 9;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d9") {
            var b = a - 9;
            var c = a - 10;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d10") {
            var b = a - 10;
            var c = a - 11;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d11") {
            var b = a - 11;
            var c = a - 12;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d12") {
            var b = a - 12;
            var c = a - 13;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d13") {
            var b = a - 13;
            var c = a - 14;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d14") {
            var b = a - 14;
            var c = a - 14;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102").innerHTML = "";
            }
        }
    }
    else if (div == "cochart") {
        if (indexco == "co_d1") {
            var b = a - 1; var c = a - 2; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2").innerHTML = "";
            }
        } else if (indexco == "co_d2") {
            var b = a - 2; var c = a - 3; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2").innerHTML = "";
            }
        } else if (indexco == "co_d3") {
            var b = a - 3; var c = a - 4; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2").innerHTML = "";
            }
        } else if (indexco == "co_d4") {
            var b = a - 4; var c = a - 5; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2").innerHTML = "";
            }
        } else if (indexco == "co_d5") {
            var b = a - 5; var c = a - 6; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2").innerHTML = "";
            }
        } else if (indexco == "co_d6") {
            var b = a - 6; var c = a - 7; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2").innerHTML = "";
            }
        } else if (indexco == "co_d7") {
            var b = a - 7; var c = a - 8; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2").innerHTML = "";
            }
        } else if (indexco == "co_d8") {
            var b = a - 8; var c = a - 9; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2").innerHTML = "";
            }
        } else if (indexco == "co_d9") {
            var b = a - 9; var c = a - 10; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2").innerHTML = "";
            }
        } else if (indexco == "co_d10") {
            var b = a - 10; var c = a - 11; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2").innerHTML = "";
            }
        } else if (indexco == "co_d11") {
            var b = a - 11; var c = a - 12; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2").innerHTML = "";
            }
        } else if (indexco == "co_d12") {
            var b = a - 12; var c = a - 13; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2").innerHTML = "";
            }
        } else if (indexco == "co_d13") {
            var b = a - 13; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2").innerHTML = "";
            }
        } else if (indexco == "co_d14") {
            var b = a - 14; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2").innerHTML = "";
            }
        }
    }
    else if (div == "o3chart") {
        if (indexo3 == "o3_d1") {
            var b = a - 1; var c = a - 2; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d2") {
            var b = a - 2; var c = a - 3; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d3") {
            var b = a - 3; var c = a - 4; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d4") {
            var b = a - 4; var c = a - 5; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d5") {
            var b = a - 5; var c = a - 6; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d6") {
            var b = a - 6; var c = a - 7; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d7") {
            var b = a - 7; var c = a - 8; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d8") {
            var b = a - 8; var c = a - 9; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d9") {
            var b = a - 9; var c = a - 10; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d10") {
            var b = a - 10; var c = a - 11; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d11") {
            var b = a - 11; var c = a - 12; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d12") {
            var b = a - 12; var c = a - 13; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d13") {
            var b = a - 13; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d14") {
            var b = a - 14; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2").innerHTML = "";
            }
        }
    }
    else if (div == "so2chart") {
        if (indexso2 == "so2_d1") {
            var b = a - 1; var c = a - 2; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d2") {
            var b = a - 2; var c = a - 3; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d3") {
            var b = a - 3; var c = a - 4; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d4") {
            var b = a - 4; var c = a - 5; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d5") {
            var b = a - 5; var c = a - 6; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d6") {
            var b = a - 6; var c = a - 7; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d7") {
            var b = a - 7; var c = a - 8; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d8") {
            var b = a - 8; var c = a - 9; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d9") {
            var b = a - 9; var c = a - 10; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d10") {
            var b = a - 10; var c = a - 11; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d11") {
            var b = a - 11; var c = a - 12; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d12") {
            var b = a - 12; var c = a - 13; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d13") {
            var b = a - 13; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d14") {
            var b = a - 14; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2").innerHTML = "";
            }
        }
    }
    else if (div == "no2chart") {
        if (indexno2 == "no2_d1") {
            var b = a - 1; var c = a - 2; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d2") {
            var b = a - 2; var c = a - 3; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d3") {
            var b = a - 3; var c = a - 4; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d4") {
            var b = a - 4; var c = a - 5; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d5") {
            var b = a - 5; var c = a - 6; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d6") {
            var b = a - 6; var c = a - 7; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d7") {
            var b = a - 7; var c = a - 8; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d8") {
            var b = a - 8; var c = a - 9; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d9") {
            var b = a - 9; var c = a - 10; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d10") {
            var b = a - 10; var c = a - 11; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d11") {
            var b = a - 11; var c = a - 12; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d12") {
            var b = a - 12; var c = a - 13; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d13") {
            var b = a - 13; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d14") {
            var b = a - 14; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2").innerHTML = "";
            }
        }
    }

}

let math2 = (dat, div) => {
    var data = dat;
    var a = data.length;
    var indexaqi = $("#aqilist").val();
    var indexpm25 = $("#pm25list").val();
    var indexpm10 = $("#pm10list").val();
    var indexco = $("#colist").val();
    var indexo3 = $("#o3list").val();
    var indexno2 = $("#no2list").val();
    var indexso2 = $("#so2list").val();
    if (div == "aqichart") {
        if (indexaqi == "aqi_d1") {
            var b = a - 1;
            var c = a - 2;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d2") {
            var b = a - 2;
            var c = a - 3;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d3") {
            var b = a - 3;
            var c = a - 4;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d4") {
            var b = a - 4;
            var c = a - 5;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d5") {
            var b = a - 5;
            var c = a - 6;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d6") {
            var b = a - 6;
            var c = a - 7;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d7") {
            var b = a - 7;
            var c = a - 8;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d8") {
            var b = a - 8;
            var c = a - 9;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d9") {
            var b = a - 9;
            var c = a - 10;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d10") {
            var b = a - 10;
            var c = a - 11;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d11") {
            var b = a - 11;
            var c = a - 12;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d12") {
            var b = a - 12;
            var c = a - 13;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d13") {
            var b = a - 13;
            var c = a - 14;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-2").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d14") {
            var b = a - 14;
            var c = a - 14;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-2").innerHTML = "";
            }
        }

    }
    else if (div == "pm25chart") {
        if (indexpm25 == "pm25_d1") {
            var b = a - 1;
            var c = a - 2;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-2").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d2") {
            var b = a - 2;
            var c = a - 3;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-2").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d3") {
            var b = a - 3;
            var c = a - 4;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-2").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d4") {
            var b = a - 4;
            var c = a - 5;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-2").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d5") {
            var b = a - 5;
            var c = a - 6;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-2").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d6") {
            var b = a - 6;
            var c = a - 7;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-2").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d7") {
            var b = a - 7;
            var c = a - 8;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-2").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d8") {
            var b = a - 8;
            var c = a - 9;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-2").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d9") {
            var b = a - 9;
            var c = a - 10;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-2").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d10") {
            var b = a - 10;
            var c = a - 11;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-2").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d11") {
            var b = a - 11;
            var c = a - 12;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-2").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d12") {
            var b = a - 12;
            var c = a - 13;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-2").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d13") {
            var b = a - 13;
            var c = a - 14;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-2").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d14") {
            var b = a - 14;
            var c = a - 14;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-2").innerHTML = "";
            }
        }
    }
    else if (div == "pm10chart") {
        if (indexpm10 == "pm10_d1") {
            var b = a - 1;
            var c = a - 2;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-2").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d2") {
            var b = a - 2;
            var c = a - 3;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-2").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d3") {
            var b = a - 3;
            var c = a - 4;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-2").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d4") {
            var b = a - 4;
            var c = a - 5;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-2").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d5") {
            var b = a - 5;
            var c = a - 6;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-2").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d6") {
            var b = a - 6;
            var c = a - 7;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-2").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d7") {
            var b = a - 7;
            var c = a - 8;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-2").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d8") {
            var b = a - 8;
            var c = a - 9;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-2").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d9") {
            var b = a - 9;
            var c = a - 10;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-2").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d10") {
            var b = a - 10;
            var c = a - 11;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-2").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d11") {
            var b = a - 11;
            var c = a - 12;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-2").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d12") {
            var b = a - 12;
            var c = a - 13;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-2").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d13") {
            var b = a - 13;
            var c = a - 14;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-2").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d14") {
            var b = a - 14;
            var c = a - 14;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-2").innerHTML = "";
            }
        }
    }
    else if (div == "cochart") {
        if (indexco == "co_d1") {
            var b = a - 1; var c = a - 2; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-2").innerHTML = "";
            }
        } else if (indexco == "co_d2") {
            var b = a - 2; var c = a - 3; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-2").innerHTML = "";
            }
        } else if (indexco == "co_d3") {
            var b = a - 3; var c = a - 4; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-2").innerHTML = "";
            }
        } else if (indexco == "co_d4") {
            var b = a - 4; var c = a - 5; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-2").innerHTML = "";
            }
        } else if (indexco == "co_d5") {
            var b = a - 5; var c = a - 6; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-2").innerHTML = "";
            }
        } else if (indexco == "co_d6") {
            var b = a - 6; var c = a - 7; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-2").innerHTML = "";
            }
        } else if (indexco == "co_d7") {
            var b = a - 7; var c = a - 8; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-2").innerHTML = "";
            }
        } else if (indexco == "co_d8") {
            var b = a - 8; var c = a - 9; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-2").innerHTML = "";
            }
        } else if (indexco == "co_d9") {
            var b = a - 9; var c = a - 10; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-2").innerHTML = "";
            }
        } else if (indexco == "co_d10") {
            var b = a - 10; var c = a - 11; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-2").innerHTML = "";
            }
        } else if (indexco == "co_d11") {
            var b = a - 11; var c = a - 12; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-2").innerHTML = "";
            }
        } else if (indexco == "co_d12") {
            var b = a - 12; var c = a - 13; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-2").innerHTML = "";
            }
        } else if (indexco == "co_d13") {
            var b = a - 13; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-2").innerHTML = "";
            }
        } else if (indexco == "co_d14") {
            var b = a - 14; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-2").innerHTML = "";
            }
        }
    }
    else if (div == "o3chart") {
        if (indexo3 == "o3_d1") {
            var b = a - 1; var c = a - 2; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d2") {
            var b = a - 2; var c = a - 3; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d3") {
            var b = a - 3; var c = a - 4; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d4") {
            var b = a - 4; var c = a - 5; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d5") {
            var b = a - 5; var c = a - 6; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d6") {
            var b = a - 6; var c = a - 7; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d7") {
            var b = a - 7; var c = a - 8; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d8") {
            var b = a - 8; var c = a - 9; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d9") {
            var b = a - 9; var c = a - 10; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d10") {
            var b = a - 10; var c = a - 11; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d11") {
            var b = a - 11; var c = a - 12; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d12") {
            var b = a - 12; var c = a - 13; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d13") {
            var b = a - 13; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-2").innerHTML = "";
            }
        } else if (indexo3 == "o3_d14") {
            var b = a - 14; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-2").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-2").innerHTML = "";
            }
        }
    }
    else if (div == "so2chart") {
        if (indexso2 == "so2_d1") {
            var b = a - 1; var c = a - 2; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d2") {
            var b = a - 2; var c = a - 3; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d3") {
            var b = a - 3; var c = a - 4; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d4") {
            var b = a - 4; var c = a - 5; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d5") {
            var b = a - 5; var c = a - 6; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d6") {
            var b = a - 6; var c = a - 7; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d7") {
            var b = a - 7; var c = a - 8; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d8") {
            var b = a - 8; var c = a - 9; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d9") {
            var b = a - 9; var c = a - 10; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d10") {
            var b = a - 10; var c = a - 11; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d11") {
            var b = a - 11; var c = a - 12; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d12") {
            var b = a - 12; var c = a - 13; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d13") {
            var b = a - 13; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-2").innerHTML = "";
            }
        } else if (indexso2 == "so2_d14") {
            var b = a - 14; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-2").innerHTML = "";
            }
        }
    }
    else if (div == "no2chart") {
        if (indexno2 == "no2_d1") {
            var b = a - 1; var c = a - 2; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d2") {
            var b = a - 2; var c = a - 3; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d3") {
            var b = a - 3; var c = a - 4; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d4") {
            var b = a - 4; var c = a - 5; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d5") {
            var b = a - 5; var c = a - 6; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d6") {
            var b = a - 6; var c = a - 7; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d7") {
            var b = a - 7; var c = a - 8; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d8") {
            var b = a - 8; var c = a - 9; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d9") {
            var b = a - 9; var c = a - 10; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d10") {
            var b = a - 10; var c = a - 11; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d11") {
            var b = a - 11; var c = a - 12; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d12") {
            var b = a - 12; var c = a - 13; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d13") {
            var b = a - 13; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-2").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-2").innerHTML = "";
            }
        } else if (indexno2 == "no2_d14") {
            var b = a - 14; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-2").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-2").innerHTML = "";
            }
        }
    }

}
let math3 = (dat, div) => {
    var data = dat;
    var a = data.length;
    var indexaqi = $("#aqilist").val();
    var indexpm25 = $("#pm25list").val();
    var indexpm10 = $("#pm10list").val();
    var indexco = $("#colist").val();
    var indexo3 = $("#o3list").val();
    var indexno2 = $("#no2list").val();
    var indexso2 = $("#so2list").val();
    if (div == "aqichart") {
        if (indexaqi == "aqi_d1") {
            var b = a - 1;
            var c = a - 2;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-3").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d2") {
            var b = a - 2;
            var c = a - 3;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-3").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d3") {
            var b = a - 3;
            var c = a - 4;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-3").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d4") {
            var b = a - 4;
            var c = a - 5;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-3").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d5") {
            var b = a - 5;
            var c = a - 6;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-3").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d6") {
            var b = a - 6;
            var c = a - 7;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-3").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d7") {
            var b = a - 7;
            var c = a - 8;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-3").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d8") {
            var b = a - 8;
            var c = a - 9;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-3").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d9") {
            var b = a - 9;
            var c = a - 10;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-3").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d10") {
            var b = a - 10;
            var c = a - 11;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-3").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d11") {
            var b = a - 11;
            var c = a - 12;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-3").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d12") {
            var b = a - 12;
            var c = a - 13;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-3").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d13") {
            var b = a - 13;
            var c = a - 14;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-3").innerHTML = "";
            }
        } else if (indexaqi == "aqi_d14") {
            var b = a - 14;
            var c = a - 14;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-aqi1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-aqi2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-aqi2-3").innerHTML = "";
            }
        }

    }
    else if (div == "pm25chart") {
        if (indexpm25 == "pm25_d1") {
            var b = a - 1;
            var c = a - 2;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-3").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d2") {
            var b = a - 2;
            var c = a - 3;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-3").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d3") {
            var b = a - 3;
            var c = a - 4;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-3").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d4") {
            var b = a - 4;
            var c = a - 5;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-3").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d5") {
            var b = a - 5;
            var c = a - 6;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-3").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d6") {
            var b = a - 6;
            var c = a - 7;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-3").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d7") {
            var b = a - 7;
            var c = a - 8;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-3").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d8") {
            var b = a - 8;
            var c = a - 9;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-3").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d9") {
            var b = a - 9;
            var c = a - 10;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-3").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d10") {
            var b = a - 10;
            var c = a - 11;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-3").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d11") {
            var b = a - 11;
            var c = a - 12;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-3").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d12") {
            var b = a - 12;
            var c = a - 13;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-3").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d13") {
            var b = a - 13;
            var c = a - 14;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-3").innerHTML = "";
            }
        } else if (indexpm25 == "pm25_d14") {
            var b = a - 14;
            var c = a - 14;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm251-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm252-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm252-3").innerHTML = "";
            }
        }
    }
    else if (div == "pm10chart") {
        if (indexpm10 == "pm10_d1") {
            var b = a - 1;
            var c = a - 2;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-3").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d2") {
            var b = a - 2;
            var c = a - 3;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-3").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d3") {
            var b = a - 3;
            var c = a - 4;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-3").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d4") {
            var b = a - 4;
            var c = a - 5;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-3").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d5") {
            var b = a - 5;
            var c = a - 6;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-3").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d6") {
            var b = a - 6;
            var c = a - 7;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-3").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d7") {
            var b = a - 7;
            var c = a - 8;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-3").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d8") {
            var b = a - 8;
            var c = a - 9;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-3").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d9") {
            var b = a - 9;
            var c = a - 10;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-3").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d10") {
            var b = a - 10;
            var c = a - 11;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-3").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d11") {
            var b = a - 11;
            var c = a - 12;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-3").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d12") {
            var b = a - 12;
            var c = a - 13;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-3").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d13") {
            var b = a - 13;
            var c = a - 14;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-3").innerHTML = "";
            }
        } else if (indexpm10 == "pm10_d14") {
            var b = a - 14;
            var c = a - 14;
            var d = data[b].value - data[c].value;
            var e = data[b].value + data[c].value;
            var value = data[b].value;
            var value2 = data[c].value;
            document.getElementById("c-pm101-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-pm102-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-pm102-3").innerHTML = "";
            }
        }
    }
    else if (div == "cochart") {
        if (indexco == "co_d1") {
            var b = a - 1; var c = a - 2; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-3").innerHTML = "";
            }
        } else if (indexco == "co_d2") {
            var b = a - 2; var c = a - 3; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-3").innerHTML = "";
            }
        } else if (indexco == "co_d3") {
            var b = a - 3; var c = a - 4; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-3").innerHTML = "";
            }
        } else if (indexco == "co_d4") {
            var b = a - 4; var c = a - 5; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-3").innerHTML = "";
            }
        } else if (indexco == "co_d5") {
            var b = a - 5; var c = a - 6; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-3").innerHTML = "";
            }
        } else if (indexco == "co_d6") {
            var b = a - 6; var c = a - 7; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-3").innerHTML = "";
            }
        } else if (indexco == "co_d7") {
            var b = a - 7; var c = a - 8; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-3").innerHTML = "";
            }
        } else if (indexco == "co_d8") {
            var b = a - 8; var c = a - 9; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-3").innerHTML = "";
            }
        } else if (indexco == "co_d9") {
            var b = a - 9; var c = a - 10; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-3").innerHTML = "";
            }
        } else if (indexco == "co_d10") {
            var b = a - 10; var c = a - 11; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-3").innerHTML = "";
            }
        } else if (indexco == "co_d11") {
            var b = a - 11; var c = a - 12; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-3").innerHTML = "";
            }
        } else if (indexco == "co_d12") {
            var b = a - 12; var c = a - 13; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-3").innerHTML = "";
            }
        } else if (indexco == "co_d13") {
            var b = a - 13; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-3").innerHTML = "";
            }
        } else if (indexco == "co_d14") {
            var b = a - 14; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-co1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-co2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-co2-3").innerHTML = "";
            }
        }
    }
    else if (div == "o3chart") {
        if (indexo3 == "o3_d1") {
            var b = a - 1; var c = a - 2; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-3").innerHTML = "";
            }
        } else if (indexo3 == "o3_d2") {
            var b = a - 2; var c = a - 3; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-3").innerHTML = "";
            }
        } else if (indexo3 == "o3_d3") {
            var b = a - 3; var c = a - 4; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-3").innerHTML = "";
            }
        } else if (indexo3 == "o3_d4") {
            var b = a - 4; var c = a - 5; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-3").innerHTML = "";
            }
        } else if (indexo3 == "o3_d5") {
            var b = a - 5; var c = a - 6; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-3").innerHTML = "";
            }
        } else if (indexo3 == "o3_d6") {
            var b = a - 6; var c = a - 7; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-3").innerHTML = "";
            }
        } else if (indexo3 == "o3_d7") {
            var b = a - 7; var c = a - 8; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-3").innerHTML = "";
            }
        } else if (indexo3 == "o3_d8") {
            var b = a - 8; var c = a - 9; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-3").innerHTML = "";
            }
        } else if (indexo3 == "o3_d9") {
            var b = a - 9; var c = a - 10; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-3").innerHTML = "";
            }
        } else if (indexo3 == "o3_d10") {
            var b = a - 10; var c = a - 11; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-3").innerHTML = "";
            }
        } else if (indexo3 == "o3_d11") {
            var b = a - 11; var c = a - 12; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-3").innerHTML = "";
            }
        } else if (indexo3 == "o3_d12") {
            var b = a - 12; var c = a - 13; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-3").innerHTML = "";
            }
        } else if (indexo3 == "o3_d13") {
            var b = a - 13; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-3").innerHTML = "";
            }
        } else if (indexo3 == "o3_d14") {
            var b = a - 14; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-o1-3").innerHTML = value.toFixed(2);
            if (d > 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (d < 0) {
                document.getElementById("c-o2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-o2-3").innerHTML = "";
            }
        }
    }
    else if (div == "so2chart") {
        if (indexso2 == "so2_d1") {
            var b = a - 1; var c = a - 2; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-3").innerHTML = "";
            }
        } else if (indexso2 == "so2_d2") {
            var b = a - 2; var c = a - 3; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-3").innerHTML = "";
            }
        } else if (indexso2 == "so2_d3") {
            var b = a - 3; var c = a - 4; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-3").innerHTML = "";
            }
        } else if (indexso2 == "so2_d4") {
            var b = a - 4; var c = a - 5; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-3").innerHTML = "";
            }
        } else if (indexso2 == "so2_d5") {
            var b = a - 5; var c = a - 6; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-3").innerHTML = "";
            }
        } else if (indexso2 == "so2_d6") {
            var b = a - 6; var c = a - 7; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-3").innerHTML = "";
            }
        } else if (indexso2 == "so2_d7") {
            var b = a - 7; var c = a - 8; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-3").innerHTML = "";
            }
        } else if (indexso2 == "so2_d8") {
            var b = a - 8; var c = a - 9; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-3").innerHTML = "";
            }
        } else if (indexso2 == "so2_d9") {
            var b = a - 9; var c = a - 10; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-3").innerHTML = "";
            }
        } else if (indexso2 == "so2_d10") {
            var b = a - 10; var c = a - 11; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-3").innerHTML = "";
            }
        } else if (indexso2 == "so2_d11") {
            var b = a - 11; var c = a - 12; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-3").innerHTML = "";
            }
        } else if (indexso2 == "so2_d12") {
            var b = a - 12; var c = a - 13; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-3").innerHTML = "";
            }
        } else if (indexso2 == "so2_d13") {
            var b = a - 13; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-3").innerHTML = "";
            }
        } else if (indexso2 == "so2_d14") {
            var b = a - 14; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-so1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-so2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-so2-3").innerHTML = "";
            }
        }
    }
    else if (div == "no2chart") {
        if (indexno2 == "no2_d1") {
            var b = a - 1; var c = a - 2; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-3").innerHTML = "";
            }
        } else if (indexno2 == "no2_d2") {
            var b = a - 2; var c = a - 3; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-3").innerHTML = "";
            }
        } else if (indexno2 == "no2_d3") {
            var b = a - 3; var c = a - 4; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-3").innerHTML = "";
            }
        } else if (indexno2 == "no2_d4") {
            var b = a - 4; var c = a - 5; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-3").innerHTML = "";
            }
        } else if (indexno2 == "no2_d5") {
            var b = a - 5; var c = a - 6; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-3").innerHTML = "";
            }
        } else if (indexno2 == "no2_d6") {
            var b = a - 6; var c = a - 7; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-3").innerHTML = "";
            }
        } else if (indexno2 == "no2_d7") {
            var b = a - 7; var c = a - 8; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-3").innerHTML = "";
            }
        } else if (indexno2 == "no2_d8") {
            var b = a - 8; var c = a - 9; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-3").innerHTML = "";
            }
        } else if (indexno2 == "no2_d9") {
            var b = a - 9; var c = a - 10; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-3").innerHTML = "";
            }
        } else if (indexno2 == "no2_d10") {
            var b = a - 10; var c = a - 11; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-3").innerHTML = "";
            }
        } else if (indexno2 == "no2_d11") {
            var b = a - 11; var c = a - 12; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-3").innerHTML = "";
            }
        } else if (indexno2 == "no2_d12") {
            var b = a - 12; var c = a - 13; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-3").innerHTML = "";
            }
        } else if (indexno2 == "no2_d13") {
            var b = a - 13; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1-3").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-3").innerHTML = "";
            }
        } else if (indexno2 == "no2_d14") {
            var b = a - 14; var c = a - 14; var d = data[b].value - data[c].value; var e = data[b].value + data[c].value; var value = data[b].value; var value2 = data[c].value;
            document.getElementById("c-no1").innerHTML = value.toFixed(2);
            if (value > value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-up-circle-fill" style="font-size:18px; color:#DA0037"></i>&nbsp;<span style="font-size:18px; color:#DA0037">${d.toFixed(2)}</span>`
            } else if (value < value2) {
                document.getElementById("c-no2-3").innerHTML = `<i class="bi bi-arrow-down-circle-fill" style="font-size:18px; color:#9EDE73"></i>&nbsp;<span style="font-size:18px; color:#9EDE73">${d.toFixed(2)}</span>`
            } else {
                document.getElementById("c-no2-3").innerHTML = "";
            }
        }
    }
}
