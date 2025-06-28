'use client'

import React from 'react'
import { AnimatedLogo } from './AnimatedLogo'
import { MobilePhoneIcon } from './LightBulbFlicker'

interface AnimatedPhoneUnitProps {
  className?: string
  scale?: 'sm' | 'md' | 'lg' | 'xl'
  showDollarSigns?: boolean
}

export const AnimatedPhoneUnit: React.FC<AnimatedPhoneUnitProps> = ({
  className = '',
  scale = 'md',
  showDollarSigns = true
}) => {
  const scaleClasses = {
    sm: 'scale-75',
    md: 'scale-100',
    lg: 'scale-125',
    xl: 'scale-150'
  }

  return (
    <div 
      className={`flex flex-col items-center transition-transform duration-300 ${scaleClasses[scale]} ${className}`}
      style={{
        filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.3))'
      }}
    >
      {showDollarSigns && <AnimatedLogo />}
      <MobilePhoneIcon />
    </div>
  )
} 