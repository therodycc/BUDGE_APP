import React from 'react'
import LoadingPoints from '../loading/loading-points'

const LoadingTable = () => {
    return (
        <React.Fragment>
            <tr>
                <td colSpan={12}
                    className="position-relative"
                    style={{ height: '200px', }}
                >
                    <LoadingPoints />
                </td>
            </tr>
        </React.Fragment>
    )
}

export default LoadingTable