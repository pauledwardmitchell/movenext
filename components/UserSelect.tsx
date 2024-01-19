"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'

import { createNewAssignment } from '@/utils/api'

import { Button, Select, Option } from "@material-tailwind/react"


const UserSelect = ( {params, users} ) => {
	const [name, setName] = useState("")

	const router = useRouter()

	const findUserIdFromEmail = () => {
		let id 
		console.log('users', users)
		for (let i = 0; i < users.length; i++) {
			if (users[i].value == name) {
				id = users[i].id
			}
		}
		console.log(id)
		return id
	}

	const userData = {
		userId: findUserIdFromEmail(),
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
	    	<Button onClick={findUserIdFromEmail}>Assign</Button>

    	</div>
	)
}

export default UserSelect