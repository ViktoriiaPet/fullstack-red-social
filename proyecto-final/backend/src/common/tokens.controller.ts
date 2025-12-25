export default function getToken(length: number)
{
    const token=(length: number)=>(Math.random().toString()+Math.random().toString()+Math.random().toString()+Math.random().toString()).substr(0,length);

    return token(length)
}