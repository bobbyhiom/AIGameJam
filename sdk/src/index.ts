
import { Entity, GltfContainer, InputAction, Material, MeshRenderer, Transform, engine, pointerEventsSystem } from '@dcl/sdk/ecs'
import { ImageManager } from './imageManager'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import * as ui from 'dcl-ui-toolkit'
import { ReactEcsRenderer, UiComponent } from '@dcl/sdk/react-ecs'
import { TeleportSystem } from './teleportSystem'
import { Prompt } from 'dcl-ui-toolkit/dist/ui-entities/prompts/Prompt'
import { SkyHand } from './skyhand'
import { Guide } from './guide'
import { setupUi } from './setupUI'
import { NpcUtilsUi } from 'dcl-npc-toolkit'

import * as utils from '@dcl-sdk/utils'
import { AudioManager } from './audioManager'

export function main() {

  let guide = new Guide()
  new ImageManager(guide)

  


  // Open prompt dialog
  const prompt = ui.createComponent(ui.FillInPrompt, {
    title: 'Imagine an image',
    useDarkTheme: true,
    placeholder: "Describe what you see",
    onAccept: (value: string) => {
      ImageManager.loadImage(value)
      prompt.hide()
      guide.blockSunStone = true
    },
  })

  // remove e icon from button
  if (prompt.buttonElement.iconElement.uiTransform != undefined) {
    prompt.buttonElement.iconElement.uiTransform.width = 0
  }

  if (prompt.buttonElement.labelElement.uiTransform != undefined) {
    prompt.buttonElement.labelElement.uiTransform.margin = 0
  }

  let cloudAztec: Entity = engine.addEntity()
  GltfContainer.create(cloudAztec, { src: "models/cloudAztec.glb" })
  Transform.create(cloudAztec,
    {
      position: Vector3.create(6 * 16, 20, 6 * 16)
    })

  let sunStone: Entity = engine.addEntity()
  GltfContainer.create(sunStone, { src: "models/SunStone.glb" })
  Transform.create(sunStone,
    {
      position: Vector3.create(96, 29.73, 96),
      scale: Vector3.create(0.42, 0.42, 0.42)
    })

  pointerEventsSystem.onPointerDown(
    {
      entity: sunStone,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Activate Sun Stone'
      }
    },
    () => {
      // Open prompt dialog 
      if (!guide.blockSunStone) {
        prompt.show()
      }
    }
  )

  new SkyHand()

  new TeleportSystem()

  new AudioManager()




}
