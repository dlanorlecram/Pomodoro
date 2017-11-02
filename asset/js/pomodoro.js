'use strict';

function Pomodoro(formName, block) {

  var started = false,
      tasks = [],
      currentTaskName = '',
      reset;

  this.getStarted = function() {
    return started;
  }

  this.setStarted = function(bool) {
    started = bool;
  }

  this.getTasks = function() {
    return tasks;
  }

  this.setTasks = function(newelt) {
    tasks.push(newelt)
  }

  this.getReset = function() {
    return reset;
  }
  this.setReset = function(number){
    reset = number;
  }

  this.getCurrentTaskName = function(name){
    return currentTaskName;
  }

  this.setCurrentTaskName = function(name){
    currentTaskName = name;
  }

  this.$timer;
  this.showTimerMinute = document.querySelector('.show-timer--minute');
  this.showTimerSecond = document.querySelector('.show-timer--second');
  this.showTaskTitle = document.querySelector('.show-current-task');
  this.minute = 0;
  this.second = this.showTimerSecond.textContent;
  this.ul = document.querySelector(block);
  this.$form = document.forms[formName];
  this.parseNumber = (number) => number.toString().length > 1 ? number : '0' + number
  this.setAttributes = (nodeTag, obj) => {
    for (let key in obj) {
      nodeTag.setAttribute(key, obj[key])
    }
  }

  this.parseTag = (className, el) => {
    let tagNodes = document.querySelectorAll(className)
    tagNodes.forEach((elNode)=>{
      if(elNode===el){
        elNode.classList.add('active')
      }else{
        elNode.classList.remove('active')
      }
    })
  }
  this.InitEvents();
  this.btnListener();
}

Pomodoro.prototype.updateDom = function(){
  this.showTimerMinute.innerHTML = this.parseNumber(this.minute);
  this.showTimerSecond.innerHTML = this.parseNumber(this.second);
  this.showTaskTitle.innerHTML = this.getCurrentTaskName()
}

Pomodoro.prototype.InitEvents = function() {
  const _this = this;
  this.$form.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    _this.setTask(this);
  })
}

Pomodoro.prototype.setTask = function(entries) {
  const obj = {},
    _this = this,
    li = document.createElement('li'),
    spanName = document.createElement('span'),
    spanTime = document.createElement('span'),
    data = new FormData(entries);


  obj['taskName'] = data.get('task_name');
  obj['taskTime'] = Number(data.get('task_minute'));
  entries.reset();

  this.setAttributes(li, {
    'data-title': obj.taskName,
    'data-timer': obj.taskTime,
    'class': 'item-task'
  });

  li.addEventListener('click', function(e) {
    _this.getTask(this)
    console.log();
    _this.parseTag('.item-task',this)
  })

  spanName.textContent = obj.taskName
  spanTime.textContent = `${obj.taskTime}min`;
  const children = [spanName, spanTime];

  for (let i = 0; i < children.length; i++) {
    li.appendChild(children[i])
  }

  this.ul.appendChild(li)
  this.setTasks(obj);
  console.log(this.getTasks())
}

Pomodoro.prototype.getTask = function(el) {
  if (!this.getStarted())
    this.second = 0;
    this.minute = el.dataset.timer;
  this.setReset(this.minute);
  this.setCurrentTaskName(el.dataset.title)
  this.updateDom();
}

Pomodoro.prototype.btnListener = function() {
  const btnGroup = document.querySelectorAll('.button-timer')
  btnGroup.forEach((btn) => {
    btn.onclick = (e) => {
      let role = btn.dataset.role;
      if (role === 'start' && !(this.getStarted())) {
        this.start();
      } else if (role === 'stop') {
        this.stop();
      } else {
        this.reset();
      }
    }
  })
}

Pomodoro.prototype.timer = function() {
  this.init = setInterval(() => {
    if (this.minute >= 0) {
      if (this.second > 0) {
        this.second -= 1;
        this.showTimerSecond.innerHTML = this.parseNumber(this.second);
      } else {
        this.second = 59;
        this.minute -= 1;
        this.updateDom();
      }
    }
    if (this.minute === 0 && this.second === 0) {
      console.log('fini');
      clearInterval(this.init);
      this.setStarted(false);
    }
  }, 1000)
}

Pomodoro.prototype.start = function() {
  if (!this.getStarted()) {
    this.setStarted(true);
  }

  this.timer();
}

Pomodoro.prototype.stop = function() {
  if(this.getStarted())
    this.setStarted(false);
  clearInterval(this.init);
}

Pomodoro.prototype.reset = function() {
  if(this.getStarted())
    this.setStarted(false);

  clearInterval(this.init);
  this.second = 0
  this.minute = this.getReset()
  this.updateDom();
}
