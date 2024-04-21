import { createEffect, sample } from 'effector'
import { form, codeForm } from '@entities/auth'
import { stage as stageProfile, backButton, user } from '@entities/profile'

const changeStageFx = createEffect<stageProfile.StageType, void>((stage) => {
  stageProfile.setStage(stage)
})

sample({
  clock: user.$user,
  fn: (clock) => (clock ? ('profile' as stageProfile.StageType) : ('auth' as stageProfile.StageType)),
  target: changeStageFx,
})
sample({ clock: backButton.changeStage, target: changeStageFx })
sample({ clock: form.doneFormSubmit, fn: () => 'check-code' as stageProfile.StageType, target: changeStageFx })
sample({ clock: codeForm.successCodeCheck, fn: () => 'profile' as stageProfile.StageType, target: changeStageFx })
