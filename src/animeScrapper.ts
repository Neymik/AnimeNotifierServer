
const cheerio = require('cheerio');
const verifiedSites = require('./verifiedSites');

const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true })


export class AnimeScrapper {

    async getOngoings() {

        const url = 'https://animego.org/anime/status/ongoing'
        const animeBlocksContainer = '#anime-list-container'


        let siteData = await (async ()=>{
            let nightmare; 
            try {
                nightmare = Nightmare({ show: true });
                await nightmare
                      .goto('https://animego.org/anime/status/ongoing')
                      .wait('body');

                let siteData = await nightmare.evaluate(function () {
                        return document.querySelector('#anime-list-container').innerHTML;
                      });
                      return siteData
                // последующая работа с данными
            } catch (error) {
                console.error(error);
                throw error;
            } finally {
                await nightmare.end();
            }
            })();

        siteData = this.ongoingParse(siteData)

    
        // const result = await nightmare
        //     .goto(url)
        //     .wait('body')
        //     .evaluate((animeBlocksContainer) => {
        //         return document.querySelector(animeBlocksContainer).innerHTML
        //     }, animeBlocksContainer)
        //     .end()
        // .then(response => {
        //     return this.ongoingParse(response)
        // }).catch(err => {
        //     console.log(err)
        // })


        return siteData
        
    }
    
    ongoingParse(animeBlocksContainer): Array<Object> {
    
        let $ = cheerio.load(animeBlocksContainer)
        let animes = $('div.animes-list-item.media')
        let animeObjs = []
        
        for (let anime of animes) {
    
            let animeObj = {
                uri: {uri: String},
                title: String,
                opis: String
            }
    
            animeObj.uri.uri = $(anime).find('div.anime-list-lazy.lazy').attr('data-original')
            animeObj.title = $(anime).find('div.h5.font-weight-normal.mb-1').text().trim()
            animeObj.opis = $(anime).find('div.description.d-none.d-sm-block').text().trim()

            animeObjs.push(animeObj)

        }

        return animeObjs
        
    }
    
    
    
    goParse() {
    
        verifiedSites.forEach(element => {
            this.nightmareDownload(element)
        });
        
    }
    
    nightmareDownload(opt) {
    
        nightmare
            .goto(opt.uri)
            .wait(opt.scrollTo)
            .scrollTo(opt.scrollTo)
            .wait(opt.buttonSelector)
            .click(opt.buttonSelector)
            .wait(opt.dabtable)
            .evaluate((dabtable) => {
                return document.querySelector(dabtable).innerHTML
            }, opt.dabtable)
            .end()
        .then(response => {
    
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    
    
    }
    
    ParseDubbers(DubbersHTMLS) {
        
    }

}