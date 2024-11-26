import Header from '../../components/header/Header';
import Chat from '../../components/Chat/Chat';
import { GlobalDataProvider } from '../context/GlobalDataProvider';

const UserChat = () => {
    return (
        <div>
            <GlobalDataProvider>
                <Header />
                <Chat />
            </GlobalDataProvider>
        </div>
    )
}

export default UserChat;
