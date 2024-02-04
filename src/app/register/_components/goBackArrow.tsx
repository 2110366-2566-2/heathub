'use client'

export default function HostTellUsAboutYourself() {
    const goBack = () => {
        window.history.back();
    }

    return (
        <div onClick={() => {goBack()}}>go back icon</div>
    )
}