const ChatMessages = (props: any) => {

    console.log(props.messages);
    return (
        <div className="messageContainer">
            <div className="w-full mb-5">
                <div className="bg-white w-40 text-center py-3 text-xl rounded-lg">Your message</div>
            </div>

            <div className="w-full">
                <div className="bg-blue-300 w-40 text-center py-3 text-white text-xl rounded-lg float-right">
                    <p>{props.messages}</p>
                </div>
            </div>
        </div>
    )
}

export default ChatMessages;
