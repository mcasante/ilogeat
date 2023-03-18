interface Vector2 {
  x: number
  y: number
}

function useVector2(vector: Vector2) {
  const x = ref(vector.x)
  const y = ref(vector.y)
  watch([x, y], () => {
    vector.x = x.value
    vector.y = y.value
  })
  return { x, y }
}

interface RigidBodyOptions {
  position: Vector2
  shape: 'rectangle' | 'circle'
  width: number
  height: number
  isStatic: boolean
}

export function useRigidBody(options: RigidBodyOptions) {
  const { x, y } = useVector2(options.position)
  const width = ref(options.width)
  const height = ref(options.height)
  const isStatic = ref(options.isStatic)
  const shape = ref(options.shape)

  return {
    x,
    y,
    width,
    height,
    isStatic,
    shape,
  }
}
