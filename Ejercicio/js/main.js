window.onload = function(){
    

    let game = new Phaser.Game(360, 640, Phaser.AUTO, 'content',{
        preload:loader,
        create:creation,
        update:updatation
    });

    function loader(){
        game.load.image("backyard", "assets/images/backyard.png");
        game.load.spritesheet("pet",
            "assets/images/pet.png", 98, 85, 5);
        game.load.image("bar", "assets/images/bar.png")
        game.load.image("apple", "assets/images/apple.png");
        game.load.image("candy", "assets/images/candy.png");
        game.load.image("rotate", "assets/images/rotate.png");
        game.load.image("rubber_duck", "assets/images/rubber_duck.png");
    }

    function creation(){
        let by = game.add.sprite(0,0,"backyard");
        let pet = game.add.sprite(0,0,"pet", );
        pet.anchor.setTo(0.5);
        pet.x = game.world.centerX;
        pet.y = game.world.centerY;

        pet.animations.add("animate",[0,1,2,3,4],3,true);
        pet.animations.play("animate");

        let bar = game.add.sprite(0,0,"bar");
        bar.anchor.setTo(0.5);
        bar.x = game.world.centerX;
        bar.y = game.height * 4 / 5;
        bar.scale.setTo(4.5);

        let apple = game.add.sprite(0,0,"apple");
        apple.anchor.setTo(0.5);
        apple.x = game.width * 1 / 5;
        apple.y = game.height * 4 / 5;

        let candy = game.add.sprite(0,0,"candy");
        candy.anchor.setTo(0.5);
        candy.x = game.width * 2 / 5;
        candy.y = game.height * 4 / 5;

        let rotate = game.add.sprite(0,0,"rotate");
        rotate.anchor.setTo(0.5);
        rotate.x = game.width * 3 / 5;
        rotate.y = game.height * 4 / 5;

        let rubber_duck = game.add.sprite(0,0,"rubber_duck");
        rubber_duck.anchor.setTo(0.5);
        rubber_duck.x = game.width * 4 / 5;
        rubber_duck.y = game.height * 4 / 5;

    }

    function updatation(){

    }
// asegurarse de inicializar las variables 1 sola vez

}