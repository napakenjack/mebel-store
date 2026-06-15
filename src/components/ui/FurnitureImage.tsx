import { useState } from 'react'

type FurnitureImageProps = {
  src: string
  alt: string
  fallbackLabel: string
  className?: string
  loading?: 'lazy' | 'eager'
}

export function FurnitureImage({
  src,
  alt,
  fallbackLabel,
  className = '',
  loading = 'lazy',
}: FurnitureImageProps) {
  const [failed, setFailed] = useState(false)

  const shellClassName = `furniture-image-shell ${failed ? 'is-failed ' : ''}${className}`.trim()

  return (
    <div aria-label={failed ? alt : undefined} className={shellClassName} role={failed ? 'img' : undefined}>
      <div aria-hidden={!failed} className="image-fallback">
        <strong>{fallbackLabel}</strong>
      </div>
      {!failed && (
        <img
          alt={alt}
          className="furniture-image"
          decoding="async"
          loading={loading}
          onError={() => setFailed(true)}
          src={src}
        />
      )}
    </div>
  )
}
