import React from 'react'
import Button from '../../../common/button'

const CommentsForm = () => {
    return (
        <>
            <form className="p-3">
                <div className="row mt-3">
                    <div className="col-lg-12 my-3">
                        <textarea
                            className="form-control bg-light p-3"
                            name="comment"
                            placeholder="Write your comment here"
                            rows={3}
                        ></textarea>
                    </div>
                </div>

                <Button
                    type="submit"
                    bgClass="info"
                    size="sm"
                    action={() => { }}
                    loading={false}
                >
                    Send
                </Button>
            </form>
        </>
    )
}

export default CommentsForm 