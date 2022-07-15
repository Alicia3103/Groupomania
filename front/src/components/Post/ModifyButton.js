import React from 'react'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ModifyButton({ post }) {
  return (
    <button>
      <FontAwesomeIcon icon={faPen} />
    </button>
  )
}

export default ModifyButton
