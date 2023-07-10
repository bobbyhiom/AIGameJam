import { Animator, Entity, GltfContainer, Transform, engine } from "@dcl/sdk/ecs"
import { Vector3, Quaternion } from "@dcl/sdk/math"

export class SkyHand {
    static skyHand1:Entity
    static skyHand2:Entity
    static skyHand3:Entity
    static skyHand4:Entity
    constructor(){
        SkyHand.skyHand1 = engine.addEntity()
        GltfContainer.create(SkyHand.skyHand1,{src:"models/skyhand.glb"})
        Transform.create(SkyHand.skyHand1,
          {
            position: Vector3.create(65,18,96),
            scale: Vector3.create(3,3,3),
            rotation: Quaternion.fromEulerDegrees(0,180,0)
          })

          Animator.create(SkyHand.skyHand1, {
            states:[{
                name: "Animation",
                clip: "Animation",
                playing: false,
                loop:false
            }]
        })

        SkyHand.skyHand2 = engine.addEntity()
        GltfContainer.create(SkyHand.skyHand2,{src:"models/skyhand.glb"})
        Transform.create(SkyHand.skyHand2,
          {
            position: Vector3.create(96,18,65),
            scale: Vector3.create(3,3,3),
            rotation: Quaternion.fromEulerDegrees(0,90,0)
          })

          Animator.create(SkyHand.skyHand2, {
            states:[{
                name: "Animation",
                clip: "Animation",
                playing: false,
                loop:false
            }]
        })

        SkyHand.skyHand3 = engine.addEntity()
        GltfContainer.create(SkyHand.skyHand3,{src:"models/skyhand.glb"})
        Transform.create(SkyHand.skyHand3,
          {
            position: Vector3.create(96,18,96+31),
            scale: Vector3.create(3,3,3),
            rotation: Quaternion.fromEulerDegrees(0,270,0)
          })

          Animator.create(SkyHand.skyHand3, {
            states:[{
                name: "Animation",
                clip: "Animation",
                playing: false,
                loop:false
            }]
        })

        SkyHand.skyHand4 = engine.addEntity()
        GltfContainer.create(SkyHand.skyHand4,{src:"models/skyhand.glb"})
        Transform.create(SkyHand.skyHand4,
          {
            position: Vector3.create(96+31,18,96),
            scale: Vector3.create(3,3,3),
            rotation: Quaternion.fromEulerDegrees(0,0,0)
          })

          Animator.create(SkyHand.skyHand4, {
            states:[{
                name: "Animation",
                clip: "Animation",
                playing: false,
                loop:false
            }]
        })
    }

    static playAnimation(){
      Animator.playSingleAnimation(SkyHand.skyHand1,"Animation",true)
      Animator.playSingleAnimation(SkyHand.skyHand2,"Animation",true)
      Animator.playSingleAnimation(SkyHand.skyHand3,"Animation",true)
      Animator.playSingleAnimation(SkyHand.skyHand4,"Animation",true)
    }
}