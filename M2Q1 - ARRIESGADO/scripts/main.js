var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        }
    },
    scene: [PreLoadScene,MainMenuScene,GameScene,CreditScene,GameOverScene,GameWinScene],
    render: {
        pixelArt: true
    },
    fruitCount: 4, // default: 4
};

const game = new Phaser.Game(config);