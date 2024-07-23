import { NearestFilter, TextureLoader, RepeatWrapping } from 'three'
import {
  grassTexture as grass,
  dirtTexture as dirt,
  glassTexture as glass,
  woodTexture as wood,
  logTexture as log
} from './texture_images'

export const grassTexture = new TextureLoader().load(grass)
export const logTexture = new TextureLoader().load(log)
export const glassTexture = new TextureLoader().load(glass)
export const woodTexture = new TextureLoader().load(wood)
export const dirtTexture = new TextureLoader().load(dirt)

export const groundTexture = new TextureLoader().load(grass)

groundTexture.wrapS = RepeatWrapping
groundTexture.wrapT = RepeatWrapping
groundTexture.magFilter = NearestFilter

grassTexture.magFilter = NearestFilter
logTexture.magFilter = NearestFilter
glassTexture.magFilter = NearestFilter
woodTexture.magFilter = NearestFilter
dirtTexture.magFilter = NearestFilter
