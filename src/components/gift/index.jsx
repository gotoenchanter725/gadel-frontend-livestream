const Gift = (props) => {
    return (
        <div className={`${props.className} relative flex flex-col items-center w-[300px] p-4 rounded-full shadow-button`}>
            <h6 className="text-black text-2xl mb-2 text-center font-bold">{props.title}</h6>
            <img className="w-[70px] aspect-[1/1] mb-6" src={props.image} alt='gift' />
            <div className="absolute -bottom-[15px] rounded-full px-3 py-1.5 bg-primary text-white font-semibold">{`GIFT $${props.price}`}</div>
        </div>
    )
}

export default Gift;