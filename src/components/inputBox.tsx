export default function InputBox({type , placeholder   , onChange}: {type: string, placeholder: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
return(
    <>
        <input
        onChange={onChange}
            type={type}
            className="border border-gray-300 rounded-md p-2  w-full"
            placeholder={placeholder}
        />
    </>
)
}