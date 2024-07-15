class PreLoadScene extends Phaser.Scene
{
    constructor() 
    { 
        super("PreLoadScene")
        this.player
    }

    preload()
    {
        //MISCELLANEOUS
        this.load.video('background', './assets/background/bg1.mp4');
        this.load.image('fruit', './assets/misc/fruit.png');
        this.load.image('bomb', './assets/misc/poro.png');
        this.load.image('stardrop', './assets/misc/stardropsdv.png');
        //PLATFORMS
        this.load.image('platform', './assets/misc/platform.jpg');
        this.load.image('snowplatform', './assets/misc/snowplatform.png');
        this.load.image('iceplatform', './assets/misc/iceplatform.png');
        this.load.image('iceBlock', './assets/misc/iceblock.png');
        this.load.image('block', './assets/misc/block.png');
        this.load.image('profile', './assets/misc/cat.png');
        //===========SPRITESHEET=============================================================================
        
        //UI
        this.load.spritesheet('uiButton', './assets/gui/UI_Button.png', { frameWidth: 96, frameHeight: 32 });
        this.load.spritesheet('uiButtonSmall', './assets/gui/UI_Button_small.png', { frameWidth: 96, frameHeight: 32 });
        this.load.spritesheet('letterKeys', './assets/gui/letter_keys.png', { frameWidth: 17, frameHeight: 16 });
        this.load.spritesheet('arrowKeys', './assets/gui/arrow_keys.png', { frameWidth: 17, frameHeight: 16 });
        
        //PLAYER
        this.load.spritesheet('playeridle', './assets/player/PlayerIdle.png', 
        {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('playerwalk', './assets/player/PlayerWalk.png', 
        {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('playerrun', './assets/player/Player Run.png', 
        {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('playerjump', './assets/player/PlayerJump.png', 
        {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('playerhurt', './assets/player/PlayerHurt.png', 
        {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('playerdeath', './assets/player/PlayerDeath.png', 
        {frameWidth: 32, frameHeight: 32});
        
        //AUDIO
        //buttons
        this.load.audio('confirmSFX', './assets/audio/select.mp3');
        this.load.audio('declineSFX', './assets/audio/back.mp3');
        //bgm
        this.load.audio('bgm', './assets/audio/mainbgm.mp3');
        //misc
        this.load.audio('fruitSFX', './assets/audio/fruitCollect.mp3');
        this.load.audio('bombSFX', './assets/audio/deathSound.mp3');
        this.load.audio('bombBounce', './assets/audio/bombBounceSound.mp3');
        this.load.audio('stardropSound', './assets/audio/stardropSound.mp3');
        this.load.audio('catClickSFX', './assets/audio/meow-ride.mp3');

        //movement
        this.load.audio('jumpSFX', './assets/audio/jumpSound.mp3');
        this.load.audio('walkSFX', './assets/audio/walkSound.mp3');
        this.load.audio('deathSFX', './assets/audio/deathSound.mp3');
        this.load.audio('frozenSFX', './assets/audio/frozenSFX.ogg');

        this.load.on("progress", (percent)=> {
            console.log("loading: "+ percent)
        })

        let loadingText = this.add.text(600, 300, "LOADING STELLARIS...", {
            fontSize: '50px',
            fontStyle: 'italic',
            fontFamily: 'Courier New', // Retro font
            fill: '#FFD700',
            align: 'center',
            stroke: '#2c311a',
            strokeThickness: 8, // Thick stroke for emphasis
        });
        loadingText.setOrigin(0.5);
        
        // Set shadow properties separately
        loadingText.setShadow(8, 8, '#FFD700', 15, true, true);
    }

    create() 
    {
        // 🗿 PLAYER ANIMATION 🗿
            // Player Animations // Movements
        this.anims.create({
            key: 'idle',
            frames: [{ key: 'playeridle', frame: 0 }], 
        });
        
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('playerwalk', { start: 0, end: 5 }),
            frameRate: 10, 
            repeat: -1 
        });
        
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('playerjump', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: 0 
            });

        this.anims.create({
            key: 'hurt',
            frames: this.anims.generateFrameNumbers('playerhurt', {start: 0, end: 3}),
            frameRate: 10,
            repeat: 1
        });

        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers('playerdeath', {start: 0, end: 6}),
            frameRate: 10,
            repeat: -1
        });

        // ⌨️ KEYBOARD KEYS ANIMATION ⌨️
        this.anims.create({
            key: 'animWkey',
            frames: this.anims.generateFrameNumbers('letterKeys', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'animAkey',
            frames: this.anims.generateFrameNumbers('letterKeys', { start: 2, end: 3 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'animDkey',
            frames: this.anims.generateFrameNumbers('letterKeys', { start: 4, end: 5 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'animL',
            frames: this.anims.generateFrameNumbers('arrowKeys', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'animR',
            frames: this.anims.generateFrameNumbers('arrowKeys', { start: 2, end: 3 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'animUP',
            frames: this.anims.generateFrameNumbers('arrowKeys', { start: 4, end: 5 }),
            frameRate: 4,
            repeat: -1
        });

        // 🔘 BUTTON ANIMATION 🔘
        this.anims.create({
            key: 'btnPressSmall',
            frames: this.anims.generateFrameNumbers('uiButtonSmall', { start: 0, end: 3}),
            frameRate: 30,
        });
        this.anims.create({
            key: 'btnPress',
            frames: this.anims.generateFrameNumbers('uiButton', { start: 0, end: 3}),
            frameRate: 30
        });

        console.log("LOADED!")
        this.scene.start('MainMenuScene')
    }

}