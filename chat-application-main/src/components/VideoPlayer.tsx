export default function VideoPlayer({src, type}: any)
{
    return (
        <video width="170" preload="none" controls>
            <source src={src} type={type} />
            Your browser does not support the video tag.
        </video>
    )
}