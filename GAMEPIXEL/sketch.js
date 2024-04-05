let player, playerImg;
let playing = 0;
let enemys;
let floorTileL, floorTileR, floorTileN, MidTileL, MidTileN, MidTileR, TopTileR, TopTileN, TopTileL;
let background2
let coinimg
let TKnight, BKnight;
let tileSize = 32;
let tileMap1, tileMap2;
let tileart1;
let jump = 0;
let time;
let score = 0;
let life = 3;

function preload()
{
  player = new Sprite(50,100,16,31);
  player.rotationLock = true;
  player.visible  =false;
  player.friction = 0;
  player.bounciness = 0;

  startScreen = loadImage("asset/bg/start.png")
  winscreen = loadImage("asset/bg/win.png")
  losescreen = loadImage("asset/bg/over.png")

  // ENEMYS

  enemysimg = loadImage("asset/enemy/skulll.png")

  // ITEMS

  coinimg = loadImage('asset/items/coin.png')
  hbarimg = loadImage('asset/items/hbar.png')
  door2img = loadImage('asset/lvl2/ground/door.png')
  door3img = loadImage('asset/lvl3/ground/door.png')
  windoorimg = loadImage('asset/items/end.png')

  background1 = loadImage('asset/lv1/bg/bg.png')

  // FLOOR LV1

  floorTileR = loadImage("asset/lv1/ground/tr.png")
  floorTileN = loadImage("asset/lv1/ground/tm.png")
  floorTileL = loadImage("asset/lv1/ground/tl.png")

  MidTileL = loadImage("asset/lv1/ground/ml.png")
  MidTileN = loadImage("asset/lv1/ground/m.png")
  MidTileR = loadImage("asset/lv1/ground/mr.png")

  ConTileR = loadImage("asset/lv1/ground/cr.png")
  ConTileL = loadImage("asset/lv1/ground/cl.png")

// PLAT LV1
  TopTileL = loadImage("asset/lv1/platform/Lplatform.png")
  TopTileN = loadImage("asset/lv1/platform/Nplatform.png")
  TopTileR = loadImage("asset/lv1/platform/Rplatform.png")

  // ART LV1
  TKnight = loadImage("asset/lv1/art/t-knight.png")
  BKnight = loadImage("asset/lv1/art/b-knight.png")

   // LVL 2

  background2 = loadImage("asset/lvl2/bg/bg.png")

  floorTileN2 = loadImage("asset/lvl2/ground/tm.png")
  floorTileR2 = loadImage("asset/lvl2/ground/tr.png")
  floorTileL2 = loadImage("asset/lvl2/ground/tl.png")

  MidTileL2 = loadImage("asset/lvl2/ground/ml.png")
  MidTileN2 = loadImage("asset/lvl2/ground/m.png")
  MidTileR2 = loadImage("asset/lvl2/ground/mr.png")

  ConTileR2 = loadImage("asset/lvl2/ground/cr.png")
  ConTileL2 = loadImage("asset/lvl2/ground/cl.png")

  // PLATFORM

  TopL2 = loadImage("asset/lvl2/platform/l.png")
  TopM2 = loadImage("asset/lvl2/platform/m.png")
  TopR2 = loadImage("asset/lvl2/platform/r.png")

  // ART LVL2

  grass2 = loadImage("asset/lvl2/art/g.png")
  tonneau = loadImage("asset/lvl2/art/t.png")

  //------------------------------------------------------ LVL3

  bg3 = loadImage("asset/lvl3/bg/bg.png")

  // GROUND LVL3

  floorTileN3 = loadImage("asset/lvl3/ground/tm.png")
  floorTileR3 = loadImage("asset/lvl3/ground/tr.png")
  floorTileL3 = loadImage("asset/lvl3/ground/tl.png")

  MidTileL3 = loadImage("asset/lvl3/ground/ml.png")
  MidTileN3 = loadImage("asset/lvl3/ground/m.png")
  MidTileR3 = loadImage("asset/lvl3/ground/mr.png")

  ConTileR3 = loadImage("asset/lvl3/ground/cr.png")
  ConTileL3 = loadImage("asset/lvl3/ground/cl.png")

  // PLATFORM LVL3

  TopL3 = loadImage("asset/lvl3/platform/l.png")
  TopM3 = loadImage("asset/lvl3/platform/m.png")
  TopR3 = loadImage("asset/lvl3/platform/r.png")

  // ART LVL3
  grass3 = loadImage("asset/lvl3/art/g.png")
  toteme = loadImage("asset/lvl3/art/t.png")
}

function setup() {
  new Canvas(480+2*32, 270+2*32, 'pixelated');
  world.gravity.y = 10;
  world.autoStep = false;


  hbar = new Sprite()
  hbar.collider = 'none'
  hbar.layer = 3
  hbar.scale = 2
  hbar.spriteSheet = hbarimg
  hbar.addAnis ({
    animation: {row: 0, col:0, frames:3, frameSize: [64,32]}
  });

  enemys = new Group()
  enemys.h = 32
  enemys.w = 32
  enemys.tile = "1"
  enemys.rotationLock = true
  enemys.friction = 0;
  enemys.spriteSheet = enemysimg
  enemys.debug = false
  enemys.addAnis ({
    run : {row: 0, col:0 , frames:2, frameSize: [32,32], frameDelay: 10}
  })

  // ENEMY ZONE

  mvtb = new Sprite(2310,265)
  mvtb.color = 'green'
  mvtb.h = 10
  mvtb.w = 10
  mvtb.collider ="none"
  mvtb.visible = false

  mvta = new Sprite(2150,265)
  mvta.color = 'red'
  mvta.h = 10
  mvta.w = 10
  mvta.collider ="none"
  mvta.visible = false

  // COLLIDE BOX

  playerbox = new Sprite()
  playerbox.color = "green"
  playerbox.spriteSheet = "asset/player/player.png";
  playerbox.debug = false
  playerbox.h = 32
  playerbox.w = 64
  playerbox.collider = "none"
  playerbox.visible = true
  playerbox.rotationLock = true

  playerbox.addAnis({
    idle: {row: 0, col: 3, frames:2, frameDelay:20},
    run: {row: 0, col: 0, frames:3, frameDelay:10},
    slash : {row: 0, col: 6, frames:2, frameDelay:10},
    hit : {row: 0, col: 9, frames:1, frameDelay:10}
  })

  // ATTACK BOX

  attackbox = new Sprite()
  attackbox.collider = "none"
  attackbox.color = "green"
  attackbox.debug = false
  attackbox.h = 16
  attackbox.w = 80
  attackbox.visible = false

  attackbox.overlapping(enemys, Killenemy);

  coins = new Group()
  coins.w = 32
  coins.h = 32
  coins.scale = 0.6
  coins.spriteSheet = coinimg;
  coins.addAnis({
    spin:{row:0,frames:6,frameDelay: 8}
  })
  coins.tile = "8"
  coins.collider = "static"
  coins.rotationLock = true

  player.overlaps(coins, collectCoin);

  windoor = new Group()
  windoor.color = 'green'
  windoor.collider = "static"
  windoor.w = 32
  windoor.h = 32
  windoor.image = windoorimg
  windoor.tile = "6"
  

  player.overlaps(windoor, win);

  wall = new Group()
  wall.layer = 1;
  walk = new Group()
  walk.layer = 1;
  art = new Group()
  art.layer = 2;

  f1 = new walk.Group();
  f1.w = tileSize;
  f1.h = tileSize;
  f1.tile = "a";
  f1.collider = "static";
  f1.image = floorTileL;

  f2 = new walk.Group();
  f2.w = tileSize;
  f2.h = tileSize;
  f2.debug = false;
  f2.tile = "z";
  f2.collider = "static";
  f2.image = floorTileN;

  f3 = new walk.Group();
  f3.w = tileSize;
  f3.h = tileSize;
  f3.tile = "e";
  f3.collider = "static";
  f3.image = floorTileR;

  m1 = new wall.Group();
  m1.w = tileSize;
  m1.h = tileSize;
  m1.tile = "q";
  m1.collider = "static";
  m1.image = MidTileL;

  m2 = new wall.Group();
  m2.w = tileSize;
  m2.h = tileSize;
  m2.tile = "s";
  m2.collider = "static";
  m2.image = MidTileN;

  m3 = new wall.Group();
  m3.w = tileSize;
  m3.h = tileSize;
  m3.tile = "d";
  m3.collider = "static";
  m3.image = MidTileR;

  c1 = new wall.Group();
  c1.w = tileSize;
  c1.h = tileSize;
  c1.tile = "w";
  c1.collider = "static";
  c1.image = ConTileL;

  c2 = new wall.Group();
  c2.w = tileSize;
  c2.h = tileSize;
  c2.tile = "c";
  c2.collider = "static";
  c2.image = ConTileR;

  // PLATFORM

  t1 = new walk.Group();
  t1.w = tileSize;
  t1.h = tileSize/2;
  t1.debug = false;
  t1.tile = "²";
  t1.collider = "static";
  t1.image = TopTileL;

  t2 = new walk.Group();
  t2.w = tileSize;
  t2.h = tileSize/2;
  t2.debug =false;
  t2.tile = "&";
  t2.collider = "static";
  t2.image = TopTileN;

  t3 = new walk.Group();
  t3.w = tileSize;
  t3.h = tileSize/2;
  t3.debug =false;
  t3.tile = "é";
  t3.collider = "static";
  t3.image = TopTileR;

  // ART 1

  a1 = new art.Group();
  a1.w = tileSize;
  a1.h = tileSize;
  a1.tile = "";
  a1.collider = "none";
  a1.image = TKnight;

  a2 = new art.Group();
  a2.w = tileSize;
  a2.h = tileSize;
  a2.tile = "";
  a2.collider = "none";
  a2.image = BKnight;

// LVL 2 

  door2 = new Sprite(2560,125);
  door2.w = 32;
  door2.h = 64;
  door2.collider = "static";
  door2.debug = false
  door2.spriteSheet = door2img;
  door2.addAnis({
    portal: {row:0, frames:3, frameDelay:10}
  })

  player.overlaps(door2,(p,d)=>{
    levelTwo()
  })


  wall2 = new Group()
  wall2.layer = 1;
  walk2 = new Group()
  walk2.layer = 1;
  art2 = new Group()
  art2.layer = 2;

  a2 = new walk2.Group();
  a2.w = tileSize;
  a2.h = tileSize;
  a2.tile = "r";
  a2.collider = "static";
  a2.image = floorTileL2;

  b2 = new walk2.Group();
  b2.w = tileSize;
  b2.h = tileSize;
  b2.tile = "t";
  b2.collider = "static";
  b2.image = floorTileN2;

  c2 = new walk2.Group();
  c2.w = tileSize;
  c2.h = tileSize;
  c2.tile = "y";
  c2.collider = "static";
  c2.image = floorTileR2;

  d2 = new wall2.Group();
  d2.w = tileSize;
  d2.h = tileSize;
  d2.tile = "f";
  d2.collider = "static";
  d2.image = MidTileL2;

  e2 = new wall2.Group();
  e2.w = tileSize;
  e2.h = tileSize;
  e2.tile = "g";
  e2.collider = "static";
  e2.image = MidTileN2;

  f2 = new wall2.Group();
  f2.w = tileSize;
  f2.h = tileSize;
  f2.tile = "h";
  f2.collider = "static";
  f2.image = MidTileR2;

  g2 = new wall2.Group();
  g2.w = tileSize;
  g2.h = tileSize;
  g2.tile = "n";
  g2.collider = "static";
  g2.image = ConTileL2;

  h2 = new wall2.Group();
  h2.w = tileSize;
  h2.h = tileSize;
  h2.tile = "v";
  h2.collider = "static";
  h2.image = ConTileR2;

  h2 = new walk2.Group();
  h2.w = tileSize;
  h2.h = tileSize/2;
  h2.tile = "{";
  h2.collider = "static";
  h2.image = TopL2;

  h2 = new walk2.Group();
  h2.w = tileSize;
  h2.h = tileSize/2;
  h2.tile = "(";
  h2.collider = "static";
  h2.image = TopM2;

  h2 = new walk2.Group();
  h2.w = tileSize;
  h2.h = tileSize/2;
  h2.tile = "-";
  h2.collider = "static";
  h2.image = TopR2;

  // ART LVL2

  i2 = new art2.Group();
  i2.w = tileSize;
  i2.h = tileSize;
  i2.tile = "b";
  i2.collider = "none";
  i2.image = grass2;

  i2 = new art2.Group();
  i2.w = 32;
  i2.h = 32;
  i2.tile = "7";
  i2.collider = "none";
  i2.image = tonneau;

  // ------------------------------------LVL3
  // PORTAL

  door3 = new Sprite(2000,250);
  door3.w = 32;
  door3.h = 64;
  door3.collider = "static";
  door3.spriteSheet = door3img
  door3.addAnis({
    portal: {row:0,frames:3,frameDelay:10}
  }) 

  player.overlaps(door3,(p,d)=>{
    levelThree()
  })

  wall3 = new Group()
  wall3.layer = 1;
  walk3 = new Group()
  walk3.layer = 1;
  art3 = new Group()
  art3.layer = 2;

  a3 = new walk2.Group();
  a3.w = tileSize;
  a3.h = tileSize;
  a3.tile = "u";
  a3.collider = "static";
  a3.image = floorTileL3;

  b3 = new walk2.Group();
  b3.w = tileSize;
  b3.h = tileSize;
  b3.tile = "i";
  b3.collider = "static";
  b3.image = floorTileN3;

  c3 = new walk2.Group();
  c3.w = tileSize;
  c3.h = tileSize;
  c3.tile = "o";
  c3.collider = "static";
  c3.image = floorTileR3;

  d3 = new wall2.Group();
  d3.w = tileSize;
  d3.h = tileSize;
  d3.tile = "j";
  d3.collider = "static";
  d3.image = MidTileL3;

  e3 = new wall2.Group();
  e3.w = tileSize;
  e3.h = tileSize;
  e3.tile = "k";
  e3.collider = "static";
  e3.image = MidTileN3;

  f3 = new wall2.Group();
  f3.w = tileSize;
  f3.h = tileSize;
  f3.tile = "l";
  f3.collider = "static";
  f3.image = MidTileR3;

  g3 = new wall2.Group();
  g3.w = tileSize;
  g3.h = tileSize;
  g3.tile = ":";
  g3.collider = "static";
  g3.image = ConTileL3;

  h3 = new wall2.Group();
  h3.w = tileSize;
  h3.h = tileSize;
  h3.tile = ",";
  h3.collider = "static";
  h3.image = ConTileR3;

  h3 = new walk2.Group();
  h3.w = tileSize;
  h3.h = tileSize/2;
  h3.tile = "è";
  h3.collider = "static";
  h3.image = TopL3;

  h3 = new walk2.Group();
  h3.w = tileSize;
  h3.h = tileSize/2;
  h3.tile = "_";
  h3.collider = "static";
  h3.image = TopM3;

  h3 = new walk2.Group();
  h3.w = tileSize;
  h3.h = tileSize/2;
  h3.tile = "ç";
  h3.collider = "static";
  h3.image = TopR3;

  // ART LVL2

  i3 = new art3.Group();
  i3.w = tileSize;
  i3.h = tileSize;
  i3.tile = ";";
  i3.collider = "none";
  i3.image = grass3;

  i3 = new art3.Group();
  i3.w = 32;
  i3.h = 32;
  i3.tile = "4";
  i3.collider = "none";
  i3.image = toteme;

  levelOne()


}

function levelOne(){
  player.x = 400;
  player.y = 200;

  
  tileMap1 = new Tiles(
    [
      'sssssssssd.........................................................................................................................',
      'sssssssssd....................................................................................................................................',
      'sssssssssd...........................................................................................................................',
      'sssssssssd..........................................................................................................................',
      'sssssssssd.......................8....8...............................................................................................',
      'sssssssssd......................aze..............................................azzzzz........................',
      'sssssssssd.................²é...qsd.....8........................................qsssss.............',
      'sssssssssd..............8.......qsd......8.....aze.....ae.....ae..........1aze...qsssss..................',
      'sssssssssd.............aze....azwsd............qsd.....qd.....qd...........qsd...qsssss..........................',
      'sssssssssd...azzze..azzwsczzzzwsssd.......azzzzwsd.....qd.....qd.....azzzzzwscz..qsssss..........................',
      'sssssssssd...qsssd..qsssssssssssssd.......qssssssd.....qd.....qd.....qssssssssd..qsssss.....................',
      '......'
      
    ],
    tileSize/2,
    tileSize/2,
    tileSize-1,
    tileSize-1
    )

  tileArt1 = new Tiles(
    [
      '...............',
      '...............',
      '...............',
      '...............',
      '...............',
      '...............',
      '...............',
      '...............',
      '..................................',
      '...................',
      '...................',
        
    ],
  tileSize/2,
  tileSize/2,
  tileSize-1,
  tileSize-1
  )
}

function levelTwo(){
  player.x = 400;
  player.y = 200;
  playing = 2;
  tileMap1.remove()
  tileArt1.remove()
  tileMap2 = new Tiles(
    [
      '...............',
      '...............',
      'tttttttty.............',
      'ggggggggh.....................................................................................................',
      'ggggggggh.....................................................................................................',
      'ggggggggh....................................{(-1.....{((-1.................................................',
      'ggggggggh...........................{(((-1.....................................................................',
      'ggggggggh................rttty1..................{-........................................................',
      'ggggggggh.......ry..ry...fgggh...........................................................................',
      'ggggggggntttttttvnttvh...fgggnttttttttttttttttttttttttttttttttttttth.................................................',
      'gggggggggggggggggggggh...fgggggggggggggggggggggggggggggggggggggggggh..........................................',
        
    ],
  tileSize/2,
  tileSize/2,
  tileSize-1,
  tileSize-1
  )
  tileArt2 = new Tiles(
    [
      '...................................................................................................',
      '...................................................................................................',
      '...................................................................................................',
      '...................................................................................................',
      '...................................................................................................',
      '...................................................................................................',
      '....................................................................................................',
      '...................................................................................................',
      '.........b7bbbbb..............bbbbbbbbbbbbbbb7bbbbbbbbbbbbbbbb....7..............................................',
      '......................................................................................................',
      '.......................................................................................................',
        
    ],
  tileSize/2,
  tileSize/2,
  tileSize-1,
  tileSize-1,
  )
}

function levelThree(){
  player.x = 400;
  player.y = 200;
  playing = 3;
  tileMap2.remove()
  tileArt2.remove()
  tileMap3 = new Tiles(
    [
      '.............................................................',
      '.............................................................',
      '.....................................................................',
      '......................................................................',
      '.....................................................................',
      '.....................................................................',
      '......................................................................',
      '.......................è____ç......................................',
      '.........;;;;;;4;;.......................4....6...................................',
      '.........uiiiiiiio.............uiiiiiiiiiiiiiiiiiiiiiiii',
      '.........jkkkkkkkl.............jkkkkkkkkkkkkkkkkkkkkkkk',
        
    ],
  tileSize/2,
  tileSize/2,
  tileSize-1,
  tileSize-1
  )
}

// MVT PLAYER
function movement(){
  if (kb.pressing("left")) {
    player.velocity.x = -4;
    playerbox.changeAni('run');
    playerbox.mirror.x = true;
  } else if (kb.pressing("right")) {
    player.velocity.x = 4;
    playerbox.changeAni('run');
    playerbox.mirror.x = false;
  } else {
    player.velocity.x = 0;
    playerbox.changeAni('idle')
  } 
    

  if (mouse.pressing("left")) {
    playerbox.changeAni('slash')
    console.log('punch anim')
  }

  if (kb.pressing("up") && jump == 0) {
    player.velocity.y = -4.5;
    jump = 1;
  } else if (player.colliding(walk) || player.colliding(walk2)) {
    jump = 0;
  }
  // DASH

}

function collectCoin(player, coin){
  coin.remove();
  score++;
  console.log('score'+score)
}

function Killenemy(attackbox, enemy){
  if (mouse.pressing("left"))
  enemy.remove();
  console.log('enemycandied')
}

function hitplayer(){
  if(enemys.overlapping(player)){
    playerbox.changeAni('hit')
  }
}

function playerkill(){
  if(enemys.overlaps(player)){
    life -=1;
    console.log(life)
  }
}
function border(){
  if(player.y > 450){
    playing = 4;
    console.log('out')
  }
}

function healthbar(){
  if(life >= 3){
    life = 3
    hbar.ani.frame = 0
  }else if(life == 2){
    hbar.ani.frame = 1
  }else if(life == 1){
    hbar.ani.frame = 2
  }else if(life <= 0){
    hbar.ani.frame = 3
  }
}

function mvtenemy(){
  if (enemys.overlaps(mvtb))
  {
    enemys.velocity.x = -1.5
    enemys.mirror.x = true
  }
  if (enemys.overlaps(mvta))
  {
    enemys.velocity.x = 1.5
    enemys.mirror.x = false
  }
}

function died(){
  if (life == 0){
    playing = 4;
    console.log('end')
  }
}

function timer(){
  time = int(time/1000)
  text("TIME:"+time, 425,15)
}

function win(player, windoor) {
playing = 5;
}


function draw() {
  
  hbar.x = player.x-200
  hbar.y = 25
  healthbar()
  playerkill()
  died()
  movement()
  mvtenemy()
  border()
  hitplayer()
  hbar.visible = true;
  playerbox.x = player.x;
  playerbox.y = player.y;

  if(playing == 1){
    clear();
    background(background1)
    fill(255)
    textSize(10)
    text("COINS : "+score, 425,25)
    time = millis();
    camera.x = player.x;
    attackbox.x = player.x;
    attackbox.y = player.y;
    world.step()
    walk.visible = true;
    wall.visible = true;
    door3.visible = false;
    playerbox.visible = true;
    enemys.visible = true;
    windoor.visible = false
    timer()
  }
  if(playing ==2){
    clear();
    background1.visible = false;
    background(background2)
    fill(255)
    textSize(10)
    door2.remove()
    door3.visible = true;
    time = millis();
    camera.x = player.x;
    attackbox.x = player.x;
    attackbox.y = player.y;
    world.step()
    playerbox.visible = true;
    enemys.visible = true;
    windoor.visible = false
    text("COINS : "+score, 425,25)
    timer()
  }
  if(playing ==3){
    clear();
    background2.visible = false;
    door2.remove()
    door3.remove()
    background(bg3)
    fill(255)
    textSize(10)
    time = millis();
    camera.x = player.x;
    attackbox.x = player.x;
    attackbox.y = player.y;
    world.step()
    playerbox.visible = true;
    enemys.visible = true;
    windoor.visible = true
    text("COINS : "+score, 425,25)
    timer()
  }
  if(playing == 0){
    clear()
    background(startScreen)
    background1.visible = false;
    walk.visible = false;
    wall.visible = false;
    hbar.visible = false;
    playerbox.visible = false;
    windoor.visible = false;
    enemys.visible = false;
    windoor.visible = false
    if (kb.pressing("enter")){
      playing = 1;
    }
  }
  if(playing == 4){
    clear();
    background(losescreen);
    walk.visible = false;
    wall.visible = false;
    door2.visible = false;
    door3.visible = false;
    walk2.visible = false;
    wall2.visible = false;
    art2.visible = false;
    art3.visible = false;
    walk3.visible = false;
    wall3.visible = false
    hbar.visible = false;
    playerbox.visible = false;
    windoor.visible = false;
    enemys.visible = false;
    windoor.visible = false


    if (kb.pressing("r")){
      window.location.reload();
    }

  }
  if(playing == 5){
    clear();
    background(winscreen);
    art3.visible = false;
    walk3.visible = false;
    wall3.visible = false
    hbar.visible = false;
    playerbox.visible = false;
    windoor.visible = false;
    enemys.visible = false;
    windoor.visible = false

    if (kb.pressing("r")){
      window.location.reload();
    }
  }
}

