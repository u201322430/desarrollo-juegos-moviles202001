window.onload = function(){
    let animals = ["sheep","chicken","horse","pig"],
    index = 0;
    current_animal = {},
    new_animal = {}
    isMoving = false,
    arrow1 = {},
    arrow2 = {},
    direction_arrow = "";

    let game = new Phaser.Game(640, 360, Phaser.AUTO, 'content',{
        preload:loader,
        create:creation,
        update:updatation
    });

    function loader(){
        game.load.image("background", "assets/images/background.png");
        game.load.image("arrow", "assets/images/arrow.png");
        game.load.spritesheet("sheep",
            "assets/images/sheep_spritesheet.png", 244, 200, 3);
        game.load.spritesheet("chicken",
            "assets/images/chicken_spritesheet.png", 131, 200, 3);
        game.load.spritesheet("horse",
            "assets/images/horse_spritesheet.png", 212, 200, 3);
        game.load.spritesheet("pig",
            "assets/images/pig_spritesheet.png", 297, 200, 3);
    }

    function creation(){
        let bg = game.add.sprite(0,0,"background");

        arrow1 = game.add.sprite(0,0,"arrow");
        arrow1.anchor.setTo(0.5);
        arrow1.x += arrow1.width * 0.5;
        arrow1.y = game.height * 0.5;
        arrow1.scale.setTo(-1);
        arrow1.inputEnabled = true;
        arrow1.events.onInputDown.add(clickArrow);
        arrow1.direction = "left";

        arrow2 = game.add.sprite(0,0,"arrow");
        arrow2.anchor.setTo(0.5);
        arrow2.anchor.setTo(0.5);
        arrow2.x = game.width - (arrow2.width * 0.5);
        arrow2.y = game.height * 0.5;
        arrow2.inputEnabled = true;
        arrow2.events.onInputDown.add(clickArrow);
        arrow2.direction = "rigth";

        current_animal = game.add.sprite(0, 0, animals[index]);
        current_animal.anchor.setTo(0.5);
        current_animal.x = game.width * 0.5;
        current_animal.y = game.height * 0.5;

        current_animal.animations.add("animate", [0,1,2,1,0,1], 3, true);//escribir bien "s"
        current_animal.animations.play("animate");//escribir bien "s"

    }

    function clickArrow(sprite){
        //console.log("click");
        if(isMoving){
            return;
        }
        isMoving = true;        
        direction_arrow = sprite.direction;
        if(direction_arrow == "left"){
            sprite.alpha = 0.5;
            index = index == 0 ? index = animals.length - 1 : index - 1;
            new_animal = game.add.sprite(0,game.world.centerY,animals[index]);
            new_animal.anchor.setTo(0.5);
            new_animal.x = game.width + new_animal.width;

            let tween_current = game.add.tween(current_animal).to({
                x: -current_animal.width//game.world.centerX
            }, 300);
            tween_current.start();

            let tween_new = game.add.tween(new_animal).to({
                x: game.world.centerX
            }, 300);
            tween_new.onComplete.add(onCompleteTween);
            tween_new.start();

        }else{
            sprite.alpha = 0.5;
            index = index == animals.length - 1 ? index = 0 : index + 1;
            new_animal = game.add.sprite(0,game.world.centerY,animals[index]);
            new_animal.anchor.setTo(0.5);
            new_animal.x = -new_animal.width;

            let tween_current = game.add.tween(current_animal).to({
                x: game.width + current_animal.width
            }, 300);
            tween_current.start();

            let tween_new = game.add.tween(new_animal).to({
                x: game.world.centerX
            }, 300);
            tween_new.onComplete.add(onCompleteTween);
            tween_new.start();

        }
        console.log(index);        
    }

    function onCompleteTween(){
        isMoving = false;
        if(direction_arrow == "left"){
            arrow1.alpha = 1;
        }else{
            arrow2.alpha = 1;
        }
        current_animal.destroy();//nula
        new_animal.animations.add("animate", [0,1,2,1,0,1], 3, true);//escribir bien "s"
        new_animal.animations.play("animate");//escribir bien "s"
        current_animal = new_animal;
    }

    function updatation(){

    }
// asegurarse de inicializar las variables 1 sola vez

}