function Pomodoro(formName, block) {
  // TODO Mettre les events ici nous somme dans la bonne direction mais il faut arranger le tout, afin d'être optimale.
  //attr privat
  var started               = false,
      tasks                 = [];

  //acces to attr
  this.getStarted = function(){
    return started;
  }

  this.setStarted = function(bool){
    started = bool;
  }

  this.getTasks = function(){
    //console.log(tasks)
    return tasks;
  }

  this.setTasks = function(newelt){
    tasks.push(newelt)
  }
  this.$timer;
  this.showTimerMinute   = document.querySelector( '.show-timer--minute' );
  this.showTimerSecond   = document.querySelector( '.show-timer--second' );
  this.minute            = 0;
  this.second            = this.showTimerSecond.textContent;
  this.ul                = document.querySelector( block );
  this.$form             = document.forms[ formName ];
  this.parseNumber = (number) => number.toString().length > 1 ? number : '0' + number

  this.setAttributes = (nodeTag, obj) => {
    for (let key in obj){
      nodeTag.setAttribute(key, obj[key])
    }
    //this.breakTime         = 0;
  }

  this.InitEvents();
  this.btnListener();

  // this.Form.onsubmit = function(e) {
  //   e.preventDefault();
  //   console.log(e)
  //   this.setTask.apply(this);
  // }

  // const btnGroup = document.querySelectorAll('.button-timer')
  // btnGroup.forEach( (btn) => {
  //   btn.onclick = (e) => {
  //     let role = btn.dataset.role;
  //     console.log(role)
  //     if (role === 'start' && started === false) {
  //       this.start();
  //     } else if (role === 'stop') {
  //       this.stop();
  //     } else {
  //       this.reset();
  //     }
  //   }
  // })
  // var timer;
  //
  // this.start = () => {
  //   if( started === false ) {
  //     started = true;
  //   }
  //   console.log(started)
  //   timer = setInterval(() => {
  //     if (minute >= 0) {
  //       if (second > 0) {
  //         second -= 1
  //         showTimerSecond.innerHTML = parseNumber(second);
  //       } else {
  //         second = 59
  //         showTimerSecond.innerHTML = parseNumber(second);
  //         minute -= 1
  //         showTimerMinute.innerHTML = parseNumber(minute);
  //       }
  //     }
  //     if ( minute === 0 && second === 00 ) {
  //       console.log('fini')
  //       clearInterval(timer)
  //       started = false;
  //     }
  //   }, 1000)
  // }
  //
  // this.stop = () => {
  //   clearInterval(timer);
  //   started = false
  // }
  //
  // this.reset = () => {
  //   started = false;
  //   return;
  // }
}

Pomodoro.prototype.InitEvents = function()
{
  console.log('vhar');
  const _this = this;

  this.$form.addEventListener('submit', function(e){
    console.log(e);
    e.preventDefault();
    _this.setTask(this);
  })
}

Pomodoro.prototype.setTask = function(entries)
{
  const obj         = {},
        _this       = this,
        li          = document.createElement('li'),
        spanName    = document.createElement('span'),
        spanTime    = document.createElement('span'),
        data        = new FormData(entries);


  obj['taskName'] = data.get( 'task-name' );
  obj['taskTime'] = Number( data.get( 'minute' ) );

  this.setAttributes(
    li,
    {
      'data-title': obj.taskName,
      'data-timer': obj.taskTime,
      'class': 'item-task'
    }
  );

  li.addEventListener('click',function(e)
  {
    _this.getTask(this)
  })

  spanName.textContent = obj.taskName
  spanTime.textContent = `${obj.taskTime}:00`;
  const children = [spanName, spanTime];

  for (let i = 0; i < children.length; i++) {
    li.appendChild(children[i])
  }

  this.ul.appendChild(li)
  this.setTasks(obj);
  console.log(this.getTasks())
}

Pomodoro.prototype.getTask = function(el){
  if(!this.started)
    this.minute = el.dataset.timer;
    this.showTimerMinute.innerHTML = this.parseNumber(this.minute);
}
//
Pomodoro.prototype.btnListener = function(){
  const btnGroup = document.querySelectorAll('.button-timer')
  btnGroup.forEach((btn) => {
    btn.onclick = (e) => {
      let role = btn.dataset.role;
      if (role === 'start' && !(this.getStarted())) {
        this.start();
      } else if (role === 'stop') {
        this.stop();
      } else {
        //this.reset();
      }
    }
  })
}
//
Pomodoro.prototype.timer = function(){
  console.log('zerze')
  this.init = setInterval(() => {
    if (this.minute >= 0) {
      if (this.second > 0) {
        this.second -= 1
        this.showTimerSecond.innerHTML = this.parseNumber(this.second);
      } else {
        this.second = 59
        this.showTimerSecond.innerHTML = this.parseNumber(this.second);
        this.minute -= 1
        this.showTimerMinute.innerHTML = this.parseNumber(this.minute);
      }
    }
    if ( this.minute === 0 && this.second === 00 ) {
      console.log('fini')
      clearInterval(this.init)
      this.setStarted(false);
    }
  }, 1000)
}

Pomodoro.prototype.start = function(){

    if(this.getStarted === false) {
      this.setStarted(true);
    }

    this.timer();
}

Pomodoro.prototype.stop = function(){
  clearInterval(this.init)
}
var job = new Pomodoro('set-task', '#task-group');

console.log(job)
