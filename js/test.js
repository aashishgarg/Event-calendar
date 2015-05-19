$(document).ready(function(){
    createDayTable($("#day_calendar_container"),c_date)

    $("#month_name").text(c_date);

    $("#month_calendar").click(function(){
        calendar_type = 'month'

        $("#week_calendar_container").hide();
        $("#day_calendar_container").hide();
        $("#month_calendar_container").show()

        $("#month_calendar_container").empty();
        createMonthTable($("#month_calendar_container"),c_date);
        $("#month_name").text(c_date)
    })

    $("#week_calendar").click(function(){
        calendar_type = 'week'
        $("#month_calendar_container").hide();
        $("#day_calendar_container").hide();
        $("#week_calendar_container").show();
        $("div#week_calendar_container").empty();
        createWeekTable($("#week_calendar_container"),c_date)
        $("#month_name").text(c_date)
    })

    $("#day_calendar").click(function(){
        calendar_type = 'day'

        $("#day_calendar_container").show()
        $("#week_calendar_container").hide();
        $("#month_calendar_container").hide();
    })

    $("#prev_month").click(function(){
        if(calendar_type == 'month'){
            var date = c_day
            c_month = parseInt(c_month)-1
            c_year = parseInt(c_year)
            if(c_month < 1){
                c_month = 12;
                c_year--;
            }
            c_date = String(c_year)+'-'+
            (String(c_month).length > 1 ? String(c_month) : '0'+String(c_month))+'-'+
            (date.length > 1 ? date : '0'+date);

            $("#month_calendar_container").empty();
            createMonthTable($("#month_calendar_container"),c_date)
            $("#month_name").text(c_date)
        }else if(calendar_type == 'week'){
            var prev_date = new Date(c_date)
            prev_date.setDate(prev_date.getDate() - 7)
            c_date = String(prev_date.getFullYear())+'-'+
            (String(prev_date.getMonth()+1).length>1 ? String(prev_date.getMonth()+1) : '0'+String(prev_date.getMonth()+1))+'-'+
            (String(prev_date.getDate()).length>1 ? String(prev_date.getDate()) : '0'+String(prev_date.getDate()))

            $("#week_calendar_container").empty();
            createWeekTable($("#week_calendar_container"),prev_date)
            $("#month_name").text(c_date)
        }else{

        }
    })

    $("#next_month").click(function(){
        if(calendar_type == 'month') {
            var date = c_day
            c_month = parseInt(c_month) + 1
            c_year = parseInt(c_year)
            if (c_month > 12) {
                c_month = 1;
                c_year++;
            }
            c_date = String(c_year) + '-' +
            (String(c_month).length > 1 ? String(c_month) : '0' + String(c_month)) + '-' +
            (date.length > 1 ? date : '0' + date);
            $("#month_name").text(c_date)

            if (calendar_type == 'month') {
                $("#month_calendar_container").empty();
                createMonthTable($("#month_calendar_container"), c_date)
            }
        }else if(calendar_type == 'week'){
            var prev_date = new Date(c_date)
            prev_date.setDate(prev_date.getDate() + 7)
            c_date = String(prev_date.getFullYear())+'-'+
            (String(prev_date.getMonth()+1).length>1 ? String(prev_date.getMonth()+1) : '0'+String(prev_date.getMonth()+1))+'-'+
            (String(prev_date.getDate()).length>1 ? String(prev_date.getDate()) : '0'+String(prev_date.getDate()))

            $("#week_calendar_container").empty();
            createWeekTable($("#week_calendar_container"),prev_date)
            $("#month_name").text(c_date)
        }else{

        }
    })
})

var week_days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var dates_in_month_calendar = 42;

var c_year = '2015',c_month = '05',c_day = '19';
var c_date = c_year+'-'+c_month+'-'+c_day;
var calendar_type;

var col_in_week_calendar = 7
var appointment_time_in_min = 30
var working_slots = [[9,10],[12,16]]


function appointment_slots(working_slots,appointment_time_in_min){
    var slots = [];
    for(var i=0;i<working_slots.length;i++){
        var duration = (working_slots[i][1] - working_slots[i][0])*60
        for(var j=0;j<duration/appointment_time_in_min;j++){
            var appoints = working_slots[i][0];
            slots.push(String(appoints)+'('+String(j+1)+')')
        }
    }
    return slots
}

function last_date_of_month(c_date){
    var date = new Date(c_date), y = date.getFullYear(), m = date.getMonth();
    var lastDay = new Date(y, m+1, 0);
    return lastDay.getDate();
}

function last_date_of_last_month(c_date){
    var date = new Date(c_date), y = date.getFullYear(), m = date.getMonth();
    var lastDay = new Date(y, m, 0);
    return lastDay.getDate();
}

function day_for_date(c_date){
    var d = new Date(c_date);
    var month = d.getMonth();
    var year = d.getFullYear();
    var first_date = month_name[month] + " " + 1 + " " + year;
    var tmp = new Date(first_date).toDateString();
    var first_day = tmp.substring(0, 3);
    return week_days.indexOf(first_day)
}

function prev_month_dates(c_date){
    var prev_month = [];
    var prev_dates = last_date_of_last_month(c_date);
    for(var i=1; i<=day_for_date(c_date);i++){
        prev_month.push(prev_dates);
        prev_dates--;
    }
    return prev_month.reverse()
}

function next_month_dates(c_date){
    var prev_current_dates_count = prev_month_dates(c_date).length + parseInt(last_date_of_month(c_date));
    var total_next_dates = dates_in_month_calendar - prev_current_dates_count;
    var next_month = [];
    for(var i=0;i<total_next_dates;i++){
        next_month.push(i+1);
    }
    return next_month;
}

function month_complete_dates(c_date){
    var current_month_dates = [];
    for(var i=0;i<parseInt(last_date_of_month(c_date));i++){
        current_month_dates.push(i+1);
    }
    return prev_month_dates(c_date).concat(current_month_dates).concat(next_month_dates(c_date));
}

function day_on_date(c_date){
    var w_date = new Date(c_date);
    return w_date.getDay();
}

function week_complete_dates(c_date){
    var date = new Date(c_date);
    var date1 = new Date(c_date)
    var current_week_dates = [];
    var prev_dates = [];
    for(var i=0;i<week_days.length;i++){
        if(i >= day_on_date(c_date)){
            current_week_dates.splice(i,0,date1.getDate());
            date1.setDate(date1.getDate() + 1)
        }else{
            date.setDate(date.getDate() - 1)
            prev_dates.splice(i,0,date.getDate())
        }
    }
    prev_dates.reverse();
    return prev_dates.concat(current_week_dates);
}

function createMonthTable(calendar_container,c_date){
    var dates = month_complete_dates(c_date)
    var table = $("<table/>").addClass('calendar_table');
    var row = $("<tr/>");

    for(var i=0;i<week_days.length;i++){
        var th = $("<th/>").addClass('calendar_td').text(week_days[i]);
        row.append(th);
        table.append(row);
    }

    for(var i=0;i<dates_in_month_calendar;i++){
        if(i%week_days.length == 0){
            var t_data = $("<td/>").addClass('calendar_td').text(dates[i]);
            row.append(t_data)
            var row = $("<tr/>");
            table.append(row)
        }else{
            var t_data = $("<td/>").addClass('calendar_td').text(dates[i]);
        }
        row.append(t_data)
        table.append(row)
    }
    return calendar_container.append(table)
}

function createWeekTable(calendar_container,c_date){
    var table = $("<table/>").addClass('calendar_table');
    var row = $("<tr/>");
    var app_slots = appointment_slots(working_slots,appointment_time_in_min);

    for(var i=0;i<=week_days.length;i++){
        var h_text;
        if(i==0){
            h_text = 'Appointment Slots'
        }else{
            h_text = week_days[i-1]+'/'+week_complete_dates(c_date)[i-1]
        }
        var week_dates = $("<td/>").addClass('calendar_td').text(h_text);
        row.append(week_dates);
        table.append(row);
    }
    var row = $("<tr/>");
    table.append(row);
    for(var j=0;j< app_slots.length;j++){
        var app_time = $("<td/>").addClass('calendar_td').text(app_slots[j]);
        row.append(app_time);
        for(var k=0;k<week_days.length;k++){
            var app_time = $("<td/>").addClass('calendar_td').text('');
            row.append(app_time);
        }
        if(j != app_slots.length-1){
            var row = $("<tr/>");
            table.append(row)
        }
    }
    return calendar_container.append(table)
}

function createDayTable(calendar_container,c_date){
    var table = $("<table/>").addClass('calendar_table');
    var row = $("<tr/>");
    var app_slots = appointment_slots(working_slots,appointment_time_in_min)

    for(var j=0;j< app_slots.length;j++){
        var app_time = $("<td/>").addClass('calendar_td').text(app_slots[j]);
        row.append(app_time);

        var booking_slot = $("<td/>").addClass('calendar_td').text('');
        row.append(booking_slot);
        if(j != app_slots.length-1){
            var row = $("<tr/>");
            table.append(row)
        }
    }
    return calendar_container.append(table)
}