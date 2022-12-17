import { connect } from './connect';
import { useEffect, useState } from 'react'
import { getBalance } from './balance';
import { IntroWrapper } from './styles';

function Intro() {

    const [address, setAddress] = useState<string>('');
    const [errorConnectingToProvider, setErrorConnectingToProvider] = useState<{ error: unknown }>();
    const [balance, setBalance] = useState<string>("");

    useEffect(() => {
        connectToProvider();
        async function connectToProvider() {
            try {
                const address = await connect();
                if (address) {
                    setAddress(address);
                    const balance = await getBalance(address);
                    setBalance(balance.toString());
                }
            } catch (error) {
                setErrorConnectingToProvider({ error })
            }
        }
    }, []);

    if (address) {
        return (
            <IntroWrapper>
                <div>
                    <h1>Welcome</h1>
                    <h4>{address}</h4>
                </div>
                <div>
                    <h3>Balance</h3>
                    <h2>{balance}</h2>
                </div>
            </IntroWrapper>
        )
    } else {
        return (
            <IntroWrapper>
                <h1>Sign in to Metamask</h1>
            </IntroWrapper>
        )

    }
}

export default Intro