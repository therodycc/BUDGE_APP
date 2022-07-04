import React from 'react'
import { gxUUID } from '../../../helpers/uuid-generator.helper';
import CommentItem from '../../common/comment-item';
import CommentsForm from './forms/Comments';

const Recommendations = () => {
    return (
        <>
            <div className="row">
                <div className="col-lg-4">
                    <div className="card mb-3">
                        <CommentsForm />
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="row">
                        {
                            [1, 2].map((item, index) => (
                                <React.Fragment key={`recommendations-item-${index}`}>
                                    <div
                                        key={gxUUID()}
                                        className="mb-2">
                                        < CommentItem />
                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Recommendations