var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/champions', async (req,res,next)=>{
  let champions = await fetch('https://ddragon.leagueoflegends.com/cdn/15.3.1/data/en_US/champion.json',{
    headers:{
      'Authorization': process.env.RIOT_API_KEY
    }
  })
  const champ = await champions.json()

  res.render('champions', {title:'All Champions',
    champions:champ.data
  })
})
router.get('/champions/:id', async (req,res,next)=>{
  const champ = req.params.id
  let response = await fetch('https://ddragon.leagueoflegends.com/cdn/15.3.1/data/en_US/champion/'+champ+'.json',{
    headers:{
      'Authorization' :process.env.RIOT_API_KEY 
    }
  })
  const champion = await response.json()
  console.log(champion.data[champ].spells)
  res.render('champion',{
    title:champ,
    champion:champion.data
  })
})
module.exports = router;
