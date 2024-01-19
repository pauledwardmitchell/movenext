"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'

import { createNewAssignment } from '@/utils/api'

import { Button, Select, Option } from "@material-tailwind/react"

// set state so user id can be sent to api


const UserSelect = ( {params, users} ) => {
	const [name, setName] = useState("")
	const [selectedUserData, setselectedUserData] = useState({userId: "4b6557df-efdc-43e8-8b4a-58b469e3b397",
											  templateId: params.id})
  
	const router = useRouter()

	const findUserIdFromEmail = (users) => {
		let id 
		for (let i = 0; i < users.length; i++) {
			if (users[i].email == name) {
				id = users[i].id
			}
		}
		console.log(id)
		return id
	}

	const userData = {
		userEmail: name,
		templateId: params.id
	}

	const handleOnClick = async () => {
	  const { data } = await createNewAssignment( userData )
	  router.push(`/user/${data.userId}`)
	}

	return (
		<div>
	    	<Select label="Assign Template to a Patient" value={name} onChange={setName}>
	    	  {users.map(user => (
	    	  	<Option key={user.index} value={user.value}>{user.value}</Option>
	    	  	))}
	    	</Select>
	    	<Button onClick={handleOnClick}>Assign</Button>
    	</div>
	)
}

export default UserSelect