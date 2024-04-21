import { useStore } from 'effector-react'
import { FormEventHandler, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { GetStores200ResponseInner } from '@shared/openapi'
import { columnTitle } from '@shared/styles'
import { Button, SelectInput } from '@shared/ui'

import { clickSubmitOrder, makeOrderFx } from './model'
import { className } from './styles'
import { getStoresOptions } from './utils'

type FormProps = { stores: GetStores200ResponseInner[] }

export const Form = ({ stores }: FormProps) => {
  const ref = useRef(null)
  const navigate = useNavigate()
  const isLoading = useStore(makeOrderFx.pending)
  const options = getStoresOptions(stores)

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    clickSubmitOrder({ pickPointsElemRef: ref, navigate })
  }

  return (
    <form onSubmit={onSubmit} className={className.form}>
      <h1 className={twMerge(columnTitle.className.title, className.title)}>Данные заказа</h1>
      <SelectInput ref={ref} required isSearchable={false} placeholder={'Пункт самовывоза'} options={options} />
      <Button type='submit' className={className.submitButton} isLoading={isLoading} disabled={isLoading}>
        ОФОРМИТЬ ЗАКАЗ
      </Button>
    </form>
  )
}
