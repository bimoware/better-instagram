export default function ImageMessage({ file }: { file:string}) {
    return <img className="max-w-64 rounded-3xl
    transition hover:-translate-y-1 hover:-rotate-2 hover:cursor-pointer" 
    src={file}/>
}