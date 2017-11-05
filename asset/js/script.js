$(document).ready(function() {
   $('select').material_select();
 });

var appPomodoro = new Pomodoro('set_task', '#task_group');
console.log(Object.getOwnPropertyNames(appPomodoro))
