import { createEffect, createEvent, sample } from 'effector'

import { StageType, $stage } from '../stage'

export const clickBackBtn = createEvent()
export const changeStage = createEvent<StageType>()

const clickBackBtnFx = createEffect<StageType, void>((stage) => {
  if (stage === 'check-code') changeStage('auth')
})

sample({
  clock: clickBackBtn,
  source: $stage,
  target: clickBackBtnFx,
})
