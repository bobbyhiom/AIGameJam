import { AudioSource, Transform, engine } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"

export class AudioManager {

    jungleEntity = engine.addEntity()
    static rumbleEntity = engine.addEntity()

    constructor(){
        

        Transform.create(this.jungleEntity,
            {
                position: Vector3.create(96,30,96)
            })

        // Create AudioSource component
        AudioSource.create(this.jungleEntity, {
            audioClipUrl: 'audio/jungleMusic.mp3',
            loop: true,
            playing: true,
            volume: 0.5
        })

        
        Transform.create(AudioManager.rumbleEntity,
            {
                position: Vector3.create(96,30,96)
            })

        // Create AudioSource component
        AudioSource.create(AudioManager.rumbleEntity, {
            audioClipUrl: 'audio/earthquake.mp3',
            loop: false,
            playing: false,
            volume: 1
        })
    }

    static playRumble(){
        // Put audio source ontop of player for the full effect
        Transform.getMutable(AudioManager.rumbleEntity).position = Transform.get(engine.PlayerEntity).position
        AudioSource.getMutable(AudioManager.rumbleEntity).playing = true
    }
}