import { Scrollbar, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { twMerge } from 'tailwind-merge'
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import { Good } from '@shared/openapi'

import { className } from './styles'

type GalleryProps = { product: Good }

export const Gallery = ({ product }: GalleryProps) => {
  return (
    <Swiper
      className={twMerge(className.swiperContainer, className.container)}
      navigation={true}
      modules={[Scrollbar, Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
    >
      {product.images.map((image, index) => (
        <SwiperSlide key={`gallery-image-${index}`}>
          <img src={image.link} className={twMerge(className.container, className.img)} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
