import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import BottomBar from './organisms/BottomBar'

interface LayoutProps {
	children: React.ReactNode
}

const noneBottomBarLists = [
	'/trainer',
	'/user',
	'/trainer/manage-member',
	'/trainer/exercise',
	'/trainer/session',
	'/user/session',
	'/user/chat',
	'/trainer/menu',
	'/user/menu'
]

const Layout = ({ children }: LayoutProps) => {
	const pathName = useRouter().pathname
	const [checkHrefPathName, setCheckHrefPathName] = useState(false)

	useEffect(() => {
		if (noneBottomBarLists.includes(pathName)) {
			setCheckHrefPathName(true)
		} else {
			setCheckHrefPathName(false)
		}
	}, [pathName])

	return (
		<>
			<div
				className={`
			${
				checkHrefPathName === true ? 'mb-[6.3rem]' : ''
			} sm-max:w-screen sm:w-[680px] sm:mx-auto p-[2rem] font-IBM`}>
				{children}
			</div>
			<div className="fixed bottom-0 w-full">
				{checkHrefPathName === true ? (
					<BottomBar pathName={pathName} />
				) : null}
			</div>
		</>
	)
}

export default Layout
