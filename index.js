// test play URL here
// https://cookpete.com/react-player/

/* @input videoId
6999543553776979230
7001772035584134436
7004231760116600101
*/


import cors from 'cors'
import express  from 'express'
const app = express()
//const cors = require('cors')
import fetch from 'node-fetch'
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Mobile/15E148 Safari/604.1 Chrome/93.0.4577.82'

app.use(cors());
// Get video data JSON from videoId
const getDataForVideoByVideoId = async (videoId) => {
    return await fetch(`https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${videoId}`)
        .then(res => res.json())
}

// this function get video MP4 URL
app.get('/getVideoURLbyVideoId' , async (watermark) => {
    const videoId = 7001772035584134436n
    return getDataForVideoByVideoId(videoId)
        .then(res => {
            console.log(res)
            console.log("hello1")

            if (res.item_list.length > 0) {
                // convert to no watermark url
                var playURL = res.item_list[0].video.play_addr.url_list[0]
                console.log("hello")
                console.log(playURL)
                // and request with mobile, return redirect URL
                
                var result = fetch(playURL, { headers: { 'User-Agent': UA, 'Access-Control-Allow-Origin': '*', 'content-type': 'application/json'} })
                    .then(res => res.url.replace('http://', 'https://')
                    )

                return result
            } else {
                return null
            }
        })
})
//const result = getVideoURLbyVideoId(7001772035584134436n)
//console.log(result)

app.listen(3001, () =>{
    console.log("listening on port 3002")
})