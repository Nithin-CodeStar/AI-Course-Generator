import React from 'react'
import AdvancedJobSearch from '../_components/AdvancedJobSearch'
import AvailableJobsByLocation from '../_components/AvailableJobsByLocation'

const page = () => {
  return (
    <div>
        <AdvancedJobSearch />
        <AvailableJobsByLocation/>
    </div>
  )
}

export default page