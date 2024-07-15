class MainMenuScene extends Phaser.Scene
{
    constructor() 
    { 
        super("MainMenuScene")
        this.playBtn;
        this.settingsBtn;
        this.quitBtn;
        this.player;
        this.playerTwo;
    }

    create() 
    {
        this.sound.stopAll(); // stops music when starting the scene
        this.sound.pauseOnBlur = false; // disabled audio pause when window is out of focus

        // 🎥 BACKGROUND VIDEO AND SETTING UP SFX 🎶
        let backgroundVideo = this.add.video(config.width / 2, config.height / 2, 'background');
        backgroundVideo.play(true);
        let confirmSFX = this.sound.add('confirmSFX');
        let declineSFX = this.sound.add('declineSFX');
        // background music audio set to loop and volume
        this.sound.play('bgm', {
            loop: true,
            volume: .3
        })

        // Character Walking Animation
        this.player = this.add.sprite(600, 150, 'playerwalk');
        // this.player.y = config.height * .3;
        this.player.setScale(5);
        this.player.anims.play('walk', true)

        // character that pops up when buttons are hovered
        this.playerTwo = this.add.sprite(config.width / 2, 450, 'playerdeath');
        this.playerTwo.visible = false;
        this.playerTwo.x = config.width * .40;
        this.playerTwo.y = config.height * .59;
        this.playerTwo.setScale(2)
        this.playerTwo.anims.play('death', true)

        // MENU DISPLAY - TEXT || CONTROLS || BUTTONS
        //========================================== START ==========================================
        // TITLE
        let titleText = this.add.text(600, 50, "S T E L L A R I S", {
            fontSize: '70px', // Increased font size for a bold look
            fontStyle: 'italic',
            fontFamily: 'Courier New', // Retro font
            fill: '#FFD700',
            align: 'center',
            stroke: '#2c311a',
            strokeThickness: 8, // Thick stroke for emphasis
            shadow: { // Neon-like shadow effect
                offsetX: 8,
                offsetY: 8,
                color: '#FFD700', // Shadow
                blur: 15,
                stroke: true,
                fill: true
            }
        });
        titleText.setOrigin(0.5);
        
        // Custom gradient color for a vaporwave look
        const gradient = titleText.context.createLinearGradient(0, 0, 0, titleText.height);
        gradient.addColorStop(0, '#ff77ff'); // Neon pink at the top
        gradient.addColorStop(0.5, '#77ffff'); // Neon cyan in the middle
        gradient.addColorStop(1, '#ff77ff'); // Neon pink at the bottom
        
        // Apply the gradient to the text
        titleText.setFill(gradient);
        
        // Adding a glow effect by repeating the shadow with different offsets (simulating glow)
        titleText.setShadow(8, 8, '#FFD700', 15, true, true);
        titleText.setShadow(-8, -8, '#FFD700', 15, true, true);
        titleText.setShadow(8, -8, '#FFD700', 15, true, true);
        titleText.setShadow(-8, 8, '#FFD700', 15, true, true);        
        

        // CONTROLS
        let leftText = this.add.text(420, 238, "L E F T  " ,
        { fill: '#FFD700' , fontSize: '25px', fontStyle: 'italic' , fontFamily: 'impact'});
        leftText.setShadow(2, 2, '#000', 5, true, true);

        let jumpText = this.add.text(565, 238, "J U M P  " ,
        { fill: '#FFD700' , fontSize: '25px', fontStyle: 'italic' , fontFamily: 'impact'});
        jumpText.setShadow(2, 2, '#000', 5, true, true);

        let rightText = this.add.text(710, 238, "R I G H T  " ,
        { fill: '#FFD700' , fontSize: '25px', fontStyle: 'italic' , fontFamily: 'impact'});
        rightText.setShadow(2, 2, '#000', 5, true, true);
        // Letter Keys
        let letterA = this.add.sprite(420, 300, 'letterKeys')
        letterA.setScale(3)
        letterA.anims.play('animAkey', true)
        let letterW = this.add.sprite(565, 300, 'letterKeys')
        letterW.setScale(3)
        letterW.anims.play('animWkey', true)
        let letterD = this.add.sprite(720, 300, 'letterKeys')
        letterD.setScale(3)
        letterD.anims.play('animDkey', true)
        // Arrow Keys
        let arrowL = this.add.sprite(480, 300, 'letterKeys')
        arrowL.setScale(3)
        arrowL.anims.play('animL', true)
        let arrowR = this.add.sprite(630, 300, 'letterKeys')
        arrowR.setScale(3)
        arrowR.anims.play('animR', true)
        let arrowUP = this.add.sprite(780, 300, 'letterKeys')
        arrowUP.setScale(3)
        arrowUP.anims.play('animUP', true)

        // BUTTONS
        this.playBtn = this.add.sprite(config.width / 2, config.height *.6, 'uiButton');
        let playText = this.add.text(config.width / 2 - 35, config.height *.56, "P L A Y " ,
        { fill: '#47C6FB' , fontSize: '30px', fontStyle: 'italic' , fontFamily: 'impact'});
        this.playBtn.setScale(2);

        this.creditsBtn = this.add.sprite(config.width / 2, config.height *.72, 'uiButton');
        let creditsText = this.add.text(config.width / 2 - 65, config.height *.68, "C R E D I T S " ,
        { fill: '#47C6FB' ,fontSize: '30px', fontStyle: 'italic' , fontFamily: 'impact'});
        this.creditsBtn.setScale(2);

        this.quitBtn = this.add.sprite(config.width / 2, config.height *.84, 'uiButton');
        let quitText = this.add.text(config.width / 2 - 40, config.height *.8, "Q U I T " ,
        { fill: '#47C6FB' ,fontSize: '30px', fontStyle: 'italic' , fontFamily: 'impact'});
        this.quitBtn.setScale(2);

        this.anims.create({
            key: 'btnPress',
            frames: this.anims.generateFrameNumbers('uiButton', { start: 0, end: 3}),
            frameRate: 30
        });

        this.playBtn.setInteractive();
        this.creditsBtn.setInteractive();
        this.quitBtn.setInteractive();

        // BUTTON EVENTS - PLAY BUTTON || CREDITS BUTTON || QUIT BUTTON
        //========================================== START ==========================================
        // PLAY
        this.playBtn.on("pointerover", ()=>{
            this.playBtn.setTint(0xffe8a8)
            this.playerTwo.visible = true;
            this.playerTwo.x = config.width * .40;
            this.playerTwo.y = config.height * .59;
        })
        this.playBtn.on("pointerout", ()=>{
            this.playBtn.clearTint();
            this.playerTwo.visible = false;
            playText.y = config.height *.56;
        })
        this.playBtn.on("pointerdown", ()=>{
            playText.y += 3;
        })
        this.playBtn.on("pointerup", ()=>{
            playText.y -= 3;
            confirmSFX.play();
            this.playBtn.anims.play('btnPress',true);
            this.time.delayedCall(50, () => {
                this.scene.start("GameScene")
            });
        })
        // CREDITS
        this.creditsBtn.on("pointerover", ()=>{
            this.creditsBtn.setTint(0xffe8a8)
            this.playerTwo.visible = true;
            this.playerTwo.x = config.width * .40;
            this.playerTwo.y = config.height * .71;
        })
        this.creditsBtn.on("pointerout", ()=>{
            this.creditsBtn.clearTint();
            this.playerTwo.visible = false;
            this.playerTwo.x = config.width * .43;
            this.playerTwo.y = config.height * .6;
            creditsText.y = config.height *.68;
        })
        this.creditsBtn.on("pointerdown", ()=>{
            creditsText.y += 3;
        })
        this.creditsBtn.on("pointerup", ()=>{
            creditsText.y -= 3;
            confirmSFX.play();
            this.creditsBtn.anims.play('btnPress',true);
            this.time.delayedCall(50, () => {
                this.scene.start("CreditScene")
            });
            
        })
        // QUIT
        this.quitBtn.on("pointerover", ()=>{
            this.quitBtn.setTint(0xffe8a8)
            this.playerTwo.visible = true;
            this.playerTwo.x = config.width * .40;
            this.playerTwo.y = config.height * .83;
        })
        this.quitBtn.on("pointerout", ()=>{
            this.quitBtn.clearTint();
            this.playerTwo.visible = false;
            this.playerTwo.x = config.width * .43;
            this.playerTwo.y = config.height * .6;
            quitText.y = config.height *.8;
        })
        this.quitBtn.on("pointerdown", ()=>{
            quitText.y += 3;
        })
        this.quitBtn.on("pointerup", ()=>{
            quitText.y -= 3;
            declineSFX.play();
            this.quitBtn.anims.play('btnPress',true);
            this.time.delayedCall(50, () => {
                this.sound.stopAll();
                alert("You've Quitted the Game!")
            });
        })
    }
}