import React from 'react'
import ReactDOM from 'react-dom'

const isServer = typeof window === 'undefined' || !window.document
const portalDiv = !isServer ? document.getElementById('portal') : null

const Portal = () => {
  return <div>Portal div</div>
}

function PortalPage() {
  return (
    <div>
      <div>Portal page</div>
      {portalDiv && ReactDOM.createPortal(<Portal />, portalDiv)}
    </div>
  )
}

export default PortalPage
