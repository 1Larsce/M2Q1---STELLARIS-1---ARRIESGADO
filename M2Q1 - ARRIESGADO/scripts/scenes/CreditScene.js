class CreditScene extends Phaser.Scene {
    
    constructor() 
    {
        super("CreditScene");
        this.backButton;
    }

    create() {
        // BACKGROUND VIDEO AND SETTING UP SFX
        let backgroundVideo = this.add.video(config.width / 2, config.height / 2, 'background');
        backgroundVideo.play(true);
        let declineSFX = this.sound.add('declineSFX');
        let catClickSFX = this.sound.add('catClickSFX');

        // MY INFORMATION
        // Add the image to the scene
        let catImage = this.add.image(config.width * 0.1, config.height * 0.1, 'profile');
        catImage.setOrigin(0, 0);
        
        // Make the image interactive
        catImage.setInteractive();
        
        // Create a particle emitter
        let particles = this.add.particles('profile');
        let emitter = particles.createEmitter({
            speed: { min: -100, max: 500 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.05, end: 0.05 },
            blendMode: 'ADD',
            lifespan: 1000,
            gravityY: 200
        });

        // Add event listener for pointerup (click)
        catImage.on('pointerup', (pointer) => {
            catClickSFX.play();
            emitter.setPosition(pointer.x, pointer.y);
            emitter.explode(50, pointer.x, pointer.y); // Emit 50 particles at the click position
        });

        // Calculate the position for the text to be below the image
        let textYPosition = catImage.y + catImage.height + 10; // 10 is the margin between image and text

        // Add the text below the image
        let devInfo = this.add.text(config.width * 0.1, textYPosition, "Created by: \nHilario B. Arriesgado II 😽 \nSection: A223 😺 \nProgram: EMC 😹 \nDiscord: Koh 🐈", {
            fontSize: '45px', 
            fill: '#fff', 
            fontStyle: 'italic', 
            fontFamily: 'impact'
        });
        devInfo.setShadow(2, 2, '#000', 5, true, true);

        // Back button
        this.backButton = this.add.sprite(config.width * 0.05, config.height * 0.1, 'uiButtonSmall');
        this.backButton.setScale(2);
        this.backButton.setInteractive();

        // Button events for BACK BUTTON
        this.backButton.on("pointerover", () => {
            this.backButton.setTint(0xffe8a8);
        });
        this.backButton.on("pointerout", () => {
            this.backButton.clearTint();
        });
        this.backButton.on("pointerdown", () => {
            // Add functionality for pointerdown if needed
        });
        this.backButton.on("pointerup", () => {
            declineSFX.play();
            this.backButton.anims.play('btnPressSmall', true);
            this.time.delayedCall(50, () => {
                this.scene.start("MainMenuScene");
            });
        });
    }
}
