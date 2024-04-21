import { FormEventHandler, useRef } from 'react'
import { Good } from '@shared/openapi'
import { SelectInput, Button } from '@shared/ui'
import { text } from '@shared/utils'

import { getModifierOptions, clickAddProduct } from './model'
import { className } from './styles'

type DetailsProps = { product: Good }

export const Details = ({ product }: DetailsProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const options = getModifierOptions(product)
  const price = text.getPoints(product.price)

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    clickAddProduct({ product, selectRef: ref })
  }

  return (
    <form onSubmit={onSubmit} className={className.form}>
      <div className={className.container}>
        <h1 className={className.name}>{product.name}</h1>
        <p className={className.price}>{price}</p>
        <p className={className.description}>{product.info}</p>
        {Boolean(options.length) && (
          <SelectInput
            ref={ref}
            required={true}
            className={className.selectInput}
            isSearchable={false}
            options={options}
            placeholder={'Выберите модификацию'}
          />
        )}
        <Button type='submit' className={className.addButton}>
          ДОБАВИТЬ В КОРЗИНУ
        </Button>
      </div>
    </form>
  )
}
