import React from 'react'

const AbilityComponent = ({ name, description }: { name: string; description: string }) => {
  return (
    <div>
      <h2 className="sm:text-2xl text-lg">{name}</h2>
      <h4 className="sm:text-sm text-xs">{description}</h4>
    </div>
  )
}

export default AbilityComponent