const pm2 = require('pm2')
const posix = require('posix')

posix.openlog("pm2", {ndelay: true, pid: false}, 'user')

pm2.launchBus((err, bus) => {
  bus.on('log:err', data => {
    posix.syslog('crit', '['+data.process.name+'](' + data.process.pm_id + ") " + data.data)
  })
  bus.on('log:out', data => {
    posix.syslog('info', '['+data.process.name+'](' + data.process.pm_id + ") " + data.data)
  })
})

process.on('exit', function () {
  posix.closelog();
})