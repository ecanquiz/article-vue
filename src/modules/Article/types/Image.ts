export type ImageType = 'png' | 'jpeg'

export type Base64<imageType extends ImageType> = `data:image/${imageType};base64${string}`

export type Images = {
  base64: Base64<ImageType>[];
  path: string[]
}
