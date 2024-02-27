"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'

import { createNewAssignment } from '@/utils/api'

import { Button, Select, Option } from "@material-tailwind/react"


const UserSelect = ( {params, users, templateName} ) => {
	const [name, setName] = useState("")

	const formattedName = () => {
		const date = new Date()
		const options = {
		  month: 'numeric', 
		  day: 'numeric', 
		  year: 'numeric',
		};
		const formattedDate = date.toLocaleDateString("en-US", options)
		const name = templateName + " (" + formattedDate + ")"
		console.log('name', name)
		return name
	}
	
	const router = useRouter()

	const findUserIdFromEmail = () => {
		let id 
		for (let i = 0; i < users.length; i++) {
			if (users[i].value == name) {
				id = users[i].id
			}
		}
		return id
	}

	const userData = {
		userId: findUserIdFromEmail(),
		templateId: params.id,
		name: formattedName()
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