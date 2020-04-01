window.onload = function(){
    //console.log("NILTON TE IGNORO");
    let current_animal = {},
        animals = ["sheep", "horse", "pig", "chicken"],
        isMoving = false,
        new_animal = {},
        index = 0;

    let game = new Phaser.Game(640, 360, Phaser.AUTO, 'content', {

        preload: loader,
        create: creation,
        update: updatation
    });

    function loader(){
        //console.log("preload");
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
        let bg = game.add.sprite(0,0,'background');

        let arrow1 = game.add.sprite(0,0,'arrow');
        arrow1.anchor.setTo(0.5, 0.5);
        arrow1.y = game.height * 0.5;
        arrow1.x = arrow1.width * 0.5;
        arrow1.scale.setTo(-1);
        arrow1.inputEnabled = true;
        arrow1.events.onInputDown.add(clickArrow);
        arrow1.direction = "left";

        let arrow2 = game.add.sprite(0,0,'arrow');
        arrow2.anchor.setTo(0.5, 0.5);
        arrow2.y = game.height * 0.5;
        arrow2.x = game.width - (arrow2.width * 0.5);
        arrow2.inputEnabled = true;
        arrow2.events.onInputDown.add(clickArrow);
        arrow2.direction = "rigth";
                
        current_animal = game.add.sprite(0, 0, animals[index]);
        current_animal.anchor.setTo(0.5, 0.5);
        current_animal.x = game.world.centerX;
        current_animal.y = game.world.centerY;

        current_animal.animations.add('animate', [0,1,2,1,0,1], 3, true);
        current_animal.animations.play("animate");
    }

    function clickArrow(sprite){
        if(isMoving){
            return;
        }
        isMoving = true;
        if (sprite.direction == "left"){
            sprite.alpha = 0.5;
            index = index == 0 ? animals.length - 1 : index - 1;
            new_animal = game.add.sprite(0,game.world.centerY,animals[index]);
            new_animal.anchor.setTo(0.5);
            new_animal.x = game.width + new_animal.width;

            let tween_current = game.add.tween(current_animal).to({
                x : -current_animal.width
            }, 300);//300 es millseg
            tween_current.start();

            let tween_new = game.add.tween(new_animal).to({
                x : game.world.centerX
            }, 300);//300 es millseg
            tween_new.onComplete.add(onCompleteTween);
            tween_new.start();
            sprite.alpha = 1;

        }else{
            sprite.alpha = 0.5;
            index = index == animals.length - 1 ? 0 : index + 1;
            new_animal = game.add.sprite(0,game.world.centerY,animals[index]);
            new_animal.anchor.setTo(0.5);
            new_animal.x = -new_animal.width;

            let tween_current = game.add.tween(current_animal).to({
                x : current_animal.x + game.world.width
            }, 300);
            tween_current.start();

            let tween_new = game.add.tween(new_animal).to({
                x : game.world.centerX
            }, 300);
            tween_new.onComplete.add(onCompleteTween);
            tween_new.start();
            sprite.alpha = 1;

        }
        console.log(index);
    }

    function onCompleteTween(){
        isMoving = false;
        current_animal.destroy();//nula
        //current_animal.kill();//desactiva el elemento y ya no se renderea
        current_animal = new_animal;
    }

    function updatation(){
        //console.log("update");
    }


}