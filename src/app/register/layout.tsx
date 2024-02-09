import GoBackArrow from "../register/_components/goBackArrow"

export default function RegisterLayout (
    {children}: {children: React.ReactNode}
) {
    return (
        <div className="bg-primary-50 h-[100%] w-[100%]">
            <GoBackArrow/>
            {children}
        </div>
    )
}