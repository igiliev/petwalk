interface ChatNameProps {
    names: string[];
    messagesPage: boolean;
}

const ChatNames = ({ names, messagesPage }: ChatNameProps) => {
    return( 
        <div>
            {
                names.map( (name: string, index: number) => <p key={index}>{name}</p> )
            }
        </div>
    )
}

export default ChatNames;