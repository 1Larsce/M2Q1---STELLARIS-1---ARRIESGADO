class GameOverScene extends Phaser.Scene
{
    constructor() 
    { 
        super("GameOverScene")
        this.cursors;
    }

    create() 
    {
        // 🎥 BACKGROUND VIDEO AND SETTING UP SFX 🎶
        let backgroundVideo = this.add.video(config.width / 2, config.height / 2, 'background');
        backgroundVideo.play(true);
        let confirmSFX = this.sound.add('confirmSFX');

        // Text Display for Lose Condition
        let gameOverText = this.add.text(600,170, "GAME OVER!\nYOU LOST!",
        { fontSize: '50px', fill: '#1497E3' , fontStyle: 'bold' , fontFamily: 'tahoma', align: 'center' });
        gameOverText.setOrigin(0.5); // Set the origin to the center of the text
        gameOverText.setShadow(2, 2, '#FFD700', 3, true, true);

        // Score
        let score = this.scene.get('GameScene').data.get('score');

        // Text Display For Score
        let detailsText = this.add.text(600, 270, "Score: "+score+" ",
        { fontSize: '35px', fill: '#FFD700' , fontStyle: 'bold' , fontFamily: 'tahoma', align: 'center' });
        detailsText.setOrigin(0.5);
        detailsText.setShadow(2, 2, '#f890e7', 3, true, true);

        // RESTART
        let infoText = this.add.text(600, 500, "press space to restart ",
        { fontSize: '30px', fill: '#FFD700' , fontStyle: 'bold' , fontFamily: 'tahoma', align: 'center', fontWeight: '600' });
        infoText.setOrigin(0.5);
        infoText.setShadow(5, 5, '#1497E3', 5, true, true);


        // Restart Button
        this.restartBtn = this.add.sprite(config.width / 2, config.height *.6, 'uiButton');
        let playText = this.add.text(600, 355, "RESTART",
        { fill: '#BAA7B4' , fontSize: '30px', fontStyle: 'bold' , fontFamily: 'tahoma', align: 'center'});
        playText.setOrigin(0.5);
        this.restartBtn.setScale(2);
        
        // Main Menu Button
        this.mainMenuBtn = this.add.sprite(config.width / 2, config.height *.72, 'uiButton');
        let mainMenuText = this.add.text(600, 425, "MENU" ,
        { fill: '#BAA7B4' , fontSize: '30px', fontStyle: 'bold' , fontFamily: 'tahoma', align: 'center'});
        mainMenuText.setOrigin(0.5);
        this.mainMenuBtn.setScale(2);
        
        this.restartBtn.setInteractive();
        this.mainMenuBtn.setInteractive();

        // button events for RESTART BUTTON
        this.restartBtn.on("pointerover", ()=>{
            this.restartBtn.setTint(0xffe8a8)
        })
        this.restartBtn.on("pointerout", ()=>{
            this.restartBtn.clearTint();
            playText.y = config.height *.58;
        })
        this.restartBtn.on("pointerdown", ()=>{
            playText.y += 3;
        })
        this.restartBtn.on("pointerup", ()=>{
            playText.y -= 3;
            this.restartBtn.anims.play('btnPress',true);
            this.scene.get('GameScene').data.set('score', 0);
            confirmSFX.play();
            this.time.delayedCall(50, () => {
                this.scene.start("GameScene")
            });
        })

        // button events for MAIN MENU BUTTON
        this.mainMenuBtn.on("pointerover", ()=>{
            this.mainMenuBtn.setTint(0xffe8a8)
        })
        this.mainMenuBtn.on("pointerout", ()=>{
            this.mainMenuBtn.clearTint();
            mainMenuText.y = config.height *.70;
        })
        this.mainMenuBtn.on("pointerdown", ()=>{
            mainMenuText.y += 3;
        })
        this.mainMenuBtn.on("pointerup", ()=>{
            mainMenuText.y -= 3;
            this.mainMenuBtn.anims.play('btnPress',true);
            this.scene.get('GameScene').data.set('score', 0);
            confirmSFX.play();
            this.time.delayedCall(50, () => {
                this.scene.start("MainMenuScene")
            });
        })

        this.cursors = this.input.keyboard.createCursorKeys(); // keyboard controls
    }

    update()
    {
        // bind SPACEBAR to restart game or return to GameScene.js
        if (this.cursors.space.isDown) { this.scene.start("GameScene") }
    }
}