'use client'

export default function goBackArrow() {
    const goBack = () => {
        window.history.back();
    }

    return (
        <div onClick={() => {goBack()}}>go back icon</div>
    )
}