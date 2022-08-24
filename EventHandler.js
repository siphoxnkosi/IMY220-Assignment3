class EventHandler {
   constructor(events) {
     this.events = events;
   }
}


EventHandler.prototype.getEventsBetweenDates = function(start, end){
   var dateBetween = events.filter( (element) => {
   if (element.dateStart >= start && element.dateEnd <= end)
      return element;   
   });
   return dateBetween;
}

EventHandler.prototype.getByMonth = function(month){
   var monthEvents = events.filter( (element) => {
   var currMonth = element.dateStart.substring(7,5);
   if (currMonth == month)
      return element;   
   });
   return monthEvents;
}

EventHandler.prototype.getUniqueDateAndSort = function(){
   var arrSort = events.sort(function (x, y) {
    let a = new Date(x.dateStart),
        b = new Date(y.dateStart);

    return a - b;
   });
   const arrUnique = [...new Map(arrSort.map((element) => [element.dateStart, element])).values()];
   return arrUnique;
}

EventHandler.prototype.getSummary = function(){
   if (arguments.length == 0) {
      var summ = events.map( (element) => {
      if (element.dateStart === element.dateEnd)
         return `On ${element.dateStart}: ${element.name} (${element.description})`;
      else
         return `From ${element.dateStart} to ${element.dateEnd}: ${element.name} (${element.description})`;
      })
   }else if (arguments.length == 1){
      var newArr = arguments;
      var newArr = newArr[0];

      if (newArr.dateStart === newArr.dateEnd)
         return `On ${newArr.dateStart}: ${newArr.name} (${newArr.description})`;
      else
         return `From ${newArr.dateStart} to ${newArr.dateEnd}: ${newArr.name} (${newArr.description})`;
   }else{
      var newArr = Array.prototype.slice.apply(arguments);
      var summ = newArr.map( (element) => {

      if (element.dateStart === element.dateEnd)
         return `On ${element.dateStart}: ${element.name} (${element.description})`;
      else
         return `From ${element.dateStart} to ${element.dateEnd}: ${element.name} (${element.description})`;
      })
   }
   
    return summ;
}

Array.prototype.getByMonth = function(month){
   return new EventHandler(this).getByMonth(month);
}

Array.prototype.getUniqueDateAndSort = function(){
   return new EventHandler(this).getUniqueDateAndSort();
}

Array.prototype.getEventsBetweenDates = function(start, end){
   return new EventHandler(this).getEventsBetweenDates(start, end);
}

Array.prototype.getSummary = function(){
   return new EventHandler(this).getSummary();
}

let john = new EventHandler(events);
let name = john.getSummary();
