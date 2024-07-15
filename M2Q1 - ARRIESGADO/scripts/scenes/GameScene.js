class GameScene extends Phaser.Scene
{
    constructor() 
    { 
        super("GameScene");
        this.ground; 
        this.player;
        this.platforms;
        this.platform; 
        this.movingPlatform;
        this.fruit; 
        this.fruits;
        this.bomb; 
        this.bombs;
        this.fruitCollected;
        // config.fruitCount = 4;
        this.fruitsCollectedcount = 0;
        this.fruitsCollectedText = 0;
        this.fruitSFX;
        this.bombSFX;
        this.frozenSFX;
        this.keyA;
        this.keyD;
        this.keyW;
        this.iceBlock;
        this.stardrop;
        this.stardropSound;
        this.jumpSound;
        this.walkSound;
        this.bombBounceSound;
    }

    create ()
    {
        this.physics.start()
        // 🎥 BACKGROUND VIDEO AND SETTING UP SFX 🎶
        let backgroundVideo = this.add.video(config.width / 2, config.height / 2, 'background');
        backgroundVideo.play(true);
        // Objects 
        this.fruitSFX = this.sound.add('fruitSFX');
        this.bombSFX = this.sound.add('bombSFX');
        this.bombBounceSound = this.sound.add('bombBounce');
        this.stardropSound = this.sound.add('stardropSound');
        this.frozenSFX = this.sound.add('frozenSFX');
        // Movement Sound
        this.jumpSound = this.sound.add('jumpSFX');
        this.walkSound = this.sound.add('walkSFX');

        // Sets the score back to 0 after restarting game
        this.fruitsCollectedcount = 0;
        this.fruitsCollectedText = 0;
        
// END OF PLATFORMS CREATION==========================================================================
        this.platforms = this.physics.add.staticGroup();
        this.platforms.enableBody = true;

        // Add static platforms
        // LOWER PLATFORMS (FROM LEFT TO RIGHT)
        this.platform = this.platforms.create(90, 600, 'snowplatform').setScale().refreshBody();
        this.platform = this.platforms.create(410, 580, 'snowplatform').setScale().refreshBody();
        this.platform = this.platforms.create(810, 580, 'snowplatform').setScale().refreshBody();
        this.platform = this.platforms.create(1130, 600, 'snowplatform').setScale().refreshBody();

        // MIDDLE PLATFORMS (FROM LEFT TO RIGHT)
        this.platform = this.platforms.create(100, 450, 'snowplatform').setScale(0.75).refreshBody();
        this.platform = this.platforms.create(300, 420, 'block').setScale(0.50).refreshBody();
        this.platform = this.platforms.create(400, 360, 'block').setScale(0.50).refreshBody();
        this.platform = this.platforms.create(630, 300, 'iceplatform').setScale(0.75).refreshBody();
        this.platform = this.platforms.create(900, 300, 'block').setScale(0.50).refreshBody();
        this.platform = this.platforms.create(1130, 250, 'snowplatform').setScale(0.75).refreshBody();

        // TOP PLATFORMS (FROM LEFT TO RIGHT)
        this.platform = this.platforms.create(1100, 130, 'block').setScale(0.50).refreshBody();
        this.platform = this.platforms.create(950, 130, 'block').setScale(0.50).refreshBody();
        this.platform = this.platforms.create(800, 130, 'block').setScale(0.50).refreshBody();
        this.platform = this.platforms.create(650, 130, 'block').setScale(0.50).refreshBody();
        this.platform = this.platforms.create(350, 130, 'iceplatform').setScale(0.75).refreshBody();
        this.platform = this.platforms.create(100, 130, 'block').setScale(0.50).refreshBody();

        // Moving Platform
        this.movingPlatform = this.physics.add.image(config.width / 650, 300, 'snowplatform');
        this.movingPlatform.setScale(0.50);
        this.movingPlatform.setVelocityX(-100); // Set initial velocity
        this.movingPlatform.setCollideWorldBounds(false);
        this.movingPlatform.body.allowGravity = false;
        this.movingPlatform.setImmovable(true);

        // World Bounds Reverses Velocity
        this.movingPlatform.setCollideWorldBounds(true);
        this.movingPlatform.setBounce(1); // Set to full bounce (optional, adjust as needed)
        this.movingPlatform.body.onWorldBounds = true; // Enable world bounds collision event

        // Collisions between Moving and Static Platforms
        this.physics.add.collider(this.movingPlatform, this.platforms);

        // Inside your update function or update loop
        this.movingPlatform.update = function() {
            // Check if the platform is about to collide with the world bounds
            if (this.x <= this.width / 2 || this.x >= config.width - this.width / 2) {
                // Reverse velocity to keep the platform moving
                this.setVelocityX(-this.body.velocity.x);
            }
        }
// END OF PLATFORMS CREATION==========================================================================


        // OBJECTS 

        // ICEBLOCK
        this.iceBlock = this.physics.add.staticSprite(613, 620, "iceBlock");
        this.iceBlock.setScale(1);

        //STARDROP
        this.stardrop = this.physics.add.staticSprite(100, 80, "stardrop"); // Default is 100, 80
        this.stardrop.setScale(0.09);
        // Adjust the size of the physics body to match the visible part of the sprite
        this.stardrop.body.setCircle(20);
        // stardrop.body.setCircle(stardrop.width / 3, stardrop.height / 2, 0);
        this.stardrop.body.setOffset(197, 268);

        // PLAYER SPRITE
        this.player = this.physics.add.sprite(50, 490, 'playeridle');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        
        // CREATING FRUITS
        this.fruits = this.physics.add.group({   // create a dyanamic group for the fruits
            key: 'fruit',
            repeat: config.fruitCount,     // count of fruits to be created
            setXY: { x: 0, y: 0, stepX: 135 }     // x,y is for location while stepX is the distance between the fruits
        });
        this.fruits.children.iterate(function (child) {  // iterate all children then set bounceY between .4 and .8
            child.setBounceY(Phaser.Math.FloatBetween(0.8, 1));
            child.setScale(0.07);
            child.y = Phaser.Math.Between(0,600);
            child.x = Phaser.Math.Between(100,config.width - 10);
            child.setCollideWorldBounds(true);
        });

        // CREATING BOMBS
        this.bombs = this.physics.add.image(config.width / 2, 0, 'bomb');
        this.bombs.setScale(0.07); // Corrected method name to setScale
        this.bombs.setBounce(1, 1);
        this.bombs.setVelocity(200, 200); // default is 200, 200
        this.bombs.setCollideWorldBounds(true);

        
        // SCORES AND CONTROL KEYS SETUP
        this.fruitCollected = this.add.text(config.width / 1.5, 20, 'Fruits Collected: 0', 
        { fontSize: '40px', fill: '#1497E3' , fontStyle: 'bold' , fontFamily: 'tahoma'}); // fruits collected text
        this.fruitCollected.setShadow(2, 2, '#f890e7', 2, true, true);

        // GAME CONTROLS
        this.cursors = this.input.keyboard.createCursorKeys(); // enable keyboard controls
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // move left
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // move right
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // jump
    }

    update ()
    {
        // COLLISION DETECTORS
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.player, this.movingPlatform)
        this.physics.add.collider(this.fruits, this.platforms)
        this.physics.add.collider(this.fruits, this.movingPlatform)
        this.physics.add.collider(this.bombs, this.movingPlatform)
        this.physics.add.collider(this.bombs, this.platforms, function() {
            // Play bomb bounce sound
            this.bombBounceSound.play();
        }, null, this);
        this.physics.add.collider(this.movingPlatform, this.platforms)

        // Overlaps
        this.physics.add.overlap(this.player,this.fruits, this.fruitCollect, null, this)
        this.physics.add.overlap(this.player,this.bombs, this.bombHit, null, this)
        this.physics.add.overlap(this.player,this.iceBlock, this.iceBlockCollision, null, this)

        // Ice Block
        this.physics.add.overlap(this.player, this.iceBlock, null, this);
        // Check for overlap between player and stardrop
        this.physics.add.overlap(this.player, this.stardrop, this.handleStardropCollision, null, this);
        
        // MOVING PLATFORM MOVEMENT
        if (this.movingPlatform.x >= 370) { this.movingPlatform.setVelocityX(-100) }
        if (this.movingPlatform.x <= -370) { this.movingPlatform.setVelocityX(-100) }
        
        // passing score to the phaser data managaer to be used by other scenes
        this.data.set('score', this.fruitsCollectedText);

        // PLAYER CONTROLS
        // MOVE LEFT & RIGHT
        if (this.cursors.left.isDown || this.keyA.isDown) { 
            this.player.setVelocityX(-160); 
            this.player.flipX = true; // Flip the sprite horizontally
            this.player.anims.play('walk', true); // left
            if (!this.walkSound.isPlaying) {
                this.walkSound.play(); // Play walk sound if not already playing
            }
        } 
        else if (this.cursors.right.isDown || this.keyD.isDown) { 
            this.player.setVelocityX(160);
            this.player.flipX = false; // Reset the sprite's horizontal flip
            this.player.anims.play('walk', true); // right
            if (!this.walkSound.isPlaying) {
                this.walkSound.play(); // Play walk sound if not already playing
            }
        } 
        else if (this.cursors.right.isUp && this.cursors.left.isUp || this.keyA.isUp && this.keyD.isUp ) { 
            this.player.setVelocityX(0);
            this.player.anims.play('idle', true); // walk left/right
            this.walkSound.stop(); // Stop walk sound if no movement
        } 

        // JUMP
        if ((this.cursors.up.isDown && this.player.body.blocked.down) || (this.keyW.isDown && this.player.body.blocked.down)) { 
            this.player.setVelocityY(-400); 
            this.player.anims.play('jump', true);
            this.jumpSound.play(); // Play jump sound
        }
        
        // SLOWS PLAYER
        if (this.onIcePlatform(this.player)) {
            this.player.setVelocityX(this.player.body.velocity.x / 1.5);
        }
    }
    
    onIcePlatform(player) {
        // Check if the player is touching down on an ice platform
        return this.platforms.getChildren().some(function(platform) {
            return platform.texture.key === 'iceplatform' && player.body.touching.down && player.y < platform.y;
        });
}

    fruitCollect(player, fruit) 
    {
        fruit.disableBody(true, true);  // remove fruit
        this.fruitSFX.play();
        this.fruitsCollectedcount += 1;
        this.fruitsCollectedText += 1 ;
        this.fruitCollected.setText('Fruits Collected: ' + this.fruitsCollectedText);
        
        if ( this.fruits.countActive(true) < config.fruitCount )
        {
            fruit.enableBody(true, Phaser.Math.Between(0,config.width-10), 0, true ,true);
        }
        
        // Set player tint based on collected fruit
        if (this.fruitsCollectedcount == 1) { player.setTint(0xff4040) }
        if (this.fruitsCollectedcount == 2) { player.setTint(0xffac40) }
        if (this.fruitsCollectedcount == 3) { player.setTint(0xfff240) }
        if (this.fruitsCollectedcount == 4) { player.setTint(0x67ff3d) }
        if (this.fruitsCollectedcount == 5) { player.setTint(0x4056ff) }
        if (this.fruitsCollectedcount == 6) { player.setTint(0x4b0082) }
        if (this.fruitsCollectedcount == 7) { player.setTint(0x8000de); this.fruitsCollectedcount = 0}

        if (this.fruitsCollectedText % 5 === 0) 
        {
            player.setScale(player.scaleX * 1.1, player.scaleY * 1.1);
            console.log("Player size increased to: ", player.scaleX, player.scaleY);  // Log player size
        }

        // Fruit Particles
        var emitter = this.add.particles('fruit').createEmitter({
            x: player.x,
            y: player.y,
            speed: { min: -100, max: 100 },
            angle: { min: 0, max: 360 },
            scale: { start: .02, end: .02 },
            blendMode: 'ADD'
        });
        this.time.delayedCall(500, function () {emitter.stop()}, [], this);


        if (this.fruitsCollectedText == 5) { this.fruits.createMultiple({   // create a dyanamic group for the fruits
                key: 'fruit',
                repeat: 5,     // count of fruits to be created
                setXY: { x: 0, y: 0, stepX: 120 }     // x,y is for location while stepX is the distance between the fruits
            });
            this.fruits.children.iterate(function (child) {  // iterate all children then set bounceY between .4 and .8
                child.setBounceY(Phaser.Math.FloatBetween(0.8, 1));
                child.setScale(0.07)
                child.y = Phaser.Math.Between(0,600);
                child.x = Phaser.Math.Between(100,config.width - 10);
                child.setCollideWorldBounds(true);
            }); 
        }
    }

    // Losing Condition When Player Collides with Bomb
    bombHit(player, bombs)
    {
        this.physics.pause();
        player.disableBody(true,true);
        bombs.disableBody(true,true);
        this.bombSFX.play();
        bombs.setTint(0xff0000);

        var emitter = this.add.particles('bomb').createEmitter({
            x: player.x,
            y: player.y,
            speed: { min: -100, max: 100 },
            angle: { min: 0, max: 360 },
            scale: { start: .05, end: .05 },
            blendMode: 'ADD'
        });

        this.time.delayedCall(500, function () {emitter.stop()}, [], this);

        this.time.delayedCall(700, () => {
            this.scene.start("GameOverScene")
        })

    }

    // Losing Condition When Player Collides with Ice Block
    iceBlockCollision(player, iceBlock)
    {
        this.physics.pause();
        player.disableBody(true,true);
        // Play sound effect
        this.frozenSFX.play();
        iceBlock.setTint(0xff0000);

        var emitter = this.add.particles('iceBlock').createEmitter({
            x: player.x,
            y: player.y,
            speed: { min: -100, max: 100 },
            angle: { min: 0, max: 360 },
            scale: { start: .05, end: .05 },
            blendMode: 'ADD'
        });
        
        this.time.delayedCall(500, function () {emitter.stop()}, [], this);

        this.time.delayedCall(700, () => {
            this.scene.start("GameOverScene")
        })
    }

    // Win Condition When Player Collides with Stardrop
    handleStardropCollision(player, stardrop) 
    {
        this.physics.pause();
        player.disableBody(true,true);
        stardrop.disableBody(true, true);
        // Play sound effect
        this.stardropSound.play();
        stardrop.setTint(0xff0000);

        var emitter = this.add.particles('stardrop').createEmitter({
            x: player.x,
            y: player.y,
            speed: { min: -100, max: 100 },
            angle: { min: 0, max: 360 },
            scale: { start: .05, end: .05 },
            blendMode: 'ADD'
        });
        
        this.time.delayedCall(500, function () {emitter.stop()}, [], this);

        this.time.delayedCall(700, () => {
            this.scene.start("GameWinScene")
        })
    }
}    