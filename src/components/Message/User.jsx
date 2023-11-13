export const STATUS_ACTIVE = 'active';
export const STATUS_DEACTIVE = 'deactive';

const User = (props) => {
    return (
        <div {...props} className={`user-item flex space-x-2 shadow-sm p-2 cursor-pointer w-full ${props?.className} ${props?.selected&&'active'}`}>
            <div className="relative">
                <img src={props?.img} alt="" className="w-[50px] h-[50px] rounded-full border-[1px] border-white" />
                {(props?.status == STATUS_ACTIVE) && (
                    <div className="bg-green-500 w-[12px] h-[12px] rounded-full absolute left-[40px] top-[2px] border-[1px] border-x-purple-50"></div>
                )}
                {(props?.unread > 0) && (
                    <div className="bg-red-500 w-[7px] h-[7px] rounded-full absolute left-[5px] top-[38px] border-[1px] border-x-purple-50"></div>
                )}
            </div>
            <span className="hidden lg:block font-medium">{props?.username}</span>
        </div>
    )
}

export default User;