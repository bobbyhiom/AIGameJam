
import { AvatarShape, Entity, Material, MeshRenderer, Transform, engine, executeTask } from "@dcl/sdk/ecs"
import fetch, { Request, Headers } from "node-fetch";
import { Color4, Quaternion, Vector3 } from "@dcl/sdk/math";
import * as utils from '@dcl-sdk/utils'
import { SkyHand } from "./skyhand";
import { AudioManager } from "./audioManager";
import { Guide } from "./guide";

export class ImageManager {

  static frame1:Entity
  static frame2:Entity
  static frame3:Entity
  static frame4:Entity

  static guide:Guide

  constructor(_guide:Guide){
    ImageManager.guide = _guide
    ImageManager.frame1 = engine.addEntity()
    ImageManager.frame2 = engine.addEntity()
    ImageManager.frame3 = engine.addEntity()
    ImageManager.frame4 = engine.addEntity()
  }

    static loadImage(_prompt:string){
      let serverURL:string = "https://server.bobbygamejam.xyz:3005/image?prompt="+_prompt

      executeTask(async () => {
        try {           
          AudioManager.playRumble()
          SkyHand.playAnimation()
          ImageManager.hide() // Hide previous image if there was one
          let response = await fetch(serverURL) 
          let json = await response.json()   



          // Check for errors
          if(json.error.length>0){
            ImageManager.guide.readError(json.error)
            ImageManager.guide.blockSunStone = false
            return
          } else {
            ImageManager.guide.longDistanceChat()
          }

          // delay before showing the picture
          utils.timers.setTimeout(
            function() { 
              ImageManager.showPicture(json.id)
            },
            2000
          )

          // Quick Scale animation
          for(let i:number = 0; i<14;i++){
            utils.timers.setTimeout(
              function() { 
                ImageManager.show(i/2)
              },
              5000 + i*50
            )
          }
          
        } catch (e) {
          console.log(e)
          console.log("failed to reach URL")
        }
      })
    }

    static show(_scale:number){
      Transform.getMutable(ImageManager.frame1).scale = Vector3.create(_scale,_scale,_scale)
      Transform.getMutable(ImageManager.frame2).scale = Vector3.create(_scale,_scale,_scale)
      Transform.getMutable(ImageManager.frame3).scale = Vector3.create(_scale,_scale,_scale)
      Transform.getMutable(ImageManager.frame4).scale = Vector3.create(_scale,_scale,_scale)
    }

    static hide(){
      if(Transform.getMutableOrNull(ImageManager.frame1)!=null){
        Transform.getMutable(ImageManager.frame1).scale = Vector3.Zero()
      }
      if(Transform.getMutableOrNull(ImageManager.frame2)!=null){
        Transform.getMutable(ImageManager.frame2).scale = Vector3.Zero()
      }
      if(Transform.getMutableOrNull(ImageManager.frame3)!=null){
        Transform.getMutable(ImageManager.frame3).scale = Vector3.Zero()
      }
      if(Transform.getMutableOrNull(ImageManager.frame4)!=null){
        Transform.getMutable(ImageManager.frame4).scale = Vector3.Zero()
      }
    }

    static showPicture(_id:string){
    
     let serverURL = "https://server.bobbygamejam.xyz:3005/sender?img="+_id

     // Load this on each hand
      MeshRenderer.setPlane(ImageManager.frame1)
      Transform.createOrReplace(ImageManager.frame1, {
        position: Vector3.create(65+10,33,96),
        scale: Vector3.create(0,0,0),
        rotation: Quaternion.fromEulerDegrees(0,270,0)
      }) 

      Material.setPbrMaterial(ImageManager.frame1, {
        texture: Material.Texture.Common({
          src: serverURL
        }),
        emissiveTexture:Material.Texture.Common({
          src: serverURL
        }), emissiveIntensity : 0.5,
        emissiveColor: Color4.White()
      })

      MeshRenderer.setPlane(ImageManager.frame2)
      Transform.createOrReplace(ImageManager.frame2, {
        position: Vector3.create(96,33,65+10),
        scale: Vector3.create(0,0,0),
        rotation: Quaternion.fromEulerDegrees(0,180,0)
      }) 

      Material.setPbrMaterial(ImageManager.frame2, {
        texture: Material.Texture.Common({
          src: serverURL
        }),
        emissiveTexture:Material.Texture.Common({
          src: serverURL
        }), emissiveIntensity : 0.5,
        emissiveColor: Color4.White()
      })

      MeshRenderer.setPlane(ImageManager.frame3)
      Transform.createOrReplace(ImageManager.frame3, {
        position: Vector3.create(96,33,96+31-10),
        scale: Vector3.create(0,0,0),
        rotation: Quaternion.fromEulerDegrees(0,0,0)
      }) 

      Material.setPbrMaterial(ImageManager.frame3, {
        texture: Material.Texture.Common({
          src: serverURL
        }),
        emissiveTexture:Material.Texture.Common({
          src: serverURL
        }), emissiveIntensity : 0.5,
        emissiveColor: Color4.White()
      })

      MeshRenderer.setPlane(ImageManager.frame4)
      Transform.createOrReplace(ImageManager.frame4, {
        position: Vector3.create(96+31-10,33,96),
        scale: Vector3.create(0,0,0),
        rotation: Quaternion.fromEulerDegrees(0,90,0)
      }) 

      Material.setPbrMaterial(ImageManager.frame4, {
        texture: Material.Texture.Common({
          src: serverURL
        }),
        emissiveTexture:Material.Texture.Common({
          src: serverURL
        }), emissiveIntensity : 0.5,
        emissiveColor: Color4.White()
      })


    }

    
}

