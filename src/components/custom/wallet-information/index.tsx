import NotWorkingSection from "../../common/not-working"

export const WalletInformation = () => {
    return (
        <div className='card mx-2'>
            <NotWorkingSection />
            <div className='card-body p-0 d-flex justify-content-center align-items-center flex-column px-3'>
                <span className=' ' style={{
                    fontSize: '.8rem',
                }}>Amount total</span>
                <span className='' style={{
                    fontSize: '1rem',
                }}>200,000.00</span>
            </div>
        </div>
    )
}
