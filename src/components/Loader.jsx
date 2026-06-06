import React from 'react'

const Loader = ({ fullScreen = false, inline = false }) => {
  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F3EF' }}>
        <div
          className="w-12 h-12 rounded-full border-4 animate-spin"
          style={{ borderColor: '#DCCCAC', borderTopColor: '#546B41' }}
        />
      </div>
    )
  }

  if (inline) {
    return (
      <div
        className="w-5 h-5 rounded-full border-2 animate-spin"
        style={{ borderColor: '#DCCCAC', borderTopColor: '#546B41' }}
      />
    )
  }

  return (
    <div className="flex items-center justify-center py-16">
      <div
        className="w-10 h-10 rounded-full border-4 animate-spin"
        style={{ borderColor: '#DCCCAC', borderTopColor: '#546B41' }}
      />
    </div>
  )
}

export default Loader
