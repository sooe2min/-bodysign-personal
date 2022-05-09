import Link from 'next/link'
import React, { useEffect } from 'react'
import useSessionStorage from '../../../hooks/useSessionStorage'
import LinkProps from '../../../types/LinkProps'
import BotNavSessionIcon from '../../atoms/icons/BotNavSessionIcon'

const BotNavSessionLink = ({ variant, pathName }: LinkProps) => {
	const [_, setMangedMemberInfo] = useSessionStorage('mangedMemberInfo')

	useEffect(() => {
		setMangedMemberInfo('')
	}, [])

	let href = ''
	if (variant === 'Trainer') {
		href = '/trainer/session'
	} else if (variant === 'Member') {
		href = '/user/session'
	}

	return (
		<Link href={href}>
			<span
				className={`flex flex-col items-center cursor-pointer ${
					pathName.includes(href) ? 'text-black' : ''
				}`}>
				<BotNavSessionIcon />
				<p className="mt-[0.4rem]">수업</p>
			</span>
		</Link>
	)
}

export default BotNavSessionLink
