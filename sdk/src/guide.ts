import { Entity, GltfContainer, Transform, engine } from "@dcl/sdk/ecs";
import { Quaternion, Vector3 } from "@dcl/sdk/math";
import  *  as  npc  from  'dcl-npc-toolkit'
import { Dialog, talk } from "dcl-npc-toolkit";
import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { setupUi } from "./setupUI";
import * as utils from '@dcl-sdk/utils'

export class Guide {

    static hasWelcomed:boolean = false
    
    myNPC:any

    GoOutsideDialog: Dialog[]

    blockSunStone: boolean = false

    constructor(){

        setupUi()
         

        let  WelcomeGuideDialog: Dialog[] = [
            {
                text:  "Welcome to the home of the ancients"
            },
            {
                text: "Haha, do not be alarmed, you are not dead. You are in the dream realm."
            },{
                text: "Inside the temple stands our ancient relic, the Sun Stone"
            },{
                text: "Tell the Sun Stone what you are dreaming of and the night giants will rise above the clouds and show you what you desire",
                isEndOfDialog: true,
                triggeredByNext:()=>{
                    npc.playAnimation(this.myNPC, `Idle`)
                }
            }
        ]

        let  GuideDialog: Dialog[] = [
            {
                text: "Inside the temple stands our ancient relic, the Sun Stone"
            },{
                text: "Tell the Sun Stone what you are dreaming of and the night giants will rise above the clouds and show you what you desire",
                isEndOfDialog: true,
                triggeredByNext:()=>{
                    npc.playAnimation(this.myNPC, `Idle`)
                }
            }
        ]

        this.GoOutsideDialog = [
            {
                text: "Come outside, the night giants have arrived",
                isEndOfDialog: true,
                triggeredByNext:()=>{
                    utils.timers.setTimeout(
                        () => { 
                            this.blockSunStone = false
                        },
                        500
                      )
                    this.blockSunStone = false
                }
            }
        ]

        this.myNPC = npc.create(
            {position:  Vector3.create(89.5,27.8,94),rotation:Quaternion.fromEulerDegrees(0,180,0), scale:  Vector3.create(1,1,1)},
            {
                type:  npc.NPCType.CUSTOM,
                model:  'models/guide.glb',
                onActivate: ()=>{
                    utils.timers.setTimeout(
                        () => { 
                            if(!Guide.hasWelcomed){
                                Guide.hasWelcomed = true
                                talk(this.myNPC,WelcomeGuideDialog)
                                npc.playAnimation(this.myNPC, `Talk`)
                            } else {
                                talk(this.myNPC,GuideDialog)
                                npc.playAnimation(this.myNPC, `Talk`)
                            }
                            
                        },
                        500
                      )
                    
                },
                onWalkAway: ()=>{
                    npc.playAnimation(this.myNPC, `Idle`)
                },
                faceUser:  true,
                reactDistance:  3,
                idleAnim:  'Idle',
                hoverText:  'Talk',
                continueOnWalkAway:  true,
                onlyClickTrigger:  true,
                onlyExternalTrigger:  false,
                darkUI: true,
                portrait: "images/guide_portrait.png",

            }
        )
    }

    longDistanceChat(){
        utils.timers.setTimeout(
            () => { 
                talk(this.myNPC,this.GoOutsideDialog)   
            },
            500
          )
    }

    readError(_error:string){
        let errorDialog: Dialog[] = [
            {
                text: _error,
                isEndOfDialog: true,
            }
        ]
        talk(this.myNPC,errorDialog)  
    }
}
