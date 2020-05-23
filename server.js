const Express=require('express');
const App=Express()

// Cors Intial
const cors =require('cors')

// ytdl Intial
const ytdl = require('ytdl-core');

// Cors
App.use(cors())

// Home Page
App.get('/',(req,res)=>{
     res.send('hello')
})

// ytdl Downloader
App.get('/i',(req,res)=>{
     var id =req.query.id;
     var qua =req.query.qua;
     ytdl.getInfo(id,(err,info)=>{
         if(err) throw err;
         let format = ytdl.chooseFormat(info.formats, {
          quality: qua,
        });
        let af = ytdl.filterFormats(info.formats, 'audioonly');
        const obj={
             name:info.title,
             Thumbnail:info.player_response.microformat.playerMicroformatRenderer.thumbnail
             .thumbnails[0].url,
             Video_Format:format.qualityLabel,
             Video_Url:format.url,
             Audio_Url:af[0].url,
             audio_extension: af[0].container,
             video_extension: format.container

        }
        // response 
        res.send(obj) 
        console.log('Data has Send')
    })
    
// Hosting Port 
})
App.listen(process.env.PORT || 3001,(req,res)=>{
     console.log('Server is Started')
})


