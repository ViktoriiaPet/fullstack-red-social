export default function getToken(length)
{
    const token=(length)=>(Math.random().toString()+Math.random().toString()+Math.random().toString()+Math.random().toString()).substr(0,length);

    return token(length)
}