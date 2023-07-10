import ReactEcs, { Label, ReactEcsRenderer, UiComponent, UiEntity } from '@dcl/sdk/react-ecs'
import { NpcUtilsUi } from 'dcl-npc-toolkit'
import * as ui from 'dcl-ui-toolkit'

const SceneOwnedUi = () => [
	ui.render(),
	NpcUtilsUi()
]


export function setupUi() {
	ReactEcsRenderer.setUiRenderer(SceneOwnedUi) 
}



