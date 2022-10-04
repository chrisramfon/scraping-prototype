//imports
const puppeteer = require('puppeteer');
const notifier = require('node-notifier');

// main function
async function scraping (){

    try{

        console.log(`Starting browser...`);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        let user = "";

        const URL = 'https://buldar.com';
        console.log(`Going to ${URL}`);
        await page.goto(URL);

        setInterval(async function(){

            await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
            
            const data = await page.evaluate(() => {
                let element = document.querySelector('#react-anzu > div.flex.flex-column.flex-auto > main.board.flex.flex-auto > section.fade-in.feed.flex.flex-column > section.list.flex-auto > article:nth-child(2) > div:nth-child(2) > div.flex-auto > div > div:nth-child(2) > a > span');
                content = element.innerText;
                return content
            })
    
            if(data != user){
                console.log('Sending notification...');
                notifier.notify({
                    title: 'Usuario encontrado',
                    message: data
                });
                user = data;
            }
    
        }, 600000);//600000 = 10 minutes

    }catch(error){
        console.log({Error: error});
    }
}

// run main function
scraping(); 