
var topPage;
var topMonth;
var topDay;
var bottomMonth;
var bottomDay;
var calendarIcon = new Snap('.calendar-icon');
Snap.load('img/calendar.svg', function (response) {
    
   var today = new Date(); 
   
   var todayMonthString = getMonthString(today.getMonth());
   var todayDay = today.getDate();
   
   
   var tomorrow = new Date();
   tomorrow.setDate(todayDay + 1);
   
   var tomorrowMonthString = getMonthString(tomorrow.getMonth());
   var tomorrowDay = tomorrow.getDate();
   
   topPage = response.select('#top-page');
   topMonth = response.select('#top-month');
   topDay = response.select('#top-day');

   topMonth.attr({text: todayMonthString});
   topDay.attr({text: todayDay});
   
   bottomMonth = response.select('#bottom-month');
   bottomDay = response.select('#bottom-day');

   bottomMonth.attr({text: tomorrowMonthString});
   bottomDay.attr({text: tomorrowDay});
   
   calendarIcon.append(response);
   
   centerCalendarDates();
   
   /*Ugly workaround for centering month date which sometimes gives wrong value at first,
   must FIX LATER*/
   setTimeout(centerCalendarDates, 0);
});

function centerCalendarDates(){
       
   var topPageCenter = topPage.getBBox().width / 2;
   var topMonthHalf = topMonth.getBBox().width / 2;
   var topDayHalf = topDay.getBBox().width / 2;
   
   //console.log(topMonthHalf);
   //console.log(topDayHalf);
   
   topMonth.attr({x: topPageCenter - topMonthHalf});
   topDay.attr({x: topPageCenter - topDayHalf});
   //console.log("CENTERED " + topMonthHalf);
   
   var bottomMonthHalf = bottomMonth.getBBox().width / 2;
   var bottomDayHalf = bottomDay.getBBox().width / 2;
   
   
   bottomMonth.attr({x: topPageCenter - bottomMonthHalf});
   bottomDay.attr({x: topPageCenter - bottomDayHalf});
}

function getMonthString(monthNumeric){
       
   switch(monthNumeric) {
       case 0:
          return "JAN";
       case 1:
          return "FEB";
       case 2:
          return "MAR";
       case 3:
          return "APR";
       case 4:
          return "MAY";
       case 5:
          return "JUN";
       case 6:
          return "JUL";
       case 7:
          return "AUG";
       case 8:
          return "SEP";
       case 9:
          return "OCT";
        case 10:
          return "NOV";
       case 11:
          return "DEC";
      
   }
}
