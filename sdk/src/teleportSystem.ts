import { Transform, engine } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";
import { movePlayerTo } from '~system/RestrictedActions'

export class TeleportSystem {

    constructor(){
        engine.addSystem(this.update)
    }

    update(dt:number){
        // Check player height and teleport to monument if too low
        if(Transform.get(engine.PlayerEntity).position.y < 20){
            movePlayerTo({
                newRelativePosition: Vector3.create(89,40,89),
                cameraTarget: Vector3.create(87,40,94),
              })
        }
    }

}