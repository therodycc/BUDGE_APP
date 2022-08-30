import React, { useState } from 'react'
import RadioButton from '../../../common/input/radio'
import NotWorkingSection from '../../../common/not-working';

const WaysOfEntries = () => {
    const [waysOf, setWaysOf] = useState([
        {
            id: 'monthly',
            name: 'Monthly',
            label: 'Monthly',
            checked: true,
        },
        {
            id: 'weekly',
            name: 'Weekly',
            label: 'Weekly',
            checked: false,
        },
        {
            id: 'fifthly',
            name: 'Fifthly',
            label: 'Fifthly',
            checked: false,
        },
    ]);

    const handleWaySelected = (way: string) => {
        setWaysOf(waysOf.map(w => ({ ...w, checked: w.id === way })));
    }
    return (
        <React.Fragment>
            <div className='card p-3'>
                <NotWorkingSection />
                <span>Forma de cobros</span>
                <div className='card-body row'>
                    {
                        waysOf.map(item => (
                            <RadioButton
                                onClick={() => { handleWaySelected(item.id) }}
                                key={item.id}
                                {...item}
                            />
                        ))
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default WaysOfEntries