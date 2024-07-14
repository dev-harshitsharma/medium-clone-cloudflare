import { AvatarLogo } from './BlogCard'

const NavBar = () => {
  return (
    <div className='border-b flex justify-between px-10 py-4'>
        <div className="font-semibold text-xl hover:cursor-pointer">Medium Logo</div>
        <div className="text-xl">
            <AvatarLogo authorName='Harshit Sharma'/>
        </div>
    </div>
  )
}

export default NavBar